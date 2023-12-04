 
import { ConnectWallet } from "@thirdweb-dev/react";

import React from 'react';
 import {Box ,Button, Typography, Container} from '@mui/material';
 import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <Container maxWidth="lg" style={{ padding: '16px 0' }}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography variant="h4">Crypto Farm</Typography>
        <Box display="flex" alignItems="center" >
          
             
        <Button component={Link} to="/">
            Play
          </Button>
          <Button component={Link} to="/shop">
            Shop
          </Button>

        </Box>
        <ConnectWallet/>
      </Box>
    </Container>
  );
}
