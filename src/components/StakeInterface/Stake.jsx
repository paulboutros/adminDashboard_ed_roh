 
import {useToast, } from "@chakra-ui/react";
  
 
import {
    
    Typography,
    
    Grid,
    
    Skeleton,
    Box,
    TextField,
    
  } from '@mui/material';
 
  import {
    
    useAddress,
    useContract,
    useContractRead,
    useTokenBalance,
  } from "@thirdweb-dev/react";
  import {
    Discord_tokenLess_stakinContract,
     
    
    Discord_invite_stake_token,
  } from "../../const/addresses";
  import React, {  useState } from "react";
  import { ethers } from "ethers";
import { useTheme } from "@emotion/react";
import {    tokens } from "../../theme";
 import { CustWeb3Button } from "../Buttons/buttons";
 
import RewardToken from "./RewardToken";
//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";

import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======


 //let timeRemaining;
  const _boxHeight ="270px";



 
  export default function Stake() {

    const { selectedChain, setSelectedChain } = useContext(ChainContext);
    
   

    const address = useAddress();
    
 
     
    // this should be probably replace by character token  (charcter ninted as combo rewards)
    const { contract: stakeTokenContract } = useContract(
        Discord_invite_stake_token,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
      addressesByNetWork[selectedChain].WUCOIN,
      "token"
    );
    const { contract: stakeContract } = useContract(
      Discord_tokenLess_stakinContract,
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
 

 function StakeToken(){
  const { selectedChain  } = useContext(ChainContext);
    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 

    const { contract: stakeTokenContract } = useContract(
        Discord_invite_stake_token,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
      addressesByNetWork[selectedChain].WUCOIN,
      "token"
    );
    const { contract: stakeContract } = useContract(
      Discord_tokenLess_stakinContract,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
    
  
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
                
                  action={async (contract) => {
                      await stakeTokenContract?.erc20.setAllowance( Discord_tokenLess_stakinContract, stakeAmount );
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

