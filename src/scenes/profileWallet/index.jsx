
 
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


import { EarnBadges,
   TaskForReward,TaskForRewardLabel,
     TaskStatus,TaskStatusLabel,
     RewardInfo,RewardInfoLabel, RewardValue, WURewardInfoLabel 
    } from '../../components/Badges/EarnBadges';

 import   { TaskForReward3, TaskStatus3 } from '../../components/Badges/BadgeJoinServer.jsx';
import   { TaskForRewardDiscordInvites, TaskStatus4 } from '../../components/Badges/BadgeDiscordInvites';

 import { Discord_tokenLess_stakinContract } from '../../const/addresses.ts';
import { taskBadge } from '../../const/various.js';
import { CustWeb3Button } from '../../components/Buttons/buttons.jsx';
import { PopRewardDiscordInviteContent,PopRewardServerMemberContent  } from '../../components/TooltipContent/content.jsx';
   
   
  
  
 
import { DebugPanel } from '../../components/Debug/DebugPanel.jsx';
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

   
  const {distStakedAmount,   distReward  } = useDISTContext();
     

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

         <EarnBadges  sp={sp}  useAvatar={false}  taskForReward={<TaskForRewardLabel/>}  taskStatus={<TaskStatusLabel/>} 

                      rewardInfo={<RewardInfoLabel/>} 
                      rewardValue={<WURewardInfoLabel/>} 
                      rewardIndex={-1}

         />
        
        <VerticalSpace space={1}/>

          <EarnBadges  sp={sp} useAvatar={true} taskForReward={<TaskForReward/>} 
                       taskStatus={<TaskStatus/>} // no need for argument each task are different object(very different from each other) 
                       rewardInfo={<RewardInfo stakedAmount={0}/> } 
                       rewardValue={  null } //<RewardValue rewardAmount={0}/>} 
                       rewardIndex={
                        taskBadge.discordAndWalletRegistration
                       }
                    />
        
          {/* <VerticalSpace space={1}/>

          <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForRewardAppLink/>} 
                      taskStatus={<TaskStatus2/>}   
                       rewardInfo={<RewardInfo stakedAmount={0}/>} rewardValue={<RewardValue rewardAmount={0}/>}  rewardIndex={ taskBadge.appLinkInvite  } 
                     
          /> */}
           
         <VerticalSpace space={1}/>
        
         <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForReward3/>}   taskStatus={<TaskStatus3/>}  
                          rewardInfo ={   <RewardInfo stakedAmount={0}  popupContent={ null }     />     }  
                          rewardValue={ null } // <RewardValue rewardAmount={0}/>}       
                          rewardIndex={ taskBadge.guildMember_index }
                        />
       
         <VerticalSpace space={1}/>
 
         <EarnBadges  sp={sp} useAvatar={false} taskForReward={<TaskForRewardDiscordInvites/>}
           
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
                            onSuccess={() => console.log("sucess") 
                              
                            //   toast({title: "Rewards Claimed", status: "success",duration: 5000,isClosable: true,})
                             }
                           // isDisabled={( !address) }
                          >
                            Claim
                        </CustWeb3Button>
                      
                        }
                        
                        />
 
          <VerticalSpace space={1}/>
          <DebugPanel DISTstakedAmount={distStakedAmount} />
      
      </CustomTabPanel>
      <CustomTabPanel value={value} index={ tabInfo[2].index }>
       
       
       <RewardTokenTab/>

       </CustomTabPanel>



     </Container>

     
         
    </ >
  );
}


