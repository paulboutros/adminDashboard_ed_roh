
import {useToast, } from "@chakra-ui/react";
  
 
import { Typography, Skeleton,Box, Divider } from '@mui/material';
   
 
  import {
    
    useAddress,
    useContract,
   
    useTokenBalance,
  } from "@thirdweb-dev/react";
  import {
    Discord_tokenLess_stakinContract,
    REWARDS_ADDRESS,
    
    Discord_invite_stake_token,
  } from "../../const/addresses";
  import React, { useEffect, useState } from "react";
  import { ethers } from "ethers";
import { useTheme } from "@emotion/react";
import {  cool_orange, text2, tokens } from "../../theme";
 import { CountdownEndTime  } from "../CountdownTimer";
import { CustWeb3Button } from "../Buttons/buttons";
import { useDISTContext } from "../../context/DISTstakingContext";
 
import { EtherScanLinkBlock, ContractBalance  }  from "../BlockLink/BlockLinks";
import { HorizontalSpace } from "../Layout";

 
 const _boxHeight ="270px";
 

 export default function StakeRewardToolTip(){
    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const {distStakedAmount,   distReward , 
         setReFetch , stakeInfo ,
         DISTStakeInfoGeneral ,
          stakeGetTimeUnit,
          timeRemaining,
         stakersVar
        
        } = useDISTContext();

     const { contract: stakeTokenContract }   = useContract( Discord_invite_stake_token,"token");
     const { contract: rewardTokenContract }  = useContract( REWARDS_ADDRESS,"token");
     const { contract: stakeContract }        = useContract(Discord_tokenLess_stakinContract,"custom");
     
     

  // TO DO LATER
   const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =useTokenBalance(stakeTokenContract, address);
     const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =useTokenBalance(rewardTokenContract, address);
 
    
    useEffect(() => {

        if (!stakeGetTimeUnit)return;
        if (!stakersVar)return;
        
      //  console.log(" stakersVar  ================= " , stakersVar.timeOfLastUpdate._hex );
       
      const  UpdatedtimeUpdate =   parseInt(   stakersVar.timeOfLastUpdate._hex );
      const timestampInMilliseconds = UpdatedtimeUpdate * 1000;

      // Create a Date object using the timestamp
      const date = new Date(timestampInMilliseconds);
      

 //
      const timeUnit = parseInt(  stakeGetTimeUnit._hex , 16);  // Replace with your actual time unit in seconds
       // Calculate the next reward increase time
      const nextRewardTimeInSeconds = UpdatedtimeUpdate + timeUnit;
       // Convert to milliseconds
      const nextRewardTimestampInMilliseconds = nextRewardTimeInSeconds * 1000;
      const nextRewardDate = new Date(nextRewardTimestampInMilliseconds);
       // Display the next reward time
      console.log("Next Reward Time:", nextRewardDate.toLocaleString());



      // You can now use date.toLocaleString() or other Date methods to format the date as needed
      console.log("timeOfLastUpdate DATE   ===" ,date.toLocaleString())
       
 
      }, [stakeGetTimeUnit]);
   
  
     const toast = useToast();
    return(
        <>
          <Box   sx={{ // test box

              borderRadius: 2 ,
              backgroundColor: colors.primary[600],
            
              flexDirection: 'column',
              display: 'flex',  
              justifyContent : "space-between",
      
            
             
             // height: _boxHeight,
             }}  
             >  
 
            { timeRemaining && (
               <div  style = { { transform: "scale(0.6)" } } >
                <CountdownEndTime endTimeInSecondsX={ timeRemaining } color={colors.grey[ text2.color ]} showText={false} /> 
              </div> 
            )}
 
             <Divider orientation="horizontal" style={{ height: "1px", width: '100%' }} /> 


              <HorizontalSpace space={2}/>   
             <EtherScanLinkBlock 
                addressArg={ Discord_tokenLess_stakinContract } 
                _colors={  colors.primary[100]   } 
                _alpha={0}
                toolTipMessage={"see $WU ERC-20 reward"}
               />   

 

          </Box>
 
       </>

    )

 }

 