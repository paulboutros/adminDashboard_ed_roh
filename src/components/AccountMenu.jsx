// Demo from material UI
/* 

https://mui.com/material-ui/react-menu/ 
*/
//import ListItemIcon from '@mui/material/ListItemIcon';
//import Divider from      '@mui/material/Divider';
//import Typography from   '@mui/material/Typography';
//import PersonAdd from    '@mui/icons-material/PersonAdd';
//import Settings from     '@mui/icons-material/Settings';
//import Logout from       '@mui/icons-material/Logout';

import * as React from 'react';
import Box from          '@mui/material/Box';
import Avatar from       '@mui/material/Avatar';
import Menu from         '@mui/material/Menu';
import MenuItem from     '@mui/material/MenuItem';

import IconButton from   '@mui/material/IconButton';
import Tooltip from      '@mui/material/Tooltip';

//pb added
import {   useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAddress } from '@thirdweb-dev/react';
 
import {  tokens  } from "../theme";
import { useTheme } from '@emotion/react';
import ChainContext from '../context/Chain';
import { addressesByNetWork } from '../scenes/chainSelection';
import { useContext } from 'react';


export default function AccountMenu() {

  const { selectedChain, setSelectedChain } = useContext(ChainContext);
   

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Buy");
  const address = useAddress();

  const openSellPage =() =>{ 
    

    handleClose(); 
   
    //if ( address ){ 
  
      navigate( `/profileWallet/${address}` )
    //}else{
    // navigate( `/profileWallet/1` )
  
   // }
  
  
  
  };
  
  const OpenPage = ( route, setTab, tabName ) => {
    
    handleClose(); 
    setTab(tabName);
    navigate(`/${route}`); 
  
       
   };
 

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor:  colors.grey[800], color: colors.grey[300]    }}>+</Avatar>
          </IconButton>
        </Tooltip>
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
            '&::before': {
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

        <MenuItem  onClick={() => OpenPage(``, setTab, "Buy"  ) } >  
          <Avatar /> Home
        </MenuItem>

        <MenuItem  onClick={() => OpenPage(`shop/${ addressesByNetWork[selectedChain].LAYER_ADDRESS }/`, setTab, "Buy"  ) } >
          <Avatar /> Buy
        </MenuItem>



        <MenuItem  onClick={() => OpenPage("sell", setTab, "Sell"  ) }   >
          <Avatar /> Sell
        </MenuItem>

         
      </Menu>
    </React.Fragment>
  );
}