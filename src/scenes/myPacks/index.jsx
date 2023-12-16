import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'

import stylesBuy from "../../styles/Buy.module.css";
import styles from    '../../styles/Home.module.css';
import stylesNFT from '../../styles/NFT.module.css';
import stylesFlip from '../../styles/CardFlipping.module.css';



import Container from "../../components/Container/Container";
import { OWNER, PACK_ADDRESS, TOOLS_ADDRESS } from '../../const/addresses';
import { useState, useEffect } from 'react';
//import { PackRewards } from '@thirdweb-dev/sdk/dist/declarations/src/evm/schema';
import { PackRewardCard } from '../../components/PackRewardCard';
import { useTheme, Box, Typography, Button } from "@mui/material";
import { allCSS, tokens } from "../../theme";
import { BasicScrollable, RowChildrenAlignLeft } from '../../components/Layout';
import NFTListed from '../../components/FARMER/NFTlisted';
import { getSDK_fromPrivateKey } from '../../data/API';

export default function MyPacks() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  

    const address = useAddress();

    const { contract } = useContract(PACK_ADDRESS, "pack");
    const { data, isLoading } = useOwnedNFTs(contract, address);

    const [openPackRewards, setOpenPackRewards] = useState(); // <PackRewards>
    const [rewardNFTs, setRewardNFTs] = useState(); // <PackRewards>
 

    const [spinReady, setSpinReady] = useState([false,false,false,false,false,false]); // <PackRewards>
    
     
  
    useEffect(() => {
         
        if (rewardNFTs) {   delayedLoop(true);  }
          
       
      }, [rewardNFTs]); // Effect depends on rewardNFTs changes
    async function delayedLoop( state) {

         
        for (let i = 0; i < 5; i++) {
          
         
          console.log(`Iteration ${i + 1}`);
      

          const newState = prevState => {
            const newStateArray = [...prevState];
            newStateArray[i] = state;
            return newStateArray;
          };
    
          // Log the new state before updating
          console.log("newState   ", newState );

          setSpinReady( newState );


          
         

          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
       
      

    async function openPack(packId) { // : string
        let cardRewards;
        const useRealData = false;
        if (useRealData){ 
            cardRewards = await contract?.open(parseInt(packId), 1);
        }else{

             cardRewards ={
                erc1155Rewards:[
                    {  tokenId: 2, contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 },
                    {  tokenId: 4, contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 },
                    {  tokenId: 12, contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 },
                    {  tokenId: 24, contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 },
                    {  tokenId: 45, contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 }
                 ]
 
            }
        }
 

          
        console.log(cardRewards);
      //  setOpenPackRewards(cardRewards);
    
        // load all the nft first, once loaded we do the spin animation
        
             const sdk = getSDK_fromPrivateKey(); 
             const nftContract = await sdk.getContract(TOOLS_ADDRESS);
             const reward_NFTs = [];
            for ( let i = 0; i <  cardRewards.erc1155Rewards.length; i++ )  { 
                const card      = cardRewards.erc1155Rewards[i];
                const he_tokenId = parseInt(  card.tokenId  );  
                  const nftres  = await nftContract.erc1155.get( he_tokenId );
                  reward_NFTs.push(nftres);
             } 
             setRewardNFTs(reward_NFTs);
           
          // we set the delay once  reward_NFTsis fully updated using useEffect
          // it is safer this way so spin animation starts only when NFT reward are loaded
          // delayedLoop( true );
    }; 
     

    
    
    return (
        // <div className={styles.container}>
        // BasicScrollable _maxHeight="calc(90vh)" 
       <> 
         <Container maxWidth="lg">    
          <RowChildrenAlignLeft>
        <Typography sx={ theme.title }> My Packs </Typography>
        <div style={ {
                                        margin: 0,
                                        position: 'relative',
                                        // top: '50%',
                                        transform: 'translateY(95%)',
                                    }} >  
         
                    
                     {address === OWNER && (
                        <>
                        <Button variant="contained" 
                          sx={{backgroundColor: colors.redAccent[500]  }}
       
                           onClick={() => delayedLoop( true) }  
                        > show cards </Button>
                        <Button variant="contained" 
                          sx={{backgroundColor: colors.redAccent[500]  }}
       
                           onClick={() => delayedLoop( false) }  
                        > hide cards </Button>
                         </>
                     )}
       </div>
       </RowChildrenAlignLeft>

        <Typography sx={ theme.titleDescription }> Open your pack to reveal the NFT layers.</Typography>
         
         
         <Box sx={{ borderBottom: 1, borderColor:  colors.grey[600] , margin: "40px 0px 20px 0px" }}/>




         {!rewardNFTs  && (
            <div className={styles.grid}>
 
                  <DisplayPack isLoading={isLoading}  data={data}   theme={theme}   openPack ={openPack} /> 
              

            </div>
             )}


            <div  >
              { rewardNFTs && rewardNFTs?.length > 0 && (    
               
                 
                <>
                   <>
                     <h3>Pack Rewards:</h3>
                   </>
                 <div>
                   
                     
                  
                     <div  className = {stylesBuy.nftGridContainer} >
 
                      {/* {openPackRewards.erc1155Rewards.map((card, index) => ( */}
                       {rewardNFTs.map((card, index) => (  
                         

                        //  sx={{  height : "800px"}} 
                        <Box key={index} > 
                         
                         <div className= {`${stylesFlip.card}  ${ spinReady[index] ? stylesFlip.spin : ""}`} > 
                      
                             <div className={stylesFlip.cardInner} >
                       <div className={stylesFlip.cardFront} > 
                          <div  style= {   allCSS( theme.palette.mode, "100%","0px" ).nftContainer }  >
                         
                              <div style={ {

                                   backgroundColor: "#3c3c3c",
                                   borderRadius: "8px",
                                   flexDirection: "column",
                                   padding: "8px",
                                   height: "366px",
                                  
                                  }
                              } >  
                               
                              </div>
                           
                           </div>
                         </div>
                  
                       <div className={stylesFlip.cardBack}  >

                       <div  style= {   allCSS( theme.palette.mode, "100%","0px" ).nftContainer }  >
                              
                              <NFTListed
                                  propContractAddress = { TOOLS_ADDRESS }
                              propTokenId = {card.tokenId } // 
                              NFT={ card }
                           />   

                          </div>
                        </div>
                            </div>
                         </div>




                        </Box>
                        

                      
                         ))}
                    </div>



                </div>

                </>
              )}
           </div>

         </Container>
      </>    //BasicScrollable
    )
}



function DisplayPack(  { isLoading ,  data,  theme  ,  openPack  } ){


    return(
        <>
            
                   {!isLoading ? (

                  
                    data?.map((pack, index) => (
                        
                         <Box key={index} sx={theme.pack.nftCard }>    
 
                            <ThirdwebNftMedia  metadata={ pack.metadata }
                             className={ stylesNFT.nftImage}  style={{ background : theme.palette.nftImage  }} 

                            />
                            
                            
                            <Box sx={ theme.pack.myCardInfo }>
                                <Typography sx={ theme.pack.name }  >{pack.metadata.name}</Typography>
                                <Typography sx={ theme.pack.myCardInfo_p } >Qty: {pack.quantityOwned}</Typography>
                            </Box>
                            <Web3Button
                                contractAddress={PACK_ADDRESS}
                                action={() => openPack(pack.metadata.id)}
                                className={styles.saleButton}
                            >Open Pack</Web3Button>

                             
                         </Box>
                       
                    ))
                    ) : (
                    <p>Loading...</p>
                    )}
      </>
    )
}
 