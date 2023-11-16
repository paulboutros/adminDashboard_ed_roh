import React from "react";
import { Container, Heading, Text } from "@chakra-ui/react";
//import NFTGrid from "../components/NFTGrid";
import { TOOLS_ADDRESS } from "../../const/addresses";
import { useContract, useNFTs } from "@thirdweb-dev/react";



import { Box } from "@mui/material";
 //import dotenv from "dotenv";

//import GridAllLayer from "../../components/GridAllLayer";
import Header from "../../components/Header";
 
import LayerBoardVisual from "../../components/LayerBoardVisual" 
 
  // equivalent to BUY page
//const API_URL = process.env.API_URL;
const AllLayer = () => {
  const { contract } = useContract(TOOLS_ADDRESS);
  const { data, isLoading } = useNFTs(contract);

  return (
    <Box m="20px" >
      <Header title="All Layer Board" subtitle="Data and Score for all NFT Layers" />
      <Box m="40px 0 0 0" height="75vh">
      <LayerBoardVisual/>  

       {/* this is equivalent of buy page on tuto marketplace */}
        {/* <GridAllLayer
        
        isLoading={isLoading} 
        NFTdata={data} 
        emptyText={"No NFTs found"}
        /> */}
      </Box>
    </Box>
  );
};

export default AllLayer;
