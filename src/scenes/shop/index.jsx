/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/
//import {createContext, useContext,  useState, useEffect, useRef } from "react";
import * as React from 'react';
 
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 import {a11yProps} from   '../../components/TabSubcomponent.jsx';


 

import stylesProfile from "../../styles/Profile.module.css";
  

import {useEffect, useState,  createContext, useContext,   useRef    } from "react";
import { useContract, 
    ConnectWallet,  useAddress    } from "@thirdweb-dev/react";
// import { MARKETPLACE_ADDRESS  } from "../../const/addresses";
 
import {NFTGridMarketData} from "../../components/NFTGrid.jsx";
import ConnectWalletPage from "../../components/ConnectWalletPage.jsx";
import Container from "../../components/Container/Container";
import NFTListed from "../../components/NFTCARD/NFTlisted.jsx"; 
 
 
import { Box, Grid, Typography, useTheme } from '@mui/material'; // Update this import
import { BasicScrollable  } from "../../components/Layout";
import { tokens } from "../../theme";
import { useNavigate } from "react-router";
 
//import { useParams } from 'react-router-dom';
//the provider is usually called for wrapping around compoenent
// from App.js, but here we need to specify some prop defined in this component (tokenId)

 import {useAllLayersContext }from '../../context/AllLayerAvailableContext.js';  
 import { useAllListingsContext } from '../../context/AllListingContext.js';  
 
 
//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======

 
// display mode, list for shop page, grid for composePage (more simple display)
 export default function Shop( {itemType} ) {
   
  
  
  let displayData={
      title: "Buy NFTs",
      description:"Browse which NFTs are available from the collection.",
      
      initialState:0,
      tabsNames : [ "listings","auctions"],
   }
  if( itemType === "packs"){
    displayData={
      title: "Buy Packs",
      description:"Each packs contains 5 randomly picked Nfts.",
      
      initialState:0,
      tabsNames : [ "listings","auctions"],
     }

  }
  const { selectedChain  } =  useContext(ChainContext);

  const [directListings, setDirectListing] = useState(null);   
  const [auctionListing, setAuctionListing] = useState(null);   
  


  const [value, setValue] =  useState(displayData.initialState);



  const [tab, setTab] = useState(   displayData.tabsNames[  displayData.initialState ] );   

  const handleChange = (event, newValue) => {
       setValue(newValue);

       
      setTab( displayData.tabsNames[newValue]    )
  };
 

  let { /*directListings, auctionListing,*/ allNFTsWithListing, UpdateAllMarketData,
    loadingDirectListings, loadingAuction, NFT_CONTRACT ,
  
    Set_englishAuctions , Set_DirectListing
  } = useAllListingsContext();
  //const { contract } = useContract(NFT_CONTRACT);
 

  useEffect(()=>{
   
    const updateMarketInfo = async () => { 

      const dl = await Set_DirectListing(); 
      setDirectListing(dl );
      
      const al = await Set_englishAuctions(); 
      setAuctionListing(al);
      

      console.log( selectedChain,  ">> SHOP.js =>  directListings ",  dl    );
      console.log( selectedChain,  ">> SHOP.js =>  auction listing ",  al    );
     // console.log( selectedChain,   ">> SHOP.js =>    allNFTsWithListing  ",     allNFTsWithListing );
      // Set_englishAuctions();
     // await Set_DirectListing();
    }

     
    
    

      updateMarketInfo();
    //UpdateAllMarketData();
 }, [   /* itemType , allNFTsWithListing,*/ selectedChain ]);





 const address = useAddress();  

 
  
 //const { data: allNFTs, isLoading } = useNFTs(contract); // get all neft

 const { NFTdata } = useAllLayersContext();


 const theme = useTheme();
 //const colors = tokens(theme.palette.mode);
 const navigate = useNavigate();

 //const { contract: marketplace, isLoading: loadingMarketplace, } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
 

  function linkPath( NFT_CONTRACT, nft,  allList  ){
 

    if ( allList.bidBufferBps ){ // AuctionListingData
      return  `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/NAN/${allList?.id}`;

    }  else {
     return   `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/${allList?.id}/NAN` ;

    }
  }

  
 

      if (!address){
        return (
            <div> 
                 <ConnectWalletPage/> 
            </div> 
            )
       }
       if (!NFTdata){
        return (
            <div> 
                 <p> Loading NFTs metadata </p>
                <ConnectWallet/>
            </div> 
            )
       }
       

   
       return (

        
       <BasicScrollable>
         <Container maxWidth="lg">    

         <Typography sx={ theme.title }> {displayData.title} </Typography>
         <Typography sx={ theme.titleDescription }> {displayData.description} </Typography>
          
          
          <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "20px" }}>
             <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example" sx={theme.tabsStyle}>
               {
                displayData.tabsNames.map((tabName, index ) => (
                  <Tab key={index} label= {tabName}   {...a11yProps(index)}  disableRipple  sx={theme.tabStyle}   />
                ))
              }
           </Tabs>


         </Box>
   
    
          <div className={`${ tab === "listings" ? stylesProfile.activeTabContent : stylesProfile.tabContent }`}>
           
     
          
            <NFTGridMarketData  
               address={address}
               NFTdata ={NFTdata}
              directListings={directListings}
              // loadingDirectListings={loadingDirectListings}
           />  
         


          </div>
    
           <div
            className={`${
              tab === "auctions" ? stylesProfile.activeTabContent : stylesProfile.tabContent
            }`}
            >

<NFTGridMarketData  
               address={address}
               NFTdata ={NFTdata}
              auctionListings={auctionListing}
              // loadingDirectListings={loadingDirectListings}
           />  
         

          </div>
        </Container>
          </BasicScrollable>
       
    );
    
};




export function AllNFTWrapper( {  allNFTsWithListing, NFT_CONTRACT  } ){

   const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
   const navigate = useNavigate();


   function linkPath( NFT_CONTRACT, nft,  allList  ){
 

    

  // if clicked on Not for sale NFT
    if (!allList){
       return  `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/NAN/NAN`;
    }
  
    //auction
    if ( allList.bidBufferBps    ){  
      return  `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/NAN/${allList?.id}`;

    }else {
      // listing
     return   `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/${allList?.id}/NAN` ;

    }
  }
 

   return (
         <>
            {allNFTsWithListing?.map((nft) => (
                  
                         nft.allListing?.length !== 0 ? ( 
                         nft.allListing?.map((allList) => (
                       
                        <Box sx={theme.nftContainer}
                           key={ allList.id }  
                           onClick={() => {  navigate( linkPath( NFT_CONTRACT, nft,  allList )  ) }
                         }
                         > 
        
                            <NFTListed
                              propContractAddress = { NFT_CONTRACT }
                              propTokenId         = {nft.metadata.id }  
                              AlllistingData      = {allList.bidBufferBps ? null    : allList }
                              AuctionListingData  = {allList.bidBufferBps ? allList : null    }
                            />   
       
                        </Box>
        
                        ))
                     
                    ):(  
                      // this is the case the NFT is not listed.
                      <Box sx={theme.nftContainer}
                          key={nft.metadata.id }  
                          onClick={() => {  // to do : not for sale... suggest buy package
                             
                               navigate( linkPath( NFT_CONTRACT,  nft,  null  )  )
                            }
                          }
                     >
                       {/* // this is most likely loaded from the main page..since it does not show listing, just all nft */}
                           {/* <p> {nft.metadata.id} </p> */}
                             <NFTListed
                                propContractAddress = { NFT_CONTRACT }
                                propTokenId = {nft.metadata.id } // 
                                NFT ={ nft}   /* << warning here, see */ 
                            />    
  
                            
                       </Box>
                    )  
                 ))
             }
        </>
 
   )

}
 