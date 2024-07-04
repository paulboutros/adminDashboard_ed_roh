
import {
  
   TOOLS_ADDRESS ,
   BURN_TO_CLAIM,
 
} 

from "../const/addresses";
 
  
 import { useContract, useAddress, Web3Button } from "@thirdweb-dev/react";
 
import React, { useState , useEffect } from 'react';
 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
  
import {  tokens } from "../theme";
  import {     ERC20claim   } from "../data/API";

import {  Box ,Button,      Typography, useTheme  } from "@mui/material";
 
 
import LayerBaseInfo from  "./LayerBaseInfo";
    
    
 
const PopupButton =  ({ text, style , selectedImages   }) => {
 
  

const address = useAddress();

    


  
    // const { user } = useUserContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [missingCategories, setMissingCategories] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
     
    const [open, setOpen] = useState(false);
   
   useEffect(()=>{
     
        if (!address) return;
      
        
        let filteredIm = GetfilteredImages(selectedImages);
        setFilteredImages(filteredIm);

        console.log( ">>>>    t filteredIm = GetfilteredImages(selectedImages);")
       
        const missingCateg =[];
        for (const category in filteredImages) {
            if (filteredImages[category][0].owning === 0) { missingCateg.push(category);}
       }
      setMissingCategories(missingCateg);

       //====
        console.log( ">>>>      missingCateg =", missingCateg)
  
     
   }, [ open , selectedImages ]); // selectedImages  // selectedImages // selectedImages
 
  const handleOpen = () => {
     setOpen(true); 
    
 
    // sendTracking(user , "category", "image" , "Claim" ,  "ComposedCharacter jsx")   ;
     
    
    };
 
  const handleClose = () => {setOpen(false);};
    

  //=====================================================================================
  //burn to claim:
   const { contract: wulirockLayerContract } = useContract(TOOLS_ADDRESS);

      const mintMutantNft = async (maycContract ) => {
    // 1. Check the approval of the mayc contract to burn the user's serum tokens
    const hasApproval = await wulirockLayerContract?.call("isApprovedForAll", [
      address,
      maycContract?.getAddress(),
    ]);
     //const balance = await wulirockLayerContract?.call("balanceOf", [address, 0]);

    if (!hasApproval) {
      // Set approval   THIS CAN ONLY BE DONE FROM CLIENT
      await wulirockLayerContract?.call("setApprovalForAll", [  maycContract?.getAddress(),  true,   ])  ;
       
       
   
    }

        
           
            await  ERC20claim( filteredImages ,  address  ) 
          //  await maycContract?.call("burnAndClaim", [address, tokenIdsToBurn ]);

  };


  //====================================================================

  return (
    <div>
  

      <Button variant="outlined" style={style} onClick={handleOpen}   >
         {text}
      </Button>

      <Dialog open={open} onClose={handleClose} >
        
      
      
       <div  sx={{  margin: "0px 0px 90px 0px"  }} ></div>
        

      

        <DialogContent     
            sx={{ backgroundColor: colors.primary[400], display: 'flex',  flexDirection: 'column', alignItems: 'center' }}
         
         >
         
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >  
          
           
            <NotEnoughtLayerMessage
             status={2} 
             filteredImages={filteredImages} 
         //     user={user}
               address={address} 
              missingCateg ={ missingCategories }
              />
                
     
    

            <Box sx={{  display: 'flex',  justifyContent: 'space-between',  alignItems: 'center',  marginTop: '20px',  marginBottom:"20px" }} >


               <Web3Button
                  contractAddress={BURN_TO_CLAIM}  
                  isDisabled ={
                     // !user ||  
                      !address ||
                      missingCategories?.length > 0 
                      }
                  action={async ( contract ) => await mintMutantNft( contract )} 
              
                  className="tw-web3button--connect-wallet"
                  style={{ backgroundColor:colors.blueAccent[700], width: '100%' }}
              >
               Burn to claim
               </Web3Button>   
                         
              </Box>
 
            </div>
  
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


export function GetfilteredImages( selectedImages ){
 
  const excludedKeys = ["forearn", "bo", "collar"];
  const filteredImages = Object.keys(selectedImages).reduce((result, key) => {
    if (!excludedKeys.includes(key)) {
      result[key] = selectedImages[key];
    }
    return result;
  }, {});



  console.log( "real name filteredImages  = " , filteredImages);
  return filteredImages;
 
}

 

 
function NotEnoughtLayerMessage( {status ,filteredImages, user , address, missingCateg }){
  //const { user } = useUserContext();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if(!missingCateg) {
    return("missingCateg");
  
  }
  
  if(!user) {
    return("To go further, Login with Discord");
  
  }



 
    switch (status) {
      case 1:
        return (
          <></>
        
        )
      case 2:
        return (
        
         <Typography
        fontWeight="100" 
        sx={{padding: "20px 20px 0px 20px",   color: colors.grey[300]}} > 

        { CheckComBoValidity(filteredImages /* ,user ,*/, address, missingCateg ) } 
        
         <br />  
         
        </Typography>
        
        
        );
      default:
        return <div>Default message</div>;
    }
      
 
}




export default PopupButton;


 




const handleImageSelect = (category, obj   ) => {
    // empty function just to have something to pass in the composant props..
    // may be use full later
    
   };


   

  function CheckComBoValidity(filteredImages,  /*user,*/ address, missingCateg ){
    
    

        /*  user_requirement_removed 
            if(!user) {
                 return("To go further, Login with Discord");
               
            }
         */
  

    const missingCount =  missingCateg.length;
        switch (missingCount) {
          case 5:
            return ("Welcome to the claiming section. In order To claim the reward,"+ 
              "you must own the 5 NFTs marked with this icon:") 
            //return ("To claim the reward, you must own all 5 of the following layers marked with this icon:") 
            case 4:case 3:
              return ( `Very Nice!
               You already own ${5-missingCount} of the NFT required to claim this reward combo,
               but you still need the ${missingCount} NFTs marked with this icon:`+
               `You current Wu Balance can certainly buy the missing NFTs` );
           //  return ( `To claim the reward, you must own the ${missingCount} layers marked with this icon:` );
            case 1:case 2:
              return ( 
                 `You are so close! Only ${missingCount} left to own, and the reward is yours! Great job!`
                  
                 );
              
          default:
            return (" You won !!!!!") ;
        }
 

  }
 

  export const PopupLinkWalletDiscord = ({  connectedWalletAddress, user, open, onClose, onConfirm }) => {
     
        //  code remove because we no longer connect wallet to a discord user
  };
 

   