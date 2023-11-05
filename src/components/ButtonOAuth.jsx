 import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import {  useTheme  , Button } from "@mui/material";
import { tokens } from "../theme";
 import {openOAuth2Url } from "../data/API";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const ButtonOAuth = ( ) => {

  const {user, setUser } = useUserContext();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  function handleLogout (){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
  }

  return (
    <>
        {!user ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => openOAuth2Url(null)}
             >
              Discord Login
             </Button>

            ):(
              <Button
              variant="contained"
              color="primary"
              onClick={() => handleLogout()}
             >
              Logout
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