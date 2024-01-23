import React from 'react';
import {Box,   Typography , useTheme, Chip, Tooltip,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
  
 
import { HorizontalSpace } from '../Layout';
import FaceIcon from '@mui/icons-material/Face';
  
import { copyTextToClipboard } from '../../utils';
import { getAvatar, getManyUserData } from '../../data/API';
import { useAppLinkContext } from '../../context/AppLinkContext';
import { PopAppReferralContent } from '../TooltipContent/content.jsx';

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

    const { referralData } = useAppLinkContext();
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
    
  

  useEffect(  ()=> {
 
     if (!referralData)return;
      updateTask();

     
  }  , [ referralData  ]);
 
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    function linkAdressToDiscord(){
   
   }
    

       return(
        <>
          <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

             <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }   onClick={() => linkAdressToDiscord()}>
               <Box onClick={ () => copyTextToClipboard ( referralData?.shareableLink )} > 
                    <p> <>Share link with friends 
                    <span style={{ marginRight: '10px',fontWeight:"700px",  borderRadius:"3px", padding:"3px" }} >
                    
                     { referralData?.code}</span></></p>  
            
                 </Box>
               </Box>
          </BootstrapTooltip>
         </>
        )
  }

export function TaskStatus2(){
  const { referralData } = useAppLinkContext();
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
  

useEffect(  ()=> {

   if (!referralData)return;
    updateTask();

   
}  , [ referralData  ]);

 
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  
 function getCompletion(){

   if ( !referralData ){ return   (`ACCEPTED : ${"0"}`); }
 
   return  (`ACCEPTED : ${referralData.referredUser.length}`)   ;
 }

 
      return(
     <>  
         <HtmlTooltip
          placement="right"
          title={
              <PopAppReferralContent tasksArg={tasks} />
             }>
 
          <Box >
            <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color=  {theme.palette.chipYellow} />
          </Box >
   
            </HtmlTooltip>
        
       </>

      )
  }
 

 
 

 