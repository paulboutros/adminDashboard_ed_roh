 
import Container from "../../components/Container/Container";
 
 
import RewardToken from '../../components/RewardToken';
import { Grid, Box,  } from '@mui/material';
import  Stake from '../../components/StakeInterface/Stake';
import {  basicRoundedBox1 } from '../../theme';
import { useTheme } from '@emotion/react';

 import { Discord_invite_stake_token    } from "../../const/addresses";
import { useAddress } from "@thirdweb-dev/react";
import { VerticalSpace, } from "../../components/Layout";
  
//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======



export default function RewardTokenTab() {


  const { selectedChain, setSelectedChain } = useContext(ChainContext);




  const theme = useTheme();
   const address = useAddress();
 
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
               <RewardToken Token_address={ addressesByNetWork[selectedChain].WUCOIN } />
               </Box>
            </Grid>
              </Grid>
              <VerticalSpace space= {5}/>
              <Box  sx={basicRoundedBox1(address,theme)}  >   
                       <Stake />
              </Box>
       
         

         </Container>
      </>    
    )
}


 