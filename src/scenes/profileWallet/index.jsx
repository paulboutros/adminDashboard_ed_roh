import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { tokens  } from "../../theme";
import {Box, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import { BasicScrollable } from '../../components/Layout';
import AppLinkDataBox from '../../components/AppLinkDataBox.jsx';
import SpeedDialTooltipOpen from '../../components/SpeedDialTooltipOpen.jsx';

import {
  ThirdwebNftMedia,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
import AccountMenu from '../../components/AccountMenu.jsx';



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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
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

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  // const tabStyle={
     
  //   '&:not(.hover)': { color: `${colors.primary[100]}`},
  //   '&:hover': { color: `${colors.primary[50]}`},
  //   '&.Mui-selected': { color: `${theme.palette.blueSelectedTab }`},
  // }  
 
  return (
    //<Box sx={{ width: '100%' }}>
    <BasicScrollable>
     <Container maxWidth="lg">   
       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

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
       
         <AccountMenu/>  
        <SpeedDialTooltipOpen/>
           {/* <AppLinkDataBox/>  */}

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Three
      </CustomTabPanel>
     </Container>
    </BasicScrollable>
  );
}


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