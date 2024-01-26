
 
import  React,{ useEffect, useState } from "react";
import { BootstrapTooltip, CustomChip, HtmlTooltip, StyledConnectWallet2, allCSS, infoHeight, tokens } from "../../theme.js";
import { useTheme } from "@emotion/react";
import { useAddress } from "@thirdweb-dev/react";
import { useUserContext } from "../../context/UserContext.js";
import { useDebugModeContext } from "../../context/DebugModeContext.js";
import {  getAvatar, openOAuth2Url_whenUserNotConnected, setWallet    } from "../../data/API.js";
  
import {   Avatar, Box, Button,  Typography } from "@mui/material";
 import SpeedDialTooltipOpen from "../SpeedDialTooltipOpen.jsx";
import { HorizontalSpace, VerticalSpace } from "../Layout.jsx";
import { addressShortened } from "../../utils.js";
 import FaceIcon from '@mui/icons-material/Face';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { PopupLinkWalletDiscord } from "../popup.jsx";


import CancelIcon from '@mui/icons-material/Cancel';
  

 
import { TbExternalLink } from "react-icons/tb";
import { PopRewardDiscordInviteContent, PopTaskStatusLoginContent, PopWuRewardFomInviteStakingContent } from "../TooltipContent/content.jsx";
import { useDISTContext } from "../../context/DISTstakingContext.js";
import StakeRewardToolTip from "../StakeInterface/StakeRewardToolTip.jsx";


const first_space =5;
const space_after_avatar =7;  //10
const space_after_task  = 7;
const space_after_taskStatus =7;




