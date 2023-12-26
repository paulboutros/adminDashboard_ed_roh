import { Card, Heading,  Stack ,  Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARDS_ADDRESS } from "../const/addresses";
import { Skeleton  } from "@mui/material";

export default function StakeToken() {
    const address = useAddress();
    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract(REWARDS_ADDRESS);

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
    
    /*
    return (
        <Card p={5}>
            <Stack>
                <p>Reward Token</p>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <p fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</p>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken && !loadingTokenBalance}>
                    <p>{tokenBalance?.displayValue}</p>
                </Skeleton>
            </Stack>
        </Card>
    )*/
    return (
        <Card p={5}>
         <Stack>
      <p>Reward Token</p>
      {(!loadingStakeToken && !loadingTokenBalance) && (<p>${tokenBalance?.symbol}</p> )}
             
        { (!loadingStakeToken && !loadingTokenBalance) ? (  
             <p>{tokenBalance?.displayValue}</p>
             ):(
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
             )}
                
            </Stack>
        </Card>
    )


}