 
//https://portal.thirdweb.com/connect/connect-wallet/class-name
  //web3
import { BigNumber, ethers } from "ethers";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , REWARDS_ADDRESS } from "../../const/addresses";
import { Link } from "react-router-dom";

import { Divider ,Box, IconButton, useTheme  , Button, Typography } from "@mui/material";
import { Children, useContext, useEffect, useState  } from "react";
import { ColorModeContext, tokens, buttonStyle } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
 import { RowChildrenAlignCenter,
   VerticalStackAlignCenter,
   VerticalStackAlignLeft,
   RoundedBox,
   HorizontalSpace
  } from "../../components/Layout"

import ButtonOAuth from "../../components/ButtonOAuth";
 

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
   const _textColor = colors.grey[200];
   const address = useAddress();

  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
   
 
   
  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
   
  return (
    <Box display="flex" justifyContent="space-between" p={2}
       
      
    >
      {/* SEARCH BAR */}

      < RowChildrenAlignCenter
       >

         <Box
        display="flex" height= "40px"
      //  backgroundColor={colors.primary[400]}
      //  borderRadius="3px"
 
       
 
      >

    <RoundedBox> 
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }}
          
          >
           <SearchIcon />
          </IconButton>
        </RoundedBox>
      </Box>

      </RowChildrenAlignCenter>
     


  
      {/* <Button component={Link} to="/buy" variant="text" color={colors.grey[400]}  > */}
 
      
      <RowChildrenAlignCenter   
      
      padding={"15px 0 15px 0"} >
        <Button component={Link} to="/shop" variant="text"  >
                <Typography  color= {_textColor} >  Buy     </Typography>
        </Button>
        <Divider  color=  {_textColor}  orientation="vertical" style={{ height: '50%', width: '2px' }} />
        <Button component={Link} to="/sell" variant="text" color="primary">
        <Typography  color={_textColor} >  Sell     </Typography>
        </Button>
      </RowChildrenAlignCenter>





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



        <IconButton
        onClick={() =>{
         }}
        >
        
        {/* <Link to={"/shop"} >Shop</Link> */}
          <PersonOutlinedIcon />
             
        </IconButton>
      
       <HorizontalSpace space={2}/>
       
        <VerticalStackAlignLeft>
        
          <Typography  fontSize={"small"} fontWeight={"150px"}>$WU</Typography>
            {rewardBalance && (
              <Typography  fontSize={"small"} fontWeight={"150"}> 
                  {Number(ethers.utils.formatUnits(rewardBalance, 18)).toFixed(2)}
               </Typography>
              )}
        </VerticalStackAlignLeft> 

        <HorizontalSpace space={2}/>



        <RowChildrenAlignCenter>
        <ConnectWallet
        theme={theme.palette.mode}
        modalSize={"wide"}

        style={{ height: buttonStyle.wallet.height }}
        welcomeScreen={{
          title: "Get it at to Wuli.rocks",
          subtitle: "Just connect to get started",
        }}
        modalTitleIconUrl={""}
        />

         <ButtonOAuth/>

         </RowChildrenAlignCenter>






      
       
      </Box>
    </Box>
  );
};

export default Topbar;

