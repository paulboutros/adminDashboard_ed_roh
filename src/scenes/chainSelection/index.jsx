import React, { useContext } from 'react';
import { Web3Button } from '@thirdweb-dev/react';
import ChainContext from '../../context/Chain.js';

// for chain drop down


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
 
import {  tokens  } from "../../theme.js";
import { useTheme } from '@emotion/react';
    import { updateChain } from '../../data/API.js';

export const addressesByNetWork = {
  sepolia: {
     LAYER_ADDRESS        :"0x06a33CD093aDD0C6A8F685888f1B3E0C119b2461", // edition
     MARKETPLACE_ADDRESS  :"0x032453F4Eb720280230AE123E3262234f21b0323",
     WUCOIN               : "0x7b9e863B9BDF4aa08686C531ceA6353f363E9d57",


     BURN_TO_CLAIM :"0x4CD62243e1A3255A8ff27F4A164d011246f8b7F1", 
              
     wuLayerDropERC1155         :"0x1360AA380702be406d7161A965EfB23652082653",
     wuCharacterDropAddress     :"0x0895911D31783d1C0FaE1aF5Db448F0A8cb623d8",
     wuCharacterDropAddress_721 :"0x90411665549f2bDA86b0EbbDC94c81b95DB8febd" 
  },
  base: {
    //0x590b1670CD6b1d1aBeEc7b59BEE72EF8e40b695C on chain 1115511
    LAYER_ADDRESS       : "0x590b1670CD6b1d1aBeEc7b59BEE72EF8e40b695C", // copied from BASE (DROP so claimable as well)
    MARKETPLACE_ADDRESS : "0xFFFb9a956e7c0418430CeD739c43B0c06f55C359", // copied from BASE
    WUCOIN              : "0xD6c1B4501C9FDFD016a62A43aEa1ab6D9A590B30", // copied from BASE

    BURN_TO_CLAIM :"0x25FdB281f565971d6377e1f49B987F03725Ad602",          

    wuLayerDropERC1155 :"0x1360AA380702be406d7161A965EfB23652082653",
     wuCharacterDropAddress :"0x0895911D31783d1C0FaE1aF5Db448F0A8cb623d8",
    wuCharacterDropAddress_721 :"0x90411665549f2bDA86b0EbbDC94c81b95DB8febd" 
  },
  // Add more networks as needed
};
 

function Home() {
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
   

  return (
    <div>
      <select
        value={selectedChain}
        onChange={(e) => setSelectedChain(e.target.value)}
      >
        <option value="sepolia">Sepolia</option>
        <option value="base">Base</option>
      </select>

      <div style={{ maxWidth: '200px' }}>
        {/* <Web3Button
          contractAddress={addressesByNetWork[selectedChain]}
          action={(contract) => contract.erc721.claim(1)}
        >
          Claim
        </Web3Button> */}
      </div>
    </div>
  );
}

 
 

export default function ChainDropDown() {

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

    
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
       
        <Tooltip title="Select Chain">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor:  colors.grey[800], color: colors.grey[300]    }}> {selectedChain} </Avatar>
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

       

        <MenuItem  onClick={() => 
          {

            updateChain (address ,"sepolia")
           
            setSelectedChain("sepolia") 
          }
          
          
          }>
              
          
          <Avatar /> Sepolia
        </MenuItem>



        <MenuItem  onClick={() =>   {

            updateChain (address ,"base")
            setSelectedChain("base") 
        }
          
             }>
          <Avatar /> Base
        </MenuItem>

         
      </Menu>
    </React.Fragment>
  );
}
