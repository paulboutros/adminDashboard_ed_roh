import React from 'react';
import {Box, useTheme, Button,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
 import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
  
import { HorizontalSpace } from '../Layout';
import FaceIcon from '@mui/icons-material/Face';
 
 
import { copyTextToClipboard } from '../../utils';
import { deleteDiscordInvite, getAvatar, getManyUserData, GetManyUsersFromDiscord } from '../../data/API';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext';
import { useDebugModeContext } from '../../context/DebugModeContext';
import { PopTaskStatusDiscordInviteContent } from '../TooltipContent/content.jsx';
  
   const BadgeDiscordInvites = (  {sp}  ) => {

    const {debugMode }     = useDebugModeContext();
    const [tasks, setTasks] = useState([
      
      {global_name:"", src:"", verified:null, email:null }, 
       
    ]);

    const updateTask = async ( ) => {
     
       // let referredUserListDetails  = await getManyUserData(  discordInvite?.acceptedUsers   );
      // we need to get data from discord directly, because a new member will not exist yet on the Mongo DB
        let referredUserListDetails  = await GetManyUsersFromDiscord(  discordInvite?.acceptedUsers   );

         console.log( "referredUserListDetails  "  ,referredUserListDetails );

        const referredUsers =[];
        referredUserListDetails.forEach(data => {
         
          const src = getAvatar( data   ); // .discordUserData
         const elData = { global_name : data.username,  src:src, verified:data.verified };
         referredUsers.push(elData) 
 
       });
        
       setTasks(referredUsers);
      
       

    };
 
    const { discordInvite ,  setdiscordInviteLoaded } =  useDiscordInviteContext();
     const { user, setUser } = useUserContext();
      
 
  

  useEffect(  ()=> {
   
   //  if (!referralData)return;
      updateTask();
 
   
  }  , [ discordInvite  ]);

    

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
     

 
/*
   this is just for testing and simulate a situation where a user just registered.
   in such scenario, the discord invite is null (not created yet), and it will trigger the code that automatically
   create an invite and assign it to this user
*/
 async function  deleteInvite(){
    const MongoDeleteResult = await deleteDiscordInvite(user.ID);

     // so it can reload after we changed it on the server
    // setdiscordInviteLoaded(false);
    //setUser(user);
    console.log( "MongoDeleteResult    = " , MongoDeleteResult);
 }

  
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
          <Box  sx={  allCSS( theme.palette.mode  ).taskBar  } > 
          <Box sx={{ 
            color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
      
         }}>
      <HorizontalSpace space={ sp[0] }/>

       
         <TaskForRewardDiscordInvites/> 
         
          
       
        <HorizontalSpace space={30}/> 
 

             <TaskStatus4/>
              


               {debugMode && (

                    <Button variant="contained" 
                    sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => deleteInvite() } >   delete inv  
                    
                    </Button>
                )}
 


            </Box> </Box>
         )}
        </>
   
        
    )


     
  };
  
  export default BadgeDiscordInvites;
   
const mockreferred= 
  [
    {
        "ID": "944252147741118545",
        "discord": "PuffpuffSbaby",
        "discordUserData": {
            "id": "944252147741118545",
            "username": "puffpuffsbaby",
            "avatar": "d7f088dfcc5b966346ed3e6e32148ff3",
            "discriminator": "0",
            "public_flags": 256,
            "premium_type": 0,
            "flags": 256,
            "banner": null,
            "accent_color": 15283114,
            "global_name": "PuffpuffSbaby",
            "avatar_decoration_data": null,
            "banner_color": "#e933aa",
            "mfa_enabled": true,
            "locale": "en-GB",
            "email": "oluwamayowanathaniel98@gmail.com",
            "verified": true
        }
    },
    {
        "ID": "1024647785053696081",
        "discord": "SapaFx",
        "discordUserData": {
            "id": "1024647785053696081",
            "username": "sapafx",
            "avatar": "c47327a086b68877105df7019ef6f92b",
            "discriminator": "0",
            "public_flags": 0,
            "premium_type": 0,
            "flags": 0,
            "banner": null,
            "accent_color": null,
            "global_name": "SapaFx",
            "avatar_decoration_data": null,
            "banner_color": null,
            "mfa_enabled": false,
            "locale": "en-US",
            "email": "morgansilvia222222@gmail.com",
            "verified": true
        }
    },
    {
        "ID": "944252147741118545",
        "discord": "puffpuffsbaby",
        "discordUserData": {
            "id": "944252147741118545",
            "bot": false,
            "system": false,
            "flags": 256,
            "username": "puffpuffsbaby",
            "globalName": "PuffpuffSbaby",
            "discriminator": "0",
            "avatar": "d7f088dfcc5b966346ed3e6e32148ff3",
            "avatarDecoration": null,
            "createdTimestamp": 1645197655378,
            "defaultAvatarURL": "https://cdn.discordapp.com/embed/avatars/4.png",
            "tag": "puffpuffsbaby",
            "avatarURL": "https://cdn.discordapp.com/avatars/944252147741118545/d7f088dfcc5b966346ed3e6e32148ff3.webp",
            "displayAvatarURL": "https://cdn.discordapp.com/avatars/944252147741118545/d7f088dfcc5b966346ed3e6e32148ff3.webp"
        }
    }
]


 
 export function TaskForRewardDiscordInvites(){
  
  const {debugMode }     = useDebugModeContext();
  const [tasks, setTasks] = useState([
     
    {global_name:"", src:"", verified:null, email:null }, 
     
  ]);

  const updateTask = async ( ) => {
   
      let referredUserListDetails  = await getManyUserData(  discordInvite?.acceptedUsers   );
    
      const referredUsers =[];
      referredUserListDetails.forEach(data => {
       
        const src = getAvatar(data.discordUserData );
       const elData = { global_name : data.discordUserData.username,  src:src, verified:data.discordUserData.verified };
       referredUsers.push(elData) 

     });
      
     setTasks(referredUsers);
   
  };

    const { discordInvite ,  setdiscordInviteLoaded } =  useDiscordInviteContext();
   const { user, setUser } = useUserContext();
   
  

 

useEffect(  ()=> {
 
 //  if (!referralData)return;
    updateTask();

 
}  , [ discordInvite  ]);

 
 
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function linkAdressToDiscord(){
 
 }



/*
 this is just for testing and simulate a situation where a user just registered.
 in such scenario, the discord invite is null (not created yet), and it will trigger the code that automatically
 create an invite and assign it to this user
*/
 

function onClickInvite(){ 
  // to do:
  /*
  add toast, copied to clip board
  */


   copyTextToClipboard ( discordInvite?.shareableLink )



}

  


   return(
    <BootstrapTooltip  title="Click To Copy"  placement="left-start" >
    <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }  
     onClick={() => linkAdressToDiscord()}>
     
   {/* discordInvite */}
   <Box onClick={ () => onClickInvite() }> 
        <p> <>Share link <span style={{fontWeight:"700px"}} >{ discordInvite?.invite}</span> with friends</></p>
   </Box>

 </Box>

 </BootstrapTooltip>

   )
 }

 export function TaskStatus4(){

    
  const {debugMode }     = useDebugModeContext();
  const [tasks, setTasks] = useState([
    
    {global_name:"", src:"", verified:null, email:null }, 
     
  ]);

  const updateTask = async ( ) => {
   
     
       //discordInvite?.acceptedUsers contains list of ID (discord ID) who accepted the invite
       // getManyUserData > to get avatar and other info to display
   //   let referredUserListDetails  = await getManyUserData(  discordInvite?.acceptedUsers   );
      let referredUserListDetails  = await GetManyUsersFromDiscord(  discordInvite?.acceptedUsers   );

      console.log( "referredUserListDetails  "  ,referredUserListDetails );


   // console.log ( " >>>>>>>>>>>.    discordInvite?.acceptedUsers .length   : "  ,  discordInvite?.acceptedUsers.length  );
   // console.log ( " >>>>>>>>>>>.    referredUserListDetails    : "  ,  referredUserListDetails   );
      const referredUsers = [];
      let pp =0;
      referredUserListDetails.forEach(data => {
     //   console.log ( " >>>>>>  forEach data   : "  ,   data  , "pp   =" , pp);
         const src = getAvatar(data ); // .discordUserData
         const elData = {
         global_name : data.username,  // .discordUserData.
         src:src, verified:data.verified, // .discordUserData
         mockMember: (discordInvite.mockMember &&  discordInvite.mockMember.includes(data.ID) ) ? true: false  
      };
      pp++
      referredUsers.push(elData) 

     });
      
     console.log ( " >>>>>> referredUsers   : "  ,  referredUsers.length  );
     setTasks(referredUsers);
    
    // console.log ( " >>>>>>>>>>>.   referredUsers  : "  ,  referredUsers  );

  };

    const { discordInvite ,  setdiscordInviteLoaded } =  useDiscordInviteContext();
    
 


useEffect(  ()=> {
 
   if (!discordInvite)return;
    updateTask();

 
}  , [ discordInvite  ]);

 

 
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  function linkAdressToDiscord(){
 
 }



/*
 this is just for testing and simulate a situation where a user just registered.
 in such scenario, the discord invite is null (not created yet), and it will trigger the code that automatically
 create an invite and assign it to this user
*/
 


function onClickInvite(){ 
  // to do:
  /*
  add toast, copied to clip board
  */


   copyTextToClipboard ( discordInvite?.shareableLink )



}

function handleTooltipOpen(){

  console.log("  >>>>>>     tooltipOpen   tooltipOpen");
}

 function getCompletion(){

    if ( !discordInvite ){

      return  (`ACCEPTED: ${"0"}`)   ;
    }


let task = 0;
 
return  (`ACCEPTED:${discordInvite?.acceptedUsers.length}`);  
//   return  (`ACCEPTED: ${referralData.referredUser.length}`)   ;
return  (`To DO ${task} / 2`)   ;
 }





      return(
        <HtmlTooltip
        // open={true} // for debugging
           // open={tooltipOpen}
            
            placement="right" 
        title={

           <PopTaskStatusDiscordInviteContent tasksArg={tasks}/>
          
            }
           >

            
           <Box >
             <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color = {theme.palette.chipYellow} />
         </Box >

             
              </HtmlTooltip>

           
      )

 }
 

 