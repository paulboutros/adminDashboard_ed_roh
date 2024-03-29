import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
  } from "@thirdweb-dev/react";
  import React, {useEffect, useState } from "react";
  import Container from "../../components/Container/Container";
  import NFTGrid from "../../components/NFTGrid";
  import { TOOLS_ADDRESS } from "../../const/addresses";
  import tokenPageStyles from "../../styles/Token.module.css";
  import stylesNFT from "../../styles/NFT.module.css";


  //import { NFT as NFTType } from "@thirdweb-dev/sdk";
  import SaleInfo from "../../components/SaleInfo/SaleInfo";
import { BasicScrollable, RoundedBox } from "../../components/Layout";
import { Typography, useTheme } from "@mui/material";
import { tokens, mainContainerPagePad } from "../../theme";
import ConnectWalletPage from "../../components/ConnectWalletPage";

   
  export default function Sell() {
    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(TOOLS_ADDRESS);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);
    const [selectedNft, setSelectedNft] = useState();
  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  
    useEffect(()=>{
      console.log( ">>  => contract = ", TOOLS_ADDRESS    );
      console.log( ">>  => address = ", address    );
      console.log( ">>  => ownedNfts = ", data    );
   }, [data]);
  
  
  
  
    return (
      <React.Fragment>
         {!address ? (
              
                
               <ConnectWalletPage/>
              
        ):(


           <BasicScrollable>
                  <Container maxWidth="lg">


              {/* <Typography sx={ theme.title }  > Sell NFTs </Typography> */}
        { !selectedNft ? (
          <>
            
            <Typography sx={ theme.titleDescription }  >Select which NFT you&rsquo;d like to sell below.</Typography>
             <NFTGrid
 
                isLoading={isLoading}
               
                NFT_contract={TOOLS_ADDRESS}
                NFTdata={data} 
                emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
                overrideOnclickBehavior={(nft) => { setSelectedNft(nft); }}
               
              
             
            />
          </>
        ) : (
          
          <div className={tokenPageStyles.container} style={{
             marginTop: 0,
             
             padding: mainContainerPagePad,

             maxWidth:"1128px"
             }}>


             <div className={tokenPageStyles.metadataContainer}>
              <div className={tokenPageStyles.imageContainer}>
                {/* <ThirdwebNftMedia
                  metadata={selectedNft.metadata}
                  
                
                  className={tokenPageStyles.image}
                  
                /> */}
         <RoundedBox>   
          <RoundedBox padding = "8px">
                <ThirdwebNftMedia metadata={selectedNft.metadata} 
                
                className={stylesNFT.largeImage} 
              
                />
            </RoundedBox> 
      </RoundedBox>     




                <button
                  onClick={() => {
                    setSelectedNft(undefined);
                  }}
                  className={tokenPageStyles.crossButton}
                >
                  X
                </button>
              </div>
            </div>  
     

    
        
 
          
          
            <div className={tokenPageStyles.listingContainer}>
              <p>You&rsquo;re about to list the following item for sale.</p>
              <h1 className={tokenPageStyles.title}>
                {selectedNft.metadata.name}
              </h1>
              <p className={tokenPageStyles.collectionName}>
                Token ID #{selectedNft.metadata.id}
              </p>
  
              <div className={tokenPageStyles.pricingContainer}>
                <SaleInfo nft={selectedNft} />
              </div>
            </div>
          </div>
        )}
                  </Container>
           </BasicScrollable>
      )}
     </React.Fragment>

    );
  }
  