import   { useEffect , useState } from 'react';

import {  useAddress } from '@thirdweb-dev/react'


import {  Box, Button, IconButton, Typography, useTheme, colors } from "@mui/material";

import CustomLegend from "./Legend"
 
import {sendTracking, GetRewardPrice } from "../data/API"

 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 

import { tokens  } from "../theme";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useAllLayersContext } from '../context/AllLayerAvailableContext'; 

   
import LayerBaseInfo from "./LayerBaseInfo";
  
 import PopupButton  from "./popup"
 import { CreateListing,CreateListingPack, UpdateAllNFTLayers, UpdateListing, UpdatePackMetaData, createBundle, mintToCollection } from '../util/updateMetadata';
import { OWNER } from '../const/addresses';
import { RoundedBox } from './Layout';
import { useDebugModeContext } from '../context/DebugModeContext';
 
 
  const LayerSelector = (  {queryId="" }  ) => {

    const {debugMode, set_DebugMode} = useDebugModeContext();

     

      
  const debugModeLayout = false;

    
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
    const [selectedImages, setSelectedImages] = useState(null);
     

    const address = useAddress();
    





     const GetRewardPriceApp = async ( ) => {

      
        const kn = selectedImages["kn"][0].layerName;
        const he = selectedImages["he"][0].layerName;
        const sh = selectedImages["sh"][0].layerName;
        const we = selectedImages["we"][0].layerName;
        const be = selectedImages["be"][0].layerName;


        const knData = selectedImages["kn"][0];
        const heData = selectedImages["he"][0];
        const shData = selectedImages["sh"][0];
        const weData = selectedImages["we"][0];
        const beData = selectedImages["be"][0];

        let layerCombo ={
          kn: {  layerNumber: knData.layerName , tokenID: knData.tokenID } ,
          he: {  layerNumber: heData.layerName , tokenID: heData.tokenID } ,

          sh:{  layerNumber: shData.layerName , tokenID: shData.tokenID } ,
          we: {  layerNumber: weData.layerName , tokenID: weData.tokenID } ,
          be: {  layerNumber: beData.layerName , tokenID: beData.tokenID }  
        
        
     
       } 
   
    console.log("selectedImages  for price  =" ,selectedImages);

        
      try {
        
        
        const rewardPrizeObject = await GetRewardPrice( layerCombo);  // he,sh,we,be,kn
        

        // console.log("  >>>>>>  rewardPrizeObject" , rewardPrizeObject );
          SetRewardPrice ( rewardPrizeObject.finalRewardPrice.toFixed(2).toString()    );
         
        

      } catch (error) {
        console.error(`Error fetching data for he=${he}&sh=${sh}&we=${we}&be=${be}&kn=${kn}`);
      }
      
     
   };
  
       useEffect(()=>{
       if (!selectedImages) return;
       
         GetRewardPriceApp( );

        
       
      }, [ selectedImages ]);
 

  
    return (
    
    <Box margin="0 8px 20px 8px" >
   
    <div>
       { (debugMode && address && address === OWNER ) && ( // address && address === OWNER?
        <div><EditorButton/></div>)  }
         
 
    </div> 
      <Box display="flex" justifyContent="space-between" alignItems="center"> </Box>
 
      {/* GRID & CHARTS */}
      <Box  display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px">
       
      {/*The composed character image block*/}
      <Box gridColumn="span 8" gridRow="span 4" >  
           <RoundedBox>
          <Box margin = {"8px"} 
          
          backgroundColor = {colors.primary[400]}   
          
          borderRadius = {"10px"}  > 
    
          <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="69px" gap="0">
        
            <Box gridColumn="span 8" gridRow="span 1"   >

               {/* <Box  sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%" >
                 <Typography variant="h5"fontWeight="600" color={colors.grey[100]}>  NFT Composer </Typography>
               </Box> */}
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
                        text=   {`Claim $WU${RewardPrice}`}  
                        style={{
                            color: '#b4a770',
                            borderColor: '#f0c435',
                            height: '25px',
                            width: '150px',
                            borderWidth: '2px',
                            textTransform: 'none',
                            // Add any other custom styles here
                    }}
                    selectedImages ={ selectedImages}
               />
               ):(
                <p></p>
               )}
 

             <IconButton> <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }}/></IconButton>
            
            </Box>
            </Box>

            <Box gridColumn="span 8" gridRow="span 8" >

            <Box  >
                <ImageComposer images={   selectedImages  } />  
                  
                 </Box>  
             </Box>

            <Box gridColumn="span 2" gridRow="span 6" style={debugModeLayout ? { backgroundColor: colors.primary[100] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 6" style={debugModeLayout ? { backgroundColor: colors.primary[200] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 2" style={debugModeLayout ? { backgroundColor: colors.primary[300] } : {}} > </Box>
            <Box gridColumn="span 2" gridRow="span 2"  >
                <CustomLegend legendItems={legendItems} />
            </Box>

            </Box>
            </Box>
          </RoundedBox>
        </Box>
 
        
      {/* ROW 3 */}
      <Box
        gridColumn="span 4"
        gridRow="span 4"
        backgroundColor={colors.primary[500]}
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
     <ImageSelector onSelectImage={setSelectedImages}  selectedImages={selectedImages}  />

</div>
    
           
        </Box>
      </Box>
      
     </Box>
      
     </Box>
 

    );
  };
  
  export default LayerSelector;
  


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
      if (!allLayers || allLayers.lenght === 0)return;
      if ( allLayers.he === null ) return;
      if ( allLayers.sh === null ) return;
      if ( allLayers.we === null ) return;
      if ( allLayers.be === null ) return;
      if ( allLayers.kn === null ) return;
      const indexTotal = allLayers.he.length + allLayers.sh.length + allLayers.we.length + allLayers.be.length + allLayers.kn.length;
      if (indexTotal !== 55)return; // to make sure they are all length of 11
      onSelectImage(null);

       
         // from 1 to 11
         
        // console.log( "Image COmposer:    allLayers   =  "  ,  allLayers   );
     // not that sometimes it reached this part of code code while
     //allLayers.lenght   so we added a check
      let he_rand = Math.floor(Math.random() * 10)+1;    const he = allLayers.he[he_rand];
      let sh_rand = Math.floor(Math.random() * 10)+1;    const sh = allLayers.sh[sh_rand];

      let we_rand = Math.floor(Math.random() * 10)+1;    const we = allLayers.we[we_rand];
      let be_rand = Math.floor(Math.random() * 10)+1;    const be = allLayers.be[be_rand];

      let kn_rand = Math.floor(Math.random() * 10)+1;    const kn = allLayers.kn[kn_rand];
      
      
      onSelectImage( {
        forearn: [{ imagePath:`layersForCharacterCompo/fa/1.png`,  layerName: 1, owning:0 }]  ,  // Example image paths
        bo:      [{ imagePath:`layersForCharacterCompo/bo/1.png`,  layerName: 1, owning:0 }] , // Example image paths
        kn:      [{ imagePath:`layersForCharacterCompo/kn/${kn_rand }.png`,  layerName: kn_rand, owning:kn.owning, tokenID:kn.tokenID  }] , // Example image paths
        be:      [{ imagePath:`layersForCharacterCompo/be/${be_rand }.png`,  layerName: be_rand, owning:be.owning, tokenID:be.tokenID  }]  ,  // Example image paths
        we:      [{ imagePath:`layersForCharacterCompo/we/${we_rand }.png`,  layerName: we_rand, owning:we.owning, tokenID:we.tokenID  }] , // Example image paths
        
        collar:  [{ imagePath:`layersForCharacterCompo/co/1.png`,  layerName: 1, owning:0 }] , // Example image paths
        he:      [{ imagePath:`layersForCharacterCompo/he/${he_rand }.png`,  layerName: he_rand, owning:he.owning, tokenID:he.tokenID  }] , // Example image paths
        sh:      [{ imagePath:`layersForCharacterCompo/sh/${sh_rand }.png`,  layerName: sh_rand, owning:sh.owning, tokenID:sh.tokenID }]   // Example image paths
        
        
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
         tokenID: obj.tokenID,
          owning: obj.owning 
        
        }]
 
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

  function EditorButton(){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <div> 
                        
            <Button variant="contained" 
              sx={{backgroundColor: theme.debugModeColor }}
                onClick={() => createBundle() } >   
                 createBundle
            </Button> 
 
            <Button variant="contained" 
              sx={{backgroundColor: theme.debugModeColor  }}
                onClick={() => mintToCollection() } >   
                  mintToCollection
            </Button> 
 
            <Button variant="contained" 
              sx={{backgroundColor: theme.debugModeColor  }}
                onClick={() => UpdateListing() } >   
                  UpdateListing
            </Button>

            <Button variant="contained" 
              sx={{backgroundColor: theme.debugModeColor }}
                onClick={() => UpdatePackMetaData() } >   
                  UpdatePackMetaData
            </Button>
            
            
            <Button variant="contained" 
              sx={{backgroundColor: theme.debugModeColor  }}
                onClick={() =>  CreateListing() } >   
                  CreateListing
            </Button>

            <Button variant="contained" 
              sx={{backgroundColor: colors.redAccent[500]  }}
                onClick={() =>  CreateListingPack() } >   
                  CreateListingPack
            </Button>
            
            
            <Button variant="contained" 
              sx={{backgroundColor: colors.redAccent[500]  }}
                onClick={() =>  UpdateAllNFTLayers() } >   
                  UpdateAllNFTLayers
            </Button> 
 
        </div>

    )
  }
 