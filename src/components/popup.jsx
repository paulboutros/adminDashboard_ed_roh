
import {
 // MARKETPLACE_ADDRESS,
 // LAYER_EDITION_ADDRESS,
   TOOLS_ADDRESS ,
   BURN_TO_CLAIM,
  REWARDS_ADDRESS

} 

from "../const/addresses";


import { IoArrowDown } from "react-icons/io5";
import { IoWarningOutline } from "react-icons/io5";
import { HiOutlineChevronRight } from "react-icons/hi";
import { FaLink } from "react-icons/fa";
import { FaEthereum } from "react-icons/fa";


import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Avatar from '@mui/material/Avatar';

import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useContract, useAddress, Web3Button } from "@thirdweb-dev/react";
import styles    from "../styles/NFT.module.css";

import React, { useState , useEffect } from 'react';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
  
import { allCSS, tokens } from "../theme";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useAppLinkContext } from '../context/AppLinkContext.js';
import {sendTracking, openOAuth2Url, ERC20claim, getAvatar  } from "../data/API";

import {  Box ,Button,   Divider,   LinearProgress,   Typography, useTheme  } from "@mui/material";

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

 
import LayerBaseInfo from  "./LayerBaseInfo";
    
 import { useAllLayersContext } from '../context/AllLayerAvailableContext';
 import { VerticalSpace } from "./Layout.jsx";
import { ServerButton } from "./Buttons/buttons.jsx";




const PopupButton =  ({ text, style , selectedImages   }) => {
 
  

const address = useAddress();

    


  const { appLink } = useAppLinkContext();
    const { user } = useUserContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    sendTracking(user , "category", "image" , "Claim" ,  "imageComposer jsx")   ;
  const [open, setOpen] = useState(false);
 
  
  let filteredImages; 

   filteredImages = GetfilteredImages(selectedImages);
      
   useEffect(()=>{
    if (!address) return;
    
   // filteredImages = GetfilteredImages(selectedImages);
    CheckComBoValidity(filteredImages ,user , address);

     
    
   }, [ selectedImages ]);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    

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

         // if (balance < 1) {  return alert("Not enough serum tokens");  } 
     
       //    const tokenIdsToBurn = [0, 12, 21, 34, 40];
       //   const amounts = [1, 1, 1, 1, 1];
           
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
        
      
      
       <div  sx={{  margin: "0px 0px 90px 0px"  }} >
        

      </div>

        <DialogContent     
        sx={{
          backgroundColor: colors.primary[400],
       
         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        
          
        }} 
         
         >


            {/* use that login to get reward somewher else */}
           {/* <ButtonCTALoginFor2FreeLayers/> */}
        
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}} >  
          
           
            <NotEnoughtLayerMessage status={2} filteredImages={filteredImages}  user={user} address={address}  />
                  
               
                <Box sx={{  display: 'flex',  justifyContent: 'space-between',  alignItems: 'center',  marginTop: '20px',  marginBottom:"20px"
                 }} >
               {/* <AppLinkDataBox/> */}




  
                
               <Web3Button
              contractAddress={BURN_TO_CLAIM}  // contract to interract with
               action={async ( contract ) => await mintMutantNft( contract )} 
              
                 className="tw-web3button--connect-wallet"
               style={{ backgroundColor:colors.blueAccent[700], width: '100%' }}
              >
               Burn to claim
              </Web3Button>   
           
          
{/*             
             <Button variant="contained"
              onClick={() => ERC20claim( filteredImages ,  address  )}  
              
             >
               CLAIM Your Reward !
             </Button>   */}








                        
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


