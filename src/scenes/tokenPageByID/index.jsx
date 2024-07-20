 

import {    Box,   Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

import {CountdownTimerWithArg} from "../../components/CountdownTimer.jsx"
import  { convertSecondsToDateString,   addressShortened  } from "../../utils.js"
//https://chakra-ui.com/docs/components/button
import {     useContract,useContractEvents } from "@thirdweb-dev/react";

//import { Button as ChakraButton, Flex} from "@chakra-ui/react";

import {  CustomLinkWithLocalIcon  } from "../../components/LinkTextButton.jsx"
import {  
    
    VerticalStackAlignLeft,   VerticalStackAlign, RowChildrenAlignLeft, VerticalSpace, RoundedBox,HorizontalSpace,
      
      
   } from "../../components/Layout.jsx"  

 import { 
   MARKETPLACE_ADDRESS,
   
} from "../../const/addresses.ts";
 import {text2,   tokens,  mainContainerPagePad } from "../../theme.js";
  import { getSDK_fromPrivateKey, convertEthToUsd } from "../../data/API.js";
 import ShowAuction from "../../components/TokenPageBoards/ShowAuction.jsx";
 import Activity from "../../components/TokenPageBoards/Activity.jsx"
  
import React, {useEffect, useState} from "react";
import {useNavigate, useParams } from 'react-router-dom';
  
//import styles from "../../styles/NFT.module.css";
import { useAllListingsContext } from "../../context/AllListingContext.js";
import Container from "../../components/Container/Container.jsx";
import { ButtonLarge, DisplayNFTimage, MainButtonAndPriceField, NftPriceBlock } from "./MarketListingButtons.jsx";
import { Flex } from "@chakra-ui/react";


  const screenWidthThreshold =1050;
 const _mainBoxPadding = 3;
 const TokenDetailsByID =  ({  propContractAddress,  propTokenId,  displayMode  } ) => {

  const navigate = useNavigate ();
  // we may need to change contractAddress param name as it could be confused with web3 button parameter
    let {  contractAddress, tokenId,  listingId, auctionId } = useParams();
   
 
    let listingType = auctionId === "NAN" ?  "Direct listing" : "Auction";
    // case we click an NFT that is not for sale
    if ( listingId === "NAN" &&  auctionId === "NAN" ){ listingType = "not_for_sale"; }
      
  const theme = useTheme();
 const colors = tokens(theme.palette.mode);
  
 const [nft, setNFT] = useState();
 const [ auctionData, setAuctionData ] = useState(null); 
 const [ listingData, setListingData ] = useState(null); 
 

 const { directListings, auctionListing } = useAllListingsContext(); 
 
  
 const [ ethToUsdRate, setEthToUsdRate ] = useState(0); 
useEffect(() => {
  // Function to fetch NFT data
  const fetchUSDrate = async () => {
 
    try {
    
        const result = await convertEthToUsd();
        setEthToUsdRate(result);  
    

    } catch (error) {
      console.error('Error fetching NFT:', error);
    }
  };
   // Call the fetch functions when component mounts
  fetchUSDrate();
   
}, []);
   
const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
  useEffect(() => {
     const handleResize = () => { setScreenWidth(window.innerWidth);};
     window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
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

       console.error(' setNFT  ;nftResult:',   nftResult);

     } catch (error) {
       console.error('Error fetching NFT:', error);
     }
   };

   
   // Call the fetch functions when component mounts
   fetchNFT();
    
 }, [contractAddress, tokenId]);
 
          const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
            
          const [bidValue, setBidValue] = useState();
 
           useEffect(() => {

        //    console.log(' USEEFTTECT   auctionListing', auctionListing ,  " for tokenId" , tokenId );
             if (!auctionListing)return;
            const fetchNFT = async () => {
            
              try {
               
                   auctionListing.forEach(element => {
                    
                    if (element.id === auctionId ){
                       
                        setAuctionData(element);

                        console.log("auctionData      =   "   ,  element);

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

          //  console.log(' USEEFTTECT   listingData', directListings ,  " for tokenId" , tokenId );
            if (!directListings)return;
           const fetchNFT = async () => {
           
             try {
              
              directListings.forEach(element => {
             //   console.log(' element.id  ', element.id ,  "listingId", listingId);      
                   if (element.id === listingId ){
                    
                      setListingData(element);

                     // console.log(' MATCH listingData', listingData);
                     console.log("listingData      =   "   ,  listingData); 
                   }
                  });
                  
        
             } catch (error) {
               console.error('Error fetching NFT:', error);
             }
           };
        
           
           // Call the fetch functions when component mounts
           fetchNFT();
            
         }, [directListings]);


         //=======================================================================
 
           const { data: transferEvents, isLoading: loadingTransferEvents } =
           
           useContractEvents(marketplace, "NewBid", {
                queryFilter: { filters: { tokenId: nft?.metadata.id,  }, order: "desc",},
                
           });           
 
    
   async function buyListing() {
       let txResult;
 

       //Add for auction section
       if (auctionData !== null ) {
 
           txResult = await marketplace?.englishAuctions.buyoutAuction(  auctionData.id );
 
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
   
     if ( listingType === "not_for_sale" ){
      const proxyObject = {
        startTimeInSeconds:0,
        endTimeInSeconds:0 
       }
       return proxyObject;

     }
     

      if  (listingData ){ return listingData; }
      else{ return auctionData;}

      


   }

   function SalesEndText(){

    let result;
    if ( listingType === "not_for_sale" ){
      result =  "Sales ends: Not for sale"; // remember to suggest to get a pack
    }else{

      result =  "Sales ends" +  convertSecondsToDateString(  currentListing().endTimeInSeconds )  ;
     }
    
     return result ;
 }
 
 if ( screenWidth < screenWidthThreshold   ){

    let mainPadding = "2px";
    if(!nft  ){
      return (<div></div>)

    }else{


      return (

      <React.Fragment>
          
              <Container maxWidth="lg">
        {
        
        auctionData || listingData || listingType === "not_for_sale" ? ( 

        <div>
            <Box display="flex" flexDirection="column" gap={  mainPadding }  padding={ mainPadding }>
      
                <Box display="flex" flex="1" flexDirection="column"  >
                  
                       <DisplayNFTimage nft={nft} />
                </Box>
           


            <NFTInfoBlock0
              theme={theme} tokenId={tokenId} listingData={listingData} colors={colors} auctionData={auctionData} 
              /> 

           {/* ========================================================================== */}
           {/* ========================================================================== */}

            <NFTInfoBlock 
            
               theme={theme} tokenId={tokenId} listingData={listingData} colors={colors} auctionData={auctionData} 
               SalesEndText={SalesEndText} 
               currentListing={currentListing} ethToUsdRate={ethToUsdRate} 
               setBidValue={setBidValue} bidValue={bidValue} createBidOffer={createBidOffer}
               buyListing={buyListing} navigate={navigate} nft={ nft } listingId={listingId} auctionId={auctionId}
               screenWidth={screenWidth}

               _padding="0"

          />


            {/* ========================================================================== */}
            {/* ========================================================================== */}
 

         </Box>
  

       </div>
        ):(
          <p> Token listing loading </p>
        )
          }
                      </Container>
                        
                </React.Fragment>
        ) 

      }
 }

 if ( screenWidth > screenWidthThreshold-1   ){

  // non mobile
   if(!nft  ){
       return (<div></div>)

   }else{

    
       return (

        <React.Fragment>     <Container maxWidth="lg">
         {
         
         auctionData || listingData || listingType === "not_for_sale" ? ( 

          <div>
           <Box display="flex" flexDirection="column" gap={  mainContainerPagePad }  padding={ mainContainerPagePad }>
        {/* Nested Flex Container for First Two Blocks */}
       <Box display="flex" flexDirection="row" gap={  mainContainerPagePad }>
          {/* First Block (40%) */}

         <Box flex="1" flexDirection="column"  >
           <Box flex="1">
         
        
           <DisplayNFTimage nft={nft} />
        </Box>
        <VerticalSpace space={2}/>


          {/* ================================================================== */}
          <Box flex="1"   >
          <RoundedBox  backgroundColor= {colors.primary[600]}>

          <Box padding={_mainBoxPadding}  > 
           <VerticalStackAlignLeft>
 
             <Typography variant = "h5"  fontWeight={600} >#{ tokenId}</Typography>
            

          </VerticalStackAlignLeft>
            </Box>
           </RoundedBox>
         </Box>

        {/* ========================================================================== */}

        </Box>



 {/* ========================================================================== */}
  {/* ========================================================================== */}

      {/* Nested Flex Container for Second and Third Blocks */}
      <Box flex="1" flexDirection="column" gap={ theme.mainContainerPagePad }>


      <NFTInfoBlock0
              theme={theme} tokenId={tokenId} listingData={listingData} colors={colors} auctionData={auctionData} 
        /> 
 

     <VerticalSpace space={2}/> 
 
      {/* sale price part  */}
        <Box flex="1"  > 
        <RoundedBox  backgroundColor= {colors.primary[600]}>
     
     <Box padding={_mainBoxPadding}  >
         <div>
        
            <Typography color={colors.grey[ text2.color ]} variant ="h4">    { SalesEndText() }    </Typography>
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

         
        <ButtonLarge 
            auctionData={auctionData} setBidValue = {setBidValue}  bidValue ={bidValue} buyListing ={buyListing}listingData={listingData}
             createBidOffer={createBidOffer}
          />

   </VerticalStackAlign>
      </RowChildrenAlignLeft>
   
        </RoundedBox>
        </Box>

             <VerticalSpace space={2}/> 
                
            
              {listingData ? (
                  <ShowAuction nft={ nft }   listingId={listingId}  title = {"Direct listing"}  />
              ):(
                  <ShowAuction nft={ nft }   auctionId={auctionId}  title = {"Auction"}  />
              )}
 
           
          </Box>
   

         </Box>
 
          <Box>
             <Activity nft={ nft } listingID={listingId}  /> 
          </Box>
          </Box>
 
          </div>
          ):(
            <p> Token listing loading </p>
         )
           }
                        </Container>
                   
             </React.Fragment>
        ) 
 
   }


  }

  };



 function NFTInfoBlock0( {
  theme, tokenId, listingData, colors, auctionData

} ){

   return ( 

       <React.Fragment>  
              <Box flex="1" flexDirection="column" gap={ theme.mainContainerPagePad }>
        
         
        <Box flex="1" >

        {/* <Box  padding={mainContainerPagePad}> */}
        <Box padding="20px 20px 0 20px">
        <VerticalStackAlignLeft>


               <Typography variant = "h2"  fontWeight={600} >#{tokenId}</Typography>
                   <VerticalSpace space={1}/>
                   <RowChildrenAlignLeft>
                
                  {listingData ? (  
                      <Typography color={colors.grey[ text2.color ]} > listing ID </Typography>
                  ):(
                    <Typography color={colors.grey[ text2.color ]} > Auction ID </Typography>
                  )}
                  <HorizontalSpace space={1}/> 
                  {listingData ? (  
                      <Typography> {listingData?.id}</Typography>
                  ):(
                        <Typography> {auctionData?.id}</Typography>
                  )}

                  <HorizontalSpace space={1}/> 
                  
                      {listingData ? (  
                          <React.Fragment>
                          {/* <Typography color={colors.grey[ text2.color ]} > {listingType}</Typography> */}
                          <HorizontalSpace space={1}/> 
                          <Typography color={colors.grey[ text2.color ]} > {`Supply: ${listingData?.quantity}`}</Typography>
                          </React.Fragment>
                      ):(
                      <React.Fragment>
                        {/* <Typography color={colors.grey[ text2.color ]} > {listingType}</Typography> */}
                        <HorizontalSpace space={1}/> 
                        <Typography color={colors.grey[ text2.color ]} > {`Supply: ${auctionData?.quantity}`}</Typography>
                      </React.Fragment>
                      )}
                  </RowChildrenAlignLeft>

                  <RowChildrenAlignLeft>

                <Typography variant ="h5">Owned by</Typography>
                <HorizontalSpace space={1} /> 
                
                {listingData ? (  
                  <CustomLinkWithLocalIcon   to={`/profile/${listingData?.creatorAddress}`} text= { addressShortened(listingData?.creatorAddress) }   tooltipText={"visit owner's profile"}/>
                ):(
                  <CustomLinkWithLocalIcon   to={`/profile/${auctionData?.creatorAddress}`} text= { addressShortened(auctionData?.creatorAddress) }   tooltipText={"visit owner's profile"}/>
                  )}
                
                  </RowChildrenAlignLeft>   

        </VerticalStackAlignLeft>
        </Box>
        </Box>
 
 
     </Box>
 
                    

     </React.Fragment>
 
 )

}


  function NFTInfoBlock( {
    theme,  listingData, colors, auctionData, SalesEndText,
    currentListing, ethToUsdRate, setBidValue, bidValue, createBidOffer,
    buyListing ,navigate, nft , listingId, auctionId , screenWidth  
  
  } ){
 
     return ( 

      <React.Fragment>  
          <Box flex="1" flexDirection="column" gap={ theme.mainContainerPagePad }>
           

{/* sale price part  */}
<Box flex="1"  > 
<RoundedBox backgroundColor= {colors.primary[600]}  >

<Box padding={_mainBoxPadding}  >
<div>

<Typography color={colors.grey[ text2.color ]} variant ="h4">    { SalesEndText() }    </Typography>
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

      
    <MainButtonAndPriceField    
         setBidValue ={setBidValue}  auctionData ={auctionData}  bidValue={bidValue}
         createBidOffer={createBidOffer} colors={colors}
         buyListing={buyListing} navigate={navigate} listingData={listingData}
         screenWidth={screenWidth}  screenWidthThreshold={screenWidthThreshold}
       
      />  
 
</VerticalStackAlign>
</RowChildrenAlignLeft>

</RoundedBox>
</Box>

<VerticalSpace space={2}/> 
<Box    > 

{listingData ? (
<ShowAuction nft={ nft }   listingId={listingId}  title = {"Direct listing"}  />
):(
<ShowAuction nft={ nft }   auctionId={auctionId}  title = {"Auction"}  />
)}

</Box>
</Box>


<Box>
             <Activity nft={ nft } listingID={listingId}  /> 
          </Box>


  
                </React.Fragment>
 
       )

  }

  export function IDBox( {colors ,tokenId }){
 
      return (  

          <React.Fragment>  
                <Box flex="1"   >
                <RoundedBox  backgroundColor= {colors.primary[600]}>
                  <Box padding={_mainBoxPadding}  > 
                <VerticalStackAlignLeft>
      
                  <Typography variant = "h5"  fontWeight={600} >#{ tokenId}</Typography>
                  

                </VerticalStackAlignLeft>
                  </Box>
                </RoundedBox>
              </Box>

              
               

          </React.Fragment>   
      )

  }

export default TokenDetailsByID;
 