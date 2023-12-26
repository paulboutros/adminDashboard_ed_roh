 
import Container from "../../components/Container/Container";
 
import StakeToken from '../../components/StakeToken';
import RewardToken from '../../components/RewardToken';
import { Grid, Paper, Box } from '@mui/material';
import  Stake from '../../components/Stake';
import { tokens } from '../../theme';
import { useTheme } from '@emotion/react';

export default function RewardTokenTab() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    return (
        
       <> 
         <Container maxWidth="lg">    
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box sx={ theme.basicRoundedBox1 } >
              <StakeToken/>
              </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
            <Box sx={ theme.basicRoundedBox1 } >
            <RewardToken />
            </Box>
        </Grid>
      </Grid>
      <Stake />

         </Container>
      </>    //BasicScrollable
    )
}


 