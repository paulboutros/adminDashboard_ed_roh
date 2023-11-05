 
import { tokens } from "../theme";
 
 
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
//import { tokens } from "../../theme";
 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 
//import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "./Header";
 
 


 
import {useEffect, useState} from "react";
import { globalData , bestEarner , userEarning } from "../data/API.js";

const debugMode = true;
const Profile =  () => {

  const { user } = useUserContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    
  const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row

 async function GetData(){


  const resultsJson= await globalData();
      setGlobalData(resultsJson );

 }

  useEffect(()=>{
     
    GetData();
  }, [   ]);
   

  return (
    <div>
      {   glData && glData.length > 0 ? ( 
    // maxHeight should be  100 - the height of the top bar
    <Box m="20px" maxHeight="calc(88vh)" overflow="auto" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
 
      {/* GRID & CHARTS */}
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="20px" >
       
{/*         
       <Box gridColumn="span 2" gridRow="span 6" style={debugMode ? { backgroundColor: colors.primary[100] } : {}} > </Box>
         <Box gridColumn="span 2" gridRow="span 6" style={debugMode ? { backgroundColor: colors.primary[200] } : {}} > </Box>
      <Box gridColumn="span 2" gridRow="span 2" style={debugMode ? { backgroundColor: colors.primary[300] } : {}} > </Box>
          */}

       <Box gridColumn="span 6" gridRow="span 2" style={ {backgroundColor: colors.grey[900]}} > 
       
       <Typography display="flex" justifyContent="space-between" m="20px" >

         Welcome to our crypto-earning wonderland! Imagine a world where you can earn crypto effortlessly.<br />
         Here's how it works:<br />
         We have a collection of unique NFT characters, each made up of four layers.<br />
         When you combine these layers to create a character combo, you unlock a small crypto reward.<br /> 
         It's that simple – earn crypto by owning the right layers!
       </Typography>

       
       </Box>
         <Box gridColumn="span 2" gridRow="span 6" style={debugMode ? { backgroundColor: colors.primary[200] } : {}} > </Box>
      <Box gridColumn="span 2" gridRow="span 2" style={debugMode ? { backgroundColor: colors.primary[300] } : {}} > </Box>


      </Box>
    </Box>

      ) : (
        <div>User is not defined.</div>
      )}
</div>

  );
};

export default Profile;



function earningFromDiscord(A, B) {
  if ( A === 0)  return 0;
  
    return (A / B) ;//  * 100;
  }
function calculatePercentage(A, B) {
if ( A === 0)  return 0;

  return (A / B) ;//  * 100;
}
