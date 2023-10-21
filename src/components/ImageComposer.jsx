import   { useEffect , useState } from 'react';

import {Grid, Box, Button, IconButton, Typography, useTheme, colors } from "@mui/material";
import CardMedia from '@mui/material/CardMedia';

//import API from "../data/API"

import {sendTracking} from "../data/API"
import { tokens } from "../theme";
 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
 
import Card from '@mui/material/Card';  
 
 
import GridAllLayer from "./GridAllLayer";  
 
 

// loads images in dataset

// Define the base directory where the images are located.
const baseDir = 'layersForCharacterCompo';

const imageDataset = {
    head: [
      { id: 1, src: 'he/1.png', alt: 'Head 1' },
      { id: 2, src: 'he/2.png', alt: 'Head 2' },
      { id: 3, src: 'he/3.png', alt: 'Head 3' },
    ],
    
    shield: [
      { id: 1, src: 'sh/1.png', alt: 'Shield 1' },
      { id: 2, src: 'sh/2.png', alt: 'Shield 2' },
      { id: 3, src: 'sh/3.png', alt: 'Shield 3' },
    ],
    weapon: [
      { id: 1, src: 'we/1.png', alt: 'Weapon 1' },
      { id: 2, src: 'we/2.png', alt: 'Weapon 2' },
      { id: 3, src: 'we/3.png', alt: 'Weapon 3' },
    ],
    belt: [
        { id: 1, src: 'be/1.png', alt: 'belt 1' },
        { id: 2, src: 'be/2.png', alt: 'belt 2' },
        { id: 3, src: 'be/3.png', alt: 'belt 3' },
      ],
    collar: [
        { id: 1, src: 'co/1.png', alt: 'collar 1' }
        
      ],

    body: [
      { id: 1, src: 'bo/1.png', alt: 'Body 1' }
       
    ], 
    forearn: [
        { id: 1, src: 'fa/1.png', alt: 'forearm 1' }
         
      ]  
  };

  function getNumber( input){
    //const input = "he09";
    const lastTwoDigits = parseInt(input.slice(-2), 10)
     return lastTwoDigits;
   }
 
  const LayerSelector = (  {queryId="" }  ) => {
 
    const [dataMap, setDataMap] = useState({}); 
    const [data, setData] = useState(); // Set rowData to Array of Objects, one Object per Row

    const fetchCategoryData = async (category  ) => {
    
     
   
        try {
          // Fetch data for the category
           const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=${category}${queryId}`;
          const result = await fetch(endpoint);
          const resultsJson = await result.json();
     
          console.log(JSON.stringify(resultsJson, null, 2));

          // Add or update the category data in dataMap
          setDataMap((prevDataMap) => ({
            ...prevDataMap, // Spread the existing data
            [category]: resultsJson, // Add or update the category with the new value
          }));


        } catch (error) {
          console.error(`Error fetching data for ${category}: ${error}`);
        }
        
       
     };


    useEffect(() => {
        
        fetchCategoryData("he");  fetchCategoryData("we"); fetchCategoryData("sh"); 
    }, [ ]);
     
      useEffect(() => {
  const flatDataArray = Object.values(dataMap).reduce((accumulator, categoryData) => {
    // Use the spread operator to merge the category data arrays into the accumulator
    return [...accumulator, ...categoryData];
  }, []);

  // Now, flatDataArray contains all data from all selected categories
  setData(flatDataArray);
}, [dataMap]); 

      
  const debugMode = false;

    const { user } = useUserContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const legendItems = [
        { color: colors.blueAccent[400], label: 'Label 1' },
        { color: colors.blueAccent[500], label: 'Label 2' },
        { color: colors.greenAccent[400], label: 'Label 3' },
        { color: colors.greenAccent[500], label: 'Label 4' }
        // Add more legend items as needed
      ];



    const [selectedImages, setSelectedImages] = useState({
      
     forearn: 'layersForCharacterCompo/fa/1.png', // Example image paths
     bo: 'layersForCharacterCompo/bo/1.png', // Example image paths
     be: 'layersForCharacterCompo/be/1.png',  // Example image paths
     we: 'layersForCharacterCompo/we/1.png', // Example image paths
     
     collar: 'layersForCharacterCompo/co/1.png', // Example image paths
     he: 'layersForCharacterCompo/he/1.png', // Example image paths
     sh: 'layersForCharacterCompo/sh/1.png'  // Example image paths
     

    });
  
    return (
    
    <Box m="20px" >
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      
    </Box>

    {/* GRID & CHARTS */}
    <Box  display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
     
      
        <Box gridColumn="span 8" gridRow="span 4"  backgroundColor={colors.primary[400]}>
         
       {/* add color to set you grid element if needed  backgroundColor={colors.primary[200]}  */}
        <Box  display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="69px" gap="0">
     
            <Box gridColumn="span 8" gridRow="span 1"   >

            <Box  sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%" >
            <Typography variant="h5"fontWeight="600" color={colors.grey[100]}>  NFT Composer </Typography>

             
               </Box>
 
            </Box>

          
            <Box gridColumn="span 4" gridRow="span 1"    >
            <Box  display="flex" justifyContent="flex-end" alignItems="center" height="100%" >
          

              <Button variant="outlined"// sx={{ typography: 'h5' , color: "#65582B" }}
                    style={{
                        color:  "#b4a770",
                        borderColor:  "#f0c435", // Set border color
                        height: "25px",borderWidth: '2px',
                        textTransform: 'none', // Prevent text from being transformed to uppercase
                    }} > $50
          
               </Button>   

               <Button variant="outlined" //sx={{ typography: 'h5' , color: colors.greenAccent[500] }}
                    style={{
                        color: colors.greenAccent[500],
                        borderColor: colors.greenAccent[500], // Set border color
                        height: "25px",borderWidth: '2px',
                        textTransform: 'none', // Prevent text from being transformed to uppercase
                    }} >Mint
          
               </Button>
               
 


             <IconButton> <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }}/></IconButton>
            
               </Box>
           </Box>

            <Box gridColumn="span 8" gridRow="span 8" >

            <Box sx={{marginTop:-5,marginLeft:-3,   position: 'relative'    }} >
                 <ImageComposer   images={selectedImages} />  
                  
                 </Box>  
             </Box>

            <Box gridColumn="span 2" gridRow="span 6" style={debugMode ? { backgroundColor: colors.primary[100] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 6" style={debugMode ? { backgroundColor: colors.primary[200] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 2" style={debugMode ? { backgroundColor: colors.primary[300] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 2"  >
                <CustomLegend legendItems={legendItems} />
            </Box>

       </Box>
       </Box>

       
        
      {/* ROW 3 */}
      <Box
        gridColumn="span 4"
        gridRow="span 4"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600">
          Layers Selector
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mt="25px"
        >
            {data ? (

                
     

           <ImageSelector imageDataset={dataMap} onSelectImage={setSelectedImages}  selectedImages={selectedImages} data={data} />
           ) : (
            <div>Loading...</div> // You can replace this with a loading spinner or message
             )}


          {/* <ProgressCircle size="125" /> */}
           
        </Box>
      </Box>
       

 

      <Box
        gridColumn="span 12"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
       >
        <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
         Layer Board
        </Typography>
         
          <GridAllLayer isDashboard={true}  sx={{ marginBottom: "15px" }} />
         
      </Box>


       {/* ROW 5 */}
       

      

    </Box>
  </Box>
 

    );
  };
  
  export default LayerSelector;





  const ImageComposer = ({ images }) => {
    return (
      <div style={{  position: 'relative', width: '600px', height: '600px' }}>
        {Object.values(images).map((image, index) => (


         
          image && ( // Check if the image is not null
            <img
              key={index}
              src={image}
              alt={`Layer ${index + 1}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )
        ))}
      </div>
    );
};
 
const ImageSelector = ({ imageDataset, onSelectImage, selectedImages  ,  data }) => {

     const { user } = useUserContext();

   const _layerSelectorScrollareaHeight =520;

    

    


       useEffect(()=>{
        
      //  console.log(">>    selectedImages = " + JSON.stringify(selectedImages));
      }, [ selectedImages ]);
    
    
       const handleImageSelect = (category, image   ) => {


         
 
        sendTracking(user , category, image);


      const updatedSelectedImages = { ...selectedImages };

      if (!updatedSelectedImages.hasOwnProperty(category)) {
        throw new Error(`Category '${category}' does not exist in selectedImages.`);
      }
       // Update the value associated with the 'category' key
      updatedSelectedImages[category] = "layersForCharacterCompo/" + image ;//.src;
    

      console.log("onSelectImage  CATEGO  = " + JSON.stringify(selectedImages));
      // Set the updated state using onSelectImage
      onSelectImage(updatedSelectedImages);




    };
  
    return (
       
        <Box maxHeight="calc(75vh)"  overflow="auto" >
         

{data ? (




     <Box m="0 0 0 0" height= {_layerSelectorScrollareaHeight} > 
         <Grid container spacing={2}  >
         {Object.keys(imageDataset).map((category) => (

              
               imageDataset[category].map((obj, index) => (
                
                <Grid item xs={12} sm={6} md={4} key={index} >
                   <Card
              sx={{
                position: 'relative',
                border: colors.grey[500],
                backgroundColor: 'transparent',
              }}
            >
              <CardMedia
                component="img"
                src={`/${category}/${getNumber(obj.layerName)}.png`}
                alt={index}
                onClick={() =>
                  handleImageSelect(category, `${category}/${getNumber(obj.layerName)}.png`)
                }
                style={{
                  cursor: 'pointer',
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Card>
                </Grid>
              ))
            ))
        }

    </Grid>
       </Box>








) : (
    <div>Loading...</div> // You can replace this with a loading spinner or message
  )}





        
        {/* <Button variant="contained" color="primary" onClick={() => onSelectImage(selectedImages)}>
          Compose
        </Button> */}
      </Box>


    );
  };
                      
                                    

  const CustomLegend = ({ legendItems     }) => (
    <Box>
       {legendItems.map((item, index) => (
    <Box
      key={index}
      sx={{ marginLeft: '20px' }}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      height="100%"
    >
      <Box sx={{ width: 15, height: 10, backgroundColor: item.color }}></Box>
      <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>   {item.label} </Typography>
    </Box>
  ))}
    </Box>
  );
  