function GetfilteredImages( selectedImages ){


  //  console.log ( "POPUP: selectedImages",  selectedImages );




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
  
 
    switch (status) {
      case 1:
        return (
          <Typography
          fontWeight="100" 
          sx={{padding: "20px 20px 0px 20px",   color: colors.grey[300]}} >
          
           { CheckComBoValidity(filteredImages ,user , address ) }
           <CancelRoundedIcon sx={{ 
         color: colors.redAccent[500],position: 'relative',   top: '1px', left: '1px',  height :"15px" }} /> <br />
        
         If any layers are missing, you can quickly earn them by joining with Discord
        </Typography>)
      case 2:
        return (
        
         <Typography
        fontWeight="100" 
        sx={{padding: "20px 20px 0px 20px",   color: colors.grey[300]}} > 

        { CheckComBoValidity(filteredImages ,user , address) } 
        <CancelRoundedIcon sx={{ 
         color: colors.redAccent[500],position: 'relative',   top: '1px', left: '1px',  height :"15px" }} /> <br />  
         If any layers are missing, you can quickly earn them by sharing the link below:
            {/* Now, you can share or post the link. Every think someone open your link,  Discord will
             initiate the login process. If they decide to join, you will instantly recieve a new layer.

             On your profile page you can check, your new layers as well as the status of your invite link.
             Good luck! */}
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


   

  function CheckComBoValidity(filteredImages, user, address){
   
    // testSDK( address );
    console.log("popup  user " , address  );
    console.log("CheckComBoValidity  address " , address  );
    // if(!user) return;
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

 

  if(!user) return;
     // ERC20claim(user.ID, filteredImages ,  address  );
 //  console.log("  you won !:" , address );
 }


   // add option, 
   // I am low in $Wu and I need more $wu
   // how ca I get free $Wu
   // how can I buy $Wu

    const missingCount =  missingCategories.length;
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

  
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   const popUpColor = colors.primary[700]  ;
   const popUpColor2 = colors.primary[600]  ;

    return (
      <Dialog open={open} onClose={onClose} PaperProps={{ 
        
        style: {  
          borderRadius: 8,
          border: `${colors.primary[400] } solid 2px`, 

        } 
      
        }}>


        <Box sx={{ 
          padding:"20px",
          // textAlign: 'center' ,
           backgroundColor: popUpColor 
          }}>

            <p style={{ ...theme.titleDescription, 
              display: 'flex', alignItems: 'center',
              
              margin: "0 0 10px 5px",
              color: colors.grey[1000],
              fontWeight:"50px"
              }}>
                
               {/* <FaLink  style={{  color: colors.grey[400], }} /> */}
                Link wallet to discord
                
                </p>
        
            { user?.wallet !== connectedWalletAddress && (
                 <>

        
        
                   <p style={
                    {
                      padding:"5px 5px 5px 5px",
                       width:"400px", 
                      fontSize:"12px",
                      fontWeight:"700px",
                       color: colors.grey[400]
                    }
                  }  > 
                  
                  
                 {/* The wallet you are <b>connected</b> to is not the one  
                  associated with Discord on this DAPP <br /> 
                    
                  To use  {addressShortened(connectedWalletAddress)} instead, 
                   simply press confirm.
                  
                   

                  You agree that your $DIST staking and unclaimed $WU reward, will be transfered
                  to the newly register address. */}
                   If you press confirm, your connected wallet will be used as primary for this app. <br />
                    <li>All staking will be transfered to the new address</li> 
                  
                  </p>
                   
                
                  </>

            )}
       

             
          
          
        </Box>

        <Divider orientation="horizontal"  />
        <Box sx={{ 
          padding:"20px",
          // textAlign: 'center' ,
           backgroundColor: popUpColor 
          }}>
 
        
            { user?.wallet !== connectedWalletAddress ? (
                 <>
                    <p style={
                    {
                      padding:"5px 5px 5px 5px",
                       width:"400px", 
                      fontSize:"12px",
                      fontWeight:"700px",
                       color: colors.grey[400]
                    }
                  }  > 
                     current will replace the red one
                  
                  </p>

                  <Box sx={ allCSS( theme.palette.mode).basicTextWithAddress  } >
              
                    <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }  >
                    <p style={{fontWeight:"500px" }}>   {connectedWalletAddress}    </p>
                  </Box>
                   </Box>
 
                        <Box
                        sx ={{  justifyContent: 'center' , }} >
                            <Box  sx={{   display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <VerticalSpace  space={1}/>
                          <IoArrowDown/>
                          <VerticalSpace  space={1}/>
                          </Box>
                        </Box>
 
                 <Box sx={  allCSS( theme.palette.mode, "400px","0px", colors.redAccent[300]    ).infoBox  }  >
                    <p style={{fontWeight:"500px" }}>   {user?.wallet}    </p>
                  </Box>
                  </>

            ):(
           <React.Fragment> 
           
             <Box sx={ allCSS( theme.palette.mode).basicTextWithAddress  } >
  
                  <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }  >
                  <p style={{fontWeight:"500px" }}>   {connectedWalletAddress}    </p>
                 </Box>
             </Box>
             </React.Fragment>
          )}
          
        </Box>

        
        <Divider orientation="horizontal"  />

        <DialogContent 
           sx={{ backgroundColor: popUpColor, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>

          <FaEthereum  style={{   height:"25px", color: colors.grey[400],marginRight:"10px" }} />  
          <HiOutlineChevronRight 
           style={{ color: colors.grey[400], marginRight:"10px" }} /> 
            <Avatar src={!user ? null : getAvatar(user.discordUserData)} />
            <span 
            style={{
              ...theme.titleDescription,
               marginLeft: 15, 
                }}>  
                {user?.discordUserData?.global_name}
                </span>
          </div>
        </DialogContent>

        <Divider orientation="horizontal"  />


        <DialogActions style={{
           justifyContent: 'center' ,
           backgroundColor: popUpColor2  
           }}>
          <Button variant="contained" onClick={onClose} color="primary">
            Cancel
          </Button>



             {/* 
           <Button variant="contained" onClick={onConfirm} color="primary">
            Confirm
          </Button>   */}
        

          <ServerButton
                

                action={  onConfirm }

                onConditionMet={async (result) => {
              //   console.log("onConditionMet={async (result) =>", result);

                 // setDISTAmount(result.tokenStaked);

                //  let discordInvite_response = await myDiscordInvite(user.ID);
                //  setDiscordInvite(discordInvite_response);

                //  console.log("let discordInvite_response = await myDiscordInvite(user.ID", discordInvite_response);

                }}

                 checkCondition =  {   async (result) => { return null } } 

                 width={"100px"}
              >
 
                
                Confirm
               


              </ServerButton>







        </DialogActions>
      </Dialog>
    );
  };
 

   