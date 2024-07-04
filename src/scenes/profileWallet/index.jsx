
 
import React, {   useState } from 'react';
 

//import * as React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

 import {Box, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import {  VerticalSpace } from '../../components/Layout';
 
//==============================================================
  
import {
  
 
  
   useContract
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
 

  
 import { useParams } from 'react-router';
import RewardTokenTab from '../RewardTokenTab/index.jsx';

  

 import { Discord_tokenLess_stakinContract } from '../../const/addresses.ts';
 
  
  
 
//import { DebugPanel } from '../../components/Debug/DebugPanel.jsx';
import { useDISTContext } from '../../context/DISTstakingContext.js';
import { CustomTabPanel, a11yProps } from '../../components/TabSubcomponent.jsx';
  
// horizontal space between  elements of the badges
  const sp = [20];

  export const myPacksIdx = 0;
  export const referralRewardTabIndex =1;

export default function BasicTabs() {
 
 
  const tabInfo = [
     {name: "My Packs",        index:0},
     {name: "Referal Reward",  index:1},
     {name: "Token",           index:2}
     
  ]

   
  //const {distStakedAmount,   distReward  } = useDISTContext();
     

     const theme = useTheme();
     
   
    let {   initialTabIndex } = useParams();
    if (initialTabIndex){
      initialTabIndex = Number(initialTabIndex);
    }else{

      initialTabIndex = 0;
    }
   
    const { contract: dist_tokenLessContract, isLoading: loading_dist_tokenLess } = useContract( Discord_tokenLess_stakinContract );
    


 // TO DO: we could use address from useParams().. especially if you want other user to see other people profile
    

  const [value, setValue] = useState( initialTabIndex );
 
  const handleChange = (event, newValue) => { setValue(newValue); };
   

  return (
    //<Box sx={{ width: '100%' }}>
    < >
     <Container maxWidth="lg">   

                      
        <Box >
 
         <Tabs value={value} onChange={handleChange}  aria-label="basic tabs example" sx={theme.tabsStyle}>
                       
            {/* <Tab label="My NFTs"   {...a11yProps(0)}  disableRipple  sx={  theme.tabStyle }   /> */}
           <Tab label= { tabInfo[0].name }     {...a11yProps(   tabInfo[0].index   )}  disableRipple  sx={  theme.tabStyle }   />  
           <Tab label= { tabInfo[1].name }     {...a11yProps(   tabInfo[1].index   )}  disableRipple  sx={ theme.tabStyle }    />
           {/* <Tab label= { tabInfo[2].name }     {...a11yProps(   tabInfo[2].index   )}  disableRipple  sx={ theme.tabStyle }    />   */}
 
        </Tabs>
         
      </Box>
      {/* <CustomTabPanel value={value} index={0}>  Item One  </CustomTabPanel> */}
      
     
        <CustomTabPanel value={value} index={tabInfo[0].index}> {<MyPacks/>  } </CustomTabPanel>
     
      <CustomTabPanel value={value} index={tabInfo[1].index}>
       

        {/*   TO DO, add a server join reward status (show if user is a member of not)
         since we have direct access to bot. see if we can access message and content in some channel...
        */}

        

          {/* 
           There was a lot of EarnBadge code here remove because of disabling Discord and User requirement
           */}
 
          <VerticalSpace space={1}/>
          {/* <DebugPanel DISTstakedAmount={distStakedAmount} /> */}
      
      </CustomTabPanel>
      <CustomTabPanel value={value} index={ tabInfo[2].index }>
       
       
       <RewardTokenTab/>

       </CustomTabPanel>



     </Container>

     
         
    </ >
  );
}


