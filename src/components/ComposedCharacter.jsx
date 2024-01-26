import   React, { useEffect , useState } from 'react';

import {  useAddress } from '@thirdweb-dev/react'
 
import {  Box, Button, IconButton, Typography, useTheme, colors, Stack, Skeleton } from "@mui/material";
import { BiCoinStack } from "react-icons/bi";

 import { CustomLegend2 } from './Legend.jsx';
 
import {sendTracking, GetRewardPrice, convertEthToUsd   } from "../data/API.js"

  

import { BootstrapTooltip, allCSS, cool_orange, text1, text2, tokens  } from "../theme.js";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useAllLayersContext } from '../context/AllLayerAvailableContext.js'; 

   
import LayerBaseInfo from "./LayerBaseInfo.jsx";
  
 import PopupButton  from "./popup.jsx"
 import { CreateListing,CreateListingPack, UpdateAllNFTLayers, UpdateListing, UpdatePackMetaData, createBundle, mintToCollection } from '../util/updateMetadata.js';
import { BURN_TO_CLAIM, OWNER, OWNER2 } from '../const/addresses.ts';
import { HorizontalSpace, RoundedBox, RowChildrenAlignLeftBottom, VerticalSpace } from './Layout.jsx';
import { useDebugModeContext } from '../context/DebugModeContext.js';
import { AddressBlock } from './Badges/AddressBlock.jsx';
   

