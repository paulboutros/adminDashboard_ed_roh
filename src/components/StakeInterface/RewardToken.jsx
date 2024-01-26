
import {useToast, } from "@chakra-ui/react";
  
 
import { Typography, Skeleton,Box } from '@mui/material';
   
 
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
import {  text2, tokens } from "../../theme";
 import { CountdownEndTime  } from "../CountdownTimer";
import { CustWeb3Button } from "../Buttons/buttons";
import { useDISTContext } from "../../context/DISTstakingContext";
 

 //let timeRemaining;
 let startTime;
 let myInterval;
 const _boxHeight ="270px";
 

 export default function RewardToken(){
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
   

     

  
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unstakeAmount, setUnstakeAmount] = useState("0");
 
    function resetValue() {
      setStakeAmount("0");
      setUnstakeAmount("0");
    }
  
     const toast = useToast();
    return(
        <>
          <Box   sx={{ // test box

              borderRadius: 2 ,
              backgroundColor: colors.primary[600],
            
              flexDirection: 'column',
              display: 'flex',  
              justifyContent : "space-between",
      
            
             
              height: _boxHeight,
             }}  
             >  

  

   
            { timeRemaining ? (

             
                <CountdownEndTime 

                endTimeInSecondsX={ timeRemaining }  
                color={colors.grey[ text2.color ]}
 
                /> 

                

            ):(<p>ss</p>)}
 

     <Typography variant="h5"  > Reward Token    </Typography>
          { /* !loadingStakeInfo && */ !loadingRewardTokenBalance  ? (
               
               stakeInfo && stakeInfo[1] ? (
                <Box>
                  {  ethers.utils.formatEther(stakeInfo[1], 4)  }
                 
                  
                  {/* <Typography>${rewardTokenBalance?.symbol}</Typography> */}
                
                </Box>

              ) : (
                <Typography>0</Typography>
              ) 
           ) : (
              <Skeleton/> 
           )}
            <CustWeb3Button
             
                action={async () => {
                  const trx = await stakeContract.call("claimRewards");
                  resetValue();
                  return trx;
                }}
                onSuccess={() =>
                   toast({title: "Rewards Claimed", status: "success",duration: 5000,isClosable: true,})
                 }
               // isDisabled={( !address) }
              >
                Claim
            </CustWeb3Button>
       
          </Box>
 
       </>

    )

 }


 function startTimeInterval(){



 }