export function EarnBadges( {sp ,useAvatar, taskForReward , taskStatus, rewardInfo, rewardValue , claimButton,
                               rewardIndex  }){
    
  
    const theme = useTheme();
  
   const colors = tokens(theme.palette.mode);
   const address = useAddress();
                  
   const {user, setUser } = useUserContext();
   const {debugMode }     = useDebugModeContext();
   
 
   

   
   useEffect(()=>{
      
  
  }, [ debugMode   ]);
   

  // this function set a null address, so it creates a scenario where user has
  // not saved his wallet
 
  
     return (
      <>   
      {/* display blue dashed line, empty badge to make reward badge unavalable due to user being identified */}
       { ( (!user || !address) && rewardIndex > 0) ? (

 

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
            

            <HorizontalSpace space={5}/>

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
      <Box    sx={  allCSS( theme.palette.mode  ).taskBar } > 
        <Box sx={{ 
             color: colors.grey[300], display: "flex",
             flexDirection: "row",  alignItems: "center",
             height: "50px", 
         
        }}>
         
         <HorizontalSpace space={first_space}/>
        {/* <AccountMenu/> */}
            <Box sx={{ position: 'relative',  width: infoHeight, height: infoHeight, }} >
           <Box width={"200px"} >

          { useAvatar &&(
          <>
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
 
       </>
          )
      }

      </Box>    


        </Box>
  
      <HorizontalSpace space={ space_after_avatar}/> 
     
           
            {taskForReward}
  
            {/* <HorizontalSpace space={20}/>  */}
            <HorizontalSpace space={space_after_task}/> 
         
           <Box  minWidth={"110px"}>
            {taskStatus} 
            </Box>

           <HorizontalSpace space={space_after_taskStatus}/> 
            {rewardInfo} 

            <HorizontalSpace space={10}/> 
            {rewardValue} 
             
             <HorizontalSpace space={10}/>
               {claimButton}
   
       </Box> 
       </Box>    
  

       )}

     </ >
     )
   }



   export function TaskForRewardLabel(){
 
  
    const theme = useTheme();
  
   const colors = tokens(theme.palette.mode);
   const address = useAddress();
                  
    
   
    
   
     return (
          <React.Fragment>   
            
            <BootstrapTooltip 
                 title="Basic info of the reward program" 
                 placement="left-start">
    
               <Box width={"400px"}  >
                     <p style={{fontWeight:"500px" }}>   Task For Reward  </p>
               </Box>


            </BootstrapTooltip>
             
        </React.Fragment>
        

     )

 }
 export function TaskForReward(){
 
  
    const theme = useTheme();
  
   const colors = tokens(theme.palette.mode);
   const address = useAddress();
                  
   const {user, setUser } = useUserContext();
   const {debugMode }     = useDebugModeContext();
   
     
  
  const {    setReFetch } = useDISTContext(); 
 
  const [isPopupOpen, setPopupOpen] = useState(false);
   //// this is an exact copy of popupHandleConfirm_TaskStatus
  const popupHandleConfirm_TaskForReward =  async ()  => {
   

        console.log (  "started:    popupHandleConfirm_TaskForReward ");
     
     
    const result = await setWallet(user,address);

    //create a new object by shallow copy so react can detect a change 
    
     console.log( ">>>>>>>>>>>>>>>>>>>>>>>>   setReFetch(true) "   );
     setReFetch(true);


     // we modify the wallet on user profile so it matches the one we changed on the data base
     const modifUser = { ...user, wallet: address };
     console.log( "  modifUser.wallet ="  ,   modifUser.wallet  );
     setUser( modifUser );




    setPopupOpen(false);
  };

 
    
  async function linkAdressToDiscord(  user, address ){
  
   
      // at this point the discord user is not connected, so we user the wallets collection, wallet as ID
         if ( !user ){
  
          openOAuth2Url_whenUserNotConnected( address );
     
           return;
         }
     
       //  const result = await setWallet(user,address);
       setPopupOpen(true);
        
   }
    



   
 return (
          <>   
   {(user && address) ? (  
         
        <> 
        {
            !isWalletSaved_OnServer(user) ? (
            <BootstrapTooltip 
                title="Only 1 wallet can be associated with Discord profile on this DAPP" placement="left-start" >
                  <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }
                   onClick={() => linkAdressToDiscord( user, address   )}  >
                  <p>Click to link <span  >{addressShortened(address)}</span> to Discord</p>
                </Box>
            </BootstrapTooltip>

             ):(
                 connectedWallet_match_savedWallet(user,address)  ? (

                  <BootstrapTooltip 
                  title="Your wallet is successfully associated with your Discord profile. Click, if you need to change it"
                  
                  
                  placement="left-start">
                      <Box sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  }
                       onClick={() => linkAdressToDiscord( user, address   )}  >
                          <p style={{fontWeight:"500px" }}>   {user.wallet}    </p>
                    </Box>
                  </BootstrapTooltip>



              ) : ( 

                <BootstrapTooltip 
                title="Your wallet does not match the one you added on the app"  placement="left-start">
 

                     <Box sx={  allCSS( theme.palette.mode, "400px","0px",  colors.redAccent[300]    ).infoBox  } 
                     onClick={() => linkAdressToDiscord( user, address   )}  >
                        <p style={{fontWeight:"500px" }}> 
                          {
                          
                          isWalletSaved_OnServer(user)  ?  user.wallet : address
                         
                          
                          } 
                          
                             </p>
                   </Box> 
 
                </BootstrapTooltip>
 

               )
 
             )
 
          
          } 
        </>
       
 

    
 ):(  // connectionStatus === "disconnected"
  <>
 
   { !user && address && ( 
     <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
             onClick={() => linkAdressToDiscord(user, address  )}
     >
     <p>  <>Login with <span  >{"Discord"}</span> account</> </p>
     </Box>
   )
  }

  {  user && !address && (

          <StyledConnectWallet2/>
   
   )
   }

  {  !user && !address && ( 
     <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
             onClick={() => 
              
              linkAdressToDiscord(user, address )
            
            }
     >
       <p>  <>Login with <span  >{"Discord"}</span> account</> </p>
       {/* <p>  <>Wallet<span  >{"Login"}</span></> </p> */}
     </Box>
   )
  }
   </>
)} 

    <div>
 
      <PopupLinkWalletDiscord
      
        connectedWalletAddress={address}
        user={user}
        open={isPopupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={popupHandleConfirm_TaskForReward}
      />
    </div>



            
         </>

     )

 }


 export function TaskStatusLabel( ){
 
     

  const theme = useTheme();

 const colors = tokens(theme.palette.mode);
 const address = useAddress();
     

    return(
         <>  
             
         <React.Fragment> 
             <BootstrapTooltip 
             
             title=

                {"Display tasks status or various informations related to the corresponding task showed in Task"}

               placement="top" >  

                <Box> Tasks status </Box>

             </BootstrapTooltip  >  
          </React.Fragment> 
           
         </>

   )

 }
   

 export function TaskStatus(  ){
   
     
  const [tasks, setTasks] = useState([
    { description: 'login with Discord',     completed: false, callBack:  openOAuth2Url_whenUserNotConnected },
   // { description: 'connect wallet',         completed: false, callBack:  openOAuth2Url_whenUserNotConnected },

 
    { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord_TaskStatus   },
   // { description: 'validate', completed: false },
//  here  the you may create a fucntion that opens a popo and prompt user to reconnect to switch account
   { description: 'use saved wallet', completed: false, callBack:  linkAdressToDiscord_TaskStatus   },

  ]);
  const updateTask = (index , completed ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed:  completed } : task
      )
    );
  };
  async function  linkAdressToDiscord_TaskStatus(  user, address ){

       if (!address ){
         return;
           // maybe add a poppup, you need to be  connected
       }
    // at this point the discord user is not connected, so we user the wallets collection, wallet as ID
       if ( !user ){

        openOAuth2Url_whenUserNotConnected( address );
   
         return;
       }
   
        setPopupOpen(true); 
     
      
      
 }
 

  const theme = useTheme();

 const colors = tokens(theme.palette.mode);
 const address = useAddress();
                
 const {user, setUser } = useUserContext();
 const {debugMode }     = useDebugModeContext();
 
 
 useEffect(()=>{
    

}, [ debugMode   ]);

 useEffect(()=>{
  
 
  //walletAndDiscordAreConnected(user, address );
  if (!address )return;
 
  // if we are not loggged in , we invalidate ALL check point
  // we could also, display the red chip.. as we did for wallet not connected
    if (!user ){ 
      updateTask(0, false );
      updateTask(1, false );
      updateTask(2, false );
     return;
   }
 
   
  const loggedInWithDiscord = user ? true:false; 
  updateTask(0,loggedInWithDiscord )
 
  const walletSavedOnServer =  isWalletSaved_OnServer(user) ;
   updateTask(1, walletSavedOnServer )

  const connectedWallet_match =  connectedWallet_match_savedWallet(user,address)    ;
    
  updateTask(2, connectedWallet_match );
  
}, [user , address ]);
   
 
 function getCompletion() {
  
   
  let task = 0;
  if ( user ){ task+=1; } // we are connected to discord
   if (   isWalletSaved_OnServer(user)  ){  task+=1; }
  if (   connectedWallet_match_savedWallet(user,address)  ){  task+=1; }
  
  
  // return  ( `CO= ${  task } / 3`      )   ;
    return  (`To DO ${task} / 3`)   ;

 }

 const [isPopupOpen, setPopupOpen] = useState(false);
