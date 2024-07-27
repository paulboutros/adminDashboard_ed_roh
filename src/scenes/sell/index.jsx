import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
  } from "@thirdweb-dev/react";
  import React, { useState } from "react";
  import Container from "../../components/Container/Container";
  import NFTGrid from "../../components/NFTGrid";
  
  import tokenPageStyles from "../../styles/Token.module.css";
  import stylesNFT from "../../styles/NFT.module.css";
 
  //import { NFT as NFTType } from "@thirdweb-dev/sdk";
  import SaleInfo from "../../components/SaleInfo/SaleInfo";
import {   RoundedBox } from "../../components/Layout";
import { Typography, useTheme } from "@mui/material";
import {   mainContainerPagePad } from "../../theme";
import ConnectWalletPage from "../../components/ConnectWalletPage";
import { getSDK_fromPrivateKey } from "../../data/API";
 
   

//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======
 
  export default function Sell() {


    const { selectedChain  } = useContext(ChainContext);
    //addressesByNetWork[selectedChain].LAYER_ADDRESS

    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);
    const   address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);
    const [selectedNft, setSelectedNft] = useState();
  
    const theme = useTheme();
     
  
    return (
      <React.Fragment>
         {!address ? (
              
                
               <ConnectWalletPage/>
              
        ):(
 
           
                  <Container maxWidth="lg">


              {/* <Typography sx={ theme.title }  > Sell NFTs </Typography> */}
        { !selectedNft ? (
          <>
            
            <Typography sx={ theme.titleDescription }  >Select which NFT you&rsquo;d like to sell below.</Typography>
             <NFTGrid
                address={address}
                isLoading={isLoading}
               
                NFT_contract={addressesByNetWork[selectedChain].LAYER_ADDRESS}
                NFTdata={data} 
                emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
                // overrideOnclickBehavior={(nft) => { setSelectedNft(nft); }}
                 overrideOnclickBehavior={ async (nft) => {


                  const sdk = getSDK_fromPrivateKey(selectedChain); 
                  const contract = await sdk.getContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);
                  //const nftResult = await contract.erc721.get(tokenId);
                  const nftResult = await contract.erc1155.get( nft.metadata.id );
 
                     setSelectedNft(nftResult); 

                }
                
             }
              
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
           
      )}
     </React.Fragment>

    );
  }
  