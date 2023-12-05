 
import {  Web3Button,   useContract,ThirdwebNftMedia, useValidDirectListings, useValidEnglishAuctions
  
} from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , MARKETPLACE_ADDRESS  } from "../../const/addresses";
import {evolve} from "../../utils/updateMetadata"

import { MediaRenderer   } from "@thirdweb-dev/react";

import {VerticalStackAlignCenter ,
   RoundedBox,
   RoundedBoxInfo,
   RowChildrenAlignCenter,RowChildrenAlignLeft,
   VerticalStackAlignLeft

} from "../../components/Layout.jsx"
 


 import { Box, Typography ,CardContent  ,Card , Grid, CardMedia,image   } from '@mui/material'; // Update this import

//import  Skeleton from '@material-ui/lab/Skeleton'

import { ethers } from "ethers";
import { Button } from "@chakra-ui/react";
import styles from "../../styles/NFT.module.css";
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
          <ThirdwebNftMedia metadata={nft.metadata} className={styles.nftImage} />
    
          <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
          <p className={styles.nftName}>{nft.metadata.name}</p>
    
          <div className={styles.priceContainer}>
            {loadingMarketplace || loadingDirectListing || loadingAuction ? (
               <div> loading  </div>   // <Skeleton width="100%" height="100%" />
            ) : directListing && directListing[0] ? (
              <div className={styles.nftPriceContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Price</p>
                  <p className={styles.nftPriceValue}>
                    {`${directListing[0]?.currencyValuePerToken.displayValue}
              ${directListing[0]?.currencyValuePerToken.symbol}`}
                  </p>
                </div>
              </div>
            ) : auctionListing && auctionListing[0] ? (
              <div className={styles.nftPriceContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Minimum Bid</p>
                  <p className={styles.nftPriceValue}>
                    {`${auctionListing[0]?.minimumBidCurrencyValue.displayValue}
              ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.nftPriceContainer}>
                <div>
                  <p className={styles.nftPriceLabel}>Price</p>
                  <p className={styles.nftPriceValue}>Not for sale</p>
                </div>
              </div>
            )}
          </div>
        </>
      ) 


      return (
        <div>
 
          

  
           <RoundedBox  margin={1} _height={380}>

            {/* <Typography margin={1} >  {nft.metadata.name} </Typography>   */}
           
            <ThirdwebNftMedia metadata={nft.metadata}  className={styles.nftImage}  />
            <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
            <p className={styles.nftName}>{nft.metadata.name}</p>
             
         <Box  margin={1} sx={{ position: 'relative', top:"-53px"  }}   >  
         
         
           <RowChildrenAlignLeft >
     
          <Box>
          <RoundedBoxInfo 
            name={nft.metadata.attributes[0].trait_type}
            value={nft.metadata.attributes[0].value}   _width = {"50px"}  _height = {"80px"} 
            />       
           </Box>
           <Box >
          

          <RoundedBoxInfo 
            name={"ID"}
            value={nft.metadata.id}   _width = {"50px"}  _height = {"80px"}
             />       
           </Box>

            <Box margin={1}>

           <RoundedBoxInfo 
            name={"sup"}
            value={nft.metadata.supply}   _width = {"80px"}  _height = {"80px"}
             />       
            </Box>  
           </RowChildrenAlignLeft>
        </Box>  
          </RoundedBox>
         
         
          
        </div>
      )

      return (
        <Card key={nft.metadata.id} sx={{backgroundColor: colors.primary[500]  }}>
        
         
        
        <CardMedia
                 
                 component="img"
                 alt={nft.metadata.id}
                 height="80%"//"80%"
                 image={nft.metadata.image}

                 sx={{
                 
                     backgroundColor: colors.primary[500] 
                  
                }}
  

        />
         <CardContent>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        
        
      <Box>
      {loadingMarketplace || loadingDirectListing || loadingAuction ? (
        <div> loading </div>  // <Skeleton />
      ) : directListing && directListing[0] ? (
        <Box>
          <Box>
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2">{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Typography>
          </Box>
        </Box>
      ) : auctionListing && auctionListing[0] ? (
        <Box>
          <Box>
            <Typography variant="body2">Minimum Bid</Typography>
            <Typography variant="body2">{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box>
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2">Not Listed</Typography>
          </Box>
        </Box>
      )}
    </Box>
 



      </Grid>
      <Grid item xs={6}>
        {/* Right side with Typography */}
        <Typography variant="h5" fontWeight="fontWeightBold" style={{ marginTop: '5px', textAlign: 'center' }}>
          {nft.metadata.name}
        </Typography>
        
      </Grid>
    </Grid>
  </CardContent>
      </Card>
    )

 

};