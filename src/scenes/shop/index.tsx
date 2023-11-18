/*
shop/buy Thirdweb tuto
https://www.youtube.com/watch?v=8FRm_efm99o&t=1503s
starts at 27:00min
*/


 import { useContract, useDirectListings, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
import {
    MARKETPLACE_ADDRESS,
   // LAYER_EDITION_ADDRESS,
    TOOLS_ADDRESS ,
    
    REWARDS_ADDRESS

} from "../../const/addresses";
 
import NFTContratHeader from "../../components/NFTcontractHeader.jsx"
import { Box, Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
 import TokenDetails from "../../scenes/tokenDetails/index.jsx"  

   import { PackNFTCard } from "../../components/PackNFT";

export default function Shop() {
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
        }
    );
    console.log("from SHOP: DirectPack", directListings);

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
                          /> 


                             {/* <PackNFTCard
                                contractAddress={listing.assetContractAddress}
                                tokenId={listing.tokenId}
                            />   */}

                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </Box>
        </div>
    )
};