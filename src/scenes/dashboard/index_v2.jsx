import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import FavoriteIcon from '@mui/icons-material/Favorite';
//import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart"; 
import GridAllLayer from "../../components/GridAllLayer";  
import GridImage from "../../components/GridImage";  
import GridDiscord from "../../components/GridDiscord";  
import GridTwitter from "../../components/GridTwitter";  
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import {useEffect, useState} from "react";
import { globalData , bestEarner } from "../../data/API.js";



const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 let mockTransactionsX =[];
  const [earnerData, setearnerData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row
   useEffect(()=>{
     (async ()=> {
      const resultsJson= await globalData();
      
       setGlobalData(resultsJson );

       const earner_resultsJson= await bestEarner();
      
       setearnerData(earner_resultsJson );

/*
 txId: "01e4dsa",
    user: "johndoe",
    date: "2021-09-01",
    cost: "43.95",

*/


   
      })();
   
   }, [ ]);







  return (
    // maxHeight should be  100 - the height of the top bar so area scroll without side or
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
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={glData && glData.length > 0 ? glData[0].all_invites_sent : "Default Value"}
            subtitle="invite Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
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
            title={glData && glData.length > 0 ? glData[0].all_retweets : "Default Value"}
            subtitle="All Retweets" all_retweets
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
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

            subtitle="New members"
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



        
        {earnerData && earnerData.length > 0 ? (
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >

            
            <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Highest Earners
            </Typography>
           
            </Box>
           
           
              {earnerData.map((transaction, i) => (
                 <Box
                key={`${transaction.walletShort}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                  >
                    {transaction.walletShort}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.discord}   
                    {/* scoreShare */}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.date}</Box>
                <Box
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  ${transaction.earning}
                </Box>
                 </Box>
                ))}


            </Box>
            ) : (  <div>Loading...</div>  )}
            
         
          
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
            <ProgressCircle size="125" />
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
         <Box
          gridColumn="span 6"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Twitter Board
          </Typography>
           
            <GridTwitter  _height={350} _margin={"0px 0 0 0"}  isDashboard={true}  sx={{  marginBottom: "15px" }} />
           
        </Box>
         
        <Box
          gridColumn="span 6"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Discord Board
          </Typography>
          <Box height="50px">
            <GridDiscord isDashboard={true}  sx={{ marginBottom: "15px" }} />
          </Box>
        </Box>

        <Box
          gridColumn="span 12"  gridRow="span 2"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Layer Board
          </Typography>
           
            <GridAllLayer isDashboard={true}  sx={{ marginBottom: "15px" }} />
           
        </Box>


         {/* ROW 5 */}
         

        <Box
          gridColumn="span 12"  gridRow="span 6"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Layer Board
          </Typography>
           
            <GridImage isDashboard={true}  sx={{ marginBottom: "15px" }} />
           
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
