
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {  useAddress } from "@thirdweb-dev/react";


import React, { useState , useEffect } from 'react';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
  
import { tokens } from "../theme";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useAppLinkContext } from '../context/AppLinkContext.js';
import {sendTracking, openOAuth2Url, ERC20claim , testSDK } from "../data/API";

import {  Box ,Button,   Typography, useTheme  } from "@mui/material";

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

 
import LayerBaseInfo from  "./LayerBaseInfo";
    
import ReferrerComponent from "./ReferrerComponent"
import AppLinkDataBox from "./AppLinkDataBox";
import { useAllLayersContext } from '../context/AllLayerAvailableContext';




const PopupButton =  ({ text, style , selectedImages   }) => {
 
  

const address = useAddress();

    


  const { appLink } = useAppLinkContext();
    const { user } = useUserContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    sendTracking(user , "category", "image" , "Claim" ,  "imageComposer jsx")   ;
  const [open, setOpen] = useState(false);
 
  
  const filteredImages = GetfilteredImages(selectedImages);

  // this should be an Api call
 // user.address = address;
      
   useEffect(()=>{
    if (!address) return;
    
    CheckComBoValidity(filteredImages ,user , address);

     
    
   }, [ selectedImages ]);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
   

  return (
    <div>
 
          

      <Button variant="outlined" style={style} onClick={handleOpen}   >
         {text}
      </Button>

      <Dialog open={open} onClose={handleClose} >
        
      
      
       <div  sx={{  margin: "0px 0px 90px 0px"  }} >
        

      </div>

        <DialogContent     
        sx={{
          backgroundColor: colors.primary[400],
        //  padding: "20px 40px 0px 40px",
         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        
          
        }} 
         
         >

        {!user ? (
          
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >  
          <Box> 
           
             <Typography  fontWeight="100" sx={{ color: colors.grey[300]}} >
              
                <NotEnoughtLayerMessage status={1}  filteredImages={filteredImages} user={user} address={address}  />
            {/* To claim the reward, you must own all of the following
            layers marked with this icon: <CancelRoundedIcon sx={{ 
               color: colors.redAccent[500],position: 'relative',   top: '1px', left: '1px',  height :"15px"
               }} /> <br />
            If any layers are missing, you can quickly earn them by joining with Discord */}
            {/* If any layers are missing, you can quickly earn them by sharing the link below: */}
              </Typography>
           </Box>

            <Box sx={{
                display: 'flex',   justifyContent: 'space-between',  alignItems: 'center',   marginTop: '20px',  marginBottom:"20px"
               }} >
        
            <ButtonCTALoginFor2FreeLayers/>
            {/* <AppLinkDataBox/> */}
          
           </Box>
   

           </div>



         ) : (

          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >  
          <Typography
            fontWeight="100" 
            sx={{padding: "20px 20px 0px 20px",   color: colors.grey[300]}} >
           
            <NotEnoughtLayerMessage status={2} filteredImages={filteredImages}  user={user} address={address}  />
                  
               </Typography>
                <Box sx={{  display: 'flex',  justifyContent: 'space-between',  alignItems: 'center',  marginTop: '20px',  marginBottom:"20px"
                 }} >
               <AppLinkDataBox/>
                        
              </Box>
 
            </div>

        )}
    
        
   

 

             

                   <Box > 

                  <LayerBaseInfo   
           layerToChooseFrom={ filteredImages}  
             handleImageSelect ={handleImageSelect} 
            colors ={colors}
            />
 


              </Box>  

             
 
          
        </DialogContent>
      </Dialog>
    </div>
  );
};


function GetfilteredImages( selectedImages ){
  const excludedKeys = ["forearn", "bo", "collar"];
  const filteredImages = Object.keys(selectedImages).reduce((result, key) => {
    if (!excludedKeys.includes(key)) {
      result[key] = selectedImages[key];
    }
    return result;
  }, {});

  return filteredImages;

}


function ButtonCTALoginFor2FreeLayers(){
  const { user } = useUserContext();
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
     return(


      <div>
      <Button
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
        padding: "10px 20px",
      }}
      onClick={() => openOAuth2Url(user)}
    >
      <DownloadOutlinedIcon sx={{ mr: "10px" }} />
      Login Now And Recieve 2 free Layers
    </Button>


    </div>
     )
 
}

function NotEnoughtLayerMessage( {status ,filteredImages, user , address}){
  //const { user } = useUserContext();
  const {allLayers} = useAllLayersContext();
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
//const filteredImages = GetfilteredImages(selectedImages);

    switch (status) {
      case 1:
        return (
         <div>
          
           { CheckComBoValidity(filteredImages ,user , address ) }
           <CancelRoundedIcon sx={{ 
         color: colors.redAccent[500],position: 'relative',   top: '1px', left: '1px',  height :"15px" }} /> <br />
        
         If any layers are missing, you can quickly earn them by joining with Discord
        </div>)
      case 2:
        return (<div>
        { CheckComBoValidity(filteredImages ,user , address) } 
        <CancelRoundedIcon sx={{ 
         color: colors.redAccent[500],position: 'relative',   top: '1px', left: '1px',  height :"15px" }} /> <br />  
         If any layers are missing, you can quickly earn them by sharing the link below:
            {/* Now, you can share or post the link. Every think someone open your link,  Discord will
             initiate the login process. If they decide to join, you will instantly recieve a new layer.

             On your profile page you can check, your new layers as well as the status of your invite link.
             Good luck! */}
        </div>);
      default:
        return <div>Default message</div>;
    }
      
 
}




export default PopupButton;


 




const handleImageSelect = (category, obj   ) => {
    // empty function just to have something to pass in the composant props..
    // may be use full later
    
   };


   

  function CheckComBoValidity(filteredImages, user, address){
   
    // testSDK( address );
    console.log("popup  user " , address  );
    console.log("CheckComBoValidity  address " , address  );
     if(!user) return;
      const missingCategories = [];

for (const category in filteredImages) {
  if (filteredImages[category][0].owning === 0) {
    console.log("Missing ", category , " info");
    missingCategories.push(category);
  }
}


 if (missingCategories.length > 0 ){

  //console.log("Missing Categories:", missingCategories);
 }else{ 

 


      ERC20claim(user.ID, filteredImages ,  address  );
   console.log("  you won !:" , address );
 }


   
    const missingCount =  missingCategories.length;
        switch (missingCount) {
          case 5:
            return ("To claim the reward, you must own all 5 of the following layers marked with this icon:") 
            case 4:case 3:
            return ( `To claim the reward, you must own the ${missingCount} layers marked with this icon:` );
            case 1:case 2:
              return ( 
                 `You are so close! Only ${missingCount} left to own, and the reward is yours! Great job!`
                  
                 );
              
          default:
            return (" You won !!!!!") ;
        }
 

  }



   