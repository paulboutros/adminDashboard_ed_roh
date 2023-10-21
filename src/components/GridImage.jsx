import {useEffect, useState} from "react";

import { Box } from "@mui/material";

import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";

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
   
const [selectedCategories, setSelectedCategories] =   useState(["he","sh"]); // State to track selected categories

//toggleCategory("he")
 // Function to toggle the selected category
 const toggleCategory = (category) => {
 
  
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

 

useEffect(() => {
  // in this case we would be on the profile page
  
 
}, [user , isDashboard]);

// !warning.  useState is asynchronous .. queryId changes will take effect on next render (also to rendering batching reason)

 
useEffect(() => {

  
  
  selectedCategories.forEach((category) => {
    fetchCategoryData(category,true);
  });
}, [queryId  ,isDashboard ]);
 
 



const fetchCategoryData = async (category , adding = true) => {
    
   console.log("fetchCategoryData: queryId  >>>>>>>>>>>   " +  queryId   +  "  i  "   +  i  + "adding  " +  adding);
    i++;
  if (adding) {
    try {
      // Fetch data for the category
       const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=${category}${queryId}`;
      const result = await fetch(endpoint);
      const resultsJson = await result.json();

      // Add or update the category data in dataMap
      setDataMap((prevDataMap) => ({
        ...prevDataMap,
        [category]: resultsJson,
      }));
    } catch (error) {
      console.error(`Error fetching data for ${category}: ${error}`);
    }
  } else {
    // Removing the category from dataMap
    setDataMap((prevDataMap) => {
      const newDataMap = { ...prevDataMap };
      delete newDataMap[category];
      return newDataMap;
    });
  }

   
};




useEffect(() => {
  const flatDataArray = Object.values(dataMap).reduce((accumulator, categoryData) => {
    // Use the spread operator to merge the category data arrays into the accumulator
    return [...accumulator, ...categoryData];
  }, []);

  // Now, flatDataArray contains all data from all selected categories
  setData(flatDataArray);
}, [dataMap]);


 
 
 //MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img
 
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
      {data ? (
        // remember space /12 so space of 4 = 12/4 = 3 images per row .. 3 => 12/3 = 4 images per row
       <Box m="40px 0 0 0" height= {_height} > 
         <Grid container spacing={2}>
         {Object.keys(dataMap).map((category) => (

              
              dataMap[category].map((obj, index) => (
                <Grid item xs={4} sm={4} md={6} lg={3} key={index}>
                  <Card>
                    <ImageCard
                      image={`/${category}/${getNumber(obj.layerName)}.png`}
                      title={`${obj.layerName}`}
                      extraInfo={`owner ${obj.wallet}`}
                    />
                  </Card>
                </Grid>
              ))
))}

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
 
