import * as React from 'react';


 
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
//import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Tooltip ,{ tooltipClasses }   from    '@mui/material/Tooltip';


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from      '@mui/material/MenuItem';
import ListItemIcon from  '@mui/material/ListItemIcon';
import Divider from       '@mui/material/Divider';
import IconButton from    '@mui/material/IconButton';

import PersonAdd  from    '@mui/icons-material/PersonAdd';
import Settings from      '@mui/icons-material/Settings';
import Logout from        '@mui/icons-material/Logout';
import {   useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
 


import { useUserContext } from '../context/UserContext';
import { useDebugModeContext } from '../context/DebugModeContext';

import { getAvatar, openOAuth2Url } from '../data/API';
import { OWNER } from '../const/addresses';
import { useTheme } from '@emotion/react';
import { allCSS, tokens } from '../theme';
 



const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));














export default function AccountMenu() {


  


const navigate = useNavigate();

const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {user, setUser } = useUserContext();
  const {debugMode, setDebugMode} =  useDebugModeContext();

 const { BootstrapTooltip } = allCSS(theme.palette.mode   );  


  const address = useAddress ();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchDebugMode =() =>{
      
      setDebugMode(!debugMode);
     
};


 const openProfilePage =() =>{
      
     handleClose();
     navigate( `/profileWallet/${address}` )
      
 };
 const DiscordLogin =() =>{
  
 


    // if user is null, it will open the discord authoraization and go through the login process
      if (!user){
         openOAuth2Url(null);
      }else{
        // if we are logged in (user is set already) that means we want to lgo out
        openOAuth2Url(user, setUser );
      }
     
    handleClose();
    
     
};
  
 
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
         {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}


        {/* <ButtonOAuth/> */}
        {/* <Tooltip title="Account settings" > */}
        <BootstrapTooltip title="Account settings">
           
        
        
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </BootstrapTooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        {address && (   
           <MenuItem onClick={openProfilePage}>
           <Avatar/>  Profile 
               
          
         </MenuItem>
         )}

         {(address && address === OWNER) && (   

         <MenuItem onClick={ switchDebugMode }>
             {debugMode ? ("Debug is:ON"):("Debug is:OFF")}    
               
          
         </MenuItem>
         )}

         <MenuItem onClick={DiscordLogin}>
             <Avatar  src= {!user ? ( null ):(  getAvatar(user)  )}   />    
          {!user ? (  "Discord Login"):(  "Discord Logout" )}
           
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
