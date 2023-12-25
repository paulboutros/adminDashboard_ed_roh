import { Box, Typography, useTheme } from "@mui/material";
 
import { tokens } from "../../theme";
 
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import GridDiscord from "../../components/GridDiscord";

const DiscordBoard = () => {
  
   
  

  return (
    <Box m="20px">
      <Header title="Discord Board" subtitle="Discord Leader Board" />
      <Box m="40px 0 0 0"height="75vh">
         <GridDiscord/>
       {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      </Box>
    </Box>
  );
};

export default DiscordBoard;
