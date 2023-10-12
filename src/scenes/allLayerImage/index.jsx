 

import { Box } from "@mui/material";
//import dotenv from "dotenv";

import GridImage from "../../components/GridImage";
import Header from "../../components/Header";



 
//const API_URL = process.env.API_URL;
const AllLayerImage = () => {
  

 return (
   <Box m="20px">
     <Header title="All Layer image" subtitle="Image for all NFT Layers" />
     <Box m="40px 0 0 0" height="75vh">
   
       <GridImage/>
     </Box>
   </Box>
 );
};

export default AllLayerImage;
