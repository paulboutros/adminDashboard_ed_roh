 
import Container from "../../components/Container/Container";
 
 
import RewardToken from '../../components/RewardToken';
import { Grid, Paper, Box, Typography } from '@mui/material';
import  Stake from '../../components/StakeInterface/Stake';
import { tokens ,basicRoundedBox1 } from '../../theme';
import { useTheme } from '@emotion/react';

 import { Discord_invite_stake_token,REWARDS_ADDRESS , Discord_tokenLess_stakinContract } from "../../const/addresses";
import { useAddress } from "@thirdweb-dev/react";
import { VerticalSpace, VerticalStackAlignCenter , VerticalStackAlignCenterTest} from "../../components/Layout";

export default function RewardTokenTab() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const address = useAddress();
//  border: `2px dashed ${theme.palette.blueSelectedTab}`,
    return (
        
       <> 
 

         <Container maxWidth="lg">   
                       
           <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                 <Box sx={   basicRoundedBox1(address ,theme ) } >
                 <RewardToken Token_address={Discord_invite_stake_token} />
               </Box>
            </Grid>

            {/* sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}   */}
            <Grid item xs={12} sm={6} >
              <Box sx={ basicRoundedBox1(address,theme) } >
               <RewardToken Token_address={REWARDS_ADDRESS} />
               </Box>
            </Grid>
              </Grid>
              <VerticalSpace space= {5}/>
              <Box  sx={basicRoundedBox1(address,theme)}  >   
                       <Stake />
              </Box>
       
         

         </Container>
      </>    //BasicScrollable
    )
}


 