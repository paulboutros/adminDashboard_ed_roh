 
import { providers, Contract, utils } from 'ethers';

import { Box, IconButton, useTheme  , Button, Typography } from "@mui/material";
import { useContext, useEffect, useState  } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { useLocation } from 'react-router';
 import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider

import ButtonOAuth from "../../components/ButtonOAuth";
 

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { user } = useUserContext();


   //WEB 3

   const [connected, toggleConnect] = useState(false);
   const location = useLocation();
   const [currAddress, updateAddress] = useState('0x');
   
   async function getAddress() {
     //const ethers = require("ethers"); //was comon js  replced with import { providers, Contract, utils } from 'ethers';
     const provider = new providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const addr = await signer.getAddress();
     updateAddress(addr);
   }
   /*
   function updateButton() {
     const ethereumButton = document.querySelector('.enableEthereumButton');
     ethereumButton.textContent = "Connected";
     ethereumButton.classList.remove("hover:bg-blue-70");
     ethereumButton.classList.remove("bg-blue-500");
     ethereumButton.classList.add("hover:bg-green-70");
     ethereumButton.classList.add("bg-green-500");
   }
   
   async function connectWebsite() {
   
       const chainId = await window.ethereum.request({ method: 'eth_chainId' });
       if(chainId !== '0x5')
       {
         //alert('Incorrect network! Switch your metamask network to Rinkeby');
         await window.ethereum.request({
           method: 'wallet_switchEthereumChain',
           params: [{ chainId: '0x5' }],
        })
       }  
       await window.ethereum.request({ method: 'eth_requestAccounts' })
         .then(() => {
           updateButton();
           console.log("here");
           getAddress();
           window.location.replace(location.pathname)
         });
   }
   */
     useEffect(() => {
       if(window.ethereum == undefined)
         return;
       let val = window.ethereum.isConnected();
       if(val)
       {
         console.log("here");
         getAddress();
         toggleConnect(val);
        // updateButton();
       }
   
       window.ethereum.on('accountsChanged', function(accounts){
         window.location.replace(location.pathname)
       })
     });
   
   


   //WEB 3 ends
   
 

   
 


  
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
      
         <Typography style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
        </Typography>


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
      sx={{
        backgroundColor: colors.blueAccent[700],
        color: colors.grey[100],
        fontSize: "14px",
        fontWeight: "bold",
     
      }}
      className="enableEthereumButton  "
   //   onClick={() => connectWebsite() }
    >
        {connected? "Connected":"Connect Wallet"}
       
    </Button>

        
{/*              
        <Button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</Button> 
         */}

        <ButtonOAuth/>
       
      </Box>
    </Box>
  );
};

export default Topbar;


