 
import { Box, useTheme } from "@mui/material";
 
import { useAddress } from "@thirdweb-dev/react";
import React from "react";
import { VerticalSpace } from "./Layout";
import { StyledConnectWallet, basicRoundedBox1 } from "../theme";
import Container from "./Container/Container";
 
export function ConnectWalletPage() {


  const address = useAddress();



  const theme = useTheme();


  return (
    <React.Fragment>
        <Container maxWidth="lg">   

        <VerticalSpace space={8}/>
      <Box sx={basicRoundedBox1(address, theme)}>


        <Box height={"200px"} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <Box sx={{ flexDirection: "column", display: "flex", }}>


            <p> I need your wallet, your boots, and your motorcycle... </p>
            <VerticalSpace space={2} />

            <StyledConnectWallet />
          </Box>

        </Box>
      </Box>

        </Container>
    </React.Fragment>
  );

}

export default ConnectWalletPage;
