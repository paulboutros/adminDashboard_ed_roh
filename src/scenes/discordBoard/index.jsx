import { Box, Typography, useTheme } from "@mui/material";
 
import { tokens } from "../../theme";
 
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

import GridDiscord from "../../components/GridDiscord";
import Container from "../../components/Container/Container";

const DiscordBoard = () => {
  const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);

  return (
   
    <Container maxWidth="lg">

    <Typography sx={ theme.title }  > Discord Leader Board </Typography>
 

      {/* <Header title="Discord Board" subtitle="Discord Leader Board" /> */}
     
         <GridDiscord/>
       {/* <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} /> */}
      
   
   
    </Container>


  );
};

export default DiscordBoard;
