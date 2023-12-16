
 import {useEffect, useState} from "react";
 import { css, jsx } from '@emotion/react';
 import styled from '@emotion/styled';

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
  
import { tokens } from "../theme";
 import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
 import {   useTheme, Box } from "@mui/material";
 
import styles from "../styles/Buy.module.css";
  import { TOOLS_ADDRESS ,REWARDS_ADDRESS} from "../const/addresses";  
     
import {   useNavigate } from 'react-router-dom';
  
 import NFTListed from "./FARMER/NFTlisted.jsx";
 
/*
 Called from 
 1) All layer image
 2) Sell NFT
*/
   
const NFTGrid = ({ 
                  isLoading,

                  NFT_contract,
                  NFTdata,
                  overrideOnclickBehavior,
                  emptyText = "No NFTs found" 
 
}  ) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useUserContext();
    
 const navigate = useNavigate();
//==========================================================================
// pb added to fetch data
const [dataMap, setDataMap] = useState({}); 
 
const { notification, setNotification } = useNotificationContext();
  
useEffect(() => {
  
      
  
   
  if (!notification)return;
 if (!user)return;
  
}, [notification , user  , NFTdata ]);
  

  return (
    // <SimpleGrid columns={5} spacing={6} w={"100%"} padding={2.5} my={5}>
   <div className={styles.nftGridContainer}   > 
     {isLoading ? (
        // [...Array(20)].map((_, index) => (
        //     <Skeleton key={index} height={"312px"} width={"100%"} />
        // ))
        <div> loading </div>
        // WARNING REPO reffer to NFT data as "data" instead of "NFTdata" i our case
    ) : NFTdata && NFTdata.length > 0 ? (
            NFTdata.map((nft) =>
         
            !overrideOnclickBehavior ? (
            
             
                 <Box sx={theme.nftContainer}

                   key={nft.metadata.id} // key is mendatory and should be added somewhere in a map loop
                   onClick={() =>  navigate( `/token/${NFT_contract}/${nft.metadata.id}` ) }
                 >
                  {/* <NFT nft={nft} /> */}
                  <NFTListed
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
                  propContractAddress = { NFT_contract }
                  propTokenId = {nft.metadata.id } // 
               //   NFT ={ nft }
                 /> 
 
                </Box>
               
               
            )
           
            )

            
    ) : (
       <div> {emptyText} </div> 
    )}
</div>  
 
  );
};

export default NFTGrid;

 
 
