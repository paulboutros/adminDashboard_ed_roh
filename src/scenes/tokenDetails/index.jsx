
 import { IconButton , Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

 
import { CountdownTimerWithArg } from   "../../components/CountdownTimer.jsx"
import  { formatTimestampToCustomFormat, addressShortened ,handleCopyClick} from "../../utils.js"
//https://chakra-ui.com/docs/components/button
 import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract, useMinimumNextBid, useValidDirectListings, useValidEnglishAuctions  } from "@thirdweb-dev/react";
import { Avatar, 
      useToast ,
   Tooltip,
   Button as ChakraButton,
    Flex,
     Input,
      SimpleGrid,
      Stack,
     Text,
    Skeleton
} from "@chakra-ui/react";

import {CopyText, CustomLinkWithLocalIcon,  CustomLinkWithIcon } from "../../components/LinkTextButton.jsx"
import { RowChildrenAlignCenter,
     VerticalStackAlignCenter ,
     VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,
     VerticalSpace,
      RoundedBox,
      BoxWithTopBar,
      HorizontalSpace
    } from "../../components/Layout.jsx"  

import NFTContratHeader from "../../components/NFTcontractHeader.jsx"
import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../../const/addresses.ts";
//import {getSDK } from "../../utils/updateMetadata";
import {text2, text1, tokens } from "../../theme.js";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
 
import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { getSDK_fromPrivateKey } from "../../data/API.js";


 
import {useEffect, useState} from "react";
 
import { Link, useParams } from 'react-router-dom';


