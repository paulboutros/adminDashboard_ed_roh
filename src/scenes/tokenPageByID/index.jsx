
import { IconButton , Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

 import {CountdownTimerWithArg} from "../../components/CountdownTimer.jsx"
import  { convertSecondsToDateString, formatTimestampToCustomFormat, addressShortened ,handleCopyClick} from "../../utils.js"
//https://chakra-ui.com/docs/components/button
import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract,
    useMinimumNextBid, useValidDirectListings,
     useValidEnglishAuctions , useMakeBid,
     useContractEvents
    
   } from "@thirdweb-dev/react";


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
    VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,RowChildrenAlignLeft,
    RowChildrenAlignRight,
    VerticalSpace,
     RoundedBox,
     BoxWithTopBar,
     HorizontalSpace,
     RoundedBoxInfo
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

import { getSDK_fromPrivateKey, convertEthToUsd } from "../../data/API.js";
import { ethers } from "ethers";

import ShowAuction from "../../components/TokenPageBoards/ShowAuction.jsx";
import Activity from "../../components/TokenPageBoards/Activity.jsx"
import Offers from "../../components/TokenPageBoards/Offers.jsx"



import {useEffect, useState} from "react";

import { Link, useParams } from 'react-router-dom';

import toast, { Toaster } from "react-hot-toast";
//import toastStyle from "../../../util/toastConfig";

