import { Box, Typography, useTheme } from "@mui/material";
 
 
 
import Header from "../../components/Header";
import GridTwitter from "../../components/GridTwitter"

const Invoices = () => {
   

  return (
    <Box m="20px">
      <Header title="Twitter Board" subtitle="Data and Score for Twitter activity" />
      <Box m="40px 0 0 0" height="75vh">
    
        <GridTwitter/>
      </Box>
    </Box>
  );
};

export default Invoices;
