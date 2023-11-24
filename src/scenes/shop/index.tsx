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
   // LAYER_EDITION_ADDRESS,
    TOOLS_ADDRESS ,
    
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
}

// display mode, list for shop page, grid for composePage (more simple display)
 export default function Shop( { display_mode ,filterTokenId  }:ShopProps  ) {

  
    const address = useAddress();  
  
    // display_mode="list";
    
     

    const {
        contract: marketplace,
        isLoading: loadingMarketplace,
    } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const {
        data: directListings,isLoading: loadingDirectListings,
     } = useValidDirectListings(
        marketplace,
        {
            tokenContract: TOOLS_ADDRESS,
            tokenId: filterTokenId,

        }
    );

    const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
        tokenContract: TOOLS_ADDRESS,
        tokenId: filterTokenId,
    });

 
    let listingType :string = "auction";// "direct"; // "auction" ; //
 

        // return (
        // <div> 
        //      <p> direct : { directListings?.length } </p>
        //      <p> auction : { auctionListing?.length } </p>
        //     <ConnectWallet/>
        // </div> 
        // )


      if (!address){
        return (
            <div> 
                 <p> To get NFT Layer, you first need to be connected </p>
                <ConnectWallet/>
            </div> 
            )
        
      }

     if (  directListings?.length === 0   ){
        return (
        <div> 

             
            <p> This token is currently not for sale </p>

            <p> you can buy Layer Pack that may contain this layer </p>

            <p> you can invite a friend to to this app and recieve 2 free layers per invitation </p>
        </div> 
        )
     }

    if (display_mode === "list"){
       return (
        <div className="ddd">

             <NFTContratHeader/>
            {/* <h1>Shop Packs</h1> */}
            <Box m="20px" maxHeight="calc(80vh)" overflow="auto" >

               <Box> 
                {!loadingDirectListings
                //  && listingType === "direct" 
                 ? (
                    directListings?.map((listing, index) => (
                        <div key={index}>
 

                          <TokenDetails
                           propContractAddress = {listing.assetContractAddress}
                           propTokenId = {listing.tokenId}
                           AlllistingData ={listing}
                           AuctionListingData={null}
                           displayMode = {display_mode}
                          /> 
 
 
                        </div>
                    ))
                ) : (
                    <p>Loading direct listing... listingType: {listingType} </p>
                )
                 }
               </Box>


               <Box> 
              {!loadingAuction  && listingType === "auction" ? (
                    auctionListing?.map((auction_listing, index) => (
                        <div key={index}>
 

                          <TokenDetails
                           propContractAddress = {auction_listing.assetContractAddress}
                           propTokenId = {auction_listing.tokenId}

                           AlllistingData ={null}
                           AuctionListingData = {auction_listing}

                           displayMode = {display_mode}
                          /> 



 
                        </div>
                    ))
                ) : (
                    <p>Loading auction...{}</p>
                )
                
                
                }


              </Box>




              

            </Box>
        </div>
       )
    }else{ //"grid"
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
                              /> 

                           
                            </div>
                        ))

                    ) : (
                        <p>Loading dire listing GRID...</p>
                    )}








            <Box> 
              {!loadingAuction  && listingType === "auction" ? (
                    auctionListing?.map((auction_listing, index) => (
                        <div key={index}>
 

                          <TokenDetails
                           propContractAddress = {auction_listing.assetContractAddress}
                           propTokenId = {auction_listing.tokenId}

                           AlllistingData ={null}
                           AuctionListingData = {auction_listing}

                           displayMode = {display_mode}
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

    }
};