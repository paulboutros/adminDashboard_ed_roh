 
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
import { allCSS, basicRoundedBox1, tokens } from "../theme";
import { getSDK_fromPrivateKey } from "../data/API";
 

 



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
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
        refetchStakeInfo();
      }, 10000);
    }, []);
  
    const [stakeAmount, setStakeAmount] = useState("0");
    const [unstakeAmount, setUnstakeAmount] = useState("0");
  


  //  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    
   // const handleClick = 




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
              <Card variant="outlined" 
              
              sx={{
                
                 borderRadius: 2 ,
                 backgroundColor: colors.primary[600],
                 padding: "20px", margin: "10px"
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
 
              </Card>
            </Grid>


           
            <Grid item xs={12} sm={6}
               sx={{ height: '400px', display: 'flex', flexDirection: 'column' }}
            >
              <Card variant="outlined"  
                  sx={{
                
                    borderRadius: 2 ,
                    backgroundColor: colors.primary[600],
                    padding: "20px", margin: "10px",
                     height :"100%"
                   }}  
              
              
              >
                <Box textAlign="center">
                  <Typography variant="h5" gutterBottom>
                    Reward Token
                  </Typography>


                  {   !loadingStakeInfo && !loadingRewardTokenBalance  ? (
               
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


                 {/* </Skeleton> */}
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
              </Card>
            </Grid>  











          </Grid>








          </Box>

        
      );
    /*
    return (
      <Card p={5} mt={10}>
        <Heading>Earn Reward Token</Heading>
        <SimpleGrid columns={2}>
          <Card p={5} m={5}>
            <Box textAlign={"center"} mb={5}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Stake Token:
              </Text>
              <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
                {stakeInfo && stakeInfo[0] ? (
                  <Text>
                    {ethers.utils.formatEther(stakeInfo[0])}
                    {" $" + stakeTokenBalance?.symbol}
                  </Text>
                ) : (
                  <Text>0</Text>
                )}
              </Skeleton>
            </Box>
            <SimpleGrid columns={2} spacing={4}>
              <Stack spacing={4}>
                <Input
                  type="number"
                  max={stakeTokenBalance?.displayValue}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <Web3Button
                  contractAddress={Discord_stake_contract}
                  action={async (contract) => {
                    await stakeTokenContract?.erc20.setAllowance(
                        Discord_stake_contract,
                      stakeAmount
                    );
  
                    await contract.call("stake", [
                      ethers.utils.parseEther(stakeAmount),
                    ]);
                    resetValue();
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Stake Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }
                >
                  Stake
                </Web3Button>
              </Stack>
              <Stack spacing={4}>
                <Input
                  type="number"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                />
                <Web3Button
                  contractAddress={Discord_stake_contract}
                  action={async (contract) => {
                    await contract.call("withdraw", [
                      ethers.utils.parseEther(unstakeAmount),
                    ]);
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Unstake Successful",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  }
                >
                  Unstake
                </Web3Button>
              </Stack>
            </SimpleGrid>
          </Card>
          <Card p={5} m={5}>
            <Flex
              h={"100%"}
              justifyContent={"space-between"}
              direction={"column"}
              textAlign={"center"}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Reward Token:
              </Text>
              <Skeleton
                isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}
              >
                {stakeInfo && stakeInfo[0] ? (
                  <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"}>
                      {ethers.utils.formatEther(stakeInfo[1])}
                    </Text>
                    <Text>{" $" + rewardTokenBalance?.symbol}</Text>
                  </Box>
                ) : (
                  <Text>0</Text>
                )}
              </Skeleton>
              <Web3Button
                contractAddress={Discord_stake_contract}
                action={async (contract) => {
                  await contract.call("claimRewards");
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Rewards Claimed",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Claim
              </Web3Button>
            </Flex>
          </Card>
        </SimpleGrid>
      </Card>
    );
*/



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