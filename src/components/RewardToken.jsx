import { Card,   Stack     } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { Discord_invite_stake_token    } from "../const/addresses";
import { Box, Skeleton, Typography  } from "@mui/material";
import { BootstrapTooltip, tokens } from "../theme";
import { useTheme } from "@emotion/react";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
 

export default function StakeToken( {Token_address}) {
    const theme = useTheme();
    const address = useAddress();
    const colors = tokens(theme.palette.mode);
    

    const { contract: stakeTokenContract, isLoading: loadingStakeToken } = useContract( Token_address );

    const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(stakeTokenContract, address);
     
    const title = Token_address === Discord_invite_stake_token ? "Stake Token":"Reward Token";

  
    /*
    useEffect(()=>{
           
      const fetchData = async ( ) => {
  
            const sdk = getSDK_fromPrivateKey(); 
            const stakingContract = await sdk.getContract(   Discord_tokenLess_stakinContract  );
                
            const getStakeInfo = await stakingContract.call("getStakeInfo",["0x756C47096DeCb0CA7935a59b53e9732b7F283A6C"]);
            
            const _rewards =   parseInt(getStakeInfo._rewards._hex, 16);
            const tokenStaked =   parseInt(getStakeInfo._tokensStaked._hex, 16);
                  
            console.log(  ">>>> _rewards >>>  = " , _rewards );
            console.log(  ">>>> tokenStaked >>>  = " , tokenStaked );
   
       }
       fetchData();
     
     }, [ ]);
    */


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