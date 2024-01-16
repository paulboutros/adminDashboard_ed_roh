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
 import { useTheme, Box, Typography, Button, Tabs,Tab } from "@mui/material";
import { BootstrapTooltip, allCSS, tokens } from "../../theme";
 

import {   ConnectWalletPage  } from '../../components/ConnectWalletPage.jsx';
 
import {   BasicScrollable, RowChildrenAlignLeft } from '../../components/Layout';
import NFTListed from '../../components/FARMER/NFTlisted';
import { getOpenedPack, getSDK_fromPrivateKey, openPackServer } from '../../data/API';
import { useDebugModeContext } from '../../context/DebugModeContext';
import { CustomTabPanel, a11yProps } from '../../components/TabSubcomponent.jsx';
import { useUserContext } from '../../context/UserContext.js';
 
 
export default function MyPacks() {

  const address = useAddress();
    return (
         
       <> 

   <BasicScrollable>
       {!address ? (
         
             <ConnectWalletPage/>
            
       ):(
          <MyPackPage/>
          
       )}

    </BasicScrollable>
       </>     
    )
}

function MyPackPage(){
 


  const {user } = useUserContext();
  
  const tabInfo = [
    {name: "unopened",        index:0},
    {name: "opened",  index:1},
     
    
 ]
  let displayData={
    title: "Buy NFTs",
    description:"Browse which NFTs are available from the collection.",
    
    initialState:0,
    tabsNames : ["unopened", "opened"],
 }

 const [tab, setTab] = useState(   displayData.tabsNames[  displayData.initialState ] );   
 const [value, setValue] = React.useState(displayData.initialState);

 const handleChange = (event, newValue) => {
  setValue(newValue);

  
 setTab( displayData.tabsNames[newValue]    )
};


   

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
     const packResult = await openPackServer( address, user.ID);
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
                   <div style={ {  margin: 0, position: 'relative', transform: 'translateY(95%)'  }} >
             
              
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

  {/* <Typography sx={ theme.titleDescription }> Open your pack to reveal the NFT layers.</Typography> */}
    
   <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: "20px" }}>
      <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example" sx={theme.tabsStyle}>
               
      {/* <BootstrapTooltip   title="Open your pack to reveal the NFT layers."  placement="top">   */}
            
                <Tab label= { tabInfo[0].name }     {...a11yProps(   tabInfo[0].index   )}  disableRipple  sx={  theme.tabStyle }   />  
      {/* </BootstrapTooltip> */}
                <Tab label= { tabInfo[1].name }     {...a11yProps(   tabInfo[1].index   )}  disableRipple  sx={  theme.tabStyle }   />  
               
              
       </Tabs>
  </Box>

    <CustomTabPanel value={value} index={tabInfo[0].index}>
       
   
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
   


    </CustomTabPanel>
      
    <CustomTabPanel value={value} index={tabInfo[1].index}>
       <MyPackPageSimulation/> 
    

    </CustomTabPanel>

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

      <div className = {stylesBuy.nftGridContainer}   >
           {rewardNFTs.map((card, index) => (  
                   

                     
                   <Box key={index}   sx={{  height : "400px"}} > 
                    
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
 const{user} = useUserContext();


  

  useEffect(() => {
    
    
    const fetchData = async () => {
      try {
        // Async operations here
        const openedPackresult = await getOpenedPack( user.ID);

        console.log( "openedPack"  ,  openedPackresult.openedPack[0]  ); 
        openPackSimulation( 0 , openedPackresult.openedPack[0] );

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the asynchronous function
   
         
        
  }, [ ]); 

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
     
    

    async function openPackSimulation(packId ,  packResult ) {  
       let cardRewards;
      // const packResult = [2,10,35,43,27];
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
 

   return(  <>  
   
   {!rewardNFTs  && (
           <div className={styles.grid}>
 
      </div>
       )}
 
      <div  >
        { rewardNFTs && rewardNFTs?.length > 0 && (    
         
           
          <>
             
               
             
           <div>
                {/* <div  className = {stylesBuy.nftGridContainer} > */}
                  <SpinCardAnimation rewardNFTs={rewardNFTs} spinReady={spinReady} />  
                  <p>ooooooooooooooooooooooo </p>
                {/* </div> */}



          </div>

          </>
        )}
     </div>
    
   
   
   </>);

  
}

 