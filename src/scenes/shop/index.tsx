/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/


 import { useContract, useDirectListings,
    ConnectWallet, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
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
 console.log(  ">>>>>>>>>>>>>>>>>>>>     display_mode" , display_mode  );
    // display_mode="list";
    
   // let display_mode :string ="list"; // "grid"//"list"; //

    const {
        contract: marketplace,
        isLoading: loadingMarketplace,
    } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const {
        data: directListings,
        isLoading: loadingDirectListings,
    } = useDirectListings(
        marketplace,
        {
            tokenContract: TOOLS_ADDRESS,
            tokenId: filterTokenId,

        }
    );
    console.log("from SHOP: DirectPack", directListings);


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


                {!loadingDirectListings ? (
                    directListings?.map((listing, index) => (
                        <div key={index}>
 

                          <TokenDetails
                           propContractAddress = {listing.assetContractAddress}
                           propTokenId = {listing.tokenId}
                           AlllistingData ={listing}
                           displayMode = {display_mode}
                          /> 



 
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )
                
                
                }
            </Box>
        </div>
       )
    }else{
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
                               displayMode = {display_mode}
                              /> 
     
                            </div>
                        ))
                       



                    ) : (
                        <p>Loading...</p>
                    )}
             </SimpleGrid>
                </Box>
            </div>
           )

    }
};