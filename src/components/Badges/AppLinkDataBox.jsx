import React from 'react';
import {Box,   Typography , useTheme, Chip,  } from '@mui/material';
import { BootstrapTooltip, HtmlTooltip, allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
 import {useEffect, useState} from "react";
  
 
import { HorizontalSpace } from '../Layout';
import FaceIcon from '@mui/icons-material/Face';
import ReferredFriendsList from '../List/ReferredFriendsList.jsx';
 
import { copyTextToClipboard } from '../../utils';
import { getAvatar, getManyUserData } from '../../data/API';
import { useAppLinkContext } from '../../context/AppLinkContext';
  
   const ReferralLinkGrid = ( ) => {
 
    const { appLink } = useAppLinkContext();
    const [tasks, setTasks] = useState([
      // { description: 'login with Discord',     completed: false, callBack:  linkAdressToDiscord },
      // { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord   },
      // { description: 'validate', completed: false },
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
  //const [giveAwayTiming, setTimingInfo] = useState(); // Set rowData to Array of Objects, one Object per Row
  
 
  const GetReferralCodeData = async () => {
    
    if (!user){return;}
    if (!appLink){return;}
    
    /*
    const userID =  user.ID;
    const endpoint = `${process.env.REACT_APP_API_URL}GetReferralCode?ID=${userID}`; // make it specific (filter to twitter fields)
     const result = await fetch(endpoint);
     let response = await result.json();
 
   // if no one has accepted yet
      if (response.referralCode.referredUser.length === 0 ){
      response.referralCode.referredUser=[
        "not accepted yet"
       ]
    }
*/


        setReferralCode(appLink.referralCode);
   //   setReferralCode(response.referralCode);


    //  const endpoint_t = `${process.env.REACT_APP_API_URL}GetTempGiveAway?ID=${userID}`; // make it specific (filter to twitter fields)
    //  const result_t = await fetch(endpoint_t);
   //   let response_t = await result_t.json();
     
              

  };  
  

  useEffect(  ()=> {
 
     if (!referralData)return;
      updateTask();

     
  }  , [ referralData  ]);

  useEffect( ()=>{
     
    if (!user)return;
    if (!appLink)return;
         GetReferralCodeData();
   

  }, [ user  , appLink  ]);

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    function linkAdressToDiscord(){
   
   }
   function getCompletion(){

      if ( !referralData ){

        return  (`ACCEPTED: ${"0"}`)   ;
      }


  let task = 0;
 // if ( user ){ task+=1;    console.log(  "complete  1 "); } // we are connected to discord
 // if (  walletAndDiscordAreConnected(user)  ){  console.log(  "complete  2 " , user);   task+=1; }  // there is wallet associated with discord account
  
 
  return  (`ACCEPTED: ${referralData.referredUser.length}`)   ;
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

    {/* <Chip
        avatar={<Avatar alt="Natacha" src="/icon/discord-round-color-icon.jpg" />}
        label="Avatar"
        variant="outlined"
      /> */}

              
          </Box>
           
          </Box>
        ):(
          <Box  sx={{  borderRadius: 4, backgroundColor: colors.primary[400] }} > 
          <Box sx={{ 
            color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
      
         }}>
      <HorizontalSpace space={30}/>

      
     
          <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

            <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }   onClick={() => linkAdressToDiscord()}>
              
            
            <Box onClick={ () => copyTextToClipboard ( referralData?.shareableLink )} > 
                 <p> <>Share link <span style={{fontWeight:"700px"}} >{ referralData?.code}</span> with friends</></p>
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
            <Chip variant="outlined" color="warning" label= { getCompletion()}   icon={<FaceIcon />}   sx={ {height :"30px" , borderRadius:"10px" }}/>
               </HtmlTooltip>
            </Box> </Box>
         )}
        </>
   
        
    )


     
  };
  
  export default ReferralLinkGrid;
   
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


 
 

 