import * as React from 'react';


 
 


import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from      '@mui/material/MenuItem';
 
import IconButton from    '@mui/material/IconButton';
 
import {   useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
 


import { useUserContext } from '../context/UserContext';
import { useDebugModeContext } from '../context/DebugModeContext';

import { getAvatar, globalData_setDebugMode, openOAuth2Url } from '../data/API';
 
import { useTheme } from '@emotion/react';
import {   tokens , BootstrapTooltip  } from '../theme';
 

 




  //const { BootstrapTooltip   } = allCSS("dark") ;  


export default function AccountMenu() {


  


const navigate = useNavigate();

const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {user, setUser } = useUserContext();
  const {debugMode,  setDebugMode } =  useDebugModeContext();

  
 

  const address = useAddress ();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchDebugMode = () =>{
      
    globalData_setDebugMode(   !debugMode,  setDebugMode ,  user.ID   );
      //set_DebugMode(!debugMode);
     
};


 const openProfilePage =() =>{ 
  
  handleClose(); 
 
  if ( address ){ 

    navigate( `/profileWallet/${address}` )
  }else{
   navigate( `/profileWallet/1` )

  }



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
        <BootstrapTooltip  title="Account settings">
           
        
        
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

        {/*   we currently turn off this       
           <MenuItem onClick={openProfilePage}>
           <Avatar/>  Profile 
               
          
         </MenuItem>
          */}


      {/*Owner 1 0x75 is also signed of transaction, which is a problem when testing transaction
      as it send the funds to it self . OWNER2 is never use as signer so this is a more realistic test   */}

         {(address && user ) && (    // && address === OWNER2 

         <MenuItem onClick={ switchDebugMode }>
             {debugMode ? ("Debug is:ON"):("Debug is:OFF")}    
               
          
         </MenuItem>
         )}

         <MenuItem onClick={DiscordLogin}>
             <Avatar  src= {!user ? ( null ):(  getAvatar(user.discordUserData)  )}   />    
          {!user ? (  "Discord Login"):(  "Discord Logout" )}
           
        </MenuItem>


        {/* 
        <MenuItem onClick={handleClose}>   <Avatar /> My account
         
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
        */}


      </Menu>
    </React.Fragment>
  );
}
