
import Tooltip from '@mui/material/Tooltip';
import {useEffect, useState} from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

import { evolve } from "../utils/updateMetadata.js"
import CardActions from '@mui/material/CardActions';
 
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
import { formatTimestampToCustomFormat ,  formatMilliseconds} from  "../utils.js"

import CardMedia from '@mui/material/CardMedia'; // Update this import

import { tokens } from "../theme";
  
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider


 import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';//@mui/lab/ToggleButtonGroup';


import { useTheme } from "@mui/material";
 

 
import { useContract, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
import {
   // LAYER_EDITION_ADDRESS,
    TOOLS_ADDRESS ,
    
    REWARDS_ADDRESS

} from "../const/addresses";  
//import  { SetLayerSupply } from "../../data/API"
//import Link from "next/link";
import { Link } from 'react-router-dom';
 import { BigNumber, ethers } from "ethers";

import { Text, Skeleton ,  Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";

import NFT from "./FARMER/NFT";

 

/*
 Called from 
 1) All layer image
 2) Sell NFT
*/
  
const NFTGrid = ( { 
                   isLoading,
                  NFTdata,
                  overrideOnclickBehavior,
                  emptyText = "No NFTs found" 
 
}  ) => {
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useUserContext();
    

//==========================================================================
// pb added to fetch data
const [dataMap, setDataMap] = useState({}); 
  

const { notification, setNotification } = useNotificationContext();
  
useEffect(() => {
  
  // console.log( ">>>>>>>>>>   NFTdata     =" , NFTdata ) ;    
  
   
  if (!notification)return;
 if (!user)return;
  
}, [notification , user  , NFTdata ]);
 
 
 
  /*
   overrideOnclickBehavior  has 2 behavior when clicking on the NFT
   1) you are redirected toward the detialed page of the NFT
   2) you select that Nft as the Nft you want to sell, so it directs you toward the sell
    page, to sell that specific/selected NFT
  */
// 
  return (
    <SimpleGrid columns={4} spacing={6} w={"100%"} padding={2.5} my={5}>
    {isLoading ? (
        [...Array(20)].map((_, index) => (
            <Skeleton key={index} height={"312px"} width={"100%"} />
        ))
        // WARNING REPO reffer to NFT data as "data" instead of "NFTdata" i our case
    ) : NFTdata && NFTdata.length > 0 ? (
            NFTdata.map((nft) => 
            !overrideOnclickBehavior ? (
  
               
                <Link
                   to={`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`}
                   key={nft.metadata.id}
                >
                  <NFT nft={nft} />

               
                </Link>
            ) : (
                <div
                    key={nft.metadata.id}
                    onClick={() => overrideOnclickBehavior(nft)}
                >
                     <NFT nft={nft} />
                </div>
            )
            
            )

            
    ) : (
        <Text>{emptyText}</Text>
    )}
</SimpleGrid>  
 
  );
};

export default NFTGrid;

 
 
