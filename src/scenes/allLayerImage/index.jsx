 

import { Box } from "@mui/material";
//import dotenv from "dotenv";

import GridImage from "../../components/GridImage";
import Header from "../../components/Header";



 
//const API_URL = process.env.API_URL;
const AllLayerImage = () => {
  

 return (
  <Box m="20px" maxHeight="calc(75vh)" >
     <Header title="All Layer image" subtitle="Image for all NFT Layers" />
     <Box m="40px 0 0 0" height="73vh"  overflow="auto">
   
       <GridImage/>
     </Box>
   </Box>
 );
};

export default AllLayerImage;
