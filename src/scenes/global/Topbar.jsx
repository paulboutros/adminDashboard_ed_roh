 //https://blog.thirdweb.com/guides/reactnative-sdk-full-theme-customization/
//https://portal.thirdweb.com/connect/connect-wallet/class-name
  //web3
import {   ethers } from "ethers";
import {darkTheme,   ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , REWARDS_ADDRESS, PACK_ADDRESS } from "../../const/addresses";
 
import { Box, IconButton, useTheme ,   Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {   useContext,  useState  } from "react";
import { ColorModeContext, tokens,  StyledConnectWallet, allCSS, StyledExternalLink, basicRoundedBox1, cool_orange  } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
 import SearchIcon from "@mui/icons-material/Search";
 import { RowChildrenAlignCenter,
    
    
   RoundedBox,
   HorizontalSpace,
    
  } from "../../components/Layout"

   
 import stylesProfile from "../../styles/Profile.module.css"; 
import AccountMenu from "../../components/AccountMenu";

import styled from 'styled-components';

export const StyledDiv = styled('div')({
  color: 'blue',
  fontSize: '16px',
  backgroundColor: 'red',
});

 


const Topbar = () => {

   const [tab, setTab] = useState("Buy");
   const theme = useTheme();
   const navigate = useNavigate();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
    
   const address = useAddress();

   const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
   const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
   
  
   const OpenPage = ( route, setTab, tabName ) => {

   
  
   setTab(tabName);
   navigate(`/${route}`); 
 
      
  };
   
 
  return (
    <Box display="flex" justifyContent="space-between"
      padding="0px 20px 0px 20px" height={"46px"}

      borderBottom={`1px solid ${colors.primary[300]}`}
     
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
      
         <RowChildrenAlignCenter  >  
  
              <div className={stylesProfile.toptabs}>
                <h3 className={`${stylesProfile.toptab} ${tab === "Buy" ? stylesProfile.topactiveTab : ""}`}
                   onClick={() => OpenPage(`shop/${TOOLS_ADDRESS}/`, setTab, "Buy"  ) }
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
                  onClick={() => OpenPage(`shopPack/${PACK_ADDRESS}/`, setTab, "Pack"  ) }
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
        <IconButton color={colors.grey[100]}   >
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton  color={colors.grey[100]}  >
          <SettingsOutlinedIcon />
        </IconButton>
 
        {/* <IconButton onClick={() =>{ }}>    <PersonOutlinedIcon />   </IconButton> */}
       
      
       <HorizontalSpace space={2}/>
       
          <ShowRewardBalance rewardBalance={rewardBalance} />
 
        <HorizontalSpace space={2}/>


   {  /*  full connect button customization tutorial here
       https://youtu.be/7IxMbJD6eQ0?t=2468
      */}

    <RowChildrenAlignCenter>

    { address ? (

<ConnectWallet
theme={theme.palette.mode}  modalSize={"wide"}
    style={{  height: '40px'   }}
         
    welcomeScreen={{
    title: "Get it at to Wuli.rocks",
    subtitle: "Just connect to get started",
  }}
    modalTitleIconUrl={""}


/>
):(
<StyledConnectWallet />
)}
        {/* <ConnectWallet  theme={theme.palette.mode}  modalSize={"wide"}
        
     
          style={{  height: '40px'   }}
         
          welcomeScreen={{
          title: "Get it at to Wuli.rocks",
          subtitle: "Just connect to get started",
        }}
          modalTitleIconUrl={""}

            // button when connected already
          detailsBtn={() => {
            return <button> hello </button>;
          }}

         />  */}
 

         <HorizontalSpace space={2}/> 

          

            <AccountMenu/> 

 
         </RowChildrenAlignCenter>






      
       
      </Box>
    </Box>
  );
};

export default Topbar;

//https://v5.reactrouter.com/web/api/Hooks/usehistory
 /*
 function ShowRewardBalance (  {rewardBalance}  ){
     return(

      <VerticalStackAlignLeft>
        
      <Typography  fontSize={"small"} fontWeight={"150px"}>$WU</Typography>
          {rewardBalance && (
                <Typography  fontSize={"small"} fontWeight={"150"}> 
                         {Number( ethers.utils.formatUnits(rewardBalance, 18)).toFixed(2)}
                 </Typography>
          )}
    </VerticalStackAlignLeft> 

    )
 }
*/

function ShowRewardBalance (  {rewardBalance}  ){

  const theme = useTheme();


  return(

   <div  style={{ 
       display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "auto"   }}
    
    >
     
      
     {/* sx={ allCSS( theme.palette.mode).unclaimedRewardText }  */}
     <Box     >
     
            {rewardBalance && (
                <h3  className={`${stylesProfile.toptab}`}    >   
                      {Number( ethers.utils.formatUnits(rewardBalance, 18)).toFixed(2)}
                       {/* <span style={{color: "#0294fe"  }}> $ </span>
                        WU */}
                         <span style={{color: cool_orange }}> $ </span>
                        WU
                </h3>
 
        )}
       </Box>

         


        
 </div> 

 )
}



