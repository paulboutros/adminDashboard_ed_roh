import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from      '@mui/material/MenuItem';
import ListItemIcon from  '@mui/material/ListItemIcon';
import Divider from       '@mui/material/Divider';
import IconButton from    '@mui/material/IconButton';
 import Tooltip    from    '@mui/material/Tooltip';
import PersonAdd  from    '@mui/icons-material/PersonAdd';
import Settings from      '@mui/icons-material/Settings';
import Logout from        '@mui/icons-material/Logout';
import {   useNavigate } from 'react-router-dom';
import { useAddress } from '@thirdweb-dev/react';
 


import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';



import { useUserContext } from '../context/UserContext';
import { useDebugModeContext } from '../context/DebugModeContext';

import { getAvatar, openOAuth2Url } from '../data/API';
import { OWNER } from '../const/addresses';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

 

export default function AccountMenu ()  {
    const [isSpeedDialOpen, setIsSpeedDialOpen] = React.useState(false);
  
    const handleSpeedDialOpen = () => {
      setIsSpeedDialOpen(true);
    };
  
    const handleSpeedDialClose = () => {
      setIsSpeedDialOpen(false);
    };
  
    return (
        <Box style={{ width: "50px",  heigh: "50px", position: 'relative' }}>


        {/* <button onClick={handleSpeedDialOpen}>Open SpeedDial</button>
          <MySpeedDial onClose={handleSpeedDialClose} /> 
 */}


      </Box>
    );
  };

function AccountMenuXX() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

const navigate = useNavigate();


  const {user, setUser } = useUserContext();
  const {debugMode, set_DebugMode} =  useDebugModeContext();

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
      
    set_DebugMode(!debugMode);
     
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
     
         {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}


        {/* <ButtonOAuth/> */}
        
          <IconButton
           onMouseEnter={ handleClick}
          // onMouseLeave={ handleClose}
            // onClick={handleClick}
            size="small"
            sx={{ ml: 2,
            
                '&:not(.hover)': { color: `${colors.primary[100]}`},
                '&:hover': { color: `${colors.primary[50]}`},
            
            
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
             <Avatar sx={{
                
                width: 32, height: 32 ,
               
            
                    '&:not(.hover)': { backgroundColor: `${colors.redAccent[300]}`},
                    '&:hover': { backgroundColor: `${colors.blueAccent[300]}`},
                 
            }}>M</Avatar>  
          </IconButton>
        
      
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
        width: 32, // override the avatars
        height: 32,
        ml: -0.5,
        mr: 1,
      }, 
      '& .MuiButtonBase-root.MuiButtonBase-root.MuiMenuItem-root.MuiMenuItem-gutters.css-63uhig-MuiButtonBase-root-MuiMenuItem-root': {
          backgroundColor :  'rgba(255, 0, 255, 0.01)  ',
          
      },
       
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        left: 14, // anchor (triangle arrow) position
        width: 10,
        height: 10,
        bgcolor: 'transparent',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
         },
         '& .MuiList-root': {
           // backgroundColor :  'rgba(1, 0, 0, 0)', // colors.blueAccent[300]
            background: 'rgba(255, 0, 255, 0.01)  ',
            bgcolor: 'transparent',
        },
         


       },
            }}
            transformOrigin={{ horizontal: 'left', vertical: 'top' }}  
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}  
       > 
         
        {address && (   
           <MenuItem onClick={openProfilePage}>
            
            <RoundIconButton/> 
          
         </MenuItem>
         )}

         {(address && address === OWNER) && (   

         <MenuItem onClick={ switchDebugMode }>
             {debugMode ? ("Debug is:ON"):("Debug is:OFF")}    
               
          
         </MenuItem>
         )}

         <MenuItem onClick={DiscordLogin}>
          <Avatar  src= {!user ? ( null ):(  getAvatar(user.discordUserData)  )}   />
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


const RoundIconButton = () => {
    return (
      <IconButton
        sx={{
          borderRadius: '50%', // Make the button round
          backgroundColor: 'primary.main', // Set the background color
          color: 'white', // Set the text color
          '&:hover': {
            backgroundColor: 'primary.dark', // Change background color on hover
          },
        }}
      >
        <FileCopyIcon />
      </IconButton>
    );
  };





  const MySpeedDial = () => {
    const [open, setOpen] = React.useState(false);
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    return (

        
      <SpeedDial

        sx={{  
            
             position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1000, // Adjust the z-index based on your needs
            overflow: 'visible',


         } }

        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
       
      >
        <SpeedDialAction
          key="Copy"
          icon={<FileCopyIcon />}
          tooltipTitle="Copy"
          onClick={handleClose}
        />
        <SpeedDialAction
          key="Save"
          icon={<SaveIcon />}
          tooltipTitle="Save"
          onClick={handleClose}
        />
        <SpeedDialAction
          key="Print"
          icon={<PrintIcon />}
          tooltipTitle="Print"
          onClick={handleClose}
        />
      </SpeedDial>
      
    );
  };
