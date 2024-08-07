
 import {useContext, useEffect } from "react";
  

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
  import { Grid,  useTheme, Box  } from "@mui/material";
      
import {   useNavigate } from 'react-router-dom';
  
 import NFTListed from "./NFTCARD/NFTlisted.jsx";
 
 import { addressesByNetWork } from '../scenes/chainSelection';
 import ChainContext from "../context/Chain.js";
   

   //  NFTGrid used to show NFT from ERC1155 collection NOT from marketpace data
const NFTGrid = ({ 
                  address,
                  isLoading,

                   NFT_contract,
                  NFTdata,
                  overrideOnclickBehavior,
                  emptyText = "No NFTs found" 
 
}  ) => {
 
  const theme = useTheme();
     
 const navigate = useNavigate();
//==========================================================================
// pb added to fetch data
//const [dataMap, setDataMap] = useState({}); 
 

const { notification, setNotification } = useNotificationContext();
  
useEffect(() => {
    
  if (!notification)return;
 //if (!user)return;
  
}, [notification , NFTdata ,    /* user */  ]);
  

return (
  // <SimpleGrid columns={5} spacing={6} w={"100%"} padding={2.5} my={5}>
 <div  > 
   <Grid container spacing={1}  > 
   {isLoading ? (
      // [...Array(20)].map((_, index) => (
      //     <Skeleton key={index} height={"312px"} width={"100%"} />
      // ))
      <div> loading </div>
      // WARNING REPO reffer to NFT data as "data" instead of "NFTdata" i our case
  ) : NFTdata && NFTdata.length > 0 ? (

   
          NFTdata.map((nft, index) =>
         
             <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
 
          {
            !overrideOnclickBehavior ? (
            
             
            <Box sx={theme.nftContainer}

              key={nft.metadata.id} // key is mendatory and should be added somewhere in a map loop
              onClick={() =>  navigate( `/token/${NFT_contract}/${nft.metadata.id}` ) }
            >
             {/* <NFT nft={nft} /> */}
             <NFTListed
               address={address}
               propContractAddress = { NFT_contract }
               propTokenId = {nft.metadata.id } // 
              // NFT ={ nft }
             /> 

           </Box>
         
          ) : (

          <Box sx={theme.nftContainer}
            key={nft.metadata.id} // key is mendatory and should be added somewhere in a map loop
            onClick={() => overrideOnclickBehavior(nft)}
           >
           {/* <NFT nft={nft} /> */}
           <NFTListed
             address={address}
             propContractAddress = { NFT_contract }
             propTokenId = {nft.metadata.id } // 
          //   NFT ={ nft }
            /> 

           </Box>
          
          
          )
     }

 





          </Grid>


          
          )
          
          
  ) : (
     <div> {emptyText} </div> 
  )}


</Grid>

</div>  

);
   
};

export default NFTGrid;


export const NFTGridMarketData = ({ 

  address, 
  isLoading,
  NFT_contract,
  NFTdata,
  overrideOnclickBehavior,
  emptyText = "No NFTs found" ,

  auctionListings ,
  directListings ,
  loadingDirectListings 
  

}  ) => {

const theme = useTheme();
const { selectedChain  } = useContext(ChainContext);

const navigate = useNavigate();
//==========================================================================
// pb added to fetch data
//const [dataMap, setDataMap] = useState({}); 

//const { notification, setNotification } = useNotificationContext();
 
 
 
  useEffect(()=>{
   
    console.log( "directListings  ======   "  , directListings);
    //UpdateAllMarketData();
 }, [  directListings   ]);

 useEffect(()=>{
  console.log( "auctionListings  ======   "  , auctionListings);
 
  //UpdateAllMarketData();
}, [   auctionListings  ]);





return (
// <SimpleGrid columns={5} spacing={6} w={"100%"} padding={2.5} my={5}>
<div  > 
        <Grid container spacing={1}  > 
            {!directListings ? (
              <p>Loading...</p>
            ) : directListings && directListings.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (

              
              directListings?.map((listing, index) => (

                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                 <Box sx={theme.nftContainer}

                    key={listing.id} // key is mendatory and should be added somewhere in a map loop
                    onClick={() => {

                      
                           const selectedNFT = NFTdata.find((nft) => nft.metadata.id === listing.tokenId);
                          navigate( linkPath( addressesByNetWork[selectedChain].LAYER_ADDRESS , selectedNFT, listing  )  )
                    }
                   }
                 >
                         <NFTListed
                            address={address}
                            propContractAddress = {listing.assetContractAddress}
                            propTokenId = {listing.tokenId}
                            AlllistingData ={listing}
                            AuctionListingData ={null}
                         /> 
                   </Box>
              </Grid>
                     
              ))
            )}
         </Grid> 

         <Grid container spacing={1}  > 
            {!auctionListings ? (
              <p>Loading...</p>
            ) : auctionListings && auctionListings.length === 0 ? (
              <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
            ) : (

              
              auctionListings?.map((listing, index) => (

                <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
                 <Box sx={theme.nftContainer}

                    key={listing.id} // key is mendatory and should be added somewhere in a map loop
                    onClick={() => {

                      
                           const selectedNFT = NFTdata.find((nft) => nft.metadata.id === listing.tokenId);
                          navigate( linkPath( addressesByNetWork[selectedChain].LAYER_ADDRESS , selectedNFT, listing  )  )
                    }
                   }
                 >
                         <NFTListed
                            address={address}
                            propContractAddress = {listing.assetContractAddress}
                            propTokenId = {listing.tokenId}
                            AlllistingData ={null}
                            AuctionListingData ={listing}
                         /> 
                   </Box>
              </Grid>
                     
              ))
            )}
         </Grid> 


</div>  

);

};



export function linkPath( NFT_CONTRACT, nft,  allList  ){
 

  if ( allList.bidBufferBps ){ // only exist in AuctionListingData
    return  `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/NAN/${allList?.id}`;

  }  else {
   return   `/tokenByListingID/${NFT_CONTRACT}/${nft.metadata.id}/${allList?.id}/NAN` ;

  }
}