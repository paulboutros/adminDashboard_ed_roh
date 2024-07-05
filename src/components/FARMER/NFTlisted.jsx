import {  useTheme /*, Skeleton */ } from "@mui/material";
 //https://chakra-ui.com/docs/components/button
import {  ThirdwebNftMedia,  useContract,useValidDirectListings, useValidEnglishAuctions ,  useContractEvents } from "@thirdweb-dev/react";
 import styles from "../../styles/NFT.module.css";
 import { MARKETPLACE_ADDRESS } from "../../const/addresses.ts";
  
 //import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import { getSDK_fromPrivateKey  } from "../../data/API.js";
 import {useEffect, useState} from "react";
 import {   useParams } from 'react-router-dom';
import { useAllLayersContext } from "../../context/AllLayerAvailableContext";


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

 //const { user } = useUserContext();

 const theme = useTheme();
 //const colors = tokens(theme.palette.mode);
 

  const { infoMap} = useAllLayersContext(); 
 const [nft, setNFT] = useState();
 //const [contractMetadata, setContractMetadata] = useState(); 

 useEffect(() => {
   // Function to fetch NFT data
   const fetchNFT = async () => {

    let amountOwned = 0;
    let supply = 0;
       let contract;
        let nftResult;

        // BE very careful, when using NFT (predifined) as it will not be up to date data.
        /* for example, make sure you reload NFT if you switch contract LAYER nft > to > Pack nft  for example
        
        for example when we had 5 packs, then switching contract to layer NFT, it  would only show 5 layers
         so if a confusion happens again, watch around here...
        */
         if (!NFT){


            console.log( " this should not  be loading  tokenId = " ,  tokenId);
            const sdk  = getSDK_fromPrivateKey(); 
            contract   = await sdk.getContract(NFT_CONTRACT);
            nftResult  = await contract.erc1155.get(tokenId);




            var BalanceToken = await contract.erc1155.balance(  tokenId  );
            const bigNumber =     BalanceToken._hex ;
            console.log( "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   bigNumber" ,     bigNumber  );
            amountOwned =   parseInt(  bigNumber , 16);
            console.log(  "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   regularNumber" , amountOwned); // Output: 2
 
            nftResult.amountOwned = amountOwned;
              
           var totalSupply  = await contract.erc1155.totalSupply(  tokenId  );
             const supplybigNumber  = totalSupply._hex ;
 
            supply = parseInt(  supplybigNumber , 16);
            console.log( "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   regular supply " ,     supply  );
            nftResult.supply = supply;







              
            
 
         }else{

          nftResult = NFT;
         }


       //let contractMetadataResult;
      try {
 

      





        // one way to do it but it may be resource intensive for each NFT
              /*
            var BalanceToken = await contract.erc1155.balance(  tokenId  );
            const bigNumber =     BalanceToken._hex ;
            console.log( "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   bigNumber" ,     bigNumber  );
            amountOwned =   parseInt(  bigNumber , 16);
            console.log(  "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   regularNumber" , amountOwned); // Output: 2
            // appening daata
            nftResult.amountOwned = amountOwned;
            console.log(  "  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>   nftResult" , nftResult); // Output: 2
            */


       // appening  quantityOwned  to nftResult
  // it is dangerous to cache owned NFT, because after i buy or a sell we need to make sure it is updated immidiately

          nftResult.amountOwned =     infoMap[tokenId ].quantityOwned;
          nftResult.supply      =     infoMap[tokenId ].supply;
         
     

         
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
                   
                   {/* <p className={styles.nftTokenId}> Token ID #{nft.metadata.id}     own {  nft.amountOwned }    </p> */}
                   {/* <p style={{ flexDirection: 'row', justifyContent: 'flex-end' }}> Token ID #{nft.metadata.id} own {nft.amountOwned} </p> */}
                 

                      <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto'
                  }}>
                    <p>Token ID #{nft.metadata.id}</p>
                    {/* <p style={{ textAlign: 'right' }}>  you own {nft.amountOwned} / {nft.supply}   </p> */}

       


                     <p style={{ textAlign: 'right' }}>
                      {nft.amountOwned > 0 ? (
                        <span style={{ color: 'green' }}>
                          you own {nft.amountOwned} / {nft.supply}
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          you own {nft.amountOwned} / {nft.supply}
                        </span>
                      )}
                    </p>





   

                  </div>





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
     