const TokenDetails =  ({  propContractAddress,  propTokenId, AlllistingData  } ) => {
 
    const toast = useToast()
     let {  contractAddress,   tokenId } = useParams();
   // const { contractAddress, tokenId } = useParams();

    if( propContractAddress !==undefined && propTokenId !==undefined  ){
        contractAddress = propContractAddress;
        tokenId = propTokenId;
    }
  
  const { user } = useUserContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const boxColor = colors.primary[400];
  const  _borderColor = colors.primary[400]
  const _borderRadius= "10px";
   const  paddingPX = "0px";
   const trait_margin = "15px";

   const flex = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' };





  const [nft, setNFT] = useState();
  const [contractMetadata, setContractMetadata] = useState(); 
 
  useEffect(() => {
    // Function to fetch NFT data
    const fetchNFT = async () => {

        const sdk = getSDK_fromPrivateKey();//new ThirdwebSDK("goerli");
        const contract = await sdk.getContract(TOOLS_ADDRESS);
        //const nftResult = await contract.erc721.get(tokenId);
        const nftResult = await contract.erc1155.get(tokenId);
        
       let contractMetadataResult;
      try {
     
        console.error(' nftResult  >>>> fetching NFT:', nftResult);

        contractMetadataResult = await contract.metadata.get();
        setContractMetadata(contractMetadataResult);
 
        setNFT(nftResult);
 
      } catch (error) {
        console.error('Error fetching NFT:', error);
      }
    };

    
    // Call the fetch functions when component mounts
    fetchNFT();
     
  }, [contractAddress, tokenId]);





  

           const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
           
                
               
           

            const { contract: nftCollection } = useContract(TOOLS_ADDRESS);

            const { data: directListing, isLoading: loadingDirectListing } = 
            useValidDirectListings(marketplace, {
                tokenContract: TOOLS_ADDRESS, 
                tokenId: nft?.metadata.id,
            });

            //Add these for auction section
            const [bidValue, setBidValue] = useState();

            const { data: auctionListing, isLoading: loadingAuction } =
            useValidEnglishAuctions(marketplace, {
                tokenContract: TOOLS_ADDRESS,
                tokenId: nft?.metadata.id,
            });

     
    async function buyListing() {
        let txResult;

        //Add for auction section
        if (auctionListing?.[0]) {
            txResult = await marketplace?.englishAuctions.buyoutAuction(
                auctionListing[0].id
            );
        } else if (directListing?.[0]){
            txResult = await marketplace?.directListings.buyFromListing(
                directListing[0].id,
                1
            );
        } else {
            throw new Error("No listing found");
        }

        return txResult;
    }

    
    async function createBidOffer() {
        let txResult;
        if(!bidValue) {
            return;
        }

        if (auctionListing?.[0]) {
            txResult = await marketplace?.englishAuctions.makeBid(
                auctionListing[0].id,
                bidValue
            );
        } else if (directListing?.[0]){
            txResult = await marketplace?.offers.makeOffer({
                assetContractAddress: TOOLS_ADDRESS,
                tokenId: nft.metadata.id,
                totalPrice: bidValue,
            })
        } else {
            throw new Error("No listing found");
        }
        return txResult;
    }

   
    if(!nft  ){
        return (<div></div>)

    }else{
       
    // if (!AlllistingData){
        return (
        <div>
        
        {/* nft top area info */}
        { !AlllistingData  &&(
          <NFTContratHeader/>
        )}

         <RowChildrenAlignTop> 
         
         <Box style={{ marginLeft:"50px"  }}   >   </Box>

        
<VerticalStackAlignLeft>

   <RoundedBox> 
   <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
       
   <Box height="350px" width="350px" >
       
           <VerticalStackAlignCenter>
           
               <MediaRenderer
                   src={nft.metadata.image}
                   style={{  width: '100%',position: 'relative', left: '10px',  top:"10px" }}
                   
               />
           </VerticalStackAlignCenter>
   </Box>
   </Skeleton>
   </RoundedBox>


{/* <NftTraitBox nft={nft} />   */}
</VerticalStackAlignLeft>

   {/* right side stack    */}
   <VerticalStackAlignLeft fullWidth={true}>
   <Box  width="80%"   style={{ marginLeft:"20px",  marginRight:"20px"  }}   > 
   
   <BoxWithTopBar>


   <VerticalStackAlignLeft >
   <Box  >
     <NftPriceBlock 
           boxColor={boxColor}  directListing={directListing}  
           loadingMarketplace={loadingMarketplace} 
           loadingDirectListing ={loadingDirectListing} auctionListing={auctionListing} loadingAuction={loadingAuction} 
    /> 
  </Box>
 
          <RowChildrenAlignTop> 
    <NftTraitBox nft={nft} /> 
    <HorizontalSpace space={2}></HorizontalSpace>
    <SupplyBox nft={nft} /> 
  
           <VerticalStackAlignLeft>
                <CopyText  
                    to={`/profile/${nft.owner}`}
                    text= { addressShortened(nft.owner) } 
                    tooltipText={"copy address to clipboard"}
                    textToCopy={nft.owner}
                    >

                </CopyText>
   

                <CustomLinkWithLocalIcon  
                to={`/profile/${nft.owner}`}
                text= { addressShortened(nft.owner) } 
                tooltipText={"visit owner's profile"}
                >

               </CustomLinkWithLocalIcon>
             <p>listing ID : {AlllistingData?.id}</p>
             <p>tokenId    : {AlllistingData?.tokenId}</p>
             
             </VerticalStackAlignLeft>
           { AlllistingData  ? (
                <div>
                <p>creator: {  addressShortened(AlllistingData?.creatorAddress) }</p>
                 <p>Start: { formatTimestampToCustomFormat(AlllistingData?.startTimeInSeconds*1000) } </p>
                <p>End: { formatTimestampToCustomFormat(AlllistingData?.endTimeInSeconds*1000) } </p>
        
                <CountdownTimerWithArg 
                  startTime={AlllistingData.startTimeInSeconds}
                  endTime={AlllistingData.endTimeInSeconds}
                /> 
                </div>
            ):(   <div> </div>) }

              <AddressBox nft={nft} AlllistingData={AlllistingData} />

              </RowChildrenAlignTop> 


             </VerticalStackAlignLeft>

          </BoxWithTopBar>
            <VerticalSpace space={2}/>

   
           <Skeleton isLoaded={!loadingMarketplace || !loadingDirectListing || !loadingAuction}>
       
      
       <Box spacing={5} color={colors.primary[200]} >

          
           <Box sx={ flex }>    
               <Web3Button 
           className="tw-web3button--connect-wallet"
           style={{
               fontWeight:"600",
               color:colors.primary[500],
               backgroundColor:colors.blueAccent[700], 
               width: '100%'
           }}


           contractAddress={MARKETPLACE_ADDRESS}
           action={async () => buyListing()}
           isDisabled={(!auctionListing || !auctionListing[0]) && (!directListing || !directListing[0])}
           >
           Buy at asking price
               </Web3Button>
           <Typography align="center">or</Typography>
           
           
           <TextField
               fullWidth margin="bottom" variant="outlined"  label="Minimum Bid" type="number" value={bidValue}
               onChange={(e) => setBidValue(e.target.value)}
           /> 

           <VerticalSpace space={2}/>

           <Web3Button
               contractAddress={MARKETPLACE_ADDRESS}  action={async () => await createBidOffer()}  isDisabled={!auctionListing || !auctionListing[0]}
               className="tw-web3button--connect-wallet" style={{ backgroundColor:colors.blueAccent[700], width: '100%' }}
           >
               Place Bid
           </Web3Button>
           </Box>


       </Box>
          </Skeleton>

   </Box>


   </VerticalStackAlignLeft>



             
         </RowChildrenAlignTop>     
      
        
    </div>

        ) 
     
 

    }
    

    
};

