
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

import {    Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";

import NFT from "./FARMER/NFT";

 

  
const GridImageXXX = ( { 
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
  //FetchTempGiveAway();
  //console.log( "  USE EFFETC notification    " , notification );
  
 
}, [notification , user  , NFTdata ]);

// !warning.  useState is asynchronous .. queryId changes will take effect on next render (also to rendering batching reason)

  
 

async function RevealAndAdd( index, ID ){

  
  try {
 

    const dataToSend= { 
      index: index  ,
       ID: ID 
    }

    const endpoint = `${process.env.REACT_APP_API_URL}RevealAndAdd`; // make it specific (filter to twitter fields)
    const result = await axios.post(endpoint, dataToSend/*, config*/);
 

    setNotification(result);
    //result.data.


} catch (error) {
  console.error(`Error RevelAndAdd  `);
}

 }

 

 
useEffect(() => {
  const flatDataArray = Object.values(dataMap).reduce((accumulator, categoryData) => {
    // Use the spread operator to merge the category data arrays into the accumulator
    return [...accumulator, ...categoryData];
  }, []);


  //console.log("  ===  dataMap "   + JSON.stringify(dataMap, null, 2));

  // Now, flatDataArray contains all data from all selected categories
  setData(flatDataArray);
}, [dataMap  , notification]);
 
 
  // const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
 
  return (
       

          <Box>
            <Box>
            <ToggleButtonGroup
              value={selectedCategories}
             // exclusive // This makes it work like radio buttons
              onChange={(_, newCategories) => {
                if (newCategories !== null) {
                   setSelectedCategories(newCategories); 
                }
              }}
              aria-label="Categories"
            >
              <ToggleButton value="he" onClick={() => toggleCategory("he")}>
                Head
              </ToggleButton>
              <ToggleButton value="we" onClick={() => toggleCategory("we")}>
                Weapon
              </ToggleButton>
              <ToggleButton value="sh" onClick={() => toggleCategory("sh")}>
                Shield
              </ToggleButton>
            </ToggleButtonGroup>

            <Box>
              {/* <p>Selected Categories: {selectedCategories.join(', ')}</p> */}
            </Box>
          </Box>

        <Box
          // sx={{
          //   "& .MuiCardMedia-root": {
          //      height: "100%",  width: "100%" ,
          //      backgroundColor: colors.blueAccent[700],
          //   }
          // }}
        >


     
    {TempGiveAway && TempGiveAway.giveAways && TempGiveAway.giveAways.length>0 ? (


       <Box m="40px 0 0 0" > 
 
            <Grid container spacing={2}>
           {TempGiveAway.giveAways
           .filter(result => !result.claimed)
             .map((result, index) => (
      

                <Grid item xs={4} sm={4} md={6} lg={3} key={index}>
                  <Card>
                  <CardActions>

                   <Tooltip title="Once claimed, Layer will be revealed added to you owner layer list, ready to be used">
                    <Button  variant="contained" color="primary" onClick={() => RevealAndAdd(index,user.ID  )}  size="small">claim</Button>
                   </Tooltip>
                  
                    {/* <Button  variant="contained" color={colors.grey[200]} size="small">Learn More</Button> */}
                  </CardActions>
                    <ImageCard
                      image={`/giveAway/unOpened.png`}
                      title={`${"GiveAway"}`}
                      extraInfo={`time${ formatTimestampToCustomFormat( result.time) }`}
                    />
                   
                  </Card>
                 
                  {/* <Button onClick={() => RevelAndAdd(index,user.ID)}>Reveal</Button> */}
                </Grid>
              
               ) 
            )}
            </Grid>
 
       </Box>
          ) : (
            <div>No layer awaiting</div> // You can replace this with a loading spinner or message
          )}
 {/* && transformedResults && transformedResults.length>0   */}
      {NFTdata && NFTdata.length > 0 ?(
       
         <Box m="40px 0 0 0" > 
 
        {/* <Grid container spacing={2}> */}

 
        <SimpleGrid columns={4} spacing={10}>
                 {NFTdata?.map(
                  
                  (nft) => 
                    !overrideOnclickBehavior ? (
                        <Link
                            to={`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`}
                            key={nft.metadata.id}
                        >
                        <NFT nft={nft} />
                        </Link>
                    ) : (
                        <div
                            to={nft.metadata.id}
                            onClick={() => overrideOnclickBehavior(nft)}
                        >
                            <NFT nft={nft} />
                        </div>
                    ))
                    
                    
                    
                 }


         {/* </Grid> */}
         </SimpleGrid>
       </Box>
 
          ) : (
            <div>Loading...</div> // You can replace this with a loading spinner or message
          )}

        </Box>
    </Box>
  );
};

export default GridImageXXX;


// number/int would be the token ID
// should be utility function
 function getNumber( input){
  //const input = "he09";
  const lastTwoDigits = parseInt(input.slice(-2), 10)
   return lastTwoDigits;
 }
 
