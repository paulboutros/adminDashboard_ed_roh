
import React, {   useEffect, useState } from 'react';
import {  useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import {useContract, useOwnedNFTs} from "@thirdweb-dev/react";
import {   useParams } from 'react-router-dom';
  
import { Discord_tokenLess_stakinContract   } from '../../const/addresses.ts';
  
import NFTGrid from '../../components/NFTGrid';
 


//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======




  export const myPacksIdx = 0;
  export const referralRewardTabIndex =1;

export default function BasicTabs() {
   
     const { selectedChain, setSelectedChain } = useContext(ChainContext);
     const theme = useTheme();
     
    const { contract } = useContract(  addressesByNetWork[selectedChain].LAYER_ADDRESS );
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
  //     contract = await sdk.getContract(TOO LS_ADDRE SS);
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
          NFT_contract={  addressesByNetWork[selectedChain].LAYER_ADDRESS }
          NFTdata={data}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
          // overrideOnclickBehavior={(nft) => { setSelectedNft(nft); }}
        />
      )}

    </Container>


    </React.Fragment>
   
  );
 


 
}