export default TokenDetails;
 


  function NftPriceBlock (   { boxColor, directListing, loadingMarketplace, loadingDirectListing , auctionListing , loadingAuction }  ){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box   sx={{  position: 'relative', top:"-5px"  }} >
        <Typography
         
         sx={{  position: 'relative', top:"-5px"  }}
         color={colors.grey[ text2.color ]} >Price: </Typography>
        <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
        {directListing && directListing[0] ? (
            <Typography color={colors.grey[ text1.color ]}
            sx={{  position: 'relative', top:"-5px"  }}
            variant="h5" fontWeight="60">
            {`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}
            </Typography>
        ) : auctionListing && auctionListing[0] ? (
            <Typography variant="h5" fontWeight="bold">
            {`${auctionListing[0]?.buyoutCurrencyValue.displayValue} ${auctionListing[0]?.buyoutCurrencyValue.symbol}`}
            </Typography>
        ) : (
            <Typography  variant="h5" fontWeight="bold"
             color= {colors.primary[500]} 
            >
            Not for sale
            </Typography>
        )}
        </Skeleton>
        <Skeleton isLoaded={!loadingAuction}>
        {auctionListing && auctionListing[0] && (
            <Flex direction="column">
            <Typography color="darkgray">Bids starting from</Typography>
            <Typography fontSize="3xl" fontWeight="bold">
                {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
            </Typography>
            <Typography></Typography>
            </Flex>
        )}
        </Skeleton>
</Box>

    )
  }

   
  function SupplyBox ( {nft}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const boxColor = colors.primary[400];
    const  _borderColor = colors.primary[400]
    const _borderRadius= "10px";
     const  paddingPX = "0px";
     const trait_margin = "15px";

 return(
    <Box sx={{  position: 'relative', top:"-5px", height: "110px"  }}
    padding= {2} 
    border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
   >
                  <Typography 
                 fontWeight="200"
                 sx={{  position: 'relative', top:"-5px"  }}
                  >Supply:</Typography>
                  
                 <RowChildrenAlignCenter>  
                     <Box
                         display="flex"
                         flexDirection="column"
                         alignItems="center"
                         justifyContent="center"

                          padding={1}
                          border={1}
                          borderColor={ _borderColor} //borderRadius={_borderRadius}
                          borderRadius={2}
                     >
                         <Typography fontSize="small">{nft?.supply}</Typography>
                         
                     </Box>
                     </RowChildrenAlignCenter>   
 
      
 </Box>
 
 )

  }
  function  AddressBox ( {nft , AlllistingData }){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const boxColor = colors.primary[400];
    const  _borderColor = colors.primary[400]
    const _borderRadius= "10px";
     const  paddingPX = "0px";
     const trait_margin = "15px";

 return(
    <Box sx={{  position: 'relative', top:"-5px", height: "50px"  }}
    padding= {2} 
    border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
   >
                  { AlllistingData  ? (           
             <p>status : {GetListingStatus(AlllistingData )  }</p>  
                 ):(<div></div>) }
            
                 
 
      
 </Box>
 
 )

  }
  function NftTraitBox ( {nft}){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const boxColor = colors.primary[400];
    const  _borderColor = colors.primary[400]
    const _borderRadius= "10px";
     const  paddingPX = "0px";
     const trait_margin = "15px";

 return(
    <Box sx={{  position: 'relative', top:"-5px"  }}
    padding= {paddingPX} 
   border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
  >
  
    {/* <SimpleGrid columns={2} spacing={6}> */}

             <Grid container spacing={3} >
             
             
             <Grid item xs={12}  margin= {trait_margin}  >
                 <Typography 
                 fontWeight="200"
                 sx={{  position: 'relative', top:"-5px"  }}
               
                 >Traits:</Typography>
                 <Grid container spacing={4}>
                 {Object.entries(nft?.metadata?.attributes || {}).map(([key, value]) => (
                     <Grid item key={key}>
                     <Box
                         display="flex"
                         flexDirection="column"
                         alignItems="center"
                         justifyContent="center"

                            padding={1}
                         border={1}
                          borderColor={ _borderColor} //borderRadius={_borderRadius}
                         borderRadius={2}
                     >
                         <Typography fontSize="small">{value.trait_type}</Typography>
                         <Typography fontSize="small" fontWeight="bold">
                         {value.value}
                         </Typography>
                     </Box>
                     </Grid>
                 ))}
                 </Grid>
             </Grid>
             </Grid>

      {/* </SimpleGrid> */}
 </Box>
 
 )

  }

  function   GetListingStatus(AlllistingData){
   
    if (!AlllistingData){return ""; }

    //console.log("listing ID" , AlllistingData.id, "  AlllistingData.status",  AlllistingData.status );
    // CREATED, COMPLETED, or CANCELLED
    switch (AlllistingData.status ){
      case 2: return "COMPLETED";  
      case 3: return "CANCELLED";  
      case 4: return "ACTIVE"; // or created  
      case 5: return "EXPIRED"; 
     default: return "ERROR";  
    }
   

  }
 

  

  
  
   
 