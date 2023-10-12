import {useEffect, useState} from "react";

import { Box } from "@mui/material";

import Grid from '@mui/material/Grid';          // Update this import
import Card from '@mui/material/Card';          // Update this import
import CardMedia from '@mui/material/CardMedia'; // Update this import
import ImageCard from "./ImageCard";
import { tokens } from "../theme";
  
 import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';//@mui/lab/ToggleButtonGroup';


import { useTheme } from "@mui/material";
const images = [
  '/img/1.png', '/img/1.png','/img/1.png',
  '/img/2.png',
  '/img/3.png','/img/4.png','/img/5.png','/img/6.png','/img/7.png','/img/8.png','/img/9.png','/img/10.png',
  // Add more image URLs here
];

const LayerGrid = ( { isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   
const [selectedCategories, setSelectedCategories] = useState([]); // State to track selected categories
 // Function to toggle the selected category
 const toggleCategory = (category) => {
 
  
  if (selectedCategories.includes(category)) {

    fetchCategoryData(category,false);
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  } else {
    fetchCategoryData(category,true);
    setSelectedCategories([...selectedCategories, category]);
  }

  console.log("category  =" +  category   +  "selectedCategories  "  + selectedCategories); // This will log the updated value of data

};

//==========================================================================
// pb added to fetch data
const [dataMap, setDataMap] = useState({}); 
const [data, setData] = useState(); // Set rowData to Array of Objects, one Object per Row

// useEffect(()=>{
//   (async ()=> {
     
//     const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=he`;
//      const result  = await fetch(endpoint);
//     const resultsJson = await result.json();
//     setData(resultsJson );
 
//    })();

// }, [ ]);
const fetchCategoryData = async (category, adding = true) => {
  if (adding) {
    try {
      // Fetch data for the category
      const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=${category}`;
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





useEffect(() => {
  //console.log("selectedCategories =", selectedCategories); // This will log the updated value of data
  console.log("data =", data); // This will log the updated value of data


}, [data]);
 
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
                      title={`Name ${obj.layerName}`}
                      extraInfo={`owner ${obj.walletshort}`}
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

export default LayerGrid;

 
// number/int would be the token ID

 function getNumber( input){
  //const input = "he09";
  const lastTwoDigits = parseInt(input.slice(-2), 10)
   return lastTwoDigits;
 }
const layerToInt = new Map([
  ["he01", 8],["he02", 7],["he03", 6],["he04", 5],["he05", 4],["he06", 3],["he07", 2],["he08", 1],
  
  ["he09", 10],["he10", 9]
]);

