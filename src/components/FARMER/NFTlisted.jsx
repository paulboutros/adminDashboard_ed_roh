import {  useTheme /*, Skeleton */ } from "@mui/material";
 //https://chakra-ui.com/docs/components/button
import {  ThirdwebNftMedia,  useContract,useValidDirectListings, useValidEnglishAuctions ,  useContractEvents } from "@thirdweb-dev/react";
 import styles from "../../styles/NFT.module.css";
 import { MARKETPLACE_ADDRESS } from "../../const/addresses.ts";
 import {  tokens } from "../../theme.js";
 import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import { getSDK_fromPrivateKey  } from "../../data/API.js";
 import {useEffect, useState} from "react";
 import { Link, useParams } from 'react-router-dom';


const NFTListed =  ({ propContractAddress, propTokenId,
  
  AlllistingData, AuctionListingData , NFT   } ) => {   // ,  NFT_CONTRACT
   
    let {  contractAddress,   tokenId } = useParams();
 
     //NFT_CONTRACT  can be  TOOLS_ADDRESS or CUSTOM_PACK
    
   //if prop undefined it means it is NOT called from url (so we get props from url param)
   if( propContractAddress !==undefined && propTokenId !==undefined  ){
       contractAddress = propContractAddress;
       tokenId = propTokenId;
   }
 

 const NFT_CONTRACT = contractAddress;

 const { user } = useUserContext();

 const theme = useTheme();
 const colors = tokens(theme.palette.mode);
 
 const [nft, setNFT] = useState();
 //const [contractMetadata, setContractMetadata] = useState(); 

 useEffect(() => {
   // Function to fetch NFT data
   const fetchNFT = async () => {

        let nftResult;

        // BE very careful, when using NFT (predifined) as it will not be up to date data.
        /* for example, make sure you reload NFT if you switch contract LAYER nft > to > Pack nft  for example
        
        for example when we had 5 packs, then switching contract to layer NFT, it  would only show 5 layers
         so if a confusion happens again, watch around here...
        */
         if (!NFT){
           console.log( " this should not  be loading  tokenId = " ,  tokenId);
            const sdk = getSDK_fromPrivateKey(); 
            const contract = await sdk.getContract(NFT_CONTRACT);
            nftResult = await contract.erc1155.get(tokenId);
         }else{

          nftResult = NFT;
         }


       //let contractMetadataResult;
      try {
       

       setNFT(nftResult);

     } catch (error) {
       console.error('Error fetching NFT:', error);
     }
   };

   
   
   fetchNFT();
    
 }, [contractAddress, tokenId]);


          const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
 
           const { data: directListing, isLoading: loadingDirectListing } = 
           useValidDirectListings(marketplace, {tokenContract: NFT_CONTRACT, tokenId: nft?.metadata.id,});
            
           //Add these for auction section
           const [bidValue, setBidValue] = useState();

           const { data: auctionListing, isLoading: loadingAuction } =
           useValidEnglishAuctions(marketplace, { tokenContract: NFT_CONTRACT,tokenId: nft?.metadata.id, });
   
           const { data: transferEvents, isLoading: loadingTransferEvents } =
           
           useContractEvents(marketplace, "NewBid", {  queryFilter: {  filters: {tokenId: nft?.metadata.id,}, order: "desc",},}); 
          
   
  
   
   if(!nft  ){
       return (<div></div>)

   }else{
        // NFTlisted must includes its parent "theme.nftContainer" to function properly 
            return (
                
             
      <>

                
                  <ThirdwebNftMedia metadata={nft.metadata} 
                  className={styles.nftImage}  style={{ background : theme.palette.nftImage  }} />
                   
                   <p className={styles.nftTokenId}>Token ID #{nft.metadata.id}</p>
                   <p className={styles.nftName}>{nft.metadata.name}</p>
                   
            
                  <div className={styles.priceContainer}  style={{ background : theme.palette.nftImage  }} >
                    {loadingMarketplace || loadingDirectListing || loadingAuction ? (
                       <div> loading  </div>   // <Skeleton width="100%" height="100%" />
                    ) : directListing && AlllistingData ? (
                      <div className={styles.nftPriceContainer}>
                        <div>
                          <p className={styles.nftPriceLabel}>Price</p>
                          <p className={styles.nftPriceValue}>
                            {`${AlllistingData?.currencyValuePerToken.displayValue}
                      ${AlllistingData?.currencyValuePerToken.symbol}`}
                          </p>
                        </div>
                      </div>
                    ) : auctionListing && AuctionListingData ? (
                      <div className={styles.nftPriceContainer}>
                        <div>
                          <p className={styles.nftPriceLabel}>Minimum Bid</p>
                          <p className={styles.nftPriceValue}>
                            {`${AuctionListingData?.minimumBidCurrencyValue.displayValue}
                              ${AuctionListingData?.minimumBidCurrencyValue.symbol}`}
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
       
       
   }
    
};
 export default NFTListed;
     