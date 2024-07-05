import {createContext, useContext,  useState, useEffect, useRef } from "react";
import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS  } from "../const/addresses.ts";
import { useContract,     useEnglishAuctions,     useValidDirectListings, useValidEnglishAuctions  } from "@thirdweb-dev/react";
import { getSDK_fromPrivateKey } from "../data/API.js";
import { useAllLayersContext } from "./AllLayerAvailableContext.js";
import { listingStatus } from "../const/various.js";
  
const AllListingsContext = createContext();

export function useAllListingsContext() { return useContext(AllListingsContext);}
 
 
export function AllListingsProvider({ children , NFT_CONTRACT }) {
 

   
   // const address = useAddress();
   // const { data: owned, isLoading: ownedLoadin } = useOwnedNFTs(contract, address);
   
const { contract } = useContract( NFT_CONTRACT );
       

  const {NFTdata} = useAllLayersContext();  // useAllLayersContext  
 

//================================================================================================================
 


 const [allNFTsWithListing, setAllNFTsWithListing] = useState(null);
 // it can be the basci layers, but it can be the pak as well (both are ERC1155)
  
const { contract: marketplace, isLoading: loadingMarketplace, } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
 

/*
const { data: directListings,isLoading: loadingDirectListings,} = 
useValidDirectListings(marketplace,{tokenContract: NFT_CONTRACT }  ); //,tokenId: filterTokenId
*/


/*
let { data: auctionListing, isLoading: loadingAuction } = 
//useValidEnglishAuctions(marketplace, { tokenContract: NFT_CONTRACT  });   // BUG, not show my valid auction with status 1
useEnglishAuctions(marketplace, { tokenContract: NFT_CONTRACT  });   //,tokenId: filterTokenId
*/


const [loadingAuction, setloadingAuction] = useState(true);
const [auctionListing, setEnglishAuctions] = useState(null);

const [loadingDirectListings,  setLoadingDirectListings] = useState(true);
const [directListings, setDirectListing] = useState(null);

 
//getAllAuctions
 //================================================================================================================================================
  
 // to compare which dependency has changed
 const prevDirectListings = useRef(directListings);
 const prevAuctionListing = useRef(auctionListing); 


 // English auction   loading  ======================================================
 async function englishAuctions(){
   const sdk = getSDK_fromPrivateKey(); 
   const contract = await sdk.getContract( MARKETPLACE_ADDRESS );  // , "edition"
  
  let auctions = await contract.englishAuctions.getAll();

  console.log( "auctions "  ,auctions );
  const filteredAuctions = auctions
  .filter(auction => 
    auction.status === listingStatus.CREATED ||
    auction.status === listingStatus.ACTIVE
    );

  setEnglishAuctions(filteredAuctions);
  setloadingAuction(false);
}




async function directListingCall(){
  const sdk = getSDK_fromPrivateKey(); 
  const contract = await sdk.getContract( MARKETPLACE_ADDRESS );  // , "edition"
 
 let directs = await contract.directListings.getAll();

 console.log( ">>>>>                 direct "  ,directs );
 const filteredDirect = directs
 .filter(direct => 
  direct.status === listingStatus.CREATED ||
  direct.status === listingStatus.ACTIVE
   );

 setDirectListing(filteredDirect);
 setLoadingDirectListings(false);
}





 useEffect(() => {

  console.log( "Hello WORLD!!! "    );

  directListingCall();
  englishAuctions();
  
}, []);

useEffect(() => {





  if ( loadingAuction || loadingDirectListings ) return;

      if ( NFTdata && auctionListing  && directListings ){
     
       // I think we are adding ot appending some new properties here...
      NFTdata.forEach((nft) => {
     //    nft.listing   = [] ;
     //   nft.auction    = [] ;

        nft.allListing = [] ; // auction and direct listing in one array
       
      });
    

      
        

        
         
         auctionListing.forEach( auction => {
 
            // is auction is active 
            
                  const selectedNFTIndex =  NFTdata.findIndex((nft) => nft.metadata.id === auction.tokenId);
                 if (selectedNFTIndex !== -1) { NFTdata[selectedNFTIndex].allListing.push(auction); }
              
         });
         directListings.forEach( listing => {
           const selectedNFTIndex =  NFTdata.findIndex((nft) => nft.metadata.id === listing.tokenId);
           if (selectedNFTIndex !== -1) {NFTdata[selectedNFTIndex].allListing.push(listing); }
 
          });
         
           
          
          if (directListings !== prevDirectListings) {
            console.log('directListings has changed');
          }
      
          if (auctionListing !== prevAuctionListing) {
            console.log('propB has changed');
          }
      
          // Your side effect code here
      
          // Update previous values after the effect runs
          prevDirectListings.current = directListings;
          prevAuctionListing.current = auctionListing;
         
          setAllNFTsWithListing(NFTdata);
     }




    console.log( "directListings     =    "    , directListings);

   
}, [ directListings , auctionListing , NFTdata, NFT_CONTRACT ]);
    

    return (
      <AllListingsContext.Provider value={{
         directListings, auctionListing, allNFTsWithListing,
         loadingDirectListings, loadingAuction, NFT_CONTRACT 
         }}>
        {children}
      </AllListingsContext.Provider>
    );
  }
  