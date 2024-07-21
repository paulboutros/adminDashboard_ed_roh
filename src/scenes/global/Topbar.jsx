 //https://blog.thirdweb.com/guides/reactnative-sdk-full-theme-customization/
//https://portal.thirdweb.com/connect/connect-wallet/class-name
  //web3
  //  full connect button customization tutorial here
   // https://youtu.be/7IxMbJD6eQ0?t=2468
 
   
  import * as React from 'react';
   
  import SpeedDial from '@mui/material/SpeedDial';
  import SpeedDialIcon from '@mui/material/SpeedDialIcon';
  import SpeedDialAction from '@mui/material/SpeedDialAction';
  import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
  import SaveIcon from '@mui/icons-material/Save';
  import PrintIcon from '@mui/icons-material/Print';
  import ShareIcon from '@mui/icons-material/Share';
   

import {  providers, ethers } from "ethers";
import { ConnectWallet } from "@thirdweb-dev/react";
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , REWARDS_ADDRESS } from "../../const/addresses";
 
import { Box, IconButton, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {   useContext,  useState  } from "react";
import { ColorModeContext, tokens,  StyledConnectWallet, cool_orange  } from "../../theme";
 
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
 
 import { RowChildrenAlignCenter  } from "../../components/Layout"
    
    
    
 

   
 import stylesProfile from "../../styles/Profile.module.css"; 
import AccountMenu from "../../components/AccountMenu";

import styled from 'styled-components';
import { useEffect } from 'react';
import { addorupdateWalletuser } from '../../data/API';

export const StyledDiv = styled('div')({
  color: 'blue',
  fontSize: '16px',
  backgroundColor: 'red',
});

 
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];



const Topbar = () => {

   const [tab, setTab] = useState("Main");
   const theme = useTheme();
   const navigate = useNavigate();
   const colors = tokens(theme.palette.mode);
   const colorMode = useContext(ColorModeContext);
    
   const address = useAddress();

   const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
   const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
   
   
   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
 
      useEffect(() => {     const handleResize = () => {setScreenWidth(window.innerWidth);   };
  
       window.addEventListener('resize', handleResize);
 
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);


   
   useEffect(() => {
      if (!address) return;
     addorupdateWalletuser(address);

  }, [address]);

  let currentSigner;
 

    const OpenPage = ( route, setTab, tabName ) => {
    
  
   setTab(tabName);
   navigate(`/${route}`); 
 
      
  };
   


  
  return (

    <React.Fragment> 
       <Box display="flex" justifyContent="space-between"    padding="0px 20px 0px 20px" height={"46px"}
  

            // borderBottom={`1px solid ${colors.primary[100]}`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              

               width: "100vw",

              zIndex: 1000, // Ensure it's above other content
              backgroundColor:  theme.palette.background.default

            

            }}
          >
     

    
                          
    
                 

                                {screenWidth < 600 ?  (
                                              
                                              <></>
                                
                                  ):( 


                          <RowChildrenAlignCenter>  
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
                                    className={`${stylesProfile.toptab}  ${tab === "Main" ? stylesProfile.topactiveTab : ""}`}
                                    onClick={() => OpenPage("", setTab, "Main"  ) }
                                  >
                                    Main
                                  </h3>


                                </div>
                          </RowChildrenAlignCenter>
                        
                      ) }




                        
                            {screenWidth < 600 ?  (
                        
                                          <></>
                            
                              ):( 
                                    <IconButton     onClick={colorMode.toggleColorMode}>
                                    {theme.palette.mode === "dark" ? (
                                      <DarkModeOutlinedIcon  sx = {{ color: `${colors.grey[200]}` }} />
                                    ) : (
                                      <LightModeOutlinedIcon   sx = {{ color: `${colors.grey[200]}` }} />
                                    )}
                                  </IconButton>  

                              ) }
    
  
                  <ShowRewardBalance rewardBalance={rewardBalance}/>   
                
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
              
                

                  
              {screenWidth < 600 &&  (
                    <AccountMenu/> 
              )}

        
                  </RowChildrenAlignCenter>

        
        
   
   
       </Box>


       

    </React.Fragment>

)
 
  
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










export   function BasicSpeedDial() {
  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}


