 //claim erc1155  edition and drop edition
// edition only owner can mint then sell.  drop let user mint and claim /buy 
//https://www.youtube.com/watch?v=emYUnTZ5ndM

// repo:
// https://github.com/thirdweb-example/erc1155/blob/main/src/components/Erc1155ClaimButton.tsx

import {
  ConnectWallet,
  DropContract,
  useActiveClaimConditionForWallet,
  useAddress,
  useClaimConditions,
  useClaimerProofs,
  useClaimIneligibilityReasons,
  useTotalCirculatingSupply,
  Web3Button,
} from '@thirdweb-dev/react';
import { NFTDrop, SignatureDrop, TokenDrop } from '@thirdweb-dev/sdk';
import { BigNumber, BigNumberish, utils } from 'ethers';
import React, {  useMemo, useState } from 'react';
//import { useDebounce } from '../hooks/useDebounce';
import { parseIneligibility } from '../../util/parseIneligibility.js';
//import { Toast, ToastInterface } from './Toast';


//import * as React from 'react';

import {  useTheme , Box, Grid, Typography   } from "@mui/material";
 //https://chakra-ui.com/docs/components/button
import {  ThirdwebNftMedia  } from "@thirdweb-dev/react";
    

 import styles from "../../styles/NFT.module.css";
   
 //import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
  import {useEffect } from "react";
 
   
 import ConnectWalletPage from "../../components/ConnectWalletPage.jsx";
 import Container from "../../components/Container/Container.jsx";
  
 
 import { BasicScrollable  } from "../../components/Layout.jsx";
   

  
 import { wuCharacterDropAddress } from "../../const/addresses.ts";




 
// display mode, list for shop page, grid for composePage (more simple display)
 export default function ClaimWulies(  ) {
   
    const [NFTdata, setNFTdata] = useState(null); // what is the difference betwwen NFTdata & allLayers (this is unclear)

    
    useEffect(() => {
       
      
    
    }, []);
   
 

 const address = useAddress();  
 
 const theme = useTheme();
   
 

      if (!address){
        return (
            <div> 
                 <ConnectWalletPage/> 
            </div> 
            )
       }
       if (!NFTdata){
        return (
            <div> 
                 <p> Loading NFTs metadata </p>
                <ConnectWallet/>
            </div> 
            )
       }
       

   
       return (

        
       <BasicScrollable>


         <Container maxWidth="lg">    
         <Typography sx={ theme.title }> {"claim wullies"} </Typography>
         <Typography sx={ theme.titleDescription }> {"wullies description"} </Typography>
          
            
                
        
        <Grid container spacing={1}  > 
            {!NFTdata ? (
              <p>Loading...</p>   
              
            ) : (
       
                NFTdata?.map((nftObj, index ) => (

               <Grid item xs={12} sm={6} md={4} lg={3} key={index} >

                  <Box sx={theme.nftContainer}

                key={nftObj.id}  
                onClick={() => {
                   
                   
                    }
                }
               > 
                 <NFTForClaim nft={nftObj} />
                   </Box> 

                </Grid>
              ))



            )}

         </Grid> 
          
        </Container>
          </BasicScrollable>
       
    );
    
};







// code inspired by NFTlisted component
const NFTForClaim =  ({  
    
    nft   } ) => {   // ,  NFT_CONTRACT
     
        
  
   const theme = useTheme();
   //const colors = tokens(theme.palette.mode);
   
  
    
  
    
     
     if(!nft  ){
         return (<div></div>)
  
     }else{
          // NFTlisted must includes its parent "theme.nftContainer" to function properly 
              return (
                
        <>
  
                  
                    <ThirdwebNftMedia metadata={nft.metadata} 
                    className={styles.nftImage}  style={{ background : theme.palette.nftImage  }} />
                     
                     {/* <p className={styles.nftTokenId}> Token ID #{nft.metadata.id}     own {  nft.amountOwned }    </p> */}
                     {/* <p style={{ flexDirection: 'row', justifyContent: 'flex-end' }}> Token ID #{nft.metadata.id} own {nft.amountOwned} </p> */}
                   
  
                      <div style={{ display: 'grid',   gridTemplateColumns: '1fr auto' }}>
                       
  
                       <p>Token ID #{nft.metadata.id}</p>
    
                       <p style={{ textAlign: 'right' }}>
                         claimed
                      </p>
  
                    </div>
    
  
  
                    <div style={{ display: 'grid',   gridTemplateColumns: '1fr auto' }}>
                    <p className={styles.nftName}>{nft.metadata.name}</p>
  
                    <p style={{ textAlign: 'right' }}>
                        some text
                      </p>
                      </div>
  
  
  
  
                     
              
                    <div className={styles.priceContainer}  style={{ background : theme.palette.nftImage  }} >
                       
                     </div>
                     </>
                 ) 
         
         
     }
      
  };



 