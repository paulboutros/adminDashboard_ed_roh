
import Avatar from '@mui/material/Avatar';

//Icon
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FaceIcon from '@mui/icons-material/Face';




import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


import React, { useEffect, useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

//import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { allCSS, infoHeight, tokens, HtmlTooltip, BootstrapTooltip } from "../../theme";
import {Box, Button, Chip, Icon, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import {  HorizontalSpace, VerticalSpace } from '../../components/Layout';
import AppLinkDataBox from '../../components/Badges/AppLinkDataBox.jsx';
import JoinServer from '../../components/Badges/BadgeJoinServer.jsx';



//==============================================================
import Backdrop from '@mui/material/Backdrop';
import SpeedDialTooltipOpen from '../../components/SpeedDialTooltipOpen.jsx';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
//=============================================================

import {
  ThirdwebNftMedia,
  useAddress,
  useConnectionStatus,
  useContract,
  useOwnedNFTs, useConnect, metamaskWallet
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
import AccountMenu from '../../components/AccountMenu.jsx';
import AccountMenuCustom from '../../components/AccountMenuCustom.jsx';


import { useUserContext } from '../../context/UserContext';
import { addorupdate, getAvatar, openOAuth2Url,   GetCookieRedirectURL, createRedirectookie } from '../../data/API';
import { addressShortened } from '../../utils';
import { useDebugModeContext } from '../../context/DebugModeContext';
import { useParams } from 'react-router';
import ToDoList from '../../components/List/ToDoList';
import BadgeDiscordInvites from '../../components/Badges/BadgeDiscordInvites';


async function openOAuth2Url_whenUserNotConnected( address ){

  // after discord athentication we need to come back to the same exact page,
   // so we save the  route path in a cookie , th redirect will happen of the root route.    
   createRedirectookie( `profileWallet/${address}/2` ); // is refferal tab
   openOAuth2Url(null);
}
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        // <Box sx={{ p: 3 }}>
          <>{children}</>
        // </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const walletConfig = metamaskWallet();
export default function BasicTabs() {

  

  const connectionStatus = useConnectionStatus();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   
    let {   initialTabIndex } = useParams();
    if (initialTabIndex){
      initialTabIndex = Number(initialTabIndex);
    }else{

      initialTabIndex = 0;
    }
   

  console.log("initialTabIndex  =",initialTabIndex);
  const [value, setValue] = useState( initialTabIndex );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  

 
  return (
    //<Box sx={{ width: '100%' }}>
    < >
     <Container maxWidth="lg">   
        <Box >
             {/*sx={{ borderBottom: 1, borderColor: 'divider' }} */}

         <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example"
            
           
           sx={theme.tabsStyle}
                      >
           <Tab label="My NFTs"   {...a11yProps(0)}  disableRipple  sx={  theme.tabStyle }   />
           <Tab label="My Packs"  {...a11yProps(1)}  disableRipple  sx={  theme.tabStyle }   />

           <Tab label="Referal"   {...a11yProps(2)}  disableRipple  sx={ theme.tabStyle }   />
           <Tab label="Token"     {...a11yProps(3)}  disableRipple  sx={ theme.tabStyle }   />  

        </Tabs>
         
      </Box>
      <CustomTabPanel value={value} index={0}> 
         Item One
      </CustomTabPanel>
       
      <CustomTabPanel value={value} index={1}>
          <MyPacks/>  
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
       

       {/*   TO DO, add a server join reward status (show if user is a member of not)
         since we have direct access to bot. see if we can access message and content in some channel...
        */}
          <EarnBadges/>
        
          <VerticalSpace space={1}/>
        
         <AppLinkDataBox/>
         
          
         <VerticalSpace space={1}/>
        
         <JoinServer/>
         <VerticalSpace space={1}/>
         <BadgeDiscordInvites/>

      {/* result  = {  partOfGuild :true, joinedAt: userJoinTime  }; */}
       
           {/* <AppLinkDataBox/>  */}

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
     </Container>
    </ >
  );
}


 function EarnBadges(){

  const [tasks, setTasks] = useState([
    { description: 'login with Discord',     completed: false, callBack:  openOAuth2Url_whenUserNotConnected },
    { description: 'link wallet to Discord', completed: false, callBack:  linkAdressToDiscord   },
    { description: 'validate', completed: false },
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
     console.log("  profile wallet  : debugMode   = ", debugMode );

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
  //console.log(   "disconnectWalletDiscord  =" , result );

}

  function walletAndDiscordAreConnected(user){

   
   //console.log(  " >>>>>>>>>>>>>>>>>>>>     user="   , user);
  if (!user || user === undefined){return false;}
 // console.log(  "user.wallet "   ,user.wallet);

  return !user.wallet.includes("0000000");
}

async function  linkAdressToDiscord(  user, address ){

 
    // at this point the discord user is not connected, so we user the wallets collection, wallet as ID
       if ( !user ){

        openOAuth2Url_whenUserNotConnected( address );
   
         return;
       }
   
      const result = await addorupdate(user,address);
      setUser(result.user);
     
// update task completion on server
 }
 
 function getCompletion() {
  
   
  let task = 0;
  if ( user ){ task+=1;    console.log(  "complete  1 "); } // we are connected to discord
  if (  walletAndDiscordAreConnected(user)  ){  console.log(  "complete  2 " , user);   task+=1; }  // there is wallet associated with discord account
  

return  (`To DO ${task} / 2`)   ;

 }

 const [isTooltipOpen, setTooltipOpen] = useState(false);

   return (
    <>   

    <Box  sx={{  borderRadius: 4, backgroundColor: colors.primary[400] }} > 
      <Box sx={{ 
             color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
       
      }}>
       
 
        <AccountMenuCustom/>
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
           <Box sx={allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
                   onClick={() => linkAdressToDiscord(user, address)}
           >
           <p>  <>Wallet <span  >{"Login"}</span></> </p>
           </Box>
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
 


const SpeedDialTrigger = ({ children }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [open, setOpen] = useState(false);

   const handleOpen = () => {setOpen(true); };
   const handleClose = () => {setOpen(false);};
    
   const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  
  return (
    <Box
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      sx={{
        // Add your styling for the trigger component
        padding: '10px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        display: 'inline-block',
        overflow: 'visible', // Allow content to overflow
        
      }}
    >
      {children}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon= {<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
         
        sx={{ 
           
           '& .MuiButtonBase-root': {
              backgroundColor : colors.redAccent[300],
             
                position: 'relative',
                top: 0, left: 0 
               

          }
        
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
        

            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}

            sx={{ 
              
             '& .MuiButtonBase-root': {
                backgroundColor : colors.grey[700],
               
                  display: 'inline-block',
                  overflow: 'visible', // Allow content to overflow
                  
                
                }
             }}

          />
        ))}
      </SpeedDial>
    </Box>
  );
};

const YourComponent = () => {
  return (
    <div>
      {/* Use SpeedDialTrigger as a trigger component */}
      <SpeedDialTrigger>Hover me to trigger SpeedDial</SpeedDialTrigger>
      {/* Other content */}
    </div>
  );
};
 



/* from mui API doc
  <Box sx={{ borderColor: 'primary.main' }} />
// equivalent to borderColor: theme => theme.palette.primary.main

  */
/*

<Typography
  sx={
    
    [
    {
     
      '&:hover': {
        color: `${colors.primary[200]}`,
        // backgroundColor: 'white',
      },
    },
    
  ]}
>
    Some Text
    </Typography>

    //=================================
css:
.MuiTabs-indicator {
    position: absolute;
    height: 2px;
    bottom: 0;
    width: 100%;
    -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    background-color: #eae9e6;
}
 

*/


// bezier visualization
/*
https://css-tricks.com/pure-css-bezier-curve-motion-paths/
*/

/*
//other basic example, text move up an down on Hover/not Hover


<Typography
  sx={
    
    
    {
      '&:not(.hover)': { 
         transform: "translate3d(0px, 0px, 0px)",
         WebkitTransition: "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
         transition:       "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms",
         color: `${colors.primary[100]}`},
      '&:hover': {

        transform: "translate3d(0px, 5px, 0px)",
        color: `${colors.redAccent[200]}`,
        WebkitTransition: "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
        transition:       "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms"
        
      },
    } 
    
  
  }
>
    Some Text
    </Typography>
)

*/

// array for multiple condition
/*
sx={
     
  [
  {  
   
    // '& .css-l1edue-MuiTabs-indicator': { backgroundColor: colors.primary[600]  },
     
   
  },
  // foo && {
  //   '&:hover': { backgroundColor: 'grey' },
  // },
  // bar && {
  //   '&:hover': { backgroundColor: 'yellow' },
  // },
]}

*/