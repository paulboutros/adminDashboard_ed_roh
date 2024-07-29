import {  TextField ,   Box,   Typography, useTheme /*, Skeleton */ } from "@mui/material";

 
//https://chakra-ui.com/docs/components/button
import {   ThirdwebNftMedia, Web3Button  } from "@thirdweb-dev/react";

import {   Flex} from "@chakra-ui/react";

 import {  
    
    RowChildrenAlignTop,VerticalStackAlign,
    
    RowChildrenAlignLeft,RowChildrenAlignLeftBottom,
    
    VerticalSpace, RoundedBox,  HorizontalSpace  
       
   } from "../../components/Layout.jsx"  

  
   

 import {text2, text1, tokens, buttonStyle } from "../../theme.js";
 
  
import React, {useEffect, useState} from "react";
import {useNavigate  } from 'react-router-dom';
  
import styles from "../../styles/NFT.module.css";
 
//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";
 //const { selectedChain, setSelectedChain } = useContext(ChainContext);
 //addressesByNetWork[selectedChain].LAYER_ADDRESS
 //=======


 
export const  ButtonLarge  =  ({  

    auctionData, setBidValue, bidValue, buyListing, listingData, createBidOffer

  } ) => {
    

    
 
 const {selectedChain} = useContext(ChainContext);
 // 
 //=======

  




    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate ();

   
      return (   
             
        <React.Fragment> 

                    { auctionData ? (
                        <RowChildrenAlignLeft expand={true}>
                           <TextField onChange={(e) => setBidValue(e.target.value)}
                        style={{ minWidth: '50px',  height: buttonStyle._buttonHeight }} 
                            variant="outlined"  label="Minimum Bid" type="number" value={bidValue}  
                            /> 
                            <HorizontalSpace space={1}/>
                            
                            <Web3Button
                            
                                contractAddress={  addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS} 
                                action={async () => await createBidOffer()}  isDisabled={!auctionData}

                                className="tw-web3button--connect-wallet" 
                                style={{ backgroundColor:colors.blueAccent[buttonStyle.colorBlue], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}

                                
                            >
                                Place Bid
                            </Web3Button>
                            <HorizontalSpace space={1}/>
                            

                            <Web3Button 


                    className="tw-web3button--connect-wallet"
                    style={{ backgroundColor:colors.blueAccent[ buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
                    contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}
                    action={async () => buyListing()}

                    onSuccess={async (txResult) => {
                    // should to "NFT OWNED " page  
                    navigate(`/sell`);

                    }}



                    isDisabled={( !auctionData) }

                    >
                    Buy at asking price
                    </Web3Button>


                    </RowChildrenAlignLeft>
                    ):(
                        
                        <RowChildrenAlignTop>  

                            <Web3Button 


                            className="tw-web3button--connect-wallet"
                            style={{ backgroundColor:colors.blueAccent[ buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
                            contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}
                            action={async () => buyListing()}

                            onSuccess={async (txResult) => {
                            // should to "NFT OWNED " page  
                            navigate(`/sell`);
                            
                            }}



                            isDisabled={( !listingData) }

                            >
                                Buy at asking price
                            </Web3Button>


                            <HorizontalSpace space={1}/>    
                            <Web3Button
                            contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}  action={async () => await createBidOffer()}  isDisabled={!listingData}
                            className="tw-web3button--connect-wallet" 
                            style={{ backgroundColor:colors.blueAccent[ buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
                    
                            onSuccess={async (txResult) => {
                                // should to "NFT OWNED " page  
                                navigate(`/sell`);
                                
                            }}
                    
                        >
                            Make Offer
                            </Web3Button>  
                        </RowChildrenAlignTop>     
                    )}     
                        
                 
                        </React.Fragment>        

          
      )
        

 }
 
 
 export function MainButtonAndPriceField (  { 
    setBidValue, auctionData, bidValue, createBidOffer, colors,
    buyListing,  listingData,
  
    screenWidth , screenWidthThreshold
  
  }  ){
       
     return(
   
        <React.Fragment>    
   
       { auctionData ? (
  
         <React.Fragment> 
         {screenWidth < screenWidthThreshold ? (  
  
              <Box display="flex" flexDirection="column" width="100%">
                      <VerticalStackAlign  >
  
                    <TextField onChange={(e) => setBidValue(e.target.value)}
                        style={{ width: "100%",height: buttonStyle._buttonHeight }} 
                        variant="outlined" label="Minimum Bid" type="number" value={bidValue}  
                    />  
                      <VerticalSpace space={1}/>
                       
                      <ButtonCreateBidOffer  
                        colors = {colors} listingType = {auctionData} createBidOffer = {createBidOffer} buttonText={"Place Bid"} 
                      /> 
  
                    <VerticalSpace space={1}/>
                    <ButtonAuctionBuy  colors = {colors}  buyListing = {buyListing}  auctionData = {auctionData} /> 
                    
  
                    </VerticalStackAlign  >
           
              </Box>
             ):(
              <RowChildrenAlignLeft expand={true}>
              <TextField onChange={(e) => setBidValue(e.target.value)}
                style={{ minWidth: '50px',height: buttonStyle._buttonHeight }} variant="outlined" label="Minimum Bid" type="number" value={bidValue}  
              /> 
              <HorizontalSpace space={1}/>
              <ButtonCreateBidOffer  
                colors = {colors} listingType = {auctionData} createBidOffer = {createBidOffer} buttonText={"Place Bid"} 
              /> 
            <HorizontalSpace space={1}/>
            <ButtonAuctionBuy  colors = {colors}  buyListing = {buyListing}  auctionData = {auctionData} /> 
            </RowChildrenAlignLeft>
                  
              
              ) 
          }
          </React.Fragment> 
  
          ):(
              
              <RowChildrenAlignTop>  
                 <ButtonListingBuy  colors = {colors}   buyListing= {buyListing} listingData={listingData}  />
   
                  <HorizontalSpace space={1}/>   
                  <ButtonCreateBidOffer  
                    colors = {colors}  
                    listingType = {listingData} 
                    createBidOffer = {createBidOffer} 
                    buttonText={"Make Offer"}
                  /> 
                  
              </RowChildrenAlignTop>     
          )}     
            
  
            
             
        </React.Fragment>
  
  
     )
  
   }
  
   
   function ButtonListingBuy (   {colors,   buyListing, listingData   }){


    const { selectedChain  } = useContext(ChainContext);
    const navigate = useNavigate ();
     
    return (
  
          <React.Fragment>  
  
                   <Web3Button 
   
                      className="tw-web3button--connect-wallet"
                      style={{ backgroundColor:colors.blueAccent[ buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
                      contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}
                      action={async () => buyListing()}
  
                      onSuccess={async (txResult) => {
                        // should to "NFT OWNED " page  
                        navigate(`/sell`);
                        
                      }}
   
                         isDisabled={( !listingData) }
   >
                           Buy at asking price
                      </Web3Button>
          
             
              </React.Fragment>
  
    )
   }
   function ButtonAuctionBuy (   {colors,   buyListing, auctionData   }){
  
    const navigate = useNavigate ();
    const { selectedChain  } = useContext(ChainContext);
    return (
  
       <React.Fragment>  
                   <Web3Button 
   
                        className="tw-web3button--connect-wallet"
                        style={{ backgroundColor:colors.blueAccent[ buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
                        contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}
                        action={async () => buyListing()}
  
                        onSuccess={async (txResult) => {
                        // should to "NFT OWNED " page  
                        navigate(`/sell`);
  
                        }}
   
                        isDisabled={( !auctionData) }
  
                        >
                        Buy at asking price
                  </Web3Button>
          
             
       </React.Fragment>
  
    )
   }
   
  
   function ButtonCreateBidOffer({colors, listingType, createBidOffer  ,  buttonText }){
    const { selectedChain} = useContext(ChainContext);
      return (
        <Web3Button
                    
        contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS} 
        action={async () => await createBidOffer()}  isDisabled={!listingType}
  
        className="tw-web3button--connect-wallet" 
        style={{ backgroundColor:colors.blueAccent[buttonStyle.colorBlue], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}
  
        
    >
        {buttonText}
    </Web3Button>
  
      )
   }


   
export function NftPriceBlock (   { 
    listingData, auctionData, ethToUsdRate }  ){
   
     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
  
     return (
         <Box  >
          
         <Typography color={colors.grey[ text2.color ]} >Current price: </Typography>
     
            {listingData ? ( 
  
          <RowChildrenAlignLeftBottom>
             <Typography color={colors.grey[ text1.color ]}
             
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
    
    
   export function DisplayNFTimage( {nft}){
  
    return(
      <div > 
     {/* className={stylesBuy.nftContainer}  style={{ height: '600px', width: '600px' }}  */}
           
        <RoundedBox>   
            <RoundedBox padding = "8px">
                  <ThirdwebNftMedia metadata={nft.metadata}  className={styles.largeImage}  />
              </RoundedBox> 
        </RoundedBox> 
          
                  
          {/* </Box> */}
     
    </div>
     )
   
   }
  

 