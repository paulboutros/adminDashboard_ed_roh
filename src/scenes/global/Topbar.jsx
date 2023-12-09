 
//https://portal.thirdweb.com/connect/connect-wallet/class-name
  //web3
import {   ethers } from "ethers";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , REWARDS_ADDRESS } from "../../const/addresses";
import { Link } from "react-router-dom";

import { Box, IconButton, useTheme ,   Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {   useContext, useEffect, useState  } from "react";
import { ColorModeContext, tokens, buttonStyle } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
 import { RowChildrenAlignCenter,
    
   VerticalStackAlignLeft,
   RoundedBox,
   HorizontalSpace
  } from "../../components/Layout"

 import styles from        "../../styles/Navbar.module.css"; 
 import stylesProfile from "../../styles/Profile.module.css"; 


const Topbar = () => {

   const [tab, setTab] = useState("Buy");
   const theme = useTheme();
   const navigate = useNavigate();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
   const _textColor = colors.grey[200];
   const address = useAddress();

  const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
   
  
  const OpenPage = ( route, setTab, tabName ) => {

   
  
     setTab(tabName);
     navigate(`/${route}`); 
 
      
  };

  return (
    <Box display="flex" justifyContent="space-between"
     padding="0px 20px 0px 20px" height={"70px"}
     
     >
       { /* SEARCH BAR */ }
       <RowChildrenAlignCenter>
       

         <Box  display="flex" >
    
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
 
      
      <RowChildrenAlignCenter  >  
      
        {/* <Button component={Link} to="/shop" variant="text"  >
        <Typography  color= {_textColor} >  Buy     </Typography>
        </Button>

        <Divider  color=  {_textColor}  orientation="vertical" style={{ height: '50%', width: '2px' }} />

        <Button component={Link} to="/sell" variant="text" color="primary">
        <Typography  color={_textColor} >  Sell     </Typography>
        </Button>

        <Divider  color=  {_textColor}  orientation="vertical" style={{ height: '50%', width: '2px' }} />

        <Button component={Link} to="/shopPack" variant="text" color="primary">
        <Typography  color={_textColor} >  Packs     </Typography>
        </Button> */}
 
              <div className={stylesProfile.toptabs}>
                <h3 className={`${stylesProfile.toptab} ${tab === "Buy" ? stylesProfile.topactiveTab : ""}`}
                   onClick={() => OpenPage("shop", setTab, "Buy"  ) }
                >
                  Buy
               </h3>
                <h3
                  className={`${stylesProfile.toptab}  ${tab === "Sell" ? stylesProfile.topactiveTab : ""}`}
                  onClick={() => OpenPage("sell", setTab, "Sell"  ) }
                >
                  Sell
                </h3>
                <h3
                  className={`${stylesProfile.toptab}  ${tab === "Pack" ? stylesProfile.topactiveTab : ""}`}
                  onClick={() => OpenPage("shopPack", setTab, "Pack"  ) }
                >
                   Pack
                </h3>
              </div>






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


         <div className={styles.navRight}>
           {address && (
            <Link 
              className={styles.link} 
          //   href={`/profile/${address}`}
             to={`/profileWallet/${address}`}>
             
              <img
              //  className={styles.profileImage}
                src="/user-icon.png"
                width={42}
                height={42}
                alt="Profile"
              />
            </Link>
          )}
        </div>


         {/* <MenuPopupState/> */}
         {/* <ButtonOAuth/> */}

         </RowChildrenAlignCenter>






      
       
      </Box>
    </Box>
  );
};

export default Topbar;

//https://v5.reactrouter.com/web/api/Hooks/usehistory
 

