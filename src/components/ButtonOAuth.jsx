 import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import {  useTheme  , Button, Typography } from "@mui/material";
import { buttonStyle, tokens } from "../theme";
 import {openOAuth2Url } from "../data/API";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const ButtonOAuth = ( ) => {

  const {user, setUser } = useUserContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const _textColor = colors.grey[200];

  function handleLogout (){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  }

  return (
    <>
        {!user ? (
            <Button  
            //  variant= "text" //"contained"
             // color="primary",

             
              variant= "contained" //"contained"
              style={{ backgroundColor: colors.blueAccent[700] ,  height: buttonStyle.discord.height  }}
              onClick={() => openOAuth2Url(null)}
             >
              <Typography  color= {_textColor} >   Discord Login     </Typography>
             
             </Button>

            ):(
              <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogout()}
             >
              <Typography  color= {_textColor} >   Logout    </Typography>
              
            </Button>           
           )}


    </>
  );
};

export default ButtonOAuth;
/*
               <div> Logout </div>   
                ):(
                 <div>Discord Login</div> 

*/