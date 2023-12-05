
import { IconButton ,Paper, Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

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
    VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,VerticalStackAlign,
    
    RowChildrenAlignLeft,RowChildrenAlignLeftBottom,
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


import stylesBuy from "../../styles/Buy.module.css";

import styles from "../../styles/NFT.module.css";


const totalHeight  = "1200px";
const _buttonHeight ="50px";
const _mainBoxPadding = 3;
const TokenDetailsByID =  ({  propContractAddress,  propTokenId,  displayMode  } ) => {

  
  // we may need to change contractAddress param name as it could be confused with web3 button parameter
    let {  contractAddress, tokenId,  listingId, auctionId } = useParams();
   
 
    let listingType = auctionId === "NAN" ? "Direct listing":"Auction";


 const { user } = useUserContext();

  

 const theme = useTheme();
 const colors = tokens(theme.palette.mode);

 const boxColor = colors.primary[400];
  

  const flex = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' };


 

 const [nft, setNFT] = useState();
 const [ auctionData, setAuctionData ] = useState(null); 
 const [ listingData, setListingData ] = useState(null); 
 

  
 const [ ethToUsdRate, setEthToUsdRate ] = useState(0); 
useEffect(() => {
  // Function to fetch NFT data
  const fetchUSDrate = async () => {
 
    try {
    //  if (ethToUsdRate === undefined){
       // console.log("ethToUsdRate  is now defined ");
        const result = await convertEthToUsd( );
        setEthToUsdRate(result);  
    //  }

    } catch (error) {
      console.error('Error fetching NFT:', error);
    }
  };

  
  // Call the fetch functions when component mounts
  fetchUSDrate();
   
}, []);
   


 useEffect(() => {
   // Function to fetch NFT data
   const fetchNFT = async () => {

       const sdk = getSDK_fromPrivateKey(); 
       const contract = await sdk.getContract(contractAddress);
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
               tokenContract: contractAddress, 
               tokenId: tokenId,// nft?.metadata.id,
           });

           //Add these for auction section
           const [bidValue, setBidValue] = useState();

           const { data: auctionListing, isLoading: loadingAuction } =
           useValidEnglishAuctions(marketplace, {
               tokenContract: contractAddress,
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
       } else if (listingData){
           txResult = await marketplace?.directListings.buyFromListing(
               listingData.id,
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
       } else if (listingData){  
           txResult = await marketplace?.offers.makeOffer({
               assetContractAddress: contractAddress,
               tokenId: nft.metadata.id,
               totalPrice: bidValue,
           })
       } else {
           throw new Error("No listing found");
       }
       return txResult;
   }


   function currentListing( ){
   
      
     

      if  (listingData ){ return listingData; }
      else{ return auctionData;}

      


   }

 
 
  
   if(!nft  ){
       return (<div></div>)

   }else{

    
       return (

         
          // !loadingDirectListing && !loadingAuction ? (
          auctionData || listingData ? ( 

          <div>
             <Box display="flex" flexDirection="column" gap="20px" padding="20px">
      {/* Nested Flex Container for First Two Blocks */}
      <Box display="flex" flexDirection="row" gap="20px">
        {/* First Block (40%) */}

        <Box flex="1" flexDirection="column"  >
          <Box flex="1"    >
         
        
          <DisplayNFTimage nft={nft} />
        </Box>
        <VerticalSpace space={2}/>
        <Box flex="1"   >
          <RoundedBox  backgroundColor= {colors.primary[600]}>

          <Box padding={_mainBoxPadding}  > 
           <VerticalStackAlignLeft>
 
             <Typography variant = "h5"  fontWeight={600} >#{ tokenId}</Typography>
            <Typography variant = "h5"  fontWeight={600} >#{ tokenId}</Typography>

          </VerticalStackAlignLeft>

           </Box>
          </RoundedBox>
       </Box>

        </Box>

 {/* Nested Flex Container for Second and Third Blocks */}
     <Box flex="1" flexDirection="column" gap="20px">


        {/* right title block 1 title */}
        <Box flex="1"    >
           
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
                  <HorizontalSpace space={1}/> 
                  <Typography color={colors.grey[ text2.color ]} > {`Supply: ${listingData?.quantity}`}</Typography>
                  

                  </RowChildrenAlignLeft>
        
        
                <RowChildrenAlignLeft>
        
                <Typography variant ="h5"> Current Owner </Typography>
                <HorizontalSpace space={1} /> 
                <CustomLinkWithLocalIcon   to={`/profile/${nft.owner}`} text= { addressShortened(nft.owner) }   tooltipText={"visit owner's profile"}/>
                </RowChildrenAlignLeft>   
        
                </VerticalStackAlignLeft>
                
            </Box>
   

        </Box>



     <VerticalSpace space={2}/> 






    {/* sale price part  */}
        <Box flex="1"  > 
        <RoundedBox  backgroundColor= {colors.primary[600]}>
     
     <Box padding={_mainBoxPadding}  >
         <div>
          <Typography color={colors.grey[ text2.color ]} 
           variant ="h4"> Sales ends {convertSecondsToDateString(  currentListing().endTimeInSeconds)} 
           </Typography>
           <VerticalSpace space={1}/>
          <CountdownTimerWithArg  startTime={ currentListing().startTimeInSeconds}  endTime={ currentListing().endTimeInSeconds} color={colors.grey[ text2.color ]}/> 
         </div>
        
     </Box>

      <VerticalSpace space={0.5}/>
      <Divider orientation="horizontal" style={{ height: "1px", width: '100%' }} />
   

    <RowChildrenAlignLeft>
      <VerticalStackAlign padding={_mainBoxPadding}  expand={true} >
        <NftPriceBlock listingData={listingData}  auctionData={auctionData} ethToUsdRate={ethToUsdRate}  />
        <VerticalSpace space={2}/>

                  {/* web button for listing and auction */}
            { auctionData ?(
                <RowChildrenAlignLeft expand={true}>
                  <TextField onChange={(e) => setBidValue(e.target.value)}
                  style={{ minWidth: '50px',  height: _buttonHeight }} 
                      variant="outlined"  label="Minimum Bid" type="number" value={bidValue}  
                    /> 
                      <HorizontalSpace space={1}/>
                      
                    <Web3Button
                      
                        contractAddress={MARKETPLACE_ADDRESS} 
                        action={async () => await createBidOffer()}  isDisabled={!auctionData}

                        className="tw-web3button--connect-wallet" 
                        style={{ backgroundColor:colors.blueAccent[700], flex: 1,  width: '100%', height: _buttonHeight }}
                        
                    >
                        Place Bid
                    </Web3Button>
                    <HorizontalSpace space={1}/>
                    <Web3Button 
                    className="tw-web3button--connect-wallet"
                    style={{ backgroundColor:colors.blueAccent[700], flex: 1,  width: '100%', height: _buttonHeight }}
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={async () => buyListing()}
                    isDisabled={( !auctionData) }
                    >

                       Buy out
                    </Web3Button>

                </RowChildrenAlignLeft>
              ):(
                
                <RowChildrenAlignTop>        
                    <Web3Button 
                    className="tw-web3button--connect-wallet"
                    style={{ backgroundColor:colors.blueAccent[700], flex: 1,  width: '100%', height: _buttonHeight }}
                    contractAddress={MARKETPLACE_ADDRESS}
                    action={async () => buyListing()}
                    isDisabled={( !listingData) }
                    >
                Buy at asking price
                    </Web3Button>
                     <HorizontalSpace space={1}/>    
                    <Web3Button
                    contractAddress={MARKETPLACE_ADDRESS}  action={async () => await createBidOffer()}  isDisabled={!listingData}
                    className="tw-web3button--connect-wallet" 
                    style={{ backgroundColor:colors.blueAccent[700], flex: 1,  width: '100%', height: _buttonHeight }}
                >
                    Make Offer
                    </Web3Button>  
                </RowChildrenAlignTop>     
              )}     

        </VerticalStackAlign>
    </RowChildrenAlignLeft>
   
        </RoundedBox>
        </Box>

        <VerticalSpace space={2}/> 
        <Box    > 
            
        {listingData ? (
          <ShowAuction nft={ nft }   listingId={listingId}  title={"Direct listing"}  />
       ):(
          <ShowAuction nft={ nft }   auctionId={ auctionId }  title={"Auction"}  />
       )}
 
        </Box>

        
        
      </Box>
 

      </Box>

      
      {/* Third Block (100%) */}
      <Box  >
      <Activity nft={ nft } listingID={listingId}  /> 
      </Box>
    </Box>

 

          </div>
        ):(

          <p> still load listing </p>
        )


      

       ) 
    


   }
   

   
};

export default TokenDetailsByID;

function NftPriceBlock (   { 
  listingData, auctionData, ethToUsdRate }  ){



 

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);

   return (
       <Box  >
        
       <Typography color={colors.grey[ text2.color ]} >Current price: </Typography>
   
       {listingData ? (

        <RowChildrenAlignLeftBottom>
           <Typography color={colors.grey[ text1.color ]}
           // sx={{  position: 'relative', top:"-5px"  }}
           variant="h1" fontWeight="50">
            {`${listingData?.currencyValuePerToken.displayValue} ${listingData.currencyValuePerToken.symbol}`}
           
           </Typography>

            <HorizontalSpace space={1}/>  
            <Typography variant="h4"  color= {colors.grey[ text2.color]}  
                style={{  position: 'relative', bottom:"5px" }}  >
            {` $${(listingData?.currencyValuePerToken.displayValue * ethToUsdRate ).toFixed(2) }`}  
            </Typography>
           </RowChildrenAlignLeftBottom>

       ) : auctionData ? (
         
        <RowChildrenAlignLeftBottom>
          
           <Typography variant="h1" fontWeight={600} >
           {`${auctionData?.buyoutCurrencyValue.displayValue} ${auctionData?.buyoutCurrencyValue.symbol}`}
           </Typography>

             <HorizontalSpace space={1}/>  
           <Typography variant="h4"  color= {colors.grey[ text2.color]}  
               style={{  position: 'relative', bottom:"5px" }}  >
            {` $${ (auctionData.buyoutCurrencyValue.displayValue * ethToUsdRate ).toFixed(2) }`}  
           </Typography>
         
        </RowChildrenAlignLeftBottom>
     
       ) : (
           <Typography  variant="h1" fontWeight="bold"
            color= {colors.primary[500]} 
           >
           Not for sale
           </Typography>
       )}
       
       
       { auctionData && (
           <Flex direction="column">
           <Typography color="darkgray">Bids starting from</Typography>
           <Typography fontSize="3xl" fontWeight="bold">
               {`${auctionData?.minimumBidCurrencyValue.displayValue} ${auctionData?.minimumBidCurrencyValue.symbol}`}
           </Typography>
          
           </Flex>
       )}
      
     </Box>

   )
 }
 

 function  StatusBox ( {nft , listingData }){
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
                 { listingData  ? (           
            <p>status : {GetListingStatus(listingData )  }</p>  
                ):(<div></div>) }
         
     
</Box>

)

 }
  

 function   GetListingStatus(listingData){
  
   if (!listingData){return ""; }

    // CREATED, COMPLETED, or CANCELLED
   switch (listingData.status ){
     case 2: return "COMPLETED";  
     case 3: return "CANCELLED";  
     case 4: return "ACTIVE"; // or created  
     case 5: return "EXPIRED"; 
    default: return "ERROR";  
   }
  
 }

 
  
 function DisplayNFTimage( {nft}){

  return(
    <div className={stylesBuy.nftContainer}> 
           
            <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
                
                    {/* <MediaRenderer src={nft.metadata.image} style={{ height: '100%', width: '100%' }}/> */}
          
                
        {/* </Box> */}
   
  </div>
   )




  return(
   <RoundedBox> 
       
         
               //className={stylesBuy.nftContainer}
               
                   <MediaRenderer
                       src={nft.metadata.image}
                       style={{ height: '100%', width: '100%' }}
                    
                       
                   />
               
       {/* </Box> */}
  
 </RoundedBox>
  )

 }

 
 

 
  