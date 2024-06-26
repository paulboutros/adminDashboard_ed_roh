import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { HtmlTooltip, tokens } from "../../theme.js";
import { Box, Button, Divider, Tooltip, useTheme } from '@mui/material';
import { useAddress } from "@thirdweb-dev/react";
import { DeleteAccountAPI, emit_guildMemberAdd, emit_guildMemberRemove,   myDiscordInvite, openOAuth2Url  } from '../../data/API.js';
import { useUserContext } from '../../context/UserContext.js';
 import { useDebugModeContext } from '../../context/DebugModeContext.js';
import { ServerButton } from '../Buttons/buttons.jsx';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext.js';
 import { useDISTContext } from '../../context/DISTstakingContext.js';
import { HorizontalSpace,   VerticalSpace } from '../Layout.jsx';
 
const _padding ="10px 0 10px 10px"
export function DebugPanel(  { DISTstakedAmount, setDISTAmount }      ) {
 
  const { distStakedAmount  } = useDISTContext(); 
  const distStakedAmountRef = useRef(distStakedAmount);

  useEffect(() => {
    distStakedAmountRef.current = distStakedAmount; // Update the ref when distStakedAmount changes
  }, [distStakedAmount]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
     
  return (
    <>
    <VerticalSpace space ={5}/> 
     <Box  sx={{ 
       
                 outline:   colors.grey[400]  , 
                 borderRadius: 2 ,
                 backgroundColor: colors.primary[600],
                 flexDirection: 'column',
                 display: 'flex',  
                 justifyContent : "space-between",
                //  padding: "20px", margin: "10px",
                 
              
              
      }}
     
      > 
         <HorizontalSpace space ={10}/> 
        < Box  
          sx={{ display: 'flex',  flexDirection: "column" ,
            justifyContent :"flex-start",    color: colors.grey[400],
           
         }} 
        >
          <Box  sx={{   fontWeight:"500px" ,   padding:  _padding  ,  display: 'flex',  flexDirection: "row" ,  justifyContent :"flex-start",   }}   > 
            {/* <CgDebug/> */}
            <Typography > Debug Mode Buttons</Typography>
          </Box>
    
         <Divider  orientation="horizontal"/> 
          {/* <VerticalSpace space ={2}/> */}

          <Box  sx={{ display: 'flex', 
           flexDirection: "row", 
            alignItems:"center",  
             color: colors.grey[100] ,
             padding:   _padding
             
             }}   >
 
              <ButtonRow   DISTstakedAmount={DISTstakedAmount}  />
           </Box>
        </Box>
  </Box>
</>
  );


}

function ButtonRow(  { DISTstakedAmount, setDISTAmount }   ){

  const address = useAddress();
  
  const { discordInvite, setDiscordInvite } = useDiscordInviteContext();
  const { debugMode } = useDebugModeContext();
  const { user, setUser } = useUserContext();

  const { distStakedAmount, distReward,  setReFetch } = useDISTContext(); 
  const distStakedAmountRef = useRef(distStakedAmount);

  useEffect(() => {
    distStakedAmountRef.current = distStakedAmount; // Update the ref when distStakedAmount changes
  }, [distStakedAmount]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

   

  // this is called repeatedly from ServerButtom intervalId
  async function checkCondition () {
     setReFetch(true);
 
    let result = { tokenStaked: distStakedAmountRef.current  , _rewards: distReward };

    console.log("distStakedAmountRef.current = ", distStakedAmountRef.current,  "tokenStakedBeforeClicking    ", DISTstakedAmount);

    
    if (distStakedAmountRef.current !== DISTstakedAmount) {
      
      return result; // true;
    } else {
      return null; //false;
    }

  }
    

     return( 
     <React.Fragment>
      {debugMode && (
        <>

          <Tooltip title={"delete account and to restart over"}>

            <Button variant="contained"
              sx={{ backgroundColor: theme.debugModeColor }}
              onClick={() => { 
                
                const ID =  user?.ID; 
                openOAuth2Url(user,setUser); // log out 
                DeleteAccountAPI( user );
                
                
                }}>
                Delete account 
            </Button>


          </Tooltip>
 
          {/* ====================================================================================== */}
          <HtmlTooltip   title={ 
          
          <React.Fragment>    
 
           <Typography  padding={"10px"} fontSize={"15px"}>{"Simulate a member joining or leaving the server"}</Typography>

              {/* <Box padding={"10px"} >
                <p> - In real, this event is called by Discord server when someone join using your invite code </p>
                <p> - this simulates a Discord join event with this invite code </p>
                <p> - then increase the stakedAmount on invites stacking smart contract </p>
                <p> - this can not and will not modify the real Discord invite uses! </p>
              </Box> */}
            </React.Fragment>}
          >

              <Box  sx={{   display: 'flex',  flexDirection: "row" ,  justifyContent :"flex-start",   }} > 
              
                    {user?.wallet === address ? (
                      <>
                        <HorizontalSpace space={2}/>
                        <ServerButton
                        
                          action={() => emit_guildMemberAdd(user, discordInvite?.invite)}
          
                          onConditionMet={async (result) => {
                            console.log("onConditionMetXXXXXXXXXX  result", result);

                            console.log("setDISTAmount removed because context provider shoud lhave done it already" );
                          // setDISTAmount(result.tokenStaked);

                            let discordInvite_response = await myDiscordInvite(user.ID);
                            setDiscordInvite(discordInvite_response);

                            console.log("onConditionMetXXXXXXXXXX  discordInvite_response", discordInvite_response);

                          }}

                          checkCondition = { checkCondition }
                          
                          width="200px"
                        >
                          Add 1 Invite
                        </ServerButton>

                        <HorizontalSpace space={2}/>
                        <ServerButton
                          
                          action={() => {
                            // pick whoever is the first member pretends that is the one who leave the server
                            const mock_leavingrMember_ID = discordInvite?.acceptedUsers[0];
                            emit_guildMemberRemove(mock_leavingrMember_ID, discordInvite?.invite); // /emit/guildMemberRemove
                          }}

                          onConditionMet={async (result) => {
                          console.log("onConditionMet={async (result) =>", result);

                            
                          console.log("setDISTAmount removed because context provider shoud lhave done it already" );
                          //  setDISTAmount(result.tokenStaked);

                            let discordInvite_response = await myDiscordInvite(user.ID);
                            setDiscordInvite(discordInvite_response);

                            console.log("let disco rdInvite_response = await myDiscordInvite(user.ID", discordInvite_response);

                          }}

                          checkCondition =  { checkCondition } 
                          width="200px"
                        >
                          remove 1 Invite
                        </ServerButton>
                      </>
                    ) : (
                      <p>Some debug button not available. Please use wallet saved on Server</p>
                    )}
          
              </Box>



          </HtmlTooltip>

          {/* ====================================================================================== */}

         

        </>
      )}
   
      </React.Fragment>

     )
}
