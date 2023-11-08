import { ConnectWallet, MediaRenderer, useAddress,
   useContract, useContractRead,
    useOwnedNFTs } from "@thirdweb-dev/react";
import { FARMER_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS, TOOLS_ADDRESS } from "../../const/addresses.js";
import { ClaimFarmer } from "../../components/FARMER/ClaimFarmer";
 import { Equipped } from "../../components/FARMER/Equipped";
import { /*BigNumber,*/ ethers } from "ethers";
//import { Text, Box, Card, Container, Flex, Heading, SimpleGrid, Spinner, Skeleton } from "@chakra-ui/react";
//import { ThirdwebSDK } from "@thirdweb-dev/sdk";


import {Box , Typography, Container } from "@mui/material";
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
//import ImageCard from "./ImageCard";

const FarmerPageSS = () => {
  const address = useAddress();

  const { farmercontract } = useContract(FARMER_ADDRESS);
  const { toolsContract } = useContract(TOOLS_ADDRESS);
  const { stakingContract } = useContract(STAKING_ADDRESS);
  const { rewardContract } = useContract(REWARDS_ADDRESS);

   
// this was just to test the SDK
  //getContract();

  const { ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmercontract, address);
  const { ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(toolsContract, address);

  const { data: equippedTools } = useContractRead(
    stakingContract, 
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
  
  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Box>
          <Typography my={"40px"}>Welcom to Crypto Farm</Typography>
          <ConnectWallet />
        </Box>
      </Container>
    );
  }

  if (loadingOwnedFarmers) {
    return(
      <Container maxW={"1200px"}>
        <Typography>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (ownedFarmers?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimFarmer />
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <Grid columns={2} spacing={10}>
        <Card p={5}>
          <Typography>Farmer:</Typography>
          <Grid columns={2} spacing={10}>
            <Box>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer 
                    src={nft.metadata.image} 
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </Box>
            <Box>
              <Typography fontSize={"small"} fontWeight={"bold"}>$CARROT Balance:</Typography>
                {rewardBalance && (
                    <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
                  )}
              </Box>
          </Grid>
        </Card>
        <Card p={5}>
          <Typography>Inventory:</Typography>
          {/* <Skeleton isLoaded={!loadingOwnedTools}>
            <Inventory
              nft={ownedTools}
            />     
          </Skeleton> */}
        </Card>
      </Grid>
      <Card p={5} my={10}>
        <Typography>Equiped Tools:</Typography>
        <Grid columns={3} spacing={10}>
            {equippedTools &&
              equippedTools[0].map((nft ) => (
                <Equipped
                  key={nft.toNumber()}
                  tokenId={nft.toNumber()}
                />
              ))}
        </Grid>
      </Card>
    </Container>
  );
};

//export default FarmerPage;


// this was just to test the SDK

/*
async function getContract(){
 
  console.log( "REACT_APP_Client_ID=" , process.env.REACT_APP_Client_ID );
  console.log( "REACT_APP_Secret_Key=" , process.env.REACT_APP_Secret_Key );
  let sdk = new ThirdwebSDK("goerli", {
    clientId: process.env.REACT_APP_Client_ID,
  });
  // --- OR ---
  // If used on the BACKEND pass your 'secretKey'
    sdk = new ThirdwebSDK("goerli", {
    secretKey: process.env.REACT_APP_Secret_Key,
  });
  
  const contract = await sdk.getContract("0x6c66Ec1087419Da555ea989489f160B6e7f2E920");
  
  
    console.log(  ">>>>>>>>>>>>>>>>>    contract" ,contract  );




}
*/