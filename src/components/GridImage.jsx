
import Tooltip from '@mui/material/Tooltip';
import {useEffect, useState} from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
import { formatTimestampToCustomFormat ,  formatMilliseconds} from  "../Utils/utils.js"

import CardMedia from '@mui/material/CardMedia'; // Update this import

import { tokens } from "../theme";
  
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider


 import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';//@mui/lab/ToggleButtonGroup';


import { useTheme } from "@mui/material";
 
 let i =0;
const GridImage = ( {queryId ="", isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { user } = useUserContext();
   
const [selectedCategories, setSelectedCategories] =   useState(["he"]); // useState(["he","sh"]); // State to track selected categories

//toggleCategory("he")
 // Function to toggle the selected category
 const toggleCategory = (category) => {
 
  return;
  if (selectedCategories.includes(category)) {

    fetchCategoryData(category,false);
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  } else {
    fetchCategoryData(category,true);
    setSelectedCategories([...selectedCategories, category]);
  }

 // console.log("category  =" +  category   +  "selectedCategories  "  + selectedCategories); // This will log the updated value of data

};

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
  


   
  if (!notification)return;
 if (!user)return;
  FetchTempGiveAway();
  console.log( "  USE EFFETC notification    " , notification );
  
 
}, [notification , user , isDashboard]);

// !warning.  useState is asynchronous .. queryId changes will take effect on next render (also to rendering batching reason)

 
useEffect(() => {

  
  
  selectedCategories.forEach((category) => {
    fetchCategoryData(category,true);
  });
}, [queryId  ,isDashboard , notification  ]);
 
 

async function RevealAndAdd( index, ID ){

  
  try {
/*
    const config = {
      withCredentials: true, // Include cookies
      headers: {
        'Content-Type': 'application/json', // Set the content type as needed
      },
    };*/
   

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







const fetchCategoryData = async (category , adding = true) => {
    
 //  console.log("fetchCategoryData: queryId  >>>>>>>>>>>   " +  queryId   +  "  i  "   +  i  + "adding  " +  adding);
    i++;
  if (adding) {
    try {
      
      const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=${category}${queryId}`;
      const result = await fetch(endpoint);
      let resultsJson = await result.json();
 
     // console.log("  === findUsersWithNonZer "  ,resultsJson );
  
      const transform_Results = [];

resultsJson.forEach((user) => {
  const { discord, wallet, layers } = user;

  Object.entries(layers).forEach(([category, categoryLayers]) => {
    categoryLayers.forEach((layerName) => {
      const walletshort = wallet.slice(0, 6) + '...' + wallet.slice(-4); // Example shortening of wallet

      transform_Results.push({
        discord,
        wallet,
        [`${category}${layerName}`]: 1,
        category,
        layerName: layerName.toString(),
        walletshort,
      });
    });
  });
});
       

        resultsJson = transform_Results;

        

       set_ownedLayer(resultsJson);

      
 
      // Add or update the category data in dataMap
    setDataMap((prevDataMap) => ({
        ...prevDataMap,
        [category]: resultsJson,
      }));
 
 
 

    } catch (error) {
      console.error(`Error fetching data for ${category}: ${error}`);
    }


  } else {
    /*
    // Removing the category from dataMap
    setDataMap((prevDataMap) => {
      const newDataMap = { ...prevDataMap };
      delete newDataMap[category];
      return newDataMap;
    });
        */
  }
 

};
 

useEffect(() => {
  const flatDataArray = Object.values(dataMap).reduce((accumulator, categoryData) => {
    // Use the spread operator to merge the category data arrays into the accumulator
    return [...accumulator, ...categoryData];
  }, []);


  //console.log("  ===  dataMap "   + JSON.stringify(dataMap, null, 2));

  // Now, flatDataArray contains all data from all selected categories
  setData(flatDataArray);
}, [dataMap  , notification]);
 
 
  const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
 
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
          sx={{
            "& .MuiCardMedia-root": {
               height: "100%",  width: "100%" ,
               backgroundColor: colors.blueAccent[700],
            }
          }}
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

      {data && transformedResults && transformedResults.length>0 ? (
          
         <Box m="40px 0 0 0" > 
 
        <Grid container spacing={2}>
            {transformedResults.map((result, index) => (

              
             

                <Grid item xs={4} sm={4} md={6} lg={3} key={index}>
                  <Card>
                    <ImageCard
                      image={`/${result.category}/${getNumber(result.layerName)}.png`}
                      title={`${result.layerName}`}
                      extraInfo={`owner ${result.walletshort}`}
                    />
                  </Card>
                </Grid>
              //))
            )
            )}
         </Grid>
  
       </Box>
 
          ) : (
            <div>Loading...</div> // You can replace this with a loading spinner or message
          )}

        </Box>
    </Box>
  );
};

export default GridImage;


// number/int would be the token ID
// should be utility function
 function getNumber( input){
  //const input = "he09";
  const lastTwoDigits = parseInt(input.slice(-2), 10)
   return lastTwoDigits;
 }
 
