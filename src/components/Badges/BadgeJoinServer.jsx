import React from 'react';
import {Box,  useTheme,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
  //import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
  import {useEffect } from "react";
  
 
 import FaceIcon from '@mui/icons-material/Face';
  
import { copyTextToClipboard  } from '../../utils';
 import { PopJoinedServerContent } from '../TooltipContent/content.jsx';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext';
    

  export function TaskForReward3(){
   

   //  const { user } = useUserContext();
     
     const { joinedServerData   } =  useDiscordInviteContext();
  
/*
  useEffect( ()=>{if (!user)return;   }, [ user  ]);
     */
    
     
   

   

   
   
    const theme = useTheme();
    

      
    return(
      <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

      <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }   onClick={() => {} }
        
      >
      <Box onClick={ () => copyTextToClipboard ( )} > 

        {joinedServerData?.status ?(  //   joinedServerData?.date
           <p>  You are a <span style={{fontWeight:"700px"}} >{ "Guild Member"}</span> since  <span style={{fontWeight:"700px"}} >{   joinedServerData?.date }</span>    </p>
        ):(
          // <p> <>Share link <span style={{fontWeight:"700px"}} >{   joinedServerData?.text}</span> with friends</></p>
             <p>Join The Server Here</p>
        )}
       
           {/* <p> <>Share link <span style={{fontWeight:"700px"}} >{ joinedServerData?.status}</span> with friends</></p> */}
      </Box>

    </Box>

      
   </BootstrapTooltip>
    
        
    )
  }

  export function TaskStatus3(){
   
 
/*
     const { user } = useUserContext();
     */
   
     const { joinedServerData ,  setJoinedServer } =  useDiscordInviteContext();
 /*

  const getUserGuild = async ( user ) => {
    

    if (  !user ) { 
       

     // setJoinedServer(null);
    }
    

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
      
     // setJoinedServer(   response_t   );

              

  };  

  */

  
/*
  useEffect( ()=>{
     
    if (!user)return;
       //  getUserGuild(user);
   

  }, [ user  ]);
*/
   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    
   function getCompletion(){

      if (!joinedServerData ){return  (`JOINED: ${"0"}`);}
      return  (`JOINED : ${joinedServerData.status}`)   ;
 
   }
    return(
       <>   
          <HtmlTooltip
         // open={true} // for debugging
              
         title={
                 <PopJoinedServerContent/>
             }
            >
                <Box >
               <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color= {theme.palette.chipYellow} />
          </Box >
 

         </HtmlTooltip>

      
       
       </>

    )
  }

 