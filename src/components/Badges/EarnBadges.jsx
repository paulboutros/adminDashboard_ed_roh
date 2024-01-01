
 
import  React,{ useEffect, useState } from "react";
import { BootstrapTooltip, HtmlTooltip, StyledConnectWallet2, allCSS, infoHeight, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { useAddress } from "@thirdweb-dev/react";
import { useUserContext } from "../../context/UserContext";
import { useDebugModeContext } from "../../context/DebugModeContext";
import { addorupdate, getAvatar, openOAuth2Url_whenUserNotConnected, setWallet } from "../../data/API";
import { Avatar, Box, Button, Chip, Typography } from "@mui/material";
import AccountMenu from "../AccountMenuCustom";
import SpeedDialTooltipOpen from "../SpeedDialTooltipOpen";
import { HorizontalSpace } from "../Layout";
import { addressShortened } from "../../utils";
import ToDoList from "../List/ToDoList.jsx";
import FaceIcon from '@mui/icons-material/Face';




export function EarnBadges(){

    const [tasks, setTasks] = useState([
      { description: 'login with Discord',     completed: false, callBack:  openOAuth2Url_whenUserNotConnected },
      { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord   },
     // { description: 'validate', completed: false },
    ]);
    const updateTask = (index , completed ) => {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index ? { ...task, completed:  completed } : task
        )
      );
    };
  
   
  
    const theme = useTheme();
  
   const colors = tokens(theme.palette.mode);
   const address = useAddress();
                  
   const {user, setUser } = useUserContext();
   const {debugMode }     = useDebugModeContext();
   
   
   useEffect(()=>{
      
  
  }, [ debugMode   ]);
  
   useEffect(()=>{
    
    const state = user ? true:false; 
    updateTask(0,state )
    const state1 = walletAndDiscordAreConnected(user);// true:false; 
 


    updateTask(1, state1 )
   
  }, [user ]);
    
   async function disconnectWalletDiscord(){
  
    const result = await addorupdate(user, "0000000" );
  
      setUser(result.user);
     
  
  }
  
   function walletAndDiscordAreConnected(user){
   
    if (!user || user === undefined){return false;}
         return !user.wallet.includes("0000000");
   }
  
  async function  linkAdressToDiscord(  user, address ){
  
   
      // at this point the discord user is not connected, so we user the wallets collection, wallet as ID
         if ( !user ){
  
          openOAuth2Url_whenUserNotConnected( address );
     
           return;
         }
     
         const result = await setWallet(user,address);
       // const result = await addorupdate(user,address);
        setUser(result.user);
        
   }
   
   function getCompletion() {
    
     
    let task = 0;
    if ( user ){ task+=1; 
        
        
        } // we are connected to discord
    if (  walletAndDiscordAreConnected(user)  ){  
      
     
      
      task+=1; }  // there is wallet associated with discord account
    
    return  (`1`)   ;
  return  (`To DO ${task} / 2`)   ;
  
   }
   
  
     return (
      <>   
  
      <Box    sx={  allCSS( theme.palette.mode  ).taskBar } > 
        <Box sx={{ 
             color: colors.grey[300], display: "flex",
             flexDirection: "row",  alignItems: "center",
             height: "50px", 
         
        }}>
         
   
          <AccountMenu/>
            <Box sx={{ position: 'relative',  width: infoHeight, height: infoHeight, 
         // outline: `1px solid ${ colors.blueAccent[200] }`,  // for debugging purposes
         
       }} >
        <Avatar 
  
         src= {!user ? ( null ):(  getAvatar( user.discordUserData )  )} 
         // we want the same size as the speed dial position and anchor alignement matches
         sx={ {  
          position: "absolute",
           top: "50%",
           left: "50%",
           msTransform: "translate(-50%, -50%)", 
           transform: "translate(-50%, -50%)" ,
           width: infoHeight, height: infoHeight,
         }}
         />
  
            <SpeedDialTooltipOpen  textToCopy={  user?.ID  } />
            
        </Box>
  
      <HorizontalSpace space={20}/> 
      
  
       {(user && address) ? (  
        
        
                <> 
                 { !walletAndDiscordAreConnected(user) ? (
                   <BootstrapTooltip 
                    title="Only 1 wallet can be associated with Discord profile on this DAPP" placement="left-start" >
  
                     <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  } onClick={() => linkAdressToDiscord( user, address  )}  >
                        <p>Click to link <span  >{addressShortened(address)}</span> to Discord</p>
                    </Box>
  
                   </BootstrapTooltip>
                   ) : (
                    <BootstrapTooltip 
                     title="Your wallet is successfully associated with your Discord profile"  placement="left-start">
  
  
                    <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  } onClick={() => linkAdressToDiscord( user, address  )}  >
  
                            <p style={{fontWeight:"500px" }}>   {user.wallet}    </p>
                    </Box>
  
  
                    </BootstrapTooltip>
                    )       } 
                </>
               
         
        
            
        ):(  // connectionStatus === "disconnected"
          <>
           { !user && address && ( 
             <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
                     onClick={() => linkAdressToDiscord(user, address)}
             >
             <p>  <>Click to link <span  >{"Discord"}</span> account</> </p>
             </Box>
           )
          }
  
          {  user && !address && (

                  <StyledConnectWallet2/>
            //  <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
            //          onClick={() => linkAdressToDiscord(user, address)}
            //  >
            //  <p>  <>Wallet <span  >{"Login"}</span></> </p>
            //  </Box>
           )

          }
  
          {  !user && !address && ( 
             <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
                     onClick={() => linkAdressToDiscord(user, address)}
             >
               <p>  <>Click to link <span  >{"Discord"}</span> account</> </p>
               {/* <p>  <>Wallet<span  >{"Login"}</span></> </p> */}
             </Box>
           )
          }
           </>
        )}
  
           <HorizontalSpace space={30}/> 
          

 
          
           
            <HtmlTooltip
  
          //  open={true} // for debugging
          //    onClose={() => setTooltipOpen(true)}
          //   onOpen={() => setTooltipOpen(true)}
  
  
          //     onMouseEnter={() => setTooltipOpen(true)}
          //    onMouseLeave={() => setTooltipOpen(true)}
   
  
             title={
              <React.Fragment>
                <Typography color="inherit">Requirement</Typography>
  
                <Typography fontSize={"15px"}>{"Link your Wallet to your Discord"}</Typography> 
              
  
                          <Box>
                             
                            <ToDoList tasks={tasks}/>
                          </Box>
  
  
              </React.Fragment>
            }
          >
             <Chip variant="outlined" color="warning" label= { getCompletion()}   icon={<FaceIcon />}  
             sx={ {height :"30px" , borderRadius:"10px" }}/>
          
           </HtmlTooltip>  
  
           
                {debugMode && (
  
                    <Button variant="contained" 
                    sx={{backgroundColor: theme.debugModeColor }}
                      onClick={() => disconnectWalletDiscord() } >   
                        disconnect 
                    </Button>
                )}
   
       </Box> 
       </Box>    
  
     </ >
     )
   }
   