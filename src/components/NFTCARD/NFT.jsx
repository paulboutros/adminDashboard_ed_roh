 
import {   useContract,ThirdwebNftMedia, useValidDirectListings, useValidEnglishAuctions
  
} from "@thirdweb-dev/react";
import {   MARKETPLACE_ADDRESS  } from "../../const/addresses.js";
  
import styles from "../../styles/NFT.module.css";
import {   useTheme  } from "@mui/material";



//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======


export default function NFTComponent({ nft } ) {


  


  const { selectedChain  } = useContext(ChainContext);
  const theme = useTheme();
  

  const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: directListing, isLoading: loadingDirectListing } = 
      useValidDirectListings(marketplace, {
          tokenContract: addressesByNetWork[selectedChain].LAYER_ADDRESS,
          tokenId: nft.metadata.id,
      });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction} = 
      useValidEnglishAuctions(marketplace, {
          tokenContract: addressesByNetWork[selectedChain].LAYER_ADDRESS,
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
                  <p className={styles.nftPriceValue} >Not AAAA for sale</p>
                </div>
              </div>
            )}
          </div>

          {/* </div> */}
        </>
      ) 


       
 

};