// key  page control for global edditing
const _mainBoxPadding = 3;
const TokenDetailsByID =  ({  propContractAddress,  propTokenId, AlllistingData,     displayMode  } ) => {

    
    let {  contractAddress, tokenId,  listingId, auctionId } = useParams();
   
 
    let listingType = auctionId === "NAN" ? "Direct listing":"Auction";


 const { user } = useUserContext();

  

 const theme = useTheme();
 const colors = tokens(theme.palette.mode);

 const boxColor = colors.primary[400];
  

  const flex = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' };


 

 const [nft, setNFT] = useState();
 const [ auctionData, setAuctionData ] = useState(); 
 const [ listingData, setListingData ] = useState(); 
 


   


 useEffect(() => {
   // Function to fetch NFT data
   const fetchNFT = async () => {

       const sdk = getSDK_fromPrivateKey();//new ThirdwebSDK("goerli");
       const contract = await sdk.getContract(TOOLS_ADDRESS);
       //const nftResult = await contract.erc721.get(tokenId);
       const nftResult = await contract.erc1155.get(tokenId);
       
      //let contractMetadataResult;
     try {
    
    

       setNFT(nftResult);

     } catch (error) {
       console.error('Error fetching NFT:', error);
     }
   };

   
   // Call the fetch functions when component mounts
   fetchNFT();
    
 }, [contractAddress, tokenId]);


 

          const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
 
        
           const { data: directListing, isLoading: loadingDirectListing } = 
           useValidDirectListings(marketplace, {
               tokenContract: TOOLS_ADDRESS, 
               tokenId: tokenId,// nft?.metadata.id,
           });

           //Add these for auction section
           const [bidValue, setBidValue] = useState();

           const { data: auctionListing, isLoading: loadingAuction } =
           useValidEnglishAuctions(marketplace, {
               tokenContract: TOOLS_ADDRESS,
               tokenId: tokenId,// nft?.metadata.id,
           });

 


           useEffect(() => {

            console.log(' USEEFTTECT   auctionListing', auctionListing ,  " for tokenId" , tokenId );
             if (!auctionListing)return;
            const fetchNFT = async () => {
            
              try {
               
                   auctionListing.forEach(element => {
                    
                    if (element.id === auctionId ){
                       
                        setAuctionData(element);
                    }
                   });
                 // 
         
              } catch (error) {
                console.error('Error fetching NFT:', error);
              }
            };
         
            
            // Call the fetch functions when component mounts
            fetchNFT();
             
          }, [auctionListing]);

//=======================================================================
          useEffect(() => {

            console.log(' USEEFTTECT   listingData', directListing ,  " for tokenId" , tokenId );
            if (!directListing)return;
           const fetchNFT = async () => {
           
             try {
              
              directListing.forEach(element => {
                console.log(' element.id  ', element.id ,  "listingId", listingId);      
                   if (element.id === listingId ){
                    
                      setListingData(element);

                      console.log(' MATCH listingData', listingData);
                      
                   }
                  });
                // 
        
             } catch (error) {
               console.error('Error fetching NFT:', error);
             }
           };
        
           
           // Call the fetch functions when component mounts
           fetchNFT();
            
         }, [directListing]);


         //=======================================================================
 
           const { data: transferEvents, isLoading: loadingTransferEvents } =
           
           useContractEvents(marketplace, "NewBid", {
        //   useContractEvents(nftCollection, "Transfer", {
               queryFilter: {
               filters: {
                   tokenId: nft?.metadata.id,
               },
               order: "desc",
               },
           });           




    
   async function buyListing() {
       let txResult;

       //Add for auction section
       if (auctionData) {
           txResult = await marketplace?.englishAuctions.buyoutAuction(
               auctionData.id
           );
       } else if (AlllistingData){
           txResult = await marketplace?.directListings.buyFromListing(
               AlllistingData.id,
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

       if (auctionData) {
           txResult = await marketplace?.englishAuctions.makeBid(
               auctionData.id,
               bidValue
           );
       } else if (AlllistingData){  
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


   function currentListing( ){

      let listingResult;

       if ( listingType === "Direct listing" ){
            return listingData;
      }else{ // auction

        return auctionData;
        // , listingData,auctionData
      } 
   }

 
 
  
   if(!nft  ){
       return (<div></div>)

   }else{

     /*
      if ( marketplace?.directListings?.length > 0){

        return (<div>  has direct listing </div>)
      }
      if ( marketplace?.englishAuctions?.length > 0){

        return (<div>  has auction listing </div>)
      }*/
      
         



      //====================
    //  if it displays as list
       return (

        !loadingDirectListing && !loadingMarketplace ? (

          <div>
    

          <RowChildrenAlignTop> 
          
          <Box style={{ marginLeft:"50px"  }}   >   </Box>
  
         
        <VerticalStackAlignLeft>
  
         <DisplayNFTimage nft={nft} /> 
    
  
  
  
   
  {/* =================   2n BOX ======================================================= */}
  </VerticalStackAlignLeft>
  
     
        <VerticalStackAlignLeft fullWidth={true}>
          <Box  width="80%"   style={{ marginLeft:"20px",  marginRight:"20px"  }}   > 
  
     <Box  padding={0}  >
        <VerticalStackAlignLeft>
         <Typography variant = "h2"  fontWeight={600} >#{ tokenId}</Typography>
         <VerticalSpace space={1}/>
  
          <RowChildrenAlignLeft>
            <Typography color={colors.grey[ text2.color ]} >listing ID</Typography>
            <HorizontalSpace space={1}/> 
            <Typography> {listingData?.id}</Typography>
  
            <HorizontalSpace space={1}/> 
            <Typography color={colors.grey[ text2.color ]} > {listingType}</Typography>
            {/* <HorizontalSpace space={1}/> 
            <Typography>  {listingType} </Typography> */}
          </RowChildrenAlignLeft>
  
  
          <RowChildrenAlignLeft>
  
          <Typography variant ="h5"> Current Owner </Typography>
          <HorizontalSpace space={1} /> 
          <CustomLinkWithLocalIcon   to={`/profile/${nft.owner}`} text= { addressShortened(nft.owner) }   tooltipText={"visit owner's profile"}/>
           </RowChildrenAlignLeft>   
  
          </VerticalStackAlignLeft>
          
     </Box>
     
     <RoundedBox>
     
     <Box  padding={_mainBoxPadding}  >
        
        <div>
          <Typography color={colors.grey[ text2.color ]} 
           variant ="h4"> Sales ends {convertSecondsToDateString(  currentListing().endTimeInSeconds)} 
           </Typography>
          <VerticalSpace space={1}/>
          <CountdownTimerWithArg 
             startTime={ currentListing().startTimeInSeconds}  
             endTime={ currentListing().endTimeInSeconds} 
             color={colors.grey[ text2.color ]}
           /> 
             </div>
        
  
       {/* =======================================================================================   */}
   
        </Box>
      <VerticalSpace space={0.5}/>
    <Divider orientation="horizontal" style={{ height: "1px", width: '100%' }} />
  
    <RowChildrenAlignLeft>
  
      <VerticalStackAlignLeft >
           <Box  >
             <NftPriceBlock boxColor={boxColor} 
              directListing={directListing} loadingMarketplace={loadingMarketplace} 
              loadingDirectListing ={loadingDirectListing}  auctionListing={auctionListing} 
              loadingAuction={loadingAuction} 
                AlllistingData={   listingData    }
                auctionData={auctionData}
                />
          </Box>
  
                <div>
                  <Typography color={colors.grey[ text2.color ]} >creator:</Typography>
                  <CopyText  
                     to={`/profile/${AlllistingData?.creatorAddress}`}//nft.owner
                     text= { addressShortened(AlllistingData?.creatorAddress) } 
                     tooltipText={"copy address to clipboard"}
                     textToCopy={AlllistingData?.creatorAddress}
                     >
  
                  </CopyText> 
                  
                </div>
               
            
      </VerticalStackAlignLeft>
  
      <HorizontalSpace space={1}/> 
      < Box whiteSpace="nowrap" >
       <VerticalStackAlignLeft>
          
          <Typography color={colors.grey[ text2.color ]} >listing ID</Typography>
          <Typography> {AlllistingData?.id}</Typography>
          <Typography color={colors.grey[ text2.color ]} >tokenId</Typography>
          
          
       </VerticalStackAlignLeft>
    </Box>
  
    <HorizontalSpace space={1}/> 
    < Box whiteSpace="nowrap" >
       <VerticalStackAlignLeft>
          
          <Typography color={colors.grey[ text2.color ]} >Supply:</Typography>
          <Typography> {nft?.supply}</Typography>
          <Typography color={colors.grey[ text2.color ]} > {nft?.metadata?.attributes[0].trait_type} </Typography>
          <Typography>{nft?.metadata?.attributes[0].value}</Typography>
          
       </VerticalStackAlignLeft>
    </Box>
  
    <HorizontalSpace space={1}/> 
  
  
     <RowChildrenAlignTop> 
      
     <HorizontalSpace space={1}/>  
      
  
          
         <HorizontalSpace space={10}/> 
         <Box style={{  position: 'absolute', right:"10px"}}  >
             
               <StatusBox nft={nft} AlllistingData={AlllistingData} />
          </Box>
  
  
      </RowChildrenAlignTop> 
        
  
  </RowChildrenAlignLeft>
   
     </RoundedBox>
  
     {/* auctionId */}
     <ShowAuction nft={ nft }   auctionId={ auctionId }  />
     <ShowAuction nft={ nft }   listingId={listingId}  />
      {/* <Offers nft={ nft}  listing={listingId} /> */}
             <VerticalSpace space={1}/>
  
    
            <Skeleton isLoaded={!loadingMarketplace || !loadingDirectListing || !loadingAuction}>
        
       
        <Box spacing={5} color={colors.primary[200]} >
  
           
            <Box sx={ flex }> 
            <RowChildrenAlignTop>        
                <Web3Button 
            className="tw-web3button--connect-wallet"
            style={{ fontWeight:"600", color:colors.primary[500], backgroundColor:colors.blueAccent[700],  width: '100%'}}
             contractAddress={MARKETPLACE_ADDRESS}
            action={async () => buyListing()}
            isDisabled={( !auctionData) && ( !AlllistingData)}
            >
            Buy at asking price
            </Web3Button>
  
  {/*         
            <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}  action={async () => await createBidOffer()}  isDisabled={!auctionListing || !auctionData}
                className="tw-web3button--connect-wallet" style={{ backgroundColor:colors.blueAccent[700], width: '100%' }}
            >
                Make Offer
            </Web3Button> */}
   
            </RowChildrenAlignTop>     
  
  
  
  
            <Typography align="center">or</Typography>
            
            
            <TextField
              //   fullWidth margin="bottom"
                 variant="outlined"  label="Minimum Bid" type="number"
                 value={bidValue}
                onChange={(e) => setBidValue(e.target.value)}
            /> 
  
            <VerticalSpace space={1}/>
  
            <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}  action={async () => await createBidOffer()}  isDisabled={!auctionData}
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
          {/* </Box> */}
          <div>
  
          <Activity nft={ nft } listingID={listingId}  />
  
  
             </div>
   
         
          </div>
        ):(

          <p> still load listing </p>
        )


      

       ) 
    


   }
   

   
};

export default TokenDetailsByID;

function NftPriceBlock (   { boxColor, directListing, loadingMarketplace, loadingDirectListing ,
    auctionListing , loadingAuction, AlllistingData, auctionData }  ){

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <Box    padding={_mainBoxPadding} >
        <VerticalSpace space ={1}/> 
       <Typography
          
       //  sx={{  position: 'relative', top:"-5px"  }}
        color={colors.grey[ text2.color ]} >Price: </Typography>
       
       {AlllistingData ? (
           <Typography color={colors.grey[ text1.color ]}
           // sx={{  position: 'relative', top:"-5px"  }}
           variant="h1" fontWeight="60">
           {`${AlllistingData?.currencyValuePerToken.displayValue} ${AlllistingData.currencyValuePerToken.symbol}`}
           </Typography>
       ) : auctionData ? (
           <Typography variant="h5" fontWeight="bold">
           {`${auctionData?.buyoutCurrencyValue.displayValue} ${auctionData?.buyoutCurrencyValue.symbol}`}
           </Typography>
       ) : (
           <Typography  variant="h5" fontWeight="bold"
            color= {colors.primary[500]} 
           >
           Not for sale
           </Typography>
       )}
       
       <Skeleton isLoaded={!loadingAuction}>
       { auctionData && (
           <Flex direction="column">
           <Typography color="darkgray">Bids starting from</Typography>
           <Typography fontSize="3xl" fontWeight="bold">
               {`${auctionData?.minimumBidCurrencyValue.displayValue} ${auctionData?.minimumBidCurrencyValue.symbol}`}
           </Typography>
           <Typography></Typography>
           </Flex>
       )}
       </Skeleton>
</Box>

   )
 }
 

 function  StatusBox ( {nft , AlllistingData }){
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
 
   const boxColor = colors.primary[400];
   const  _borderColor = colors.primary[400]
   const _borderRadius= "10px";
    const  paddingPX = "0px";
    const trait_margin = "15px";

return(
   <Box 
   padding= {2} 
   border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
  >
                 { AlllistingData  ? (           
            <p>status : {GetListingStatus(AlllistingData )  }</p>  
                ):(<div></div>) }
         
     
</Box>

)

 }
  

 function   GetListingStatus(AlllistingData){
  
   if (!AlllistingData){return ""; }

    // CREATED, COMPLETED, or CANCELLED
   switch (AlllistingData.status ){
     case 2: return "COMPLETED";  
     case 3: return "CANCELLED";  
     case 4: return "ACTIVE"; // or created  
     case 5: return "EXPIRED"; 
    default: return "ERROR";  
   }
  
 }

 
  
 function DisplayNFTimage( {nft}){

  return(
   <RoundedBox> 
       
           <Box height="650px" width="650px" >
               
               
                   <MediaRenderer
                       src={nft.metadata.image}
                       style={{ height: '100%', width: '100%' }}
                      //  ,position: 'relative', left: '10px',  top:"10px"
                       
                   />
               
       </Box>
  
 </RoundedBox>
  )

 }

 
 

 
  