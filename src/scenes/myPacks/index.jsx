import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'

import stylesBuy from "../../styles/Buy.module.css";
import styles from    '../../styles/Home.module.css';
import stylesNFT from '../../styles/NFT.module.css';
import stylesFlip from '../../styles/CardFlipping.module.css';

import './FadeTransition.css'; // Import your CSS file

import Container from "../../components/Container/Container";
import { OWNER, PACK_ADDRESS, TOOLS_ADDRESS } from '../../const/addresses';
import React, { useState, useEffect } from 'react';
//import { PackRewards } from '@thirdweb-dev/sdk/dist/declarations/src/evm/schema';
 import { useTheme, Box, Typography, Button } from "@mui/material";
import { allCSS, tokens } from "../../theme";


import {   ConnectWalletPage  } from '../../components/ConnectWalletPage.jsx';
 
import {   RowChildrenAlignLeft } from '../../components/Layout';
import NFTListed from '../../components/FARMER/NFTlisted';
import { getSDK_fromPrivateKey, openPackServer } from '../../data/API';
import { useDebugModeContext } from '../../context/DebugModeContext';
 
export default function MyPacks() {

  const address = useAddress();
    return (
         
       <> 
       {!address ? (
          // <ComponentB />
          // <FadeTransition/>
            // <MyPackPageSimulation/>
             <ConnectWalletPage/>
            
       ):(
          <MyPackPage/>
          
       )}
       </>     
    )
}

function MyPackPage(){
 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const address = useAddress();

   const { contract } = useContract(PACK_ADDRESS  ); // this is no longer a pack but a regular erc1155


   // the ERC1155 pack itself, keeping track of the amount of pack left .. 55 initial supply
  const {data: packData, isLoading } = useOwnedNFTs(contract, address);

  const [rewardNFTs, setRewardNFTs] = useState(); // <PackRewards>
   const [spinReady, setSpinReady] = useState([false,false,false,false,false,false]); // <PackRewards>
  
   const {debugMode, set_DebugMode} = useDebugModeContext();

  useEffect(() => {
       
      if (rewardNFTs) {   delayedLoop(true);  }
        
     
    }, [rewardNFTs]);  


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
          cardRewards = await contract?.open(parseInt(packId), 1); // do not use this 
      }else{
     const packResult = await openPackServer( address );
     const erc1155Rewards =[];

      packResult.forEach(element => {
           erc1155Rewards.push(
             {  tokenId: element , contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 } 
           );
     });
     cardRewards = { erc1155Rewards };
 
      }


        
     //  console.log(cardRewards);
       // load all the nft first, once loaded we do the spin animation
      
           const sdk = getSDK_fromPrivateKey(); 
           const nftContract = await sdk.getContract(TOOLS_ADDRESS);
           const reward_NFTs = [];
           for ( let i = 0; i <  cardRewards.erc1155Rewards.length; i++ )  { 
                 const card       = cardRewards.erc1155Rewards[i];
                 const he_tokenId = parseInt(  card.tokenId  );  
                 const nftres     = await nftContract.erc1155.get( he_tokenId );
                 reward_NFTs.push(nftres);
           } 
           setRewardNFTs(reward_NFTs);
         
        // we set the delay once  reward_NFTs is fully updated using useEffect
        // it is safer this way so spin animation starts only when NFT reward are loaded, then trigger
        // delayedLoop( true );
  }; 


  useEffect(() => {
       
    if (!packData) return;

     console.log  ("data from pack " , packData );
      
   
  }, [packData]);  


   return(

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
   
              
               { debugMode  && (
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

   {/* pack is not open here, or reward is not defined */}
     {!rewardNFTs  && (
           <div className={styles.grid}>

            <DisplayPack isLoading={isLoading}  packData={packData}   theme={theme}   openPack ={openPack} /> 
        

      </div>
       )}


      <div  >
        { rewardNFTs && rewardNFTs?.length > 0 && (    
         
           
          <>
             <>  <h3>Pack Rewards:</h3>  </>
               
             
           <div>
                {/* <div  className = {stylesBuy.nftGridContainer} > */}
                  <SpinCardAnimation rewardNFTs={rewardNFTs} spinReady={spinReady} />
                {/* </div> */}



          </div>

          </>
        )}
     </div>

   </Container>

    </> 


   )
}



function DisplayPack(  { isLoading ,  packData,  theme  ,  openPack  } ){
 

    return(
        <>
            
                   {!isLoading ? (

                  
                packData?.map((pack, index) => (
                        
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

function SpinCardAnimation(  {rewardNFTs , spinReady  }){

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  return(
        <React.Fragment>

      <div className = {stylesBuy.nftGridContainer} >
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





        </React.Fragment>
 
  )
}


function MyPackPageSimulation(){
 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  //const address = useAddress();

  // const { contract } = useContract(PACK_ADDRESS  ); // this is no longer a pack but a regular erc1155

  //const { data, isLoading } = useOwnedNFTs(contract, address);

  const [rewardNFTs, setRewardNFTs] = useState(); // <PackRewards>
   const [spinReady, setSpinReady] = useState([false,false,false,false,false,false]); // <PackRewards>
  
   const {debugMode, set_DebugMode} = useDebugModeContext();

  useEffect(() => {
       
      if (rewardNFTs) {   delayedLoop(true);  }
        
     
    }, [rewardNFTs]);  


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
     
    

  async function openPackSimulation(packId) { // : string
      let cardRewards;
       
      
        const packResult = [2,10,35,43,27];
     const erc1155Rewards =[];

      packResult.forEach(element => {
           erc1155Rewards.push(
             {  tokenId: element , contractAddress: TOOLS_ADDRESS, quantityPerReward: 1 } 
           );
     });
     cardRewards = { erc1155Rewards };
  


        
     //  console.log(cardRewards);
       // load all the nft first, once loaded we do the spin animation
      
           const sdk = getSDK_fromPrivateKey(); 
           const nftContract = await sdk.getContract(TOOLS_ADDRESS);
           const reward_NFTs = [];
           for ( let i = 0; i <  cardRewards.erc1155Rewards.length; i++ )  { 
                 const card       = cardRewards.erc1155Rewards[i];
                 const he_tokenId = parseInt(  card.tokenId  );  
                 const nftres     = await nftContract.erc1155.get( he_tokenId );
                 reward_NFTs.push(nftres);
           } 

           /*  once  reward_NFTs is no longer null:
             1) cards code/grid can be rendered
             2) spinner delay is trigger, see  UseEffect [reward_NFTs] dpendency
           */
           setRewardNFTs(reward_NFTs);
         
        // we set the delay once  reward_NFTs is fully updated using useEffect
        // it is safer this way so spin animation starts only when NFT reward are loaded, then trigger
        // delayedLoop( true );
  }; 


   


   return(

    <> 
    <Container maxWidth="lg">    
    <RowChildrenAlignLeft>
  <Typography sx={ theme.title }> My Packs Simulation </Typography>
  <div style={ {
                                  margin: 0,
                                  position: 'relative',
                                  
                                  transform: 'translateY(95%)',
                              }} >  
   
              
               { debugMode  && (
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

         <Button variant="contained"
           onClick= {openPackSimulation} > 
            Simulate Open Pack
             </Button>
           
         

         

        
            {/* <DisplayPack isLoading={isLoading}  packData={packData}   theme={theme}   openPack = {openPackSimulation} />  */}
        

      </div>
       )}


      <div  >
        { rewardNFTs && rewardNFTs?.length > 0 && (    
         
           
          <>
             <>  <h3>Pack Rewards Simulation:</h3>  </>
               
             
           <div>
                {/* <div  className = {stylesBuy.nftGridContainer} > */}
                  <SpinCardAnimation rewardNFTs={rewardNFTs} spinReady={spinReady} />
                {/* </div> */}



          </div>

          </>
        )}
     </div>

   </Container>

    </> 


   )
}


const FadeTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  return (

    <div className={`fade-container ${isVisible ? 'visible' : 'hidden'}`}>
     <Box   
        width= "100px"   height= "100px" 
        sx={{background: "red"}}
       ></Box>
  </div>
  );
};
 