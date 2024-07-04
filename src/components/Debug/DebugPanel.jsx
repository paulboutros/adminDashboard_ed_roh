// full code was removed becasue discord and user is no longer implemented
/*
import React, { useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { HtmlTooltip, tokens } from "../../theme.js";
import { Box, Button, Divider, Tooltip, useTheme } from '@mui/material';
import { useAddress } from "@thirdweb-dev/react";
import { DeleteAccountAPI, emit_guildMemberAdd, emit_guildMemberRemove,   myDiscordInvite, openOAuth2Url  } from '../../data/API.js';
 //import { useUserContext } from '../../context/UserContext.js';
 import { useDebugModeContext } from '../../context/DebugModeContext.js';
import { ServerButton } from '../Buttons/buttons.jsx';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext.js';
 import { useDISTContext } from '../../context/DISTstakingContext.js';
import { HorizontalSpace,   VerticalSpace } from '../Layout.jsx';
 */


const _padding ="10px 0 10px 10px"

/*
export function DebugPanel(  { DISTstakedAmount, setDISTAmount }      ) {
 
  const { distStakedAmount  } = useDISTContext(); 
  const distStakedAmountRef = useRef(distStakedAmount);

  useEffect(() => {
    distStakedAmountRef.current = distStakedAmount; // Update the ref when distStakedAmount changes
  }, [distStakedAmount]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
     
  return (
    <>
    <VerticalSpace space ={5}/> 
     <Box  sx={{ 
       
                 outline:   colors.grey[400]  , 
                 borderRadius: 2 ,
                 backgroundColor: colors.primary[600],
                 flexDirection: 'column',
                 display: 'flex',  
                 justifyContent : "space-between",
              
                 
              
              
      }}
     
      > 
         <HorizontalSpace space ={10}/> 
        < Box  
          sx={{ display: 'flex',  flexDirection: "column" ,
            justifyContent :"flex-start",    color: colors.grey[400],
           
         }} 
        >
          <Box  sx={{   fontWeight:"500px" ,   padding:  _padding  ,  display: 'flex',  flexDirection: "row" ,  justifyContent :"flex-start",   }}   > 
        
            <Typography > Debug Mode Buttons</Typography>
          </Box>
    
         <Divider  orientation="horizontal"/> 
          

          <Box  sx={{ display: 'flex', 
           flexDirection: "row", 
            alignItems:"center",  
             color: colors.grey[100] ,
             padding:   _padding
             
             }}   >
 
              <ButtonRow   DISTstakedAmount={DISTstakedAmount}  />
           </Box>
        </Box>
  </Box>
</>
  );


}
*/
function ButtonRow(  { DISTstakedAmount, setDISTAmount }   ){
   // code removed as user code is not used 
}
 