import   { useEffect , useState } from 'react';


import {Grid, Box, Button, IconButton, Typography, useTheme, colors } from "@mui/material";

import CustomLegend from "./Legend"
//import API from "../data/API"

import {sendTracking} from "../data/API"

 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 
import { tokens } from "../theme";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useAllLayersContext } from '../context/AllLayerAvailableContext'; 

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';  
 
import LayerBaseInfo from "./LayerBaseInfo";
import GridAllLayer from "./GridAllLayer";  
 
 import PopupButton  from "./popup"
 
 
  const LayerSelector = (  {queryId="" }  ) => {
 
   //  const [ownedLayers, setData] = useState(); // Set rowData to Array of Objects, one Object per Row

    const fetchCategoryData = async (category  ) => {
    
     
   
        try {
          // Fetch data for the category
            const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?layerPart=${category}${queryId}`;
          const result = await fetch(endpoint);
          const resultsJson = await result.json();
     

        

        //  setData(ownedLayers);

        } catch (error) {
          console.error(`Error fetching data for ${category}: ${error}`);
        }
        
       
     };


    useEffect(() => {
        
        fetchCategoryData("he");  fetchCategoryData("we"); fetchCategoryData("sh"); 
    }, [ ]);
     
 useEffect(() => {
    
}, [ ]); 

      
  const debugMode = false;

    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const legendItems = [
        { color: colors.blueAccent[400], label: 'Label 1' },
        { color: colors.blueAccent[500], label: 'Label 2' },
        { color: colors.greenAccent[400], label: 'Label 3' },
        { color: colors.greenAccent[500], label: 'Label 4' }
        // Add more legend items as needed
      ];
 
   const [RewardPrice, SetRewardPrice]= useState("0");  
    const [selectedImages, setSelectedImages] = useState(null
     


    );


     const GetRewardPrice = async ( ) => {

      
        const kn = selectedImages["kn"][0].layerName;
        const he = selectedImages["he"][0].layerName;
        const sh = selectedImages["sh"][0].layerName;
        const we = selectedImages["we"][0].layerName;
        const be = selectedImages["be"][0].layerName;
      try {
        
        console.log("  >>>>>>  GetRewardPriceGetRewardPrice   he =  " , he );

        const endpoint = `${process.env.REACT_APP_API_URL}GetReward?he=${he}&sh=${sh}&we=${we}&be=${be}&kn=${kn}`;
        const result = await fetch(endpoint);
        const rewardPrizeObject = await result.json();
 

         console.log("  >>>>>>  rewardPrizeObject" , rewardPrizeObject );
          SetRewardPrice ( rewardPrizeObject.finalRewardPrice.toString()    );
       
        

      } catch (error) {
        console.error(`Error fetching data for he=${he}&sh=${sh}&we=${we}&be=${be}&kn=${kn}`);
      }
      
     
   };
  
       useEffect(()=>{
       if (!selectedImages) return;
       
         GetRewardPrice( );

        
       
      }, [ selectedImages ]);
 

  
    return (
    
    <Box m="20px" >
   
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
          

               
               {/*if you lock a combinasion, you still need to own the layer to claim, but only you can claim */}
               <Button variant="outlined" 
                    style={{
                        color:  "#b4a770",
                        borderColor:  "#f0c435", // Set border color
                        height: "25px",borderWidth: '2px',
                        textTransform: 'none', // Prevent text from being transformed to uppercase
                    }} 
                     
                    >LOCK
            
               </Button >


              { selectedImages ? (
               <PopupButton
                        text=   {`Claim $${RewardPrice}`}  
                        style={{
                            color: '#b4a770',
                            borderColor: '#f0c435',
                            height: '25px',
                            width: '100px',
                            borderWidth: '2px',
                            textTransform: 'none',
                            // Add any other custom styles here
                    }}
                    selectedImages ={ selectedImages}
               />
               ):(
                <p></p>
               )}


                {/*save it as a remider, if you think you will soon be able to get all the layer to claim it*/}
               <Button variant="outlined"// sx={{ typography: 'h5' , color: "#65582B" }}
                    style={{
                        color:  "#b4a770",
                        borderColor:  "#f0c435", // Set border color
                        height: "25px",borderWidth: '2px',
                        textTransform: 'none', // Prevent text from being transformed to uppercase
                    }} >SAVE
          
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

            <Box  >
                <ImageComposer images={   selectedImages  } />  
                  
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
          
          
<div> 
     Click the following the layers to test combination and see prize reward associated.
     <ImageSelector  onSelectImage={setSelectedImages}  selectedImages={selectedImages}  />

</div>
          


          {/* <ProgressCircle size="125" /> */}
           
        </Box>
      </Box>
       
  
      

    </Box>
   </Box>
 

    );
  };
  
  export default LayerSelector;
 
function SelectedImages_filtered( selectedImages ){

     
  const excludedKeys = ["forearn", "bo", "collar"];
  const filteredImages = Object.keys(selectedImages).reduce((result, key) => {
    if (!excludedKeys.includes(key)) {
      result[key] = selectedImages[key];
    }
    return result;
  }, {});



}


// warning (check element on chrome to make sure it does not overlap the top-right button)
  const ImageComposer = ({ images }) => {


      if (!images)return null;


    return (
      <Box style={{  position: 'relative', width: '580px', height: '580px', top: 0  }}>
        { Object.values(images).map((image, index) => (


         // [{ imagePath:"layersForCharacterCompo/" + image,  layerName: 1, owning:0 }]
          image && ( // Check if the image is not null
            <img
              key={index}
              src= {image[0].imagePath} // {image}
              alt={`Layer ${index + 1}`}
              style={{
                position: 'absolute',
                top: -20,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          )
        )) 
        }
      </Box>
    );
};
 
 
// get all layers from user, and update to add owning, and supply info for
// also update selected image so they match the default character combination
const ImageSelector = ({   onSelectImage, selectedImages  }) => {
 

     const { user } = useUserContext();
    const { allLayers} = useAllLayersContext(); 
 

   const _layerSelectorScrollareaHeight =520;
   
  // getlayer supply should only change when a new layer is given away
   useEffect( ()=>{
      if (!allLayers)return;

      onSelectImage(null);

       
         // from 1 to 11
         
      const he_rand = Math.floor(Math.random() * 10)+1;    const he = allLayers.he[he_rand];
      const sh_rand = Math.floor(Math.random() * 10)+1;    const sh = allLayers.sh[sh_rand];

      const we_rand = Math.floor(Math.random() * 10)+1;    const we = allLayers.we[we_rand];
      const be_rand = Math.floor(Math.random() * 10)+1;    const be = allLayers.be[be_rand];

      const kn_rand = Math.floor(Math.random() * 10)+1;    const kn = allLayers.kn[kn_rand];
      
      
      onSelectImage( {
        forearn: [{ imagePath:`layersForCharacterCompo/fa/1.png`,  layerName: 1, owning:0 }]  ,  // Example image paths
        bo:      [{ imagePath:`layersForCharacterCompo/bo/1.png`,  layerName: 1, owning:0 }] , // Example image paths
        kn:      [{ imagePath:`layersForCharacterCompo/kn/${kn_rand }.png`,  layerName: kn_rand, owning:kn.owning }] , // Example image paths
        be:      [{ imagePath:`layersForCharacterCompo/be/${be_rand }.png`,  layerName: be_rand, owning:be.owning }]  ,  // Example image paths
        we:      [{ imagePath:`layersForCharacterCompo/we/${we_rand }.png`,  layerName: we_rand, owning:we.owning }] , // Example image paths
        
        collar:  [{ imagePath:`layersForCharacterCompo/co/1.png`,  layerName: 1, owning:0 }] , // Example image paths
        he:      [{ imagePath:`layersForCharacterCompo/he/${he_rand }.png`,  layerName: he_rand, owning:he.owning }] , // Example image paths
        sh:      [{ imagePath:`layersForCharacterCompo/sh/${sh_rand }.png`,  layerName: sh_rand, owning:sh.owning }]   // Example image paths
        
        
      }
         
      );
 
    
    }, [ allLayers ]);
 

//onSelectImage which is SetSelected image passed by parent component
// will update images once we click on one image fromlayer selection bowar
  const handleImageSelect = (category, obj   ) => {

    const image = `${category}/${obj.layerName }.png`
    //`${category}/${obj.layerName }.png`
 
          
         
         sendTracking(user , category, image, "setSelectedImages" ,  "ImageComposer " );
 
 
       const updatedSelectedImages = { ...selectedImages };
 
       if (!updatedSelectedImages.hasOwnProperty(category)) {
         throw new Error(`Category '${category}' does not exist in selectedImages.`);
       }
        // Update the value associated with the 'category' key
       //updatedSelectedImages[category] = "layersForCharacterCompo/" + image ;//.src;
     
       updatedSelectedImages[category] =
        [{ imagePath:"layersForCharacterCompo/" + image, 
         layerName: obj.layerName,
          owning: obj.owning }]
 
          console.log( "category" , category,    "OBJ  = ",  obj );
 
       console.log("onSelectImage  CATEGO  = ",  updatedSelectedImages );
       // Set the updated state using onSelectImage
       onSelectImage(updatedSelectedImages);
   
 
     };
    
  
    return (
       
        <Box maxHeight="calc(75vh)"  overflow="auto" >
        

     <Box m="0 0 0 0" height= {_layerSelectorScrollareaHeight} > 

      { allLayers ? ( 
           <LayerBaseInfo   
          //  layerToChooseFrom={ layerToChooseFrom}   allLayers
             layerToChooseFrom={ allLayers}   
             handleImageSelect ={handleImageSelect} 
            colors ={colors}
            />
            ):(

              <p> layer loading... </p>
            )
      }

       </Box>
 

        
        {/* <Button variant="contained" color="primary" onClick={() => onSelectImage(selectedImages)}>
          Compose
        </Button> */}
      </Box>


    );
  };
 