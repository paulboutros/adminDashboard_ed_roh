 

import { Box } from "@mui/material";
 //import dotenv from "dotenv";

import GridAllLayer from "../../components/GridAllLayer";
import Header from "../../components/Header";
 
import LayerBoardVisual from "../../components/LayerBoardVisual" 
 
  
//const API_URL = process.env.API_URL;
const AllLayer = () => {
   

  return (
    <Box m="20px" >
      <Header title="All Layer Board" subtitle="Data and Score for all NFT Layers" />
      <Box m="40px 0 0 0" height="75vh">
      <LayerBoardVisual/>  
        <GridAllLayer/>
      </Box>
    </Box>
  );
};

export default AllLayer;
