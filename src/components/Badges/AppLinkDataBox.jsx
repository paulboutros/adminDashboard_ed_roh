import React from 'react';
import {Box, useTheme } from '@mui/material';
import { BootstrapTooltip,  allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
  
 
import { HorizontalSpace } from '../Layout';
   
//import { copyTextToClipboard } from '../../utils';
import { getAvatar, getManyUserData } from '../../data/API';
//import { useAppLinkContext } from '../../context/AppLinkContext';
//import { PopAppReferralContent } from '../TooltipContent/content.jsx';

   const ReferralLinkGrid = ( {sp}  ) => {
 
   // const { referralData } = useAppLinkContext();
    const [tasks, setTasks] = useState([
      
      {global_name:"", src:""}, 
      {global_name:"", src:""}, 
      {global_name:"", src:""}  
    ]);

    const updateTask = async ( ) => {
     
     let referredUserListDetails  = await getManyUserData(  referralData.referredUser   );
   
        const referredUsers =[];
        referredUserListDetails.forEach(data => {
          
          const src = getAvatar(data.discordUserData );
          const elData = { global_name : data.discordUserData.global_name,  src:src };
          referredUsers.push(elData) 
 
       });
        
       setTasks(referredUsers);
 
    };
 
     const { user } = useUserContext();
     
  const [referralData, setReferralCode] = useState(); // Set rowData to Array of Objects, one Object per Row
   
   
  useEffect(  ()=> {
 
     if (!referralData)return;
      updateTask();

     
  }  , [ referralData  ]);

   

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
   


    return (
      <>

    
        {!user ? (
         <Box  sx={{ 
           borderRadius: 4,
        //  backgroundColor: colors.primary[400]
          border: `2px dashed ${theme.palette.blueSelectedTab}`,
          }} > 

          <Box sx={{ 
          // color: colors.grey[300],
            display: "flex",
           flexDirection: "row", 
           alignItems: "center",
           height: "50px", 
           
            
         }}>
            

            <HorizontalSpace space={6}/>

            <BootstrapTooltip  title="Connection to Discord is required">
             
                <ErrorOutlineIcon  sx ={{
                    height:"36px", 
                    width:"36px",
                    color  :  colors.grey[600]
                   }} 
                    /> 
             </BootstrapTooltip> 
           
              
          </Box>
           
          </Box>
        ):(
          <Box  sx={    allCSS( theme.palette.mode  ).taskBar  
              
          } > 
          <Box sx={{ 
            color: colors.grey[100],
             display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
      
         }}>
      <HorizontalSpace space={  sp[0] }/>

         
           
            <TaskForRewardAppLink/>  
            
       
        <HorizontalSpace space={30}/> 
 

            <TaskStatus2/>

           
            </Box>
          </Box>
         )}
       </>
   
        
    )


     
  };
  
  export default ReferralLinkGrid;
   


  export function TaskForRewardAppLink(){
     // full code removes because #Discord #disabled #disable user referral
  }

export function TaskStatus2(){
    // full code remove because we are #disabling #disable, Discord and user and user referal system
  }
 

 
 

 