 
import { tokens } from "../../theme";
 
//import BarChart from "../../components/BarChart";
import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
//import { tokens } from "../../theme";
 
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import EmailIcon from "@mui/icons-material/Email";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import FavoriteIcon from '@mui/icons-material/Favorite';
//import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import PieChart from "../../components/PieChart";
 
import GridAllLayer from "../../components/GridAllLayer";  
import GridImage from "../../components/GridImage";  
import GridDiscord from "../../components/GridDiscord";  
import GridTwitter from "../../components/GridTwitter";  
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import StatBoxEarn from "../../components/StatBoxEarn";


import ProgressCircle from "../../components/ProgressCircle";
import {useEffect, useState} from "react";
import { globalData , bestEarner , userEarning } from "../../data/API.js";


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
     if (!user)return;
    GetData();
  }, [ user ]);
   

  return (
    <div>
      {user && glData && glData.length > 0 ? ( 
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
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBoxEarn   //  bestInviteScore
             title   = {  user.scoreData.discord.invite_use }// {  user.scoreData.invite_use }
            title2  = {   user.scoreData.discord.earning   }
            
            subtitle="invite Use"
            subtitle2= "earns"
            progress=  { calculatePercentage( user.scoreData.discord.invite_use  ,  glData[0].all_invites_used   )}
            increase={`${(calculatePercentage( user.scoreData.discord.invite_use  ,  glData[0].all_invites_used   ) * 100).toFixed(2)}%`}
            icon1={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            icon2={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
             <StatBoxEarn   //  bestInviteScore
             title   = {  user.scoreData.twitter.retweet }// {  user.scoreData.invite_use }
            title2  = {   user.scoreData.twitter.earning   }
            
            subtitle="Retweet"
            subtitle2= "earns"
            progress=  { calculatePercentage( user.scoreData.twitter.retweet  ,  glData[0].all_retweets   )}
            increase={`${(calculatePercentage( user.scoreData.discord.invite_use  ,  glData[0].all_invites_used   ) * 100).toFixed(2)}%`}
            icon1={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            icon2={
              <MonetizationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
            
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={glData && glData.length > 0 ? glData[0].all_invites_used : "Default Value"}

            subtitle="Invite used"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
             title={glData && glData.length > 0 ? glData[0].all_likes : "Default Value"}
            subtitle="All likes"
            progress="0.80"
            increase="+43%"
            icon={
              <FavoriteIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Reward Pool
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                 {/* {glData && glData.length > 0 ?glData[0].all_retweets : "Default Value"} */}
                 {glData && glData.length > 0 ? `$${glData[0].reward_pool}` : "Default Value"}
                  
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

 
         
          
        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            {/* <ProgressCircle size="125" /> */}
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $254 claimed
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto" // overflowY
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Social Scores
          </Typography>
          <Box height="150px" mt="10px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>


        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}

         {/* ROW 4 */}
        


         {/* ROW 5 */}
         

        <Box
          gridColumn="span 12"  gridRow="span 6"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Layer Board
          </Typography>
           
            <GridImage  
              queryId= {`&userId=${user.ID}&limit=1`}
             sx={{ marginBottom: "15px" }} 
             />
           
        </Box>

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
