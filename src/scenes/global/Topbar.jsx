 
import { Box, IconButton, useTheme  , Button } from "@mui/material";
import { useContext} from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

 //import { getUserMe  } from "../../data/API.js";

 import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider

 const REACT_APP_YOUROAUTH2URL = process.env.REACT_APP_YOUROAUTH2URL;//// process.env.REACT_APP_YOUROAUTH2URL;
  
 //"https://discord.com/api/oauth2/authorize?client_id=1155438635966017556&redirect_uri=http%3A%2F%2Flocalhost%3A2000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email";
 //console.log(" discord url >>> " + process.env.REACT_APP_YOUROAUTH2URL)

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { user } = useUserContext();



    /*
   const[user, SetUser ]= useState(null);


    async function getMe(){

      const response = await getUserMe();
  
      SetUser(response);

    }
    useEffect(()=>{
      getMe();
    
    }, [ ]);
*/


  
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
 
          <PersonOutlinedIcon />
             
        </IconButton>

        <Button
              variant="contained"
              color="primary"
              component="a"
              href={ REACT_APP_YOUROAUTH2URL}
              target="_blank"
              rel="noopener"
            >
              {user ?   <div>  {user.discord} </div>  : <div>  not logged </div> }
              Login
            </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
 
