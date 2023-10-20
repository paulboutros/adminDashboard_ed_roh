 
import {useEffect, useState} from "react";
import { Box } from "@mui/material";
//import dotenv from "dotenv";

import GridImage from "../../components/GridImage";
import Header from "../../components/Header";
import ImageComposer from "../../components/ImageComposer";

import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 




//const API_URL = process.env.API_URL;
const AllLayerImage = () => {
  
  const { user } = useUserContext();

  useEffect(()=>{
    if (!user)return;

     
    
 }, [ user ]);


 return (
  <Box m="20px" maxHeight="calc(85vh)"  overflow="auto"  >  
     <Header title="All Layer image" subtitle="Image for all NFT Layers" />
     {/* <Box m="40px 0 0 0" height="73vh"  overflow="auto"> */}
     <Box m="40px 0 0 0"   >
    
     {user ? ( 
      <ImageComposer  queryId= {`&userId=${user.ID}&limit=1`}   /> 
      ) : (
        <div>User is not defined.</div>
      )}
 
       <GridImage/>
     </Box>
   </Box>
 );
};

export default AllLayerImage;


