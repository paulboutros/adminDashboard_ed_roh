/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/

import {useEffect, useState} from "react";
 import { useContract, useDirectListings,useValidEnglishAuctions, useValidDirectListings,
    ConnectWallet, useNFTs, useContractRead, useAddress , useMakeBid } from "@thirdweb-dev/react";
import {
     MARKETPLACE_ADDRESS,
     TOOLS_ADDRESS  ,
     REWARDS_ADDRESS

} 

from "../../const/addresses";

import NFTContratHeader from "../../components/NFTcontractHeader.jsx"
import { Box, Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import TokenDetails from "../../scenes/tokenDetails/index.jsx"  
import { PackNFTCard } from "../../components/PackNFT";
import { BigNumberish } from "ethers";

interface ShopProps {
    display_mode: string;
    filterTokenId: BigNumberish;
    NFT_CONTRACT: string;
}

// display mode, list for shop page, grid for composePage (more simple display)
 export default function Shop( { display_mode ,filterTokenId , NFT_CONTRACT  }:ShopProps  ) {

 /* from App.js shop or shop pack is called and "filterTokenId" is undefined
  in that case,  filterTokenId will not be used in the filter of listing and will display all listing.
  But in the case of showing the token detail page, a token ID will be provided so the ID filter will be displayed for display a 
  specific token
 */
 const address = useAddress();  
   
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
            <div className="ddd">
     
                <Box m="20px" maxHeight="calc(80vh)" overflow="auto" >
              <SimpleGrid columns={4} spacing={6} w={"100%"} padding={2.5} my={5}>   
                    {!loadingDirectListings ? (
                         directListings?.map((listing, index) => (
                            <div key={index}>
    
                              <TokenDetails
                               propContractAddress = {listing.assetContractAddress}
                               propTokenId = {listing.tokenId}

                               AlllistingData ={listing}
                               AuctionListingData ={null}  

                               displayMode = {display_mode}

                               NFT_CONTRACT ={NFT_CONTRACT}
                              /> 

                           
                            </div>
                        ))

                    ) : (
                        <p>Loading dire listing GRID...</p>
                    )}
 

            <Box> 
              {!loadingAuction ? (
                    auctionListing?.map((auction_listing, index) => (
                        <div key={index}>
 

                          <TokenDetails
                           propContractAddress = {auction_listing.assetContractAddress}
                           propTokenId = {auction_listing.tokenId}

                           AlllistingData ={null}
                           AuctionListingData = {auction_listing}

                           displayMode = {display_mode}

                           NFT_CONTRACT ={NFT_CONTRACT}
                          /> 
 
 
                        </div>
                    ))
                ) : (
                    <p>Loading auction GRID...</p>
                )
                
                
                }


              </Box>
 

             </SimpleGrid>
                </Box>
            </div>
           )

     
};