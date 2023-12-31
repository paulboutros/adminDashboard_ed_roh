import React from 'react';
import {Box, Divider,Grid, Typography , useTheme, Chip, Button,  } from '@mui/material';
import { BootstrapTooltip, HtmlTooltip, allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
 
 
 
import { HorizontalSpace } from '../Layout';
import FaceIcon from '@mui/icons-material/Face';
import ReferredFriendsList from '../List/ReferredFriendsList.jsx';
 
import { copyTextToClipboard } from '../../utils';
import { deleteDiscordInvite, getAvatar, getManyUserData } from '../../data/API';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext';
import { useDebugModeContext } from '../../context/DebugModeContext';
  
   const BadgeDiscordInvites = (    ) => {

    const {debugMode }     = useDebugModeContext();
    const [tasks, setTasks] = useState([
      // { description: 'login with Discord',     completed: false, callBack:  linkAdressToDiscord },
      // { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord   },
      // { description: 'validate', completed: false },
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
      
     //  console.log ( " >>>>>>>>>>>.   referredUserListDetails  : "  ,  referredUserListDetails  );

    };
 
      const { discordInvite ,  setdiscordInviteLoaded } =  useDiscordInviteContext();
     const { user, setUser } = useUserContext();
     
  const [referralData, setReferralCode] = useState(); // Set rowData to Array of Objects, one Object per Row
  //const [giveAwayTiming, setTimingInfo] = useState(); // Set rowData to Array of Objects, one Object per Row
  
 
  const GetReferralCodeData = async () => {
    
   // if (!user){return;}
     
      //setReferralCode(discordInvite);
 

  };  
  

  useEffect(  ()=> {
   
   //  if (!referralData)return;
      updateTask();
 
   
  }  , [ discordInvite  ]);

  useEffect( ()=>{
     
    
         GetReferralCodeData();
   

  }, [ discordInvite  ]);

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    function linkAdressToDiscord(){
   
   }


 
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


 function onClickInvite(){ 
    // to do:
    /*
    add toast, copied to clip board
    */
 

     copyTextToClipboard ( discordInvite?.shareableLink )


 
 }

   function getCompletion(){

      if ( !discordInvite ){

        return  (`ACCEPTED: ${"0"}`)   ;
      }


  let task = 0;
 // if ( user ){ task+=1;    console.log(  "complete  1 "); } // we are connected to discord
 // if (  walletAndDiscordAreConnected(user)  ){  console.log(  "complete  2 " , user);   task+=1; }  // there is wallet associated with discord account
  
 return  (`ACCEPTED:WIP`)   ;
//   return  (`ACCEPTED: ${referralData.referredUser.length}`)   ;
return  (`To DO ${task} / 2`)   ;
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
             {/* <Chip variant="outlined" color="default" label= {"Discord connection required"}
          
             icon={<ErrorOutlineIcon />} sx={ {height :"30px" , borderRadius:"10px" }}/> 
            */}

   

              
          </Box>
           
          </Box>
        ):(  
          <Box  sx={  allCSS( theme.palette.mode  ).taskBar  } > 
          <Box sx={{ 
            color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
      
         }}>
      <HorizontalSpace space={30}/>

      
     
          <BootstrapTooltip  title="Click To Copy"  placement="left-start" >
             <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }  
              onClick={() => linkAdressToDiscord()}>
              
            {/* discordInvite */}
            <Box onClick={ () => onClickInvite() }> 
                 <p> <>Share link <span style={{fontWeight:"700px"}} >{ discordInvite?.invite}</span> with friends</></p>
            </Box>
 
          </Box>
    
          </BootstrapTooltip>
          
       
        <HorizontalSpace space={30}/> 
 
                 <HtmlTooltip
         // open={true} // for debugging
       

             
         title={
            <React.Fragment>
               <Typography color="inherit">Referred friends</Typography>
                <Typography fontSize={"15px"}>{ tasks[0].global_name }</Typography> 
                     

                <Box>  <ReferredFriendsList tasks={tasks} /> </Box>  
               </React.Fragment>
             }
            >
            <Chip variant="outlined" color="warning" label= { getCompletion()}   icon={<FaceIcon />}   sx={ {height :"30px" , borderRadius:"10px" }}/>
               </HtmlTooltip>


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


 
 

 