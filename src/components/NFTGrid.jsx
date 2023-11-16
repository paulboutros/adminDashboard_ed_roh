
import Tooltip from '@mui/material/Tooltip';
import {useEffect, useState} from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

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

 

  
const GridImage = ( { 
                   isLoading,
                  NFTdata,
                  overrideOnclickBehavior,
                  emptyText = "No NFTs found" 
 
}  ) => {


  const address = useAddress();

    const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
    const { contract } = useContract(TOOLS_ADDRESS);
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useUserContext();
   
const [selectedCategories, setSelectedCategories] =   useState(["he"]); // useState(["he","sh"]); // State to track selected categories
 
 const toggleCategory = (category) => {};
  


//==========================================================================
// pb added to fetch data
const [dataMap, setDataMap] = useState({}); 
const [data, setData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [transformedResults, set_ownedLayer] = useState([]); // Set rowData to Array of Objects, one Object per Row
 
const [TempGiveAway, setTempGiveAway] = useState();  


const { notification, setNotification } = useNotificationContext();

async function  FetchTempGiveAway(){

  const endpoint_t = `${process.env.REACT_APP_API_URL}GetTempGiveAway?ID=${user.ID}`; // make it specific (filter to twitter fields)
  const result_t = await fetch(endpoint_t);
  let response_t = await result_t.json();
  
   
    
  setTempGiveAway(response_t.giveAwayTiming  );
   
  
 } 

useEffect(() => {
  
   console.log( ">>>>>>>>>>   NFTdata     =" , NFTdata ) ;    
  
   
  if (!notification)return;
 if (!user)return;
  
}, [notification , user  , NFTdata ]);
 
useEffect(() => {
  const flatDataArray = Object.values(dataMap).reduce((accumulator, categoryData) => {
    // Use the spread operator to merge the category data arrays into the accumulator
    return [...accumulator, ...categoryData];
  }, []);
  
  setData(flatDataArray);
}, [dataMap  , notification]);
 
 
  
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
            ))
    ) : (
        <Text>{emptyText}</Text>
    )}
</SimpleGrid>  
 
  );
};

export default GridImage;

 
 
