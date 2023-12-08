
 import {useEffect, useState} from "react";
 

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
 
 
import { tokens } from "../theme";
  
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
 

import { useTheme } from "@mui/material";
 

import styles from "../styles/Buy.module.css";
 import {
   // LAYER_EDITION_ADDRESS,
    TOOLS_ADDRESS ,
    
    REWARDS_ADDRESS

} from "../const/addresses";  
//import  { SetLayerSupply } from "../../data/API"
//import Link from "next/link";
import { Link } from 'react-router-dom';
  
import NFT from "./FARMER/NFT";
 
/*
 Called from 
 1) All layer image
 2) Sell NFT
*/
  
const NFTGrid = ( { 
                   isLoading,
                  NFTdata,
                  overrideOnclickBehavior,
                  emptyText = "No NFTs found" 
 
}  ) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useUserContext();
    

//==========================================================================
// pb added to fetch data
const [dataMap, setDataMap] = useState({}); 
  

const { notification, setNotification } = useNotificationContext();
  
useEffect(() => {
  
   console.log( "   >>>>>>>>>>   NFTdata     =" , NFTdata ) ;    
  
   
  if (!notification)return;
 if (!user)return;
  
}, [notification , user  , NFTdata ]);
 
 
 
  /*
   overrideOnclickBehavior  has 2 behavior when clicking on the NFT
   1) you are redirected toward the detialed page of the NFT
   2) you select that Nft as the Nft you want to sell, so it directs you toward the sell
    page, to sell that specific/selected NFT
  */
// 
  return (
    // <SimpleGrid columns={5} spacing={6} w={"100%"} padding={2.5} my={5}>
   <div className={styles.nftGridContainer}  >
     {isLoading ? (
        // [...Array(20)].map((_, index) => (
        //     <Skeleton key={index} height={"312px"} width={"100%"} />
        // ))
        <div> loading </div>
        // WARNING REPO reffer to NFT data as "data" instead of "NFTdata" i our case
    ) : NFTdata && NFTdata.length > 0 ? (
            NFTdata.map((nft) =>
         
            !overrideOnclickBehavior ? (
     
                <Link
                   to={`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`}
                   key={nft.metadata.id}
                   className={styles.nftContainer}
                >
                  <NFT nft={nft} />
 
                </Link>
                
            ) : (
             
                <div
                    key={nft.metadata.id} // key is mendatory and should be added somewhere in a map loop
                    onClick={() => overrideOnclickBehavior(nft)}
                    className={styles.nftContainer}
                >
                     <NFT nft={nft} />
                </div>
               
            )
           
            )

            
    ) : (
       <div> {emptyText} </div> 
    )}
</div>  
 
  );
};

export default NFTGrid;

 
 
