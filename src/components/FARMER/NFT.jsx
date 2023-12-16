 
import {  Web3Button,   useContract,ThirdwebNftMedia, useValidDirectListings, useValidEnglishAuctions
  
} from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , MARKETPLACE_ADDRESS  } from "../../const/addresses";
import {evolve} from "../../util/updateMetadata"

import { MediaRenderer   } from "@thirdweb-dev/react";

import {VerticalStackAlignCenter ,
   RoundedBox,
   RoundedBoxInfo,
   RowChildrenAlignCenter,RowChildrenAlignLeft,
   VerticalStackAlignLeft

} from "../../components/Layout.jsx"
 
import { Box, Typography ,CardContent  ,Card , Grid, CardMedia  } from '@mui/material'; // Update this import

//import  Skeleton from '@material-ui/lab/Skeleton'

import { ethers } from "ethers";
import { Button, background } from "@chakra-ui/react";
import styles    from "../../styles/NFT.module.css";
//import stylesBuy from "../../styles/Buy.module.css";
/* 
type Props = {
    nft: NFT;
};*/

import {text2, text1, tokens } from "../../theme.js";
import {   useTheme  } from "@mui/material";

export default function NFTComponent({ nft } ) {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: directListing, isLoading: loadingDirectListing } = 
      useValidDirectListings(marketplace, {
          tokenContract: TOOLS_ADDRESS,
          tokenId: nft.metadata.id,
      });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction} = 
      useValidEnglishAuctions(marketplace, {
          tokenContract: TOOLS_ADDRESS,
          tokenId: nft.metadata.id,
      });


      return (
        <>

     {/* this nft container only works from grid component , do not add to individual NFT card */}
    {/* <div  className={stylesBuy.nftContainer} style={{outline: `1px solid ${theme.palette.nftContainer}` }} >  */}
        
          <ThirdwebNftMedia metadata={nft.metadata} 
          className={styles.nftImage}  style={{ background : theme.palette.nftImage  }} />
    
          <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
          <p className={styles.nftName}>{nft.metadata.name}</p>
    
          <div className={styles.priceContainer} style={{ background : theme.palette.nftImage  }} >
            {loadingMarketplace || loadingDirectListing || loadingAuction ? (
               <div> loading </div>   // <Skeleton width="100%" height="100%" />
            ) : directListing && directListing[0] ? (
              <div className={styles.nftPriceContainer}   >
                <div>
                  <p className={styles.nftPriceLabel}>Price</p>
                  <p className={styles.nftPriceValue}>
                    {`${directListing[0]?.currencyValuePerToken.displayValue}
              ${directListing[0]?.currencyValuePerToken.symbol}`}
                  </p>
                </div>
              </div>
            ) : auctionListing && auctionListing[0] ? (
              <div className={styles.nftPriceContainer}   >
                <div>
                  <p className={styles.nftPriceLabel}>Minimum Bid</p>
                  <p className={styles.nftPriceValue}>
                    {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
              ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.nftPriceContainer}     >
                <div>
                  <p className={styles.nftPriceLabel} >Price</p>
                  <p className={styles.nftPriceValue} >Not for sale</p>
                </div>
              </div>
            )}
          </div>

          {/* </div> */}
        </>
      ) 


       
 

};