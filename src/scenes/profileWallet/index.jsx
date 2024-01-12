
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

import { allCSS, infoHeight, tokens, BootstrapTooltip } from "../../theme";
import {Box, Chip, useTheme} from '@mui/material';
import Container from '../../components/Container/Container';
import {  HorizontalSpace, VerticalSpace } from '../../components/Layout';

 


//==============================================================
 
//=============================================================

import {
   
  useAddress,
  useConnectionStatus,
   metamaskWallet,
   useContract
} from "@thirdweb-dev/react";
import MyPacks from '../myPacks/index';
 

 import { getSDK_fromPrivateKey, setUserTask   } from '../../data/API';
 import { useParams } from 'react-router';
import RewardTokenTab from '../RewardTokenTab/index.jsx';


import { EarnBadges,
   TaskForReward,TaskForRewardLabel,
     TaskStatus,TaskStatusLabel,
     RewardInfo,RewardInfoLabel, RewardValue, WURewardInfoLabel, ClaimButton
    } from '../../components/Badges/EarnBadges';

import   { TaskForReward2, TaskStatus2 } from '../../components/Badges/AppLinkDataBox.jsx';
import   { TaskForReward3, TaskStatus3 } from '../../components/Badges/BadgeJoinServer.jsx';
import   { TaskForReward4, TaskStatus4 } from '../../components/Badges/BadgeDiscordInvites';

import { useUserContext } from '../../context/UserContext';
import { Discord_tokenLess_stakinContract } from '../../const/addresses.ts';
import { taskBadge } from '../../const/various.js';
import { CustWeb3Button } from '../../components/Buttons/buttons.jsx';
import { useNotificationContext } from '../../context/NotificationContext.js';
import { ethers } from 'ethers';
import { PopRewardDiscordInviteContent,
   PopRewardServerMemberContent,
   PopRewardInfoLoginContent
  
  
  } from '../../components/TooltipContent/content.jsx';
import { DebugPanel } from '../../components/Debug/DebugPanel.jsx';
import { useDISTContext } from '../../context/DISTstakingContext.js';


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
  const {distStakedAmount,   distReward  } = useDISTContext();
        
   
   //const [DISTstakedAmount      , setDISTAmount] = useState( 0 );
   //const [DISTReward, setDISTReward] = useState( 0 );


     const theme = useTheme();
    const colors = tokens(theme.palette.mode);
   
    let {   initialTabIndex } = useParams();
    if (initialTabIndex){
      initialTabIndex = Number(initialTabIndex);
    }else{

      initialTabIndex = 0;
    }
   
    const { contract: dist_tokenLessContract, isLoading: loading_dist_tokenLess } = useContract( Discord_tokenLess_stakinContract );
    


 // TO DO: we could use address from useParams().. especially if you want other user to see other people profile
    

   const [value, setValue] = useState( initialTabIndex );

 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
/*
    useEffect(()=>{
       
      if (  loading_dist_tokenLess ) return;
      const fetchData = async ( ) => {

         // the following data is not related to the staker, they are general info about the contract
         // therefore, they need to be loaded ONLY ONCE  (unlike getStakeInfo for example)
          const ratioInfo = await dist_tokenLessContract.call("getRewardRatio_Over");
          const timeUnit = await dist_tokenLessContract.call("getTimeUnit_Over");
          
         
          // so let us consider this to be the initial balance only  
          const Initialbalance = await dist_tokenLessContract.call("TEST_getBalance");
         // console.log( "PPPPPPP   balance   " , Initialbalance );

         const  InitialbalanceRes  = (+ethers.utils.formatEther(  Initialbalance._hex     )).toFixed(1);
          const generalInfo ={
            _denominator: parseInt(  ratioInfo._denominator._hex , 16),
            _numerator: parseInt(  ratioInfo._numerator._hex , 16),
             timeUnit: parseInt(  timeUnit._hex , 16),
             initialBalance:  InitialbalanceRes

          }
          console.log( ">>>      generalInfo   " , generalInfo );


          addDataToUser(DISTStakeInfoGeneral , generalInfo );
          
 
       }
      fetchData();
   
    }, [    loading_dist_tokenLess   ]);
 */
   
   useEffect(()=>{
    if (!user)return;
    const fetchData = async ( ) => {
          
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

           <Tab label="Referal Reward"   {...a11yProps(2)}  disableRipple  sx={ theme.tabStyle }   />
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

         <EarnBadges  sp={sp}  useAvatar={false}  taskForReward={<TaskForRewardLabel/>}  taskStatus={<TaskStatusLabel/>} 
                      rewardInfo={<RewardInfoLabel/>} 

                      rewardValue={<WURewardInfoLabel/>} 
                      
                      rewardIndex={-1} 
                       />
        
        <VerticalSpace space={1}/>

          <EarnBadges  sp={sp} useAvatar={true} taskForReward={<TaskForReward/>} 
                       taskStatus={<TaskStatus/>} // no need for argument each task are different object(very different from each other) 
                       rewardInfo={<RewardInfo stakedAmount={0}/> } 
                       rewardValue={<RewardValue rewardAmount={0}/>} 
                       rewardIndex={
                        taskBadge.discordAndWalletRegistration
                       }
                    />
        
          <VerticalSpace space={1}/>

          <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForReward2/>} 
                      taskStatus={<TaskStatus2/>}   
                       rewardInfo={<RewardInfo stakedAmount={0}/>}
                       rewardValue={<RewardValue rewardAmount={0}/>} 
                       rewardIndex={ taskBadge.appLinkInvite  } 
                        />
           
         <VerticalSpace space={1}/>
        
         <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForReward3/>}   taskStatus={<TaskStatus3/>}  
                          rewardInfo ={   <RewardInfo stakedAmount={0}  popupContent={ <PopRewardServerMemberContent/> }     />     }  
                          rewardValue={<RewardValue rewardAmount={0}/>}       
                          rewardIndex={ taskBadge.guildMember_index }
                        />
       
         <VerticalSpace space={1}/>
 
         <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForReward4/>}
           
                        taskStatus={<TaskStatus4/>}
                        rewardInfo={ <RewardInfo stakedAmount={  distStakedAmount  } popupContent={ <PopRewardDiscordInviteContent/> }   />}
                        rewardValue={<RewardValue rewardAmount={ distReward }/>}  // reward in $WU from Dist staking contract

                     

                        rewardIndex={ taskBadge.invite_index } 
                        
                        claimButton={
                          
                          <CustWeb3Button
                          //  contractAddress={Discord_stake_contract}
                            action={ async () => {
                              const trx = await dist_tokenLessContract.call("claimRewards");// stakeContract.call("claimRewards");
                           //   resetValue();
                              return trx;
                            }}
                            onSuccess={() =>
                               console.log("sucess") 
                            //   toast({title: "Rewards Claimed", status: "success",duration: 5000,isClosable: true,})
                             }
                           // isDisabled={( !address) }
                          >
                            Claim
                        </CustWeb3Button>
                         
                        
                        
                        }
                        
                        />
 

      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
       
       
       <RewardTokenTab/>

      </CustomTabPanel>



     </Container>

      <DebugPanel DISTstakedAmount={distStakedAmount} 
      // setDISTAmount={setDISTAmount}
        />
    </ >
  );
}

 
