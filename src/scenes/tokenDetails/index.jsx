import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import  {evolve} from "../../../src/utils/updateMetadata.js"
//https://chakra-ui.com/docs/components/button
 import {  ExternalLinkIcon } from '@chakra-ui/icons'
import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract, useMinimumNextBid, useValidDirectListings, useValidEnglishAuctions  } from "@thirdweb-dev/react";
import { Avatar, 
   // Container,
   Button as ChakraButton,
    Flex,
     Input,
      SimpleGrid,
      Stack,
     Text,
    Skeleton
} from "@chakra-ui/react";


import { RowCenterBox, VerticalStackAlignCenter , VerticalStackAlignLeft, RoundedBox } from "../../components/Layout"


import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../../const/addresses";
//import {getSDK } from "../../utils/updateMetadata";
import {text2, text1, tokens } from "../../theme";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
 
import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
import { IconButton , Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import { getSDK_fromPrivateKey } from "../../data/API";


 
import {useEffect, useState} from "react";
 
import { Link, useParams } from 'react-router-dom';


const TokenDetails =  ( ) => {
 
  const { contractAddress, tokenId } = useParams();

 console.log( ">>>>>>>>>>>contractAddress =" , contractAddress );
 console.log( ">>>>>>>>tokenId=" , tokenId );

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





  

            const { contract: marketplace, isLoading: loadingMarketplace } = 
            useContract(
                MARKETPLACE_ADDRESS, 
                "marketplace-v3"
            );

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
       
   
    return (
    <div>
     

     <VerticalStackAlignLeft>
 
        <RowCenterBox>
           <Typography>
           <Box> 
               <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
                {contractMetadata && (
                     <Box   >
                        <MediaRenderer
                            src={contractMetadata.image}
                            style={{ width: '65%', height: 'auto' , position: 'relative', left: '65px'  }}
                        />
                    </Box>
                )}
               </Skeleton>
           </Box>
             </Typography>

             {/* <Divider orientation="vertical"  color= {colors.grey[400]} style={{ marginLeft:"5px",  marginRight:"15px",  height : '40px', width: '1px' }} /> 
  */}
           <VerticalStackAlignLeft>



           <Typography marginBottom={1} variant='h3' fontWeight={"bold"}>{contractMetadata.name}</Typography>
           
            <Typography color={colors.grey[text2.color]} variant="h7" fontWeight= {text2.fontWeight} >
             Wulirocks Layers to use in Compo Reward.
            </Typography>
            <CustomLinkWithIcon   to={`/profile/${nft.owner}`} color={colors.grey[200]} >
            {`${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`}
            </CustomLinkWithIcon>
            <Link backgroundColor={colors.grey[400]} 
            to={`/profile/${nft.owner}`}>
            </Link>
        </VerticalStackAlignLeft>
           
        </RowCenterBox> 
      </VerticalStackAlignLeft>
      <Divider   orientation="hotizontal" style={{ marginBottom:"20px",  width: '100%', height: '1px' }} />  

 




      <RowCenterBox> 
      

         





        <Box style={{ marginLeft:"50px"  }}   > 
            <RoundedBox> 
            <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
                   
             <Box height="350px" width="350px" >
                
                    <VerticalStackAlignCenter>
                    
                        <MediaRenderer
                            src={nft.metadata.image}
                            style={{  width: '100%',position: 'relative', left: '10px',  top:"10px" }}
                            // width: '65%', height: 'auto'  , position: 'relative', left: '65px'
                        />
                    </VerticalStackAlignCenter>
            </Box>
            </Skeleton>
             </RoundedBox>
         </Box>

           {/* right side stack    */}
            <VerticalStackAlignLeft>
            <Box  width="80%"   style={{ marginLeft:"20px",  marginRight:"20px"  }}   > 
               
             
             <Box 
               border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
               overflow="hidden"   position="relative" >
            
            <Box
                height="20px"
                backgroundColor={colors.primary[700]}
                position="absolute"
                top="0"
                left="0"
                right="0"
            />
            <Box
                height="100px" padding="20px" 
                 
                
           > 
               <Divider   orientation="hotizontal" style={{ marginBottom:"20px",  width: '100%', height: '1px' }} />  
               <NftPriceBlock 
                      boxColor={boxColor}  directListing={directListing}  
                      loadingMarketplace={loadingMarketplace} 
                      loadingDirectListing ={loadingDirectListing}  
                      auctionListing={auctionListing} 
                      loadingAuction={loadingAuction} 
              /> 
               
            </Box>
             </Box>
            

             <Box marginBottom={2}>
  {/* Content of the first Box */}
</Box>
               
               <Skeleton isLoaded={!loadingMarketplace || !loadingDirectListing || !loadingAuction}>
                   
                   {/* Buy at asking price */}
                  <Box spacing={5} color={colors.primary[200]} >

                      {/* <Flex direction="column"> */}
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
                          fullWidth
                          margin="bottom"
                          variant="outlined"
                          label="Minimum Bid"
                          type="number"
                          value={bidValue}
                          onChange={(e) => setBidValue(e.target.value)}
                       /> 

                      <Web3Button
                       
                          contractAddress={MARKETPLACE_ADDRESS}
                          action={async () => await createBidOffer()}
                          isDisabled={!auctionListing || !auctionListing[0]}
                          className="tw-web3button--connect-wallet"
                          style={{ backgroundColor:colors.blueAccent[700], width: '100%' }}
                      >
                          Place Bid
                      </Web3Button>
                      </Box>


                  </Box>
                </Skeleton>

            </Box>

           
                 

                 
                   
                  
            
             

            </VerticalStackAlignLeft>
      </RowCenterBox>    
  


      <Box m="20px" maxHeight="calc(88vh)" overflow="auto" >
        
      
 
       

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
  
      >
        
        
 


    
        <Box
           padding= {paddingPX} 
          border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
         >
         
           {/* <SimpleGrid columns={2} spacing={6}> */}
  
                    <Grid container spacing={3}>
                    
                    
                    <Grid item xs={12}  margin= {trait_margin}  >
                        <Typography fontWeight="bold">Traits:</Typography>
                        <Grid container spacing={4}>
                        {Object.entries(nft?.metadata?.attributes || {}).map(([key, value]) => (
                            <Grid item key={key}>
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"

                                 padding={2}
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
 

      </Box> 

      
    </Box>

     
</div>

  ) 
 

    }
         

    
};

export default TokenDetails;
 
const CustomLinkWithIcon = ({ to, children }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
      <Link to={to} style={{ textDecoration: 'none',
       display: 'flex',
        alignItems: 'center',
        color: colors.grey[300]
        }}>
             <OpenInNewIcon   sx={{ marginRight:1,  fontSize: 14 }}   />
        {children}
       
      </Link>
    );
  };

  function NftPriceBlock (   { boxColor, directListing, loadingMarketplace, loadingDirectListing , auctionListing , loadingAuction }  ){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box   >
        <Typography color="grey.500">Price:</Typography>
        <Skeleton isLoaded={!loadingMarketplace && !loadingDirectListing}>
        {directListing && directListing[0] ? (
            <Typography variant="h5" fontWeight="bold">
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

  
  
   
 