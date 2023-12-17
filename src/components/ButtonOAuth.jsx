 import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import {  useTheme  , Button, Typography } from "@mui/material";
import { buttonStyle, tokens } from "../theme";
 import {openOAuth2Url } from "../data/API";
 
 const ButtonOAuth = ( ) => {

  const {user, setUser } = useUserContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const _textColor = colors.grey[200];
 
  return (
    <>
        {!user ? (
            <Button  
             
             
              variant= "contained" //"LOGIN"
              style={{ backgroundColor: colors.blueAccent[700] ,  height: buttonStyle.discord.height  }}
              onClick={() => openOAuth2Url(null)}
             >
              <Typography  color= {_textColor} >   Discord Login     </Typography>
             
             </Button>

            ):(
              <Button
              variant="contained" //"LOGOUT"
              color="primary"
              onClick={() => openOAuth2Url(user,setUser)}
             >
              <Typography  color= {_textColor} >   Logout    </Typography>
              
            </Button>           
           )}


    </>
  );
};

export default ButtonOAuth;
 
 