// this is an exacct copy of popupHandleConfirm_TaskForReward
  const popupHandleConfirm_TaskStatus =  async ()  => {
  
   // console.log (  "popupHandleConfirm_TaskStatus ");
      

  const result = await setWallet(user,address);

  //create a new object by shallow copy so react can detect a change 
  const modifUser = { ...user, wallet: address };
   console.log( "  modifUser.wallet ="  ,   modifUser.wallet  );
   setUser( modifUser );
  setPopupOpen(false);
};

  


   return(
         <>  
 

         { address?( 
             <HtmlTooltip //open={true} 
              placement="right"
              title={ 
                 <PopTaskStatusLoginContent tasksArg={tasks} />
              // <React.Fragment>
              //   <Typography color="inherit">Requirement</Typography>
              //   <Typography fontSize={"15px"}>{"Link your Wallet to your Discord"}</Typography> 
              //              <Box> <ToDoList tasks={tasks}/>  </Box>
                 
              // </React.Fragment>
            }
          >
           <Box> 
              <CustomChip theme={theme} label= { getCompletion()}  icon={<FaceIcon />} color=  {theme.palette.chipYellow} />
            </Box >
            
           </HtmlTooltip>  


           ):(
            <Box> 
            <CustomChip theme={theme} label= { "No Address" }  icon={<CancelIcon />} color=  {theme.palette.chipRed} />
            </Box >
            )
          }



            <div>
            
            <PopupLinkWalletDiscord
              walletAddress={address}
              user={user}
              open={isPopupOpen}
              onClose={() => setPopupOpen(false)}
              onConfirm={popupHandleConfirm_TaskStatus}
            />
            </div>




           
         </>

   )

 }

 
 export function RewardInfoLabel(  ){
  

   const theme = useTheme();
 
 const {debugMode }     = useDebugModeContext();
 
 
 useEffect(()=>{
    

}, [ debugMode   ]);
 
   return(
         <>  
         <BootstrapTooltip  title= {"$DIST token staked amount"}  placement="top" >
             <Box> 
                <p> Staking </p>
            </Box >
           </BootstrapTooltip>
         </>

   )

 } 
 export function WURewardInfoLabel(  ){
  

  const theme = useTheme();

const {debugMode }     = useDebugModeContext();


useEffect(()=>{
   

}, [ debugMode   ]);

  return(
      <React.Fragment> 
          <BootstrapTooltip  title= {"Unclaimed Reward in $WU ERC-20"}  placement="top" >  
             <Box> 
                <p>Reward</p>
            </Box >
         </BootstrapTooltip>
      </React.Fragment>

  )

} 

 export function RewardValue(  {  rewardAmount }){
  

  const theme = useTheme();
 
  const {distStakedAmount,   distReward  } = useDISTContext();             
  
 const {debugMode }     = useDebugModeContext();
  
 useEffect(()=>{
    

}, [ debugMode   ]);

     

   return(
         <>  
             <HtmlTooltip // open={true} 
              title={ <StakeRewardToolTip />}
            >
           <Box> 
            
 
          {/* <Button variant="contained"> */}
           <Typography  
           
           sx={ allCSS( theme.palette.mode).unclaimedRewardText }  
           
           >   
             { rewardAmount } 
            </Typography> 
            
          </Box >
            
           </HtmlTooltip>    
           
         </>

   )

 } 

// this shows the stakes amount for the tokenless
const pad ="15px";
 export function RewardInfo(  {  stakedAmount , popupContent  }){
  

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {user, setUser } = useUserContext();   //DISTStakeInfo
     

   return(
         <> 
           {  
            user &&(
             <HtmlTooltip 
              // open={ forceOpenForDesigning } // force it open when designing 
              placement="right"
              title={
                   popupContent
              }
          >
           <Box> 
            
           <CustomChip theme={theme} label= { stakedAmount } 
            icon={<MonetizationOnTwoToneIcon/>}
             color=  { stakedAmount > 0 ? theme.palette.chipGreen: colors.grey[500]  } />
             
          </Box >
            
            </HtmlTooltip>    
            ) //:( <p>Discord login is not connected</p> )
               
           
            }
         </>

   )

 } 

 
function connectedWallet_match_savedWallet ( user , address ){

  if (!user)return false;
  if (!address)return false;

  return   address === user.wallet? true:false
}

export function isWalletSaved_OnServer( user ){
     if (!user)return false;
 return (  !user.wallet    )? false:true
}

 
 