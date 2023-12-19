
import Avatar from '@mui/material/Avatar';

//Icon
import TagFacesIcon from '@mui/icons-material/TagFaces';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import FaceIcon from '@mui/icons-material/Face';


import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

//import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { allCSS, infoHeight, tokens  } from "../../theme";
import {Box, Button, Chip, Icon, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import { BasicScrollable, HorizontalSpace } from '../../components/Layout';
import AppLinkDataBox from '../../components/AppLinkDataBox.jsx';

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
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
import AccountMenu from '../../components/AccountMenu.jsx';
import AccountMenuCustom from '../../components/AccountMenuCustom.jsx';


import { useUserContext } from '../../context/UserContext';
import { addorupdate, getAvatar, openOAuth2Url,   GetCookieRedirectURL, createRedirectookie } from '../../data/API';
import { addressShortened } from '../../utils';
import { useDebugModeContext } from '../../context/DebugModeContext';
import { useParams } from 'react-router';



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
       

       <Box  sx={{  borderRadius: 4, backgroundColor: colors.primary[400] }} >
         
         
        
        
         <EarnBadges/>

       </Box>

      {/* <Avatar  src= {!user ? ( null ):(  getAvatar(user)  )}   /> */}
      
        
   
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

 

  const theme = useTheme();

 const colors = tokens(theme.palette.mode);
 const address = useAddress();

 const {user, setUser } = useUserContext();
 const {debugMode } =  useDebugModeContext();


  
 async function disconnectWalletDiscord(){

  const result = await addorupdate(user, "0000000" );

    setUser(result.user);
  //console.log(   "disconnectWalletDiscord  =" , result );

}
async function  linkAdressToDiscord(  user, address ){

 
    // at this point the discord user is not connected, so we user the wallets collection, wallet as ID
       if ( !user ){
     // after discord athentication we need to come back to the same exact page,
     // so we save the  route path in a cookie , th redirect will happen of the root route.    
         createRedirectookie( `profileWallet/${address}/2` ); // is refferal tab
         openOAuth2Url(null);
         return;
       }
   
      const result = await addorupdate(user,address);
      setUser(result.user);
     
// update task completion on server
 }
 function saveWalletAndDiscord(){

    
 }

   return (
    < >    

    
     <Box sx={{ 
             color: colors.grey[300], display: "flex",  flexDirection: "row",  alignItems: "center", height: "50px", 
       
      }}>
       
 
   <AccountMenuCustom/>


   
  
       <Box sx={{ position: 'relative',  width: infoHeight, height: infoHeight, 
       // outline: `1px solid ${ colors.blueAccent[200] }`,  // for debugging purposes
       
     }} >
      <Avatar 

       src= {!user ? ( null ):(  getAvatar(user)  )} 
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
     
        <Box  sx={  allCSS( theme.palette.mode, "400px","0px" ).infoBox  } 
             onClick={() => linkAdressToDiscord( user, address  )}
        >
      
              <p> 
               {  user.wallet.includes("0000000") ? (
                  <>Click to link <span  >{addressShortened(address)}</span> to Discord</>
                 ) : ( user.wallet )       } 
              </p>
             
        </Box>
            
          
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
           <p>  <>Wallet<span  >{"Login"}</span></> </p>
           </Box>
         )
        }
         </>
      )}

         <HorizontalSpace space={30}/> 
        {/* <Box 
          sx ={  allCSS( theme.palette.mode, "100px","0px" ).infoBox  }
           
                >   
                 Save 
       </Box>  */} 
        {/* <Chip variant="outlined" color= "bl" icon={<TagFacesIcon/> }

         label="To DO 0/3" */}
         {/* <Chip icon={<TagFacesIcon />}  label="To DO 0/3"   */}
         <Chip variant="outlined" color="warning" label="To DO 0 / 3"   icon={<FaceIcon />}  
           sx={ {height :"30px" , borderRadius:"10px" }}
        />
          




              {debugMode && (

                  <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => disconnectWalletDiscord() } >   
                      disconnect 
                  </Button>
                  )}




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
     // width: '300px', height: '50px',
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