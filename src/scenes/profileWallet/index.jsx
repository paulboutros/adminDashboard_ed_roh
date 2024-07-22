
 
import React, {   useEffect, useState } from 'react';
 

//import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

 import {Box, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import {  VerticalSpace } from '../../components/Layout';
 
import {useAllLayersContext }from '../../context/AllLayerAvailableContext.js';

//==============================================================
  
import {
  
 
  
   useContract,
   useOwnedNFTs
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
 

import {   useParams } from 'react-router-dom';
 //import { useParams } from 'react-router';
import RewardTokenTab from '../RewardTokenTab/index.jsx';
 
 import { Discord_tokenLess_stakinContract ,TOOLS_ADDRESS } from '../../const/addresses.ts';
  
//import { DebugPanel } from '../../components/Debug/DebugPanel.jsx';
 
import { CustomTabPanel, a11yProps } from '../../components/TabSubcomponent.jsx';
import { getSDK_fromPrivateKey } from '../../data/API';
import NFTGrid from '../../components/NFTGrid';
  
// horizontal space between  elements of the badges
  

  export const myPacksIdx = 0;
  export const referralRewardTabIndex =1;

export default function BasicTabs() {
 
   
 
  
     const theme = useTheme();
     
    const { contract } = useContract(TOOLS_ADDRESS);
    let {   initialTabIndex , address  } = useParams();
    const { data, isLoading } = useOwnedNFTs(contract,  address );

    if (initialTabIndex){
      initialTabIndex = Number(initialTabIndex);
    }else{

      initialTabIndex = 0;
    }
   
    const { contract: dist_tokenLessContract, isLoading: loading_dist_tokenLess } = useContract( Discord_tokenLess_stakinContract );
     

  const [value, setValue] = useState( initialTabIndex );
 
  const handleChange = (event, newValue) => { setValue(newValue); };
    
 

 
  useEffect(() => {  

    if (  data){



      console.log(`data >>>>>>>  = ${data}  `);

    } 
      
    }, [ data ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let amountOwned = 0;
  //     let contract;
  //     const sdk = getSDK_fromPrivateKey();
  //     contract = await sdk.getContract(TOOLS_ADDRESS);
  //     let request = 0;
  //     for (let i = 0; i < 55; i++) {
  //       var BalanceToken = await contract.call("balanceOf", [address, i]);
  //       const bigNumber = BalanceToken._hex;
  //       amountOwned = parseInt(bigNumber, 16);
  //      // console.log(`token page >>>>>>>>>>>>>>>. tokenId = ${i}  owned = ${amountOwned}    request   ${request}`);
  //       request++;
  //     }
  //   };
  
  //   fetchData();
  // }, []);
    


  return (
    <React.Fragment>

    <Container maxWidth="lg">
      {!isLoading && (
        <NFTGrid
          address={address}
          isLoading={isLoading}
          NFT_contract={TOOLS_ADDRESS}
          NFTdata={data}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
          // overrideOnclickBehavior={(nft) => { setSelectedNft(nft); }}
        />
      )}

    </Container>


    </React.Fragment>
   
  );
 


 
}


