import { useState } from 'react';
import {  Button, IconButton, Typography, useTheme, colors } from "@mui/material";
import FileCopyRoundedIcon from '@mui/icons-material/FileCopyRounded';
import Tooltip from '@mui/material/Tooltip';
import { tokens } from "../theme";

function CopyToClipboard({ copyText, backgroundColor, textColor }) {



  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      < >
       
        <Tooltip title="Click to copy">
          <Button
            sx={{  backgroundColor:  backgroundColor  }}
          
         //   copyText={referralCode}  backgroundColor={colors.primary[700]} textColor={ colors.grey[200]}
            
          onClick={handleCopyClick}>
           {/* <FileCopyRoundedIcon sx={{  color: colors.greenAccent[500] }}/> */}
          <FileCopyRoundedIcon sx={{  color:  textColor }}/>
          {/* <span>{isCopied ? 'Copied!' : ''}</span> */}
        </Button>
        </Tooltip>
      </>
    );
  }

   export default CopyToClipboard;

    
