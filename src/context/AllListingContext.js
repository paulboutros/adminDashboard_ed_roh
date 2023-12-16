import {createContext, useContext,  useState, useEffect } from "react";
import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS  } from "../const/addresses.ts";
import { useContract, useNFTs,    useValidDirectListings, useValidEnglishAuctions  } from "@thirdweb-dev/react";
  
const AllListingsContext = createContext();

export function useAllListingsContext() { return useContext(AllListingsContext);}
 
 
export function AllListingsProvider({ children , NFT_CONTRACT }) {
 

   
   // const address = useAddress();
   // const { data: owned, isLoading: ownedLoadin } = useOwnedNFTs(contract, address);
   
const { contract } = useContract( NFT_CONTRACT );
      
 //================================================================================================================================================
 const { data: allNFTs, isLoading } = useNFTs(contract); // get all neft
 const [allNFTsWithListing, setAllNFTsWithListing] = useState(null);
 // it can be the basci layers, but it can be the pak as well (both are ERC1155)
  
const { contract: marketplace, isLoading: loadingMarketplace, } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
 
const { data: directListings,isLoading: loadingDirectListings,} = 
useValidDirectListings(marketplace,{tokenContract: NFT_CONTRACT }); //,tokenId: filterTokenId

const { data: auctionListing, isLoading: loadingAuction } = 
useValidEnglishAuctions(marketplace, { tokenContract: NFT_CONTRACT  });   //,tokenId: filterTokenId
 //================================================================================================================================================
  




useEffect(() => {

      if ( allNFTs && auctionListing  && directListings ){
     // if ( allNFTsWithListing ) return;
       
      allNFTs.forEach((nft) => {
        nft.listing    = [] ;
        nft.auction    = [] ;
        nft.allListing = [] ; // auction and direct listing in one array
       
      });
    

         auctionListing.forEach( auction => {
          const selectedNFTIndex =  allNFTs.findIndex((nft) => nft.metadata.id === auction.tokenId);
          if (selectedNFTIndex !== -1) { allNFTs[selectedNFTIndex].allListing.push(auction); }

         });
         directListings.forEach( listing => {
           const selectedNFTIndex =  allNFTs.findIndex((nft) => nft.metadata.id === listing.tokenId);
           if (selectedNFTIndex !== -1) {allNFTs[selectedNFTIndex].allListing.push(listing); }
 
          });
         
           
        // setAuctionAddedtoList(true);
           console.log(  ">>>>>  added   >>>>    "  ,  allNFTs  );
          setAllNFTsWithListing(allNFTs);
     }
   
}, [ directListings , auctionListing , allNFTs, NFT_CONTRACT ]);
    

    return (
      <AllListingsContext.Provider value={{
         directListings, auctionListing, allNFTsWithListing,
         loadingDirectListings, loadingAuction, NFT_CONTRACT 
         }}>
        {children}
      </AllListingsContext.Provider>
    );
  }
  