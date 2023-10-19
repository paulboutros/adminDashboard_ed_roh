import   { useEffect , useState } from 'react';

import {Grid, Box, Button, IconButton, Typography, useTheme } from "@mui/material";
 

import { tokens } from "../theme";
 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 

 
 
import Header from "./Header";
import LineChart from "./LineChart";
 
import GridAllLayer from "./GridAllLayer";  
import GridImage from "./GridImage";  
import GridDiscord from "./GridDiscord";  
import GridTwitter from "./GridTwitter";  
import BarChart from "./BarChart";
 
import ProgressCircle from "./ProgressCircle";
 






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


 
  const AppCompo = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedImages, setSelectedImages] = useState({
      
     forearn: 'layersForCharacterCompo/fa/1.png', // Example image paths
     body: 'layersForCharacterCompo/bo/1.png', // Example image paths
     belt: 'layersForCharacterCompo/be/1.png',  // Example image paths
     weapon: 'layersForCharacterCompo/we/1.png', // Example image paths
     
     collar: 'layersForCharacterCompo/co/1.png', // Example image paths
     head: 'layersForCharacterCompo/he/1.png', // Example image paths
     shield: 'layersForCharacterCompo/sh/1.png'  // Example image paths
     

    });
  
    return (
    //   <div>
    //    
    //     <ImageSelector imageDataset={imageDataset} onSelectImage={setSelectedImages}  selectedImages={selectedImages}  />
       
    //   </div>
    <Box m="20px" maxHeight="calc(88vh)" overflow="auto" >
    {/* HEADER */}
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Box>
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Reports
        </Button>
      </Box>
    </Box>

    {/* GRID & CHARTS */}
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      {/* ROW 1 */}
      
       

      {/* ROW 2 */}
      <Box
        gridColumn="span 8"
        gridRow="span 4"
        backgroundColor={colors.primary[400]}
      >
        <Box
          mt="25px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >


          <Box>
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.grey[100]}
            >
              NFT Composer
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              color={colors.greenAccent[500]}
            >
              
            </Typography>
          </Box>
          <Box>
          <Button variant="outlined"
           sx={{ typography: 'h3' , color: colors.greenAccent[500] }}
           style={{
            color: colors.greenAccent[500],
            borderColor: colors.greenAccent[500], // Set border color
            height: "30px",
            textTransform: 'none', // Prevent text from being transformed to uppercase
          }}
           
           >Mint</Button>
            <IconButton>
              <DownloadOutlinedIcon
                sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
              />
            </IconButton>
            <CustomLegend/> 
            
          </Box>
        </Box>
        <Box height="250px" m="-20px 0 0 0">


          {/* <LineChart isDashboard={true} /> */}
          <ImageComposer images={selectedImages} />


        </Box>
      </Box>



       
       
        
      {/* ROW 3 */}
      <Box
        gridColumn="span 4"
        gridRow="span 2"
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
           <ImageSelector imageDataset={imageDataset} onSelectImage={setSelectedImages}  selectedImages={selectedImages}  />
       
          {/* <ProgressCircle size="125" /> */}
          <Typography
            variant="h5"
            color={colors.greenAccent[500]}
            sx={{ mt: "15px" }}
          >
            $254 claimed
          </Typography>
          <Typography>Includes extra misc expenditures and costs</Typography>
        </Box>
      </Box>
      <Box
        gridColumn="span 8"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        overflow="auto" // overflowY
      >
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ padding: "30px 30px 0 30px" }}
        >
          Social Scores
        </Typography>
        <Box height="150px" mt="10px">
          <BarChart isDashboard={true} />
        </Box>
      </Box>

 
       {/* ROW 4 */}
       <Box
        gridColumn="span 6"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
       >
        <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
         Twitter Board
        </Typography>
         
          <GridTwitter  _height={220} _margin={"0px 0 0 0"}  isDashboard={true}  sx={{  marginBottom: "15px" }} />
         
      </Box>
       
      <Box
        gridColumn="span 6"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
       >
        <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
         Discord Board
        </Typography>
        <Box height="50px">
          <GridDiscord isDashboard={true}  sx={{ marginBottom: "15px" }} />
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
       

      <Box
        gridColumn="span 12"  gridRow="span 6"  backgroundColor={colors.primary[400]}  padding="30px"
       >
        <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
         Layer Board
        </Typography>
         
          <GridImage isDashboard={true}  sx={{ marginBottom: "15px" }} />
         
      </Box>

    </Box>
  </Box>






    );
  };
  
  export default AppCompo;





  const ImageComposer = ({ images }) => {
    return (
      <div style={{ position: 'relative', width: '600px', height: '600px' }}>
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
 
const ImageSelector = ({ imageDataset, onSelectImage, selectedImages }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useEffect(()=>{
        
        console.log("selectedImages = " + JSON.stringify(selectedImages));
      }, [ selectedImages ]);
    
    
const handleImageSelect = (category, image) => {
   
    /*
      onSelectImage((prevSelectedImages) => ({
 
        ...prevSelectedImages,
        [category]: "layersForCharacterCompo/"+image.src, // Assuming 'image' is an object with a 'url' property
  
      }));
 */
      const updatedSelectedImages = { ...selectedImages };

      if (!updatedSelectedImages.hasOwnProperty(category)) {
        throw new Error(`Category '${category}' does not exist in selectedImages.`);
      }
       // Update the value associated with the 'category' key
      updatedSelectedImages[category] = "layersForCharacterCompo/" + image.src;
    

      console.log("onSelectImage  CATEGO  = " + JSON.stringify(selectedImages));
      // Set the updated state using onSelectImage
      onSelectImage(updatedSelectedImages);

 

    };
    const customBorderColor = colors.blueAccent[700];
    const customBorderWidth = colors.greenAccent[500];
    const customOutlineColor =  colors.grey[500];
    return (
     
        <Box>
        {Object.entries(imageDataset).map(([category, images]) => (
          <Box key={category} mb={2}>
            <Typography variant="h6">{category}</Typography>
            <Grid container spacing={2}>
              {images.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <Box
                    sx={{
                      border: `${customBorderWidth} solid ${customBorderColor}`,
                      borderRadius: "16px",
                      cursor: 'pointer',
                      "&:hover": {
                        borderColor: customOutlineColor,
                      },
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.id}
                      onClick={() => handleImageSelect(category, image)}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={() => onSelectImage(selectedImages)}>
          Compose
        </Button>
      </Box>


    );
  };


  const CustomLegend = () => (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 10, height: 10, backgroundColor: "blue" }}></Box>
        <span>: Label 1</span>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: 10, height: 10, backgroundColor: "red" }}></Box>
        <span>: Label 2</span>
      </Box>
      {/* Add more legend items as needed */}
    </Box>
  );
  