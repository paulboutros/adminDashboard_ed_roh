 
import {
    /*
    Box,
    Card,
    Flex,
    Heading,
    Input,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
*/
    useToast,


  } from "@chakra-ui/react";
 
import {
    Card,
    CardContent,
    Typography,
    Input,
    Grid,
    Button,
    Skeleton,
    Box,
    TextField,
   /// makeStyles,
  } from '@mui/material';






  import {
    Web3Button,
    useAddress,
    useContract,
    useContractRead,
    useTokenBalance,
  } from "@thirdweb-dev/react";
  import {
    REWARDS_ADDRESS,
    Discord_stake_contract,
    Discord_invite_stake_token,
  } from "../const/addresses";
  import React, { useEffect, useState } from "react";
  import { ethers } from "ethers";
import { useTheme } from "@emotion/react";
import { allCSS, basicRoundedBox1, text2, tokens } from "../theme";
import { getSDK_fromPrivateKey } from "../data/API";
import { formatMilliseconds, hexToReadableTimestamp } from "../utils";
import { GetStakingEvent } from "../util/GetMarketContractEventData";
import { CountdownEndTime, CountdownTimerWithArg } from "./CountdownTimer";
 

 //let timeRemaining;
 let startTime;
 let myInterval;
 const _boxHeight ="270px";
  export default function Stake() {
    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

     

    const { contract: stakeTokenContract } = useContract(
        Discord_invite_stake_token,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
        REWARDS_ADDRESS,
      "token"
    );
    const { contract: stakeContract } = useContract(
        Discord_stake_contract,
      "custom"
    );
  
    const {
      data: stakeInfo,
     // refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
        //refetchStakeInfo();
      }, 10000);
    }, []);
  
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unstakeAmount, setUnstakeAmount] = useState("0");
 
    function resetValue() {
      setStakeAmount("0");
      setUnstakeAmount("0");
    }
  
     const toast = useToast();
  
    return (  
       
            

      
   

          <Box sx={{padding: "20px"  }}  > 

     

          <Typography variant="h4" gutterBottom>
            Earn Reward Token
          </Typography>
       


          <Grid container spacing={2}  >
            <Grid item xs={12} sm={6}>

                <StakeToken/>
             
            </Grid>


           
            <Grid item xs={12} sm={6}>
               
            <RewardToken/>

         
 
            </Grid>  
 

          </Grid>
 

          </Box>

        
      );
      

  }

   function CustWeb3Button( {children, action, onSuccess, ...props }){

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleClick = async () => {
        // Disable the button
        setIsButtonDisabled(true);
 
            try {
            // Call the user-defined action
               if (typeof action === 'function') {

                
                const result = await action();
                
             // at the moment action() should only return a transaction, if not we will get an error
                 if (result && result.receipt && result.receipt.status === 1) {
                //if ( receipt && receipt.status === 1) {
                    const receipt = result.receipt;
                    console.log(">>>>>>>>  receipt   " , receipt);
                    onSuccess();
                 }else{

                     console.log("something went wrong");  
                 }


               }
            } catch (error) {
            // Handle errors, such as transaction failure or user rejection
                console.error('Transaction error:', error.message);
            } finally {
            // Enable the button after the action is completed or in case of an error
                 setIsButtonDisabled(false);
            }
  
      };
 
     return(
      <>
       <Button 
       variant="contained" color="secondary"
       {...props} 
        onClick={handleClick}
        
        disabled={isButtonDisabled}
       
       >{children}
       </Button>
 
      
      </>

     )
   }



 function StakeToken(){
    
    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 

    const { contract: stakeTokenContract } = useContract(
        Discord_invite_stake_token,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
        REWARDS_ADDRESS,
      "token"
    );
    const { contract: stakeContract } = useContract(
        Discord_stake_contract,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
   // const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } = useTokenBalance(rewardTokenContract, address);
     
  
    useEffect(() => {
      setInterval(() => {
        
       // refetchStakeInfo();  
    
    }, 10000);
       
      
    }, []);
 
 
  
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unstakeAmount, setUnstakeAmount] = useState("0");
 
    function resetValue() {
      setStakeAmount("0");
      setUnstakeAmount("0");
    }
  
     const toast = useToast();
 
       
     return(
          <>
            <Box 
              
              sx={{
                
                 borderRadius: 2 ,
                 backgroundColor: colors.primary[600],

                 flexDirection: 'column',
                 display: 'flex',  
                 justifyContent : "space-between",
  

                 padding: "20px", margin: "10px",
                //  height :"100%"
                 height:  _boxHeight ,
                }}  
              >
                <Typography variant="h5" gutterBottom>
                  Stake Token
                </Typography>
                <Box textAlign="center" mb={5}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Stake Token:
                  </Typography>


                  

                  {   !loadingStakeInfo &&  !loadingStakeTokenBalance ? (

                        stakeInfo && stakeInfo[0] ? (
                        <Typography>
                            
                            {/* {stakeInfo[0]} ${stakeTokenBalance?.symbol} */}
                            {  ethers.utils.formatEther(stakeInfo[0], 4)  }
                            {" $" + stakeTokenBalance?.symbol}

                        </Typography>
                        ) : (
                            
                            <Typography>{0}</Typography>
                        ) 

                    ):(

                        <Skeleton />  
                    )
                    }

                 


                </Box>
                


   
                <Grid container spacing={2}>
               <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      label="Stake Amount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    
                  <CustWeb3Button
                   fullWidth ={true} 
               //   contractAddress={Discord_stake_contract}
                  action={async (contract) => {
                      await stakeTokenContract?.erc20.setAllowance( Discord_stake_contract, stakeAmount );
                      const transactionResult = await stakeContract.call("stake", [ethers.utils.parseEther(stakeAmount),]);
                     
                     resetValue();
                     return transactionResult;
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Stake Successful",status: "success",  duration: 5000, isClosable: true,
                    })
                  }
                >
                  Stake
                </CustWeb3Button>
 
                  </Grid>
                </Grid>
                </Grid>

                 <Grid item xs={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="number"
                      variant="outlined"
                      fullWidth
                      label="Unstake Amount"
                      value={unstakeAmount}
                      onChange={(e) => setUnstakeAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>

 
                  <CustWeb3Button 
                     fullWidth ={true} 
                     action={
                        async () => {
                            const transactionResult =await stakeContract.call('withdraw', [ethers.utils.parseEther(unstakeAmount)]);
                            resetValue();
                            return transactionResult;
                           }
                      }
                     onSuccess={() =>
                        toast({
                          title: "Unstake Successful",status: "success", duration: 5000, isClosable: true, })
                        }
                     >
                       Unstake
                    </CustWeb3Button>
 
                  </Grid>
 
                  </Grid>
                 </Grid>
               </Grid>
 
              </Box>
          
          </>


     )
   }


 function RewardToken(){
    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

     

    const { contract: stakeTokenContract } = useContract(
        Discord_invite_stake_token,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
        REWARDS_ADDRESS,
      "token"
    );
    const { contract: stakeContract } = useContract(
        Discord_stake_contract,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
   //     refetchStakeInfo();
      }, 10000);
    }, []);

    const [timeRemaining, setTimeRemaining] = useState(1000);
      

    const {
        data: stakeGetTimeUnit,
        // refetch: refetchStakeInfo,
        isLoading: loadingRatioStakeInfo,
      } = useContractRead(stakeContract, "getTimeUnit" );
      const {
        data: stakersVar,
        // refetch: refetchStakeInfo,
        isLoading: loadingstakers,
      } = useContractRead(stakeContract, "stakers", [address] );


    
    useEffect(() => {
         if (!stakeGetTimeUnit || !stakersVar)return;

        if ( loadingStakeInfo ) return;
        if(!stakeInfo) return;
   if (  stakeInfo[0] === 0) return;
          



         
         if (myInterval) {return; }
   
         myInterval =  setInterval(() => {

           
            
          //  console.log(" stakersVar  ================= " , stakersVar.timeOfLastUpdate._hex );
           
          // timestamp time IN SECOND = time of update - time in second since //January 1, 1970, 00:00:00 UTC
             const  timeOfLastUpdate =   parseInt(   stakersVar.timeOfLastUpdate._hex );
                // Assuming startTime is the timestamp of the past start time in seconds
                     startTime = timeOfLastUpdate;// 2000;// in second
   
                //   console.log(  ">>> Hard coded startTime   =  "  , startTime);


                   const timeOfLastUpdate_date = new Date( (timeOfLastUpdate *1000));

                   
                //   console.log(  ">>> real   startTime   =  "  ,  (timeOfLastUpdate  ) , "   "  , timeOfLastUpdate_date.toLocaleString());

                  
                   // Assuming eventInterval is the time interval between events in seconds
                   const eventInterval =  parseInt(  stakeGetTimeUnit._hex , 16);
                  // console.log(  ">>> eventInterval  =  "  , eventInterval);
                   // Assuming currentTime is the current timestamp in seconds
                   const currentTime = Date.now() / 1000;
   
                   // Calculate the elapsed time since the start time
                   const elapsedTime = currentTime - startTime;
   
                   // Calculate the time remaining for the next event
                      const timeRemainingTemp = eventInterval - (elapsedTime % eventInterval);
   

                     // this will update the smart cotnract

                      if ( timeRemainingTemp < 1){
                        refetchStakeInfo();
                      }
                      setTimeRemaining(timeRemainingTemp);
                 //  console.log(`Time remaining for the next event: ${timeRemainingTemp} seconds`);
    
   
         
         },  (  1000)     );
            
           
         }, [  stakeGetTimeUnit, stakersVar ]);

    
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
       
       
      


      

    // GetStakingEvent(  stakeContract );
        /*
         async function getInfo(){

            const result  = await stakeContract.call("getTimeUnit");

            console("stakeGetTimeUnit  ================= " , stakeGetTimeUnit );
         }

         getInfo();
      */
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

     
              padding: "20px", margin: "10px",
               
            //  height:"300px",
             height: _boxHeight,
                    
            }}  
             >  

  

   
            { timeRemaining ? (
                <CountdownEndTime  endTimeInSecondsX={ timeRemaining }  color={colors.grey[ text2.color ]}/> 
            ):(<p>ss</p>)}








     <Typography variant="h5"  > Reward Token    </Typography>
          {!loadingStakeInfo && !loadingRewardTokenBalance  ? (
               
               stakeInfo && stakeInfo[0] ? (
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                  { ethers.utils.formatEther(stakeInfo[1] , 4 )  }
                  </Typography>
                  <Typography>${rewardTokenBalance?.symbol}</Typography>
                
                </Box>
              ) : (
                <Typography>0</Typography>
              ) 
           ) : (
              <Skeleton/> 
           )}
            <CustWeb3Button
              //  contractAddress={Discord_stake_contract}
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