const LayerSelector = (  {queryId="" }  ) => {

  const { user } = useUserContext();
  const {debugMode, set_DebugMode} = useDebugModeContext();

  const [ ethToUsdRate, setEthToUsdRate ] = useState(0); 
useEffect(() => {
  // Function to fetch NFT data
  const fetchUSDrate = async () => {
 
    try {
    
        const result = await convertEthToUsd();
        setEthToUsdRate(result);  
    //  }

    } catch (error) {
      console.error('Error fetching NFT:', error);
    }
  };

  
  // Call the fetch functions when component mounts
  fetchUSDrate();
   
}, []); 

      
  const debugModeLayout = true;

    
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
 
      //$1000 in pool for WU 10 000 000 supply
      const WuUSDTprice = 1000/10000000 ;// 0.00001;



  
    return (
    
    <Box margin="0 8px 20px 8px" >
   
    <div>
       { (user && debugMode && 
           address &&
         ( address === OWNER || address === OWNER2) 
          
          
          ) && ( // address && address === OWNER?
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
        
            <Box gridColumn="span 8" gridRow="span 1" 
                 style={{  display: "flex", 
                   marginLeft :"30px",
                  alignItems: "center",
                  justifyContent: "flex-start" //  "center"

                  } } 
               
              >
            
                      <AddressBlock addressArg={ BURN_TO_CLAIM} /> 
 
             </Box>
 

             <Box gridColumn="span 4" gridRow="span 1"    >

            <Box  display="flex" justifyContent="flex-end" alignItems="center" height="100%"
                
            >
          

               
               {/*if you lock a combinasion, you still need to own the layer to claim, but only you can claim */}

                
               <Button variant="outlined" 
                    style={{
                        color:  cool_orange,// "#b4a770",
                        borderColor: cool_orange,// "#f0c435", // Set border color
                        height: "25px",borderWidth: '2px',
                        textTransform: 'none', // Prevent text from being transformed to uppercase
                    }} 
                     
                    >LOCK
            
               </Button > 
                

               <HorizontalSpace space={2}/>
              { selectedImages ? (
                
                  <PopupButton
                      text = {`CLAIM $WU`}     
 
                        style={{
                            color:    '#b4a770', //cool_orange,// '#b4a770',
                            borderColor:   '#f0c435',
                            height: '25px',// '50px',
                            width: '100px',
                            borderWidth: '2px',
                            textTransform: 'none',
                            marginRight: "50px"
                          
                        }}
                    selectedImages ={ selectedImages}
                 />
               ):(
                <p></p>
               )}
 

             {/* <IconButton> <DownloadOutlinedIcon sx={{ fontSize: "26px", color: colors.greenAccent[500] }}/></IconButton> */}
            
             </Box>
            </Box>

            <Box gridColumn="span 8" gridRow="span 8" >
                 <Box>  <ComposedCharacter images={selectedImages}/>  </Box>  
             </Box>
{/* 
       <Box gridColumn="span 2" gridRow="span 6" style={debugModeLayout ? { backgroundColor: "rgb(201, 74, 0, 0.05)" } : {}} >  <Box>
         
         <Typography color={colors.grey[ text2.color ]} >Reward price: </Typography>
           <Stack padding={"10px"}>
             <Typography color={colors.grey[ text1.color ]}  variant="h1" fontWeight="50">

               {` $${(  Number(RewardPrice) *WuUSDTprice ).toFixed(2) }`}  
                
             </Typography>
              
                
            </Stack>
            </Box>
               
        </Box>
        <Box gridColumn="span 2" gridRow="span 6" style={debugModeLayout ? { backgroundColor: "rgb(0, 74, 0, 0.1)" } : {}} > 
          <Stack>
            <Typography color={colors.grey[ text2.color ]} >Simulated rate: </Typography>

            <Typography    color= {colors.grey[ text2.color]}  
                     style={{ fontSize:"8px",   position: 'relative', bottom:"5px" }}  >
                   {` 1 WU = ${WuUSDTprice} USDT`}  
            </Typography>
   
            <Typography color={colors.grey[ text2.color ]} >reward in $WU: </Typography>
             <Typography variant="h4"  color= {colors.grey[ text2.color]}  
                     style={{  position: 'relative', bottom:"5px" }}  >
                   {` ${(  Number(RewardPrice) ).toFixed(2) } `}  
            </Typography>
            <Typography color={colors.grey[ text2.color ]} >reward in $ETH: </Typography>
             <Typography variant="h4"  color= {colors.grey[ text2.color]}  
                     style={{  position: 'relative', bottom:"5px" }}  >
                  {`${ (    (Number(RewardPrice) *WuUSDTprice )  / ethToUsdRate).toFixed(4) } `}
                  
            </Typography>
           </Stack>
        </Box>   */}
    
       
<Box gridColumn="span 4" gridRow="span 6"
   
   sx={ {
    //color:  colors.grey[ 400 ],
    paddingLeft :"90px" } }
     

  >  <Box>
         

         <div style={{ 
            color: colors.grey[400], fontWeight:"450",
            display: 'flex', alignItems: 'center'
            
            }}>

         <BootstrapTooltip  title="Reward contract Balance"  placement="left-start" >
         

               <React.Fragment>

                 <BiCoinStack  size={"15px"} />  

                 <Typography color={colors.grey[  300 ]} >reward in $WU: </Typography>

 
                <Typography variant="h4"  color= {colors.grey[ 300]}  
                        style={{  position: 'relative', bottom:"5px" }}  >
                      {` ${(  Number(RewardPrice) ).toFixed(2) } `}  
                </Typography>

                {/* <Typography  fontSize={"small"} fontWeight={"150"}> Balance: </Typography> */}
              

                 <Typography  fontSize={"small"} fontWeight={"150"}> 
                {/* { Number( ethers.utils.formatUnits(contractBalance._hex, 18)).toFixed(2) } */}
             </Typography>  
             </React.Fragment>
           
         <VerticalSpace space={"10px"}/>



        </BootstrapTooltip>
       </div> 
         <HorizontalSpace space={1}/> 
     
         <div  style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "space-between",
              alignItems: "center" 
 
         }}> 
    
                    <HorizontalSpace space={1}/> 
               
           </div>

 




           
           <Stack   >

{/*      
             <Box sx={
                 { 
                  borderRadius: 4,
                  backgroundColor: colors.primary[400],
                      border: `2px ${ colors.grey[ text1.color ]}`  

                 }
             } >
            <p  >Reward price: </p>

               <Box sx={  allCSS( theme.palette.mode, "140px","0px" ).addressBox  } >
                   <p color={colors.grey[ 800 ]}    fontWeight="500">

                    {` $${(  Number(RewardPrice) *WuUSDTprice ).toFixed(2) }`}  
               
                </p> 

                </Box>

             </Box> */}


              
            
                    <p  >Simulated rate: </p>

                  <Typography    color= {colors.grey[ 300  ]}  
                          style={{ fontSize:"8px",   position: 'relative', bottom:"5px" }}  >
                        {` 1 WU = ${WuUSDTprice} USDT`}  
                  </Typography>
 
                  <Box  sx={     {
                      width :"100px",
                      borderRadius:"5px",
                      // marginLeft:"80px",
                      // backgroundColor: "rgb(201, 74, 0, 0.05)"
                      
                      } } > 
                        <CustomLegend2 legendItems={legendItems} selectedImages={selectedImages} />
                  </Box>


                  
                  {/* <Typography color={colors.grey[ text2.color ]} >reward in $ETH: </Typography>
                  <Typography variant="h4"  color= {colors.grey[ text2.color]}  
                          style={{  position: 'relative', bottom:"5px" }}  >
                        {`${ (    (Number(RewardPrice) *WuUSDTprice )  / ethToUsdRate).toFixed(4) } `}
                       
                  </Typography>         */}
            
              


            </Stack>
            </Box>
               
        </Box>
          


            {/* <Box gridColumn="span 2" gridRow="span 2" style={debugModeLayout ? { backgroundColor: colors.primary[300] } : {}} > </Box> */}
            <Box gridColumn="span 4" gridRow="span 2"   >
           
            {/* <Box  sx={     {
              width :"100px",
              borderRadius:"5px",
              marginLeft:"80px",
              backgroundColor: "rgb(201, 74, 0, 0.05)"
              
              } } > 
                <CustomLegend2 legendItems={legendItems} selectedImages={selectedImages} />
           </Box> */}


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
     Click the following layers to test combination and see prize reward associated.
     <ImageSelector setSelectedImages={setSelectedImages}  selectedImages={selectedImages}  />

</div>
    
           
        </Box>
      </Box>
      
     </Box>
      
     </Box>
 

    );
  };
  
  export default LayerSelector;
  


// warning (check element on chrome to make sure it does not overlap the top-right button)
  const ComposedCharacter = ({ images }) => {


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
const ImageSelector = ({   setSelectedImages, selectedImages  }) => {
 
 
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
      setSelectedImages(null);

       
         // from 1 to 11
         
        // console.log( "Image COmposer:    allLayers   =  "  ,  allLayers   );
     // not that sometimes it reached this part of code code while
     //allLayers.lenght   so we added a check
      let he_rand = Math.floor(Math.random() * 10)+1;    const he = allLayers.he[he_rand];
      let sh_rand = Math.floor(Math.random() * 10)+1;    const sh = allLayers.sh[sh_rand];

      let we_rand = Math.floor(Math.random() * 10)+1;    const we = allLayers.we[we_rand];
      let be_rand = Math.floor(Math.random() * 10)+1;    const be = allLayers.be[be_rand];

      let kn_rand = Math.floor(Math.random() * 10)+1;    const kn = allLayers.kn[kn_rand];
      
      
      setSelectedImages( {
        forearn: [{ imagePath:GetCharacterBodyPartImage("fa",1),  layerName: 1, owning:0 }],  // Example image paths
        bo:      [{ imagePath:GetCharacterBodyPartImage("bo",1),  layerName: 1, owning:0 }], // Example image paths

        kn:      [{ imagePath: GetCharacterBodyPartImage("kn", kn_rand),  layerName: kn_rand, owning:kn.owning, tokenID:kn.tokenID  }], // Example image paths
        be:      [{ imagePath: GetCharacterBodyPartImage("be", be_rand),  layerName: be_rand, owning:be.owning, tokenID:be.tokenID  }],  // Example image paths
        we:      [{ imagePath: GetCharacterBodyPartImage("we", we_rand),  layerName: we_rand, owning:we.owning, tokenID:we.tokenID  }], // Example image paths
        
        collar:  [{ imagePath: GetCharacterBodyPartImage("co",1),  layerName: 1, owning:0 }], // Example image paths
        he:      [{ imagePath: GetCharacterBodyPartImage("he", he_rand),  layerName: he_rand, owning:he.owning, tokenID:he.tokenID  }], // Example image paths
        sh:      [{ imagePath: GetCharacterBodyPartImage("sh", sh_rand),  layerName: sh_rand, owning:sh.owning, tokenID:sh.tokenID  }]   // Example image paths
        
        
      }
         
      );
 
    
    }, [ allLayers ]);
 
  function GetCharacterBodyPartImage( category, designNumber ){

   return `layersForCharacterCompo/${category}/${designNumber }.png`;
}
//setSelectedImages which is SetSelected image passed by parent component
// will update images once we click on one image fromlayer selection bowar
  const handleImageSelect = (category, obj   ) => {

    const image = GetCharacterBodyPartImage( category, obj.layerName );// `${category}/${obj.layerName }.png`
  
     console.log(  " handle image select : " , obj  );
          
         
       sendTracking(user , category, image, "setSelectedImages" ,  "ComposedCharacter " );
  
       const updatedSelectedImages = { ...selectedImages };
 
       if (!updatedSelectedImages.hasOwnProperty(category)) {
         throw new Error(`Category '${category}' does not exist in selectedImages.`);
       }
        
    /*
       updatedSelectedImages[category] =
        [
          { imagePath:"layersForCharacterCompo/" + image, 
            layerName: obj.layerName,
            tokenID: obj.tokenID,
            owning: obj.owning, 
            name: obj.name
        }
      ]
 */
 
        updatedSelectedImages[category] = [
          {
            ...obj,//updatedSelectedImages[category][0], // Shallow copy of the existing object
            imagePath:   image // Update the imagePath property
          }
        ];
 
 
         
       
         setSelectedImages(updatedSelectedImages);
   
 
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
 