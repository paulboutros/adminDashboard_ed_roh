import { useState    } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

 import { BiLogoDiscordAlt } from "react-icons/bi";

//https://www.iconpacks.net/free-icon/nft-token-13058.html
//import { ReactComponent as CustomIcon } from "https://sepolia.etherscan.io/images/main/nft-placeholder.svg"

//import { ReactComponent as Nft1Icon } from "../../svg/nft-token-13057.svg"
import { ReactComponent as Nft2Icon } from "../../svg/nft-hand-13049.svg"


import { CgProfile } from "react-icons/cg";
  

import { LiaCoinsSolid } from "react-icons/lia";

import { GoPackageDependencies } from "react-icons/go";
 import { FiPackage } from "react-icons/fi";

import styles from "../../styles/Buy.module.css";  
// hand with coin . could be for claim reward
import { PiHandCoinsLight } from "react-icons/pi";

 
import "react-pro-sidebar/dist/css/styles.css";
import {   text1,  tokens } from "../../theme";
 
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
 
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
 
 
import Item from "../../components/Item";
// import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
import { referralRewardTabIndex } from "../profileWallet/index.jsx";
 

// that path will assign the src property of an <im element, therefore it is assume that path starts from public directory
  

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

   
    


  return (
    <Box

    

      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[600]} !important`,
         
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 0px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar 
      
       //  style={{ display: 'none' }}   Sidebar
       className= { styles.Sidebar  } 

        collapsed={isCollapsed}>
       
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[ text1.color ],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[ text1.color ]}>
                  Wulirocks
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
           
            </Box>
          )}
  
    
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
 
            <Item
              title="Reward Builder"
              to="/"
              icon={<PiHandCoinsLight />}
              selected={selected}
              setSelected={setSelected}
            />

            

{/* import { BiCoinStack } from "react-icons/bi";

import { BiLogoDiscordAlt } from "react-icons/bi";
import { FaDiscord } from "react-icons/fa"; */}


        {/*
            <Item
              title="Profile"
               
                to={`/profileWallet/${referralRewardTabIndex}`}
              icon={<CgProfile />}
              selected={selected}
              setSelected={setSelected}
            />   
          

            <Item  
              title="Free Token and staking"
               
                to={`/profileWallet/${referralRewardTabIndex}`}  //referralRewardTabIndex
              // icon={<BiCoinStack />} 
              icon={<LiaCoinsSolid />} 
              
              selected={selected}
              setSelected={setSelected}
            />    
        



            <Item
              title="My Packs"
              to="myPacks"//  "/userProfile"
              // icon={<GiBoxUnpacking />}  
              icon={<GoPackageDependencies />}  
               FiPackage
              selected={selected}
              setSelected={setSelected}
              addressRequired={true}
            />  

              
           <Item
              title="Layer Packs for sale"
              to= {"/shopPack/:NFT_CONTRACT"} 
              // icon={<TbPackages />}
              icon={<FiPackage />}  
              selected={selected}
              setSelected={setSelected}
              addressRequired={true}
            /> 
            */}
            
            <Item
              title="Debug mode"
              to= {"/shopPack/:NFT_CONTRACT"} 
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />


            {/*
             This works: keep it for later maybe for $WU coin or other stuff
            <Item
              title="Debug mode"
              to= {"/shopPack/:NFT_CONTRACT"} 
              icon={<CustomIconPNG />}
              selected={selected}
              setSelected={setSelected}
            /> */}



            <Item
              title="Sell NFT Layers"
              to="sell"//  "/userProfile"
              icon={<Nft1Icon size={140}      style={{
              
       
        stroke: 'none',
        strokeWidth: 1,
        strokeDasharray: 'none',
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        strokeMiterlimit: 10,
        fill: 'rgb(0,0,0)',
        fillRule: 'nonzero',
        opacity: 1,
        transform: 'matrix(1 0 0 1 0 0)',
                 // fillRule: 'nonzero',
                  //  stroke: 'none', 
                   
                 opacity: 1 
              
              
              
              
              
              
              }} />}
               selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Buy NFT Layers"
              to="sell"//  "/userProfile"
              icon={<NFTwithHand size={140} 
              
              style={{
               
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeLinejoin: 'miter',
                strokeMiterlimit: 10,
                fill: 'rgb(0,0,0)',
                fillRule: 'nonzero',
                opacity: 1,
                transform: 'matrix(1 0 0 1 0 0)' 
                 
                      
                      }} />}
              selected={selected}
              setSelected={setSelected}
            />
                


            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Social Contest
            </Typography> 
            <Item
              title="Discord Invite Board"
              to="/discordBoard"
              icon={<BiLogoDiscordAlt />}
              selected={selected}
              setSelected={setSelected}
            />
               */}
          
            {/*  
            <Item
              title="Twitter Board"
              to="/twitterBoard"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            */}
            {/* <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography> */}
            {/* <Item
              title="Profile"
              to="/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
           {/* <Item
              title="Get in Touch"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}




            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}


            {/* <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

export const ArrowUndo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
    //  className="ionicon"
    viewBox="0 0 128 128"
    style={{ 
      
     strokeWidth: 0.5, strokeDasharray: 'none', strokeLinecap: 'butt',
     strokeLinejoin: 'miter', strokeMiterlimit: 4,
      fill:"currentColor",
     
     stroke:"currentColor",
    
    // fillRule: 'nonzero',
     //  stroke: 'none', 
      
    opacity: 1 }}
    transform="matrix(1 0 0 1 0 0)"
    strokeLinecap="round"     
   
    >
 
  <path d="M 45 90 c -1.206 0 -2.412 -0.311 -3.488 -0.931 L 8.58 70.054 c -2.152 -1.241 -3.488 -3.556 -3.488 -6.04 V 25.987 c 0 -2.485 1.337 -4.8 3.489 -6.041 L 41.512 0.932 c 2.152 -1.242 4.824 -1.243 6.977 0 L 81.42 19.945 c 2.151 1.241 3.488 3.556 3.488 6.041 v 38.027 c 0 2.485 -1.337 4.8 -3.489 6.041 L 48.488 89.068 C 47.412 89.689 46.206 90 45 90 z M 45 5.998 c -0.168 0 -0.336 0.043 -0.487 0.13 L 11.58 25.142 c -0.301 0.174 -0.488 0.498 -0.488 0.845 v 38.027 c 0 0.347 0.187 0.671 0.487 0.844 l 32.933 19.015 c 0.3 0.172 0.674 0.174 0.975 0 L 78.42 64.859 c 0.301 -0.174 0.487 -0.497 0.487 -0.845 V 25.987 c 0 -0.348 -0.187 -0.671 -0.486 -0.844 L 45.487 6.128 C 45.337 6.041 45.168 5.998 45 5.998 z" />
	<path d="M 32.122 58.462 c -1.019 0 -1.992 -0.521 -2.549 -1.418 l -7.438 -11.983 v 10.401 c 0 1.657 -1.343 3 -3 3 c -1.657 0 -3 -1.343 -3 -3 V 34.538 c 0 -1.34 0.889 -2.518 2.177 -2.885 c 1.292 -0.365 2.666 0.165 3.372 1.303 l 7.438 11.983 V 34.538 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 20.924 c 0 1.34 -0.889 2.518 -2.177 2.885 C 32.672 58.425 32.395 58.462 32.122 58.462 z" />
	<path d="M 42.236 58.462 c -1.657 0 -3 -1.343 -3 -3 V 34.538 c 0 -1.657 1.343 -3 3 -3 h 8.321 c 1.657 0 3 1.343 3 3 s -1.343 3 -3 3 h -5.321 v 17.924 C 45.236 57.119 43.893 58.462 42.236 58.462 z" />
	<path d="M 50.557 48 h -8.321 c -1.657 0 -3 -1.343 -3 -3 c 0 -1.657 1.343 -3 3 -3 h 8.321 c 1.657 0 3 1.343 3 3 C 53.557 46.657 52.214 48 50.557 48 z" />
	<path d="M 70.865 37.538 H 58.974 c -1.657 0 -3 -1.343 -3 -3 s 1.343 -3 3 -3 h 11.891 c 1.657 0 3 1.343 3 3 S 72.522 37.538 70.865 37.538 z" />
	<path d="M 64.919 58.462 c -1.657 0 -3 -1.343 -3 -3 V 34.538 c 0 -1.657 1.343 -3 3 -3 c 1.657 0 3 1.343 3 3 v 20.924 C 67.919 57.119 66.577 58.462 64.919 58.462 z" />


{/*  
      <path d="M245.09 327.74v-37.32c57.07 0 84.51 13.47 108.58 38.68 5.4 5.65 15 1.32 14.29-6.43-5.45-61.45-34.14-117.09-122.87-117.09v-37.32a8.32 8.32 0 00-14.05-6L146.58 242a8.2 8.2 0 000 11.94L231 333.71a8.32 8.32 0 0014.09-5.97z" />
      <path
        d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      /> */}
 
  </svg>
    
  );
};

const CustomIconBB = () => {
  return (
    <img
      src="/path/to/your/icon.png" // Provide the path to your PNG file
      alt="Custom Icon"
      style={{ width: '32px', height: '32px' }} // Adjust width and height as needed
    />








  );
};


const Nft1Icon = ( {size}) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
  //  className="ionicon"
  // viewBox="0 0 48 48" width="48" height="48"
  viewBox={`0 0 ${size} ${size}`} width={size/2} height={size/2}
  
  style={{ 
    
   strokeWidth: 0.5, strokeDasharray: 'none', strokeLinecap: 'butt',
   strokeLinejoin: 'miter', strokeMiterlimit: 4,
    fill:"currentColor",
   
   stroke:"currentColor",
  
  // fillRule: 'nonzero',
   //  stroke: 'none', 
    transform: 'translate(20%, 5%)',
  opacity: 1 }}
  //transform="matrix(1 0 0 1 0 0)"
  strokeLinecap="round"     
 
  >
  <g style={{ transform: "translate(1.6065934065934016px, 1.6065934065934016px) " }}>  

    <path d="M 45 90 c -1.05 0 -2.099 -0.27 -3.035 -0.81 L 8.248 69.723 c -1.872 -1.08 -3.035 -3.095 -3.035 -5.257 V 25.534 c 0 -2.162 1.163 -4.177 3.035 -5.257 L 41.965 0.811 c 1.873 -1.081 4.198 -1.081 6.071 0 l 33.716 19.466 c 1.872 1.08 3.035 3.095 3.035 5.257 v 38.932 c 0 2.162 -1.163 4.177 -3.036 5.257 L 48.035 89.19 C 47.099 89.73 46.049 90 45 90 z M 45 3.999 c -0.358 0 -0.716 0.092 -1.035 0.276 L 10.248 23.741 c -0.638 0.369 -1.035 1.056 -1.035 1.793 v 38.932 c 0 0.737 0.397 1.424 1.034 1.792 l 33.717 19.467 c 0.639 0.369 1.432 0.369 2.071 0 l 33.715 -19.467 c 0.639 -0.368 1.035 -1.055 1.035 -1.792 V 25.534 c 0 -0.737 -0.397 -1.424 -1.035 -1.793 L 46.035 4.275 C 45.716 4.091 45.358 3.999 45 3.999 z"  />
    <path d="M 33.863 57.711 c -0.679 0 -1.328 -0.347 -1.699 -0.945 l -9.597 -15.461 v 14.407 c 0 1.105 -0.896 2 -2 2 s -2 -0.896 -2 -2 V 34.289 c 0 -0.894 0.592 -1.678 1.452 -1.923 c 0.858 -0.245 1.776 0.109 2.248 0.869 l 9.597 15.461 V 34.289 c 0 -1.105 0.896 -2 2 -2 s 2 0.896 2 2 v 21.422 c 0 0.894 -0.592 1.679 -1.452 1.924 C 34.23 57.686 34.045 57.711 33.863 57.711 z"  />
    <path d="M 42.17 57.711 c -1.105 0 -2 -0.896 -2 -2 V 34.289 c 0 -1.105 0.896 -2 2 -2 h 8.519 c 1.105 0 2 0.896 2 2 s -0.896 2 -2 2 H 44.17 v 19.422 C 44.17 56.815 43.274 57.711 42.17 57.711 z"  />
    <path d="M 50.689 47 H 42.17 c -1.105 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 8.519 c 1.105 0 2 0.896 2 2 S 51.793 47 50.689 47 z"  />
    <path d="M 69.433 36.289 H 57.259 c -1.105 0 -2 -0.896 -2 -2 s 0.896 -2 2 -2 h 12.175 c 1.105 0 2 0.896 2 2 S 70.538 36.289 69.433 36.289 z"  />
    <path d="M 63.346 57.711 c -1.105 0 -2 -0.896 -2 -2 V 34.289 c 0 -1.105 0.896 -2 2 -2 s 2 0.896 2 2 v 21.422 C 65.346 56.815 64.45 57.711 63.346 57.711 z"  />
  </g>


 

</svg>

 
  );
};



const NFTwithHand = ( {size}) => {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
  //  className="ionicon"
  // viewBox="0 0 48 48" width="48" height="48"
  viewBox={`0 0 ${size} ${size}`} width={size/2} height={size/2}
  
  style={{ 
    
   strokeWidth: 0.5, strokeDasharray: 'none', strokeLinecap: 'butt',
   strokeLinejoin: 'miter', strokeMiterlimit: 4,
    fill:"currentColor",
   
   stroke:"currentColor",
  
  // fillRule: 'nonzero',
   //  stroke: 'none', 
    transform: 'translate(20%, 5%)',
  opacity: 1 }}
  //transform="matrix(1 0 0 1 0 0)"
  strokeLinecap="round"     
 
  >
  <g style={{ transform: "translate(1.6065934065934016px, 1.6065934065934016px) " }}>  
  
<path d="M 43.517 88.253 c -1.29 0 -2.579 -0.142 -3.835 -0.423 L 25.67 84.706 c -1.526 -0.34 -3.095 -0.513 -4.662 -0.513 H 15.35 c -0.552 0 -1 -0.447 -1 -1 V 66.051 c 0 -0.273 0.112 -0.534 0.309 -0.723 c 0.197 -0.189 0.467 -0.289 0.736 -0.276 l 2.223 0.101 c 0.004 0 0.009 0 0.014 0 c 0.573 0 1.169 -0.228 1.644 -0.642 c 5.248 -4.584 10.101 -7.802 18.067 -9.682 c 2.589 -0.578 5.052 -0.448 7.659 -0.311 c 3.741 0.196 7.613 0.403 11.978 -1.663 c 0.881 -0.418 3.564 -1.69 5.758 0.085 c 1.167 0.946 1.903 2.508 1.876 3.979 c -0.022 1.172 -0.517 2.179 -1.392 2.834 c -4.415 3.311 -8.276 3.92 -11.682 4.457 c -1.657 0.261 -3.245 0.511 -4.793 1.053 c 7.695 5.101 23.966 2.203 36.029 0.057 c 2.548 -0.452 5.049 1.075 5.808 3.556 c 0.77 2.514 -0.472 5.192 -2.886 6.229 L 58.214 86.711 c -2.12 0.912 -4.373 1.394 -6.69 1.428 l 0 0 l -7.755 0.112 C 43.685 88.252 43.601 88.253 43.517 88.253 z M 16.35 82.193 h 4.657 c 1.714 0 3.429 0.188 5.098 0.562 l 14.012 3.124 c 1.186 0.265 2.4 0.392 3.623 0.372 l 7.754 -0.112 c 2.054 -0.03 4.05 -0.457 5.935 -1.268 l 27.486 -11.607 c 1.469 -0.632 2.227 -2.268 1.757 -3.803 c -0.464 -1.515 -1.983 -2.445 -3.546 -2.173 c -13.189 2.348 -31.256 5.565 -39.01 -1.547 c -0.243 -0.223 -0.36 -0.55 -0.314 -0.876 c 0.045 -0.325 0.248 -0.608 0.543 -0.756 c 2.302 -1.153 4.528 -1.504 6.885 -1.875 c 3.331 -0.525 6.777 -1.068 10.794 -4.081 c 0.382 -0.286 0.58 -0.714 0.591 -1.273 c 0.017 -0.863 -0.439 -1.822 -1.136 -2.386 c -0.52 -0.423 -1.463 -0.863 -3.643 0.168 c -4.821 2.283 -9.134 2.057 -12.939 1.853 c -2.465 -0.129 -4.795 -0.254 -7.105 0.263 c -7.587 1.79 -12.052 4.743 -17.199 9.239 c -0.847 0.74 -1.926 1.135 -3.027 1.135 l -1.215 -0.055 V 82.193 z"   />
<path d="M 15.35 90 H 2.188 c -0.552 0 -1 -0.447 -1 -1 V 62.778 c 0 -0.553 0.448 -1 1 -1 H 15.35 c 0.552 0 1 0.447 1 1 V 89 C 16.35 89.553 15.902 90 15.35 90 z M 3.188 88 H 14.35 V 63.778 H 3.188 V 88 z"   />
<path d="M 58.976 69.948 l -1 -1.733 l 21.042 -12.149 c 2.487 -1.436 4.032 -4.112 4.032 -6.984 V 23.068 c 0 -2.872 -1.545 -5.548 -4.032 -6.984 L 56.487 3.076 c -2.487 -1.437 -5.575 -1.436 -8.064 0 l -22.53 13.007 c -2.487 1.436 -4.032 4.112 -4.032 6.984 v 26.015 c 0 2.871 1.545 5.548 4.032 6.984 l 3.472 2.005 l -1 1.733 l -3.472 -2.005 c -3.104 -1.792 -5.032 -5.132 -5.032 -8.716 V 23.068 c 0 -3.584 1.928 -6.924 5.032 -8.716 l 22.53 -13.007 c 3.104 -1.791 6.96 -1.793 10.064 0 l 22.53 13.007 c 3.104 1.792 5.032 5.132 5.032 8.716 v 26.015 c 0 3.584 -1.929 6.924 -5.032 8.716 L 58.976 69.948 z"   />
<path d="M 41.577 47.098 c -0.339 0 -0.664 -0.174 -0.85 -0.473 L 30.134 29.56 v 16.538 c 0 0.553 -0.448 1 -1 1 s -1 -0.447 -1 -1 V 26.053 c 0 -0.447 0.296 -0.839 0.726 -0.962 c 0.43 -0.123 0.889 0.055 1.124 0.435 l 10.593 17.066 V 26.053 c 0 -0.552 0.448 -1 1 -1 s 1 0.448 1 1 v 20.046 c 0 0.446 -0.296 0.839 -0.726 0.962 C 41.76 47.086 41.668 47.098 41.577 47.098 z"   />
<path d="M 49.349 47.098 c -0.553 0 -1 -0.447 -1 -1 V 26.053 c 0 -0.552 0.447 -1 1 -1 h 8.887 c 0.553 0 1 0.448 1 1 s -0.447 1 -1 1 h -7.887 v 19.046 C 50.349 46.651 49.902 47.098 49.349 47.098 z"   />
<path d="M 56.415 37.076 h -7.066 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 7.066 c 0.553 0 1 0.448 1 1 S 56.968 37.076 56.415 37.076 z"   />
<path d="M 75.776 27.053 H 64.384 c -0.553 0 -1 -0.448 -1 -1 s 0.447 -1 1 -1 h 11.392 c 0.553 0 1 0.448 1 1 S 76.329 27.053 75.776 27.053 z"   />
<path d="M 70.081 47.098 c -0.553 0 -1 -0.447 -1 -1 V 26.053 c 0 -0.552 0.447 -1 1 -1 c 0.553 0 1 0.448 1 1 v 20.046 C 71.081 46.651 70.634 47.098 70.081 47.098 z"   />
 
 </g>


 

</svg>

 
  );
};






const CustomIconPNG = () => {
  return (
    <img
      src="/icons8-nft-50_arrow.png" // Provide the path to your PNG file
      alt="Custom Icon"
      style={{ width: '32px', height: '32px', strokeWidth: '1' }} // Adjust strokeWidth as needed
    />
  );
};