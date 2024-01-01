import React from 'react';
import {Box,  Typography , useTheme, Chip,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
  
 
import { HorizontalSpace } from '../Layout';
import FaceIcon from '@mui/icons-material/Face';
import ReferredFriendsList from '../List/ReferredFriendsList.jsx';
 
import { copyTextToClipboard, timeAgo } from '../../utils';
import { getAvatar, getManyUserData } from '../../data/API';
  
   const BadgeJoinServer = (  { sp } ) => {

 
    const [tasks, setTasks] = useState([
      // { description: 'login with Discord',     completed: false, callBack:  linkAdressToDiscord },
      // { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord   },
      // { description: 'validate', completed: false },
      {global_name:"", src:""}, 
      {global_name:"", src:""}, 
      {global_name:"", src:""}  
    ]);

    const updateTask = async ( ) => {
     
     let referredUserListDetails  = await getManyUserData(  joinedServerData.referredUser   );
     
      //mockreferred isc opied from  postman /getManyUserData response
        //referredUserListDetails =mockreferred;


        const referredUsers =[];
        referredUserListDetails.forEach(data => {
          console.log ( " >>>>>>>  data  : "  , data  );
          const src = getAvatar(data.discordUserData );
         const elData = { global_name : data.discordUserData.global_name,  src:src };
         referredUsers.push(elData) 
 
       });
        
       setTasks(referredUsers);
      
       console.log ( " referredUsers  : "  ,  referredUsers  );

    };
 

     const { user } = useUserContext();
     
   //const [giveAwayTiming, setTimingInfo] = useState(); // Set rowData to Array of Objects, one Object per Row
  
  const [joinedServerData, setJoinedServer] = useState(); // gieaway recived but not revealed yet, and not added to layers count

  const getUserGuild = async ( user ) => {
    
    

    const userID =  user.ID;
 
      const endpoint_t = `${process.env.REACT_APP_API_URL}getUserGuild?ID=${userID}`; // make it specific (filter to twitter fields)
      const result_t = await fetch(endpoint_t);
      let response_t = await result_t.json();
      
      if ( response_t.status ){
      
       // response_t.text = "Guild Member since :" +   timeAgo(response_t.joinedAt) 
         response_t.date = timeAgo(response_t.joinedAt);
       }else{
       
        response_t.text = "Join the Wulirocks server";
      }
      
      setJoinedServer(   response_t   );

              

  };  
  

  

  useEffect( ()=>{
     
    if (!user)return;
         getUserGuild(user);
   

  }, [ user  ]);

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    function linkAdressToDiscord(){
   
   }
   function getCompletion(){

      if (!joinedServerData ){return  (`JOINED: ${"0"}`);}
      return  (`JOINED : ${joinedServerData.status}`)   ;
 
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
          <Box  sx={  allCSS( theme.palette.mode  ).taskBar } > 
          <Box sx={{ 
            color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
      
         }}>
      <HorizontalSpace space={ sp[0] }/>

      
     
          <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

            <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }   onClick={() => linkAdressToDiscord(  )}
              
            >
            <Box onClick={ () => copyTextToClipboard ( )} > 

              {joinedServerData?.status ?(  //   joinedServerData?.date
                 <p>  You are a <span style={{fontWeight:"700px"}} >{ "Guild Member"}</span> since  <span style={{fontWeight:"700px"}} >{   joinedServerData?.date }</span>    </p>
              ):(
                <p> <>Share link <span style={{fontWeight:"700px"}} >{   joinedServerData?.text}</span> with friends</></p>
              )}
      
      

            
                 {/* <p> <>Share link <span style={{fontWeight:"700px"}} >{ joinedServerData?.status}</span> with friends</></p> */}
            </Box>
 
          </Box>
    
            
         </BootstrapTooltip>
             {/* <p> <>Share your <span  >{ " ref link "}</span> with friends</></p> */}
            
            
       
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
                <Box >
             <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color= {theme.palette.chipYellow} />
          </Box >
 

               </HtmlTooltip>


         <HorizontalSpace space={3}/> 
         <Box >
             <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color= {theme.palette.chipGreen} />
          </Box >
              



            </Box> </Box>
         )}
        </>
   
        
    )


     
  };
  
  export default BadgeJoinServer;
   
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


 
 

 