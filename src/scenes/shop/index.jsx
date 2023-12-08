/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/

import Skeleton from "../../components/Skeleton/Skeleton";
import stylesProfile from "../../styles/Profile.module.css";
import stylesGlobals from "../../styles/globals.css";

import randomColor from "../../util/randomColor";


import {useEffect, useState} from "react";
import { useContract, useValidEnglishAuctions, useValidDirectListings,
    ConnectWallet,  useAddress , useMakeBid } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS,TOOLS_ADDRESS,REWARDS_ADDRESS } from "../../const/addresses";
 
import Container from "../../components/Container/Container";
import styles from "../../styles/Buy.module.css";
 //import { Box, Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import NFTListed from "../../components/FARMER/NFTlisted.jsx"  
import { Box } from '@mui/material'; // Update this import
import { BasicScrollable, HorizontalSpace } from "../../components/Layout";

/*
interface ShopProps {
    display_mode: string;
    filterTokenId: BigNumberish;
    NFT_CONTRACT: string;
}
*/

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ];
// display mode, list for shop page, grid for composePage (more simple display)
 export default function Shop( { display_mode ,filterTokenId , NFT_CONTRACT  }   ) {

 /* from App.js shop or shop pack is called and "filterTokenId" is undefined
  in that case,  filterTokenId will not be used in the filter of listing and will display all listing.
  But in the case of showing the token detail page, a token ID will be provided so the ID filter will be displayed for display a 
  specific token
 */
 const address = useAddress();  
 const [tab, setTab] = useState("listings"); //<"nfts" | "listings" | "auctions"> (type script)
  // it can be the basci layers, but it can be the pak as well (both are ERC1155)
 
    const {
        contract: marketplace,
        isLoading: loadingMarketplace,
    } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const {
        data: directListings,isLoading: loadingDirectListings,
     } = useValidDirectListings(
        marketplace,
        {
            tokenContract: NFT_CONTRACT,
            tokenId: filterTokenId,

        }
    );

    const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
        tokenContract: NFT_CONTRACT,
        tokenId: filterTokenId,
    });
 
 
        
 console.log( "display_mode"  , display_mode ) ;

 useEffect(() => {
    // Function to fetch NFT data
     if ( directListings ){
        console.log( "directListings"  , directListings ) ;
     }
     if ( auctionListing ){
        console.log( "auctionListing"  , auctionListing ) ;
     }
     
  }, [ directListings , auctionListing  ]);
     
      if (!address){
        return (
            <div> 
                 <p> To get NFT Layer, you first need to be connected </p>
                <ConnectWallet/>
            </div> 
            )
       }
   
       return (
        <BasicScrollable>
        <Container maxWidth="lg">   
          <div 
          
           //className={stylesProfile.profileHeader}
           >
            <div
              // className={stylesProfile.coverImage}  style={{  background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`, }}
             />
            <div
              // className={stylesProfile.profilePicture}  style={{  background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`, }}
             />
            {/* <h1>  </h1> */}
            
           
          </div>
    
          <div className={stylesProfile.tabs}>
            
            <h3
              className={`${stylesProfile.tab} 
            ${tab === "listings" ? stylesProfile.activeTab : ""}`}
              onClick={() => setTab("listings")}
            >
              Listings
            </h3>
            <h3
              className={`${stylesProfile.tab}
            ${tab === "auctions" ? stylesProfile.activeTab : ""}`}
              onClick={() => setTab("auctions")}
            >
              Auctions
            </h3>
          </div>
    
          <div
            className={`${
              tab === "nfts" ? stylesProfile.activeTabContent : stylesProfile.tabContent
            }`}
          >


            {/*
            we will to add this back on profile page
            <NFTGrid
              data={ownedNfts}
              isLoading={loadingOwnedNfts}
              emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
            /> */}


          </div>
    
          <div
            className={`${
              tab === "listings" ? stylesProfile.activeTabContent : stylesProfile.tabContent
            }`}
          >
            {loadingDirectListings ? (
              <p>Loading...</p>
            ) : directListings && directListings.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (
              directListings?.map((listing  ) => (
                // <ListingWrapper listing={listing} key={listing.id} />
                   
                        <NFTListed
                        key={listing.id}
                        propContractAddress = {listing.assetContractAddress}
                        propTokenId = {listing.tokenId}
                        AlllistingData ={listing}
                        AuctionListingData ={null}  

                        displayMode = {display_mode}

                        NFT_CONTRACT ={NFT_CONTRACT}
                       /> 
                     
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
               
                   
                   <NFTListed
                   key={listing.id}
                   propContractAddress = {listing.assetContractAddress}
                propTokenId = {listing.tokenId}

                AlllistingData ={null}
                AuctionListingData = {listing}

                displayMode = {display_mode}

                   NFT_CONTRACT ={NFT_CONTRACT}
                   /> 
                 


              ))
            )}
          </div>
        </Container>
       </BasicScrollable>
    );



        return (







                 <>
                     {!loadingDirectListings ? (
                         directListings?.map((listing, index) => (
                            < >
                        
                              <NFTListed
                               propContractAddress = {listing.assetContractAddress}
                               propTokenId = {listing.tokenId}
                               AlllistingData ={listing}
                               AuctionListingData ={null}  

                               displayMode = {display_mode}

                               NFT_CONTRACT ={NFT_CONTRACT}
                              /> 

                           
                            </ >
                        ))

                    ) : (
                        <p>Loading dire listing GRID...</p>
                    )}
 

            <Box> 
            <div className={styles.nftGridContainer}  >    
              {!loadingAuction ? (
 
                    auctionListing?.map((listing, index) => (
                        // <div key={index} className={styles.nftContainer}>
                         <>
                          <NFTListed
                           propContractAddress = {listing.assetContractAddress}
                           propTokenId = {listing.tokenId}

                           AlllistingData ={null}
                           AuctionListingData = {listing}

                           displayMode = {display_mode}

                           NFT_CONTRACT ={NFT_CONTRACT}
                          /> 
 
 
                        </ >
                    ))

            


                ) : (
                    <p>Loading auction GRID...</p>
                )
               
                
                }
              </div>

              </Box>
  
            </>
           )

     
};