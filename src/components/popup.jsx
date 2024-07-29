  
 
  import { useContract, useAddress, Web3Button } from "@thirdweb-dev/react";
 
import React, { useState , useEffect } from 'react';
 
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
  
import {  tokens } from "../theme";
import {     ERC20claim  } from "../data/API";

 import {  Box ,Button,      Typography, useTheme  } from "@mui/material";
 import LayerBaseInfo from  "./LayerBaseInfo";
 
//=======
import ChainContext from "../context/Chain.js";
import { addressesByNetWork } from "../scenes/chainSelection/index.jsx";
import { useContext } from "react";
import { useAllLayersContext } from "../context/AllLayerAvailableContext.js";
 
 
  const PopupButton =  ({ text, style , selectedImages   }) => {
   const { infoMap} = useAllLayersContext(); 
  

   const { selectedChain  } = useContext(ChainContext);
   const address = useAddress();
   
     const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [missingCategories, setMissingCategories] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
     
    const [open, setOpen] = useState(false);
    

   useEffect(()=>{
     
        if (!address) return;
        // console.log( "popup :>>>>  selectedImages =", selectedImages )
        let filteredIm = GetfilteredImages(selectedImages);
        setFilteredImages(filteredIm);
         
       // console.log( ">>>>      missingCateg =", missingCateg)
      
   }, [ open , selectedImages ]); // selectedImages  // selectedImages // selectedImages



   useEffect(()=>{
      
   // console.log( ">>>>      filteredImages =",  filteredImages)
    const missingCateg =[];
    for (var key in filteredImages) {
      if (filteredImages.hasOwnProperty(key)) {
        var tokenID = filteredImages[key][0].tokenID;
        var quantityOwned = infoMap?.[tokenID].quantityOwned;

        if (quantityOwned === 0) { missingCateg.push(tokenID);}
        
      }
    }
    setMissingCategories(missingCateg);
    //console.log( "popup :>>>>    missingCateg      =",  missingCateg )

  }, [ filteredImages   ]); // selectedImages  // selectedImages // selectedImages 
 
 
  const handleOpen = () => {  setOpen(true);  };
     
   
 
  const handleClose = () => {setOpen(false);};
    

  //=====================================================================================
  //burn to claim:
   const { contract: wulirockLayerContract } = useContract( addressesByNetWork[selectedChain].BURN_TO_CLAIM );

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
            
            await  ERC20claim( filteredImages ,  address, 
               
              addressesByNetWork[selectedChain].BURN_TO_CLAIM,
              addressesByNetWork[selectedChain].WUCOIN,
              selectedChain,
              addressesByNetWork[selectedChain].LAYER_ADDRESS
            
                
              ) 
          //  await maycContract?.call("burnAndClaim", [address, tokenIdsToBurn ]);

  };


  //====================================================================

  return (
    <div>
  

      <Button variant= "outlined"
       // className= {styles.claimButton  }
       style={style} 

    
        //  className = {styles.claimButton}
      
      onClick={handleOpen}   >
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
          
               address={address} 
              missingCateg ={ missingCategories }
              />
                
     
    

            <Box sx={{  display: 'flex',  justifyContent: 'space-between',  alignItems: 'center',  marginTop: '20px',  marginBottom:"20px" }} >


               <Web3Button
                  contractAddress={ addressesByNetWork[selectedChain].BURN_TO_CLAIM}  
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
                   <LayerBaseInfo  layerToChooseFrom={ filteredImages} colors ={colors} />
               </Box>  

             
 
          
        </DialogContent>
      </Dialog>
    </div>
  );
};


export function GetfilteredImages( selectedImages , selectedChain, NFT_CONTRACT, address   ){
 
  const excludedKeys = ["forearn", "bo", "collar"];
  const filteredImages = Object.keys(selectedImages).reduce((result, key) => {
    if (!excludedKeys.includes(key)) {
      result[key] = selectedImages[key];
    }
    return result;
  }, {});
  
  return filteredImages;
 
}

 

 
function NotEnoughtLayerMessage( {status ,filteredImages, user , address, missingCateg }){
  //const { user } = useUserContext();
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if(!missingCateg) {
    return("missingCateg");
  
  }
   console.log( "CCCCCCCCCCCC    missingCateg   = "  ,  missingCateg); 
 
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

        { CheckComBoValidity(filteredImages , address, missingCateg ) } 
        
         <br />  
         
        </Typography>
        
        
        );
      default:
        return <div>Default message</div>;
    }
      
 
}




export default PopupButton;


  

   

  function CheckComBoValidity( filteredImages , address, missingCateg ){
     
  

    const missingCount =  missingCateg.length;


    console.log("missingCount    >>>>>>>>>>>    "   , missingCount);


        switch (missingCount) {
          case 5:
            return ("Welcome to the claiming section. In order To claim the reward,"+ 
              "you must own the 5 NFTs marked with this icon:") 
            //return ("To claim the reward, you must own all 5 of the following layers marked with this icon:") 
            case 4:case 3:
              return ( `Very Nice!
               You already own ${5-missingCount} of the NFT required to claim this reward combo,
               but you still need the ${missingCount} NFTs marked with this icon:` );
           
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
 

   