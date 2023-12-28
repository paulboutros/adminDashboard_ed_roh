import { Card,   Stack     } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARDS_ADDRESS , Discord_invite_stake_token } from "../const/addresses";
import { Box, Skeleton, Typography  } from "@mui/material";
import { BootstrapTooltip, tokens } from "../theme";
import { useTheme } from "@emotion/react";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { RowChildrenAlignCenter, RowChildrenAlignLeft } from "./Layout";

export default function StakeToken( {Token_address}) {
    const theme = useTheme();
    const address = useAddress();
    const colors = tokens(theme.palette.mode);
    

    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract( Token_address );

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
     
    const title = Token_address === Discord_invite_stake_token ? "Stake Token":"Reward Token";
    return (
        <Card p={5}>
         <Stack>
   <Box  

display="flex"
flexDirection="row"
  alignItems="center"
justifyContent= "flex-start"

  
 >
  {  !address && (
   <BootstrapTooltip  title="Connection to Discord is required">
             
          <ErrorOutline  sx ={{
                 height:"36px", 
                 width:"36px",
                 color  :  colors.grey[600],
                mr:"20px"
                }} 
             /> 
   </BootstrapTooltip> 
   ) }

      <p> {title}</p>
   </Box>


      {(!loadingStakeToken && !loadingTokenBalance) && (
    //   <p>${tokenBalance?.symbol}</p>
      <Typography variant="h5" fontWeight="bold"> ${tokenBalance?.symbol} </Typography>
      )}
             
        { (!loadingStakeToken && !loadingTokenBalance) ? (  
             <p>{tokenBalance?.displayValue}</p>
             ):(
                 <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
             )}
                
            </Stack>
        </Card>
    )


}