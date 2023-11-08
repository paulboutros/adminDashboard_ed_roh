
import { MediaRenderer, Web3Button, useContract, useContractMetadata } from "@thirdweb-dev/react";
import { FARMER_ADDRESS } from "../../const/addresses";
import {Box , Typography, Container, useTheme} from "@mui/material";

import { tokens } from "../../theme";


export const  ClaimFarmer = ( ) => {
     
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { contract } = useContract(FARMER_ADDRESS);
    const { data: metadata } = useContractMetadata(contract);
    
    return (
        <Container maxW={"1200px"}>
            <Box>
                <Typography>Claim Farmer to start farming</Typography>
                <Box borderRadius={"8px"} overflow={"hidden"} my={10}>
                    <MediaRenderer
                        src={metadata?.image}
                        height="300px"
                        width="300px"
                    />
                </Box>
                
                <Web3Button
                    contractAddress={FARMER_ADDRESS}
                    action={(contract) => contract.erc1155.claim(0, 1)}
                >Claim Farmer</Web3Button>
            </Box>
        </Container>
    ); 
}
  
 // export default ClaimFarmer;