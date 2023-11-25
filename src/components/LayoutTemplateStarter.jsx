
import { IconButton , Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

 import {CountdownTimerWithArg} from "../../components/CountdownTimer.jsx"
import  { convertSecondsToDateString, formatTimestampToCustomFormat, addressShortened ,handleCopyClick} from "../../utils.js"
//https://chakra-ui.com/docs/components/button
import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract,
    useMinimumNextBid, useValidDirectListings,
     useValidEnglishAuctions , useMakeBid,
     useContractEvents
    
   } from "@thirdweb-dev/react";


 

import {CopyText, CustomLinkWithLocalIcon,  CustomLinkWithIcon } from "../../components/LinkTextButton.jsx"
import { RowChildrenAlignCenter,
    VerticalStackAlignCenter ,
    VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,VerticalStackAlign,
    
    RowChildrenAlignLeft,RowChildrenAlignLeftBottom,
    RowChildrenAlignRight,
    VerticalSpace,
     RoundedBox,
     BoxWithTopBar,
     HorizontalSpace,
     RoundedBoxInfo
   } from "../../components/Layout.jsx"  

import NFTContratHeader from "../../components/NFTcontractHeader.jsx"
import { 
   MARKETPLACE_ADDRESS,
   TOOLS_ADDRESS 
} from "../../const/addresses.ts";
//import {getSDK } from "../../utils/updateMetadata";
import {text2, text1, tokens } from "../../theme.js";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
  

// key  page control for global edditing
const _buttonHeight ="50px";
const _mainBoxPadding = 3;
const LayoutTemplate =  (  ) => {
 
 const { user } = useUserContext();

  

 const theme = useTheme();
 const colors = tokens(theme.palette.mode);

 const boxColor = colors.primary[400];
  

  const flex = { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' };

 

   
       return (
 
          <div>
    
        
    {/* GRID & CHARTS */}
    <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
       
       
        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
        >
         
             image
        </Box>
       
        <Box gridColumn="span 7" gridRow="span 1"  backgroundColor={colors.primary[400]} >
            info 1
         </Box>
         <Box gridColumn="span 7" gridRow="span 3"  backgroundColor={colors.primary[400]} >
             info 2
         </Box>
         <Box gridColumn="span 7" gridRow="span 1"  backgroundColor={colors.primary[400]} >
             info 3
         </Box>
      
        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
         GGGGSS
         
        </Box>
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
         
        >
          
         WWWWW
        </Box>
   
          {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
         all activity
         
        </Box>
  
      </Box>

{/* GRID & CHARTS END */}




















    <VerticalStackAlign>
       <RowChildrenAlignLeft>
    
        <VerticalStackAlign>
          <Box  style={{ backgroundColor:colors.blueAccent[400],  width: '200px' , height: '200px'   }}> Image 1  </Box>
          <Box  style={{ backgroundColor:colors.blueAccent[200],  width: '200px' , height: '50px'   }}> image trait and info  </Box>
        </VerticalStackAlign>

        <VerticalStackAlign>
          <Box  style={{ backgroundColor:colors.blueAccent[500],  width: '200px' , height: '50px'   }}> info 1  </Box>
          <Box  style={{ backgroundColor:colors.blueAccent[400],  width: '200px' , height: '100px'   }}> info 2  </Box>
          <Box  style={{ backgroundColor:colors.blueAccent[300],  width: '200px' , height: '50px'   }}> info 3  </Box>
          <Box  style={{ backgroundColor:colors.blueAccent[400],  width: '200px' , height: '50px'   }}> info 4  </Box>
        </VerticalStackAlign>
 
     </RowChildrenAlignLeft>

     <Box  style={{ backgroundColor:colors.blueAccent[600],  width: '400px' , height: '200px'   }}> Image 1  </Box>
     </VerticalStackAlign>

          </div>

       ) 
    
 };

export default LayoutTemplate;
 
  