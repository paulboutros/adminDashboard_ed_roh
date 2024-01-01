
import Avatar from '@mui/material/Avatar';

 import FaceIcon from '@mui/icons-material/Face';
 

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
import {Box, Button, Chip, useTheme} from '@mui/material';
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
   
  useAddress,
  useConnectionStatus,
   metamaskWallet
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
 

 import { setUserTask   } from '../../data/API';
 import { useParams } from 'react-router';
 import BadgeDiscordInvites from '../../components/Badges/BadgeDiscordInvites';
import RewardTokenTab from '../RewardTokenTab/index.jsx';
import { EarnBadges } from '../../components/Badges/EarnBadges';
import { useUserContext } from '../../context/UserContext';


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

// horizontal space between  elements of the badges
  const sp = [20];
export default function BasicTabs() {

  const {user  } = useUserContext();

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
 
     
   
   useEffect(()=>{
    if (!user)return;
    const fetchData = async ( ) => {


         console.log( " setUserTask(); setUserTask(); setUserTask();");
        await setUserTask(user);


    }
    fetchData();
    
      
  
   }, [ user ]);
 
  return (
    //<Box sx={{ width: '100%' }}>
    < >
     <Container maxWidth="lg">   
        <Box >
             {/*sx={{ borderBottom: 1, borderColor: 'divider' }} */}

         <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example" sx={theme.tabsStyle}>
                       
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
        
         <AppLinkDataBox  sp={sp}  />
         
          
         <VerticalSpace space={1}/>
        
         <JoinServer   sp={sp}   />
         <VerticalSpace space={1}/>
         <BadgeDiscordInvites/>

      {/* result  = {  partOfGuild :true, joinedAt: userJoinTime  }; */}
       
           {/* <AppLinkDataBox/>  */}

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
       
       
       <RewardTokenTab/>

      </CustomTabPanel>
     </Container>
    </ >
  );
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