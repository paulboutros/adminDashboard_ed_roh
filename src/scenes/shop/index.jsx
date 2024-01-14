/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
 


import Skeleton from "../../components/Skeleton/Skeleton";

import stylesProfile from "../../styles/Profile.module.css";
import stylesBuy from "../../styles/Buy.module.css";


import randomColor from "../../util/randomColor";


import {useEffect, useState} from "react";
import { useContract, 
    ConnectWallet,  useAddress    } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS  } from "../../const/addresses";
 

import ConnectWalletPage from "../../components/ConnectWalletPage.jsx";
import Container from "../../components/Container/Container";
import NFTListed from "../../components/FARMER/NFTlisted.jsx"; 
 
 
import { Box, Typography, useTheme } from '@mui/material'; // Update this import
import { BasicScrollable  } from "../../components/Layout";
import { tokens } from "../../theme";
import { useNavigate } from "react-router";
 
//import { useParams } from 'react-router-dom';
//the provider is usually called for wrapping around compoenent
// from App.js, but here we need to specify some prop defined in this component (tokenId)

 import {useAllLayersContext }from '../../context/AllLayerAvailableContext.js';  
 import { useAllListingsContext } from '../../context/AllListingContext.js';  

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ];


  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
 
// display mode, list for shop page, grid for composePage (more simple display)
 export default function Shop( {itemType} ) {
   
  
  // itemType == "nfts" ot "packs"
  let displayData={
      title: "Buy NFTs",
      description:"Browse which NFTs are available from the collection.",
     // initialActiveTab:"listings",
      initialState:0,
      tabsNames : ["nfts", "listings","auctions"],
   }
  if( itemType === "packs"){
    displayData={
      title: "Buy Packs",
      description:"Each packs contains 5 randomly picked Nfts.",
     // initialActiveTab:"listings",
      initialState:0,
      tabsNames : [ "listings","auctions"],
     }

  }

   
  const [value, setValue] = React.useState(displayData.initialState);

  const handleChange = (event, newValue) => {
       setValue(newValue);

       
      setTab( displayData.tabsNames[newValue]    )
  };



  let { directListings, auctionListing, allNFTsWithListing, 
    loadingDirectListings, loadingAuction, NFT_CONTRACT  } = useAllListingsContext();
  const { contract } = useContract(NFT_CONTRACT);



  useEffect(()=>{
     
    console.log( ">> SHOP => itemType",itemType  , "allNFTsWithListing  " , allNFTsWithListing );
    
 }, [ itemType , allNFTsWithListing ]);





 const address = useAddress();  
 const [tab, setTab] = useState(   displayData.tabsNames[  displayData.initialState ] ); //<"nfts" | "listings" | "auctions"> (type script)

 
  
 //const { data: allNFTs, isLoading } = useNFTs(contract); // get all neft

 const { NFTdata } = useAllLayersContext();


 const theme = useTheme();
 const colors = tokens(theme.palette.mode);
 const navigate = useNavigate();

 const { contract: marketplace, isLoading: loadingMarketplace, } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
 

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
  

          <div  className={`${  tab === "nfts" ? stylesBuy.nftGridContainer : "" }`} > 
                 
            {loadingDirectListings || loadingAuction ? (  // || isLoading 
              <p>Loading direct and auction...</p>
            ) : tab !== "nfts" || (allNFTsWithListing && allNFTsWithListing.length === 0) ? (
              <p></p>
            ) : (

               
              // we shoudl pass the NFTdata context here
                  <AllNFTWrapper allNFTsWithListing={allNFTsWithListing}  NFT_CONTRACT={NFT_CONTRACT} />
                 
            
            )}
          
           </div>
 
        
    
          <div className={`${ tab === "listings" ? stylesProfile.activeTabContent : stylesProfile.tabContent }`}>
          
            {loadingDirectListings ? (
              <p>Loading...</p>
            ) : directListings && directListings.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (

              
              directListings?.map((listing) => (
                 <Box sx={theme.nftContainer}

                    key={listing.id} // key is mendatory and should be added somewhere in a map loop
                    onClick={() => {
                       const selectedNFT = NFTdata.find((nft) => nft.metadata.id === listing.tokenId);
                       navigate( linkPath( NFT_CONTRACT, selectedNFT, listing  )  )
                    }
                   }
                 >
                         <NFTListed
                            propContractAddress = {listing.assetContractAddress}
                            propTokenId = {listing.tokenId}
                            AlllistingData ={listing}
                            AuctionListingData ={null}
                         /> 
                  </Box>
 
                     
              ))
            )}
          </div>
    
           <div
            className={`${
              tab === "auctions" ? stylesProfile.activeTabContent : stylesProfile.tabContent
            }`}
            >
 
            {loadingAuction ? (
              <p>Loading...</p>
            ) : auctionListing && auctionListing.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (
                auctionListing?.map((listing) => (
                // <ListingWrapper listing={listing} key={listing.id} />
                 <Box sx={theme.nftContainer}

                key={listing.id}  
                onClick={() => {
                   const selectedNFT = NFTdata.find((nft) => nft.metadata.id === listing.tokenId);
                   navigate( linkPath( NFT_CONTRACT, selectedNFT, listing   )  )
                    }
                }
               > 
                 <NFTListed
                    key={listing.id}
                    propContractAddress = {listing.assetContractAddress}
                    propTokenId = {listing.tokenId}

                   AlllistingData ={null}
                   AuctionListingData = {listing}
                    /> 
                  </Box> 

              ))
            )}
          </div>
        </Container>
          </BasicScrollable>
       
    );
    
};


export function AllNFTWrapper( {  allNFTsWithListing, NFT_CONTRACT  } ){

   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
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
 