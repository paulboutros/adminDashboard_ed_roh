import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
import {Button, Box,  Divider,  Typography, useTheme   } from "@mui/material";
import { Link } from 'react-router-dom';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
 //https://chakra-ui.com/docs/components/button
 import { MediaRenderer  } from "@thirdweb-dev/react";
import { Avatar, 
  useToast,
   Tooltip
} from "@chakra-ui/react";


import { RowChildrenAlignCenter,
     VerticalStackAlignCenter ,
     VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,
     VerticalSpace,
      RoundedBox,
      BoxWithTopBar,
      HorizontalSpace
    } from "./Layout.jsx"  


import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../const/addresses.ts";
import {CopyToClipboard } from "../utils.js";
import {buttonStyle, text2, text1, tokens } from "../theme.js";
   
 
 

export const CustomLinkWithLocalIcon = ({ to,  text,  tooltipText }) => {


   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return(

    <div>
        <Tooltip label={tooltipText} 
                 aria-label='A tooltip'
                 padding={2} borderRadius={5}
                  bg= {colors.primary[900]} color={ colors.grey[text2.color] } 
                 >
        <Box >
          {/* <OpenInNewIcon   sx={{ marginRight:1,  fontSize: 14 }}   /> */}
          <Button variant="text" 
           style=  {{ textDecoration: 'none',
           display: 'flex',
           alignItems: 'center',
           color: colors.grey[300],
          
           position: 'relative' , left:"-6px"  }}
           startIcon={ <OpenInNewIcon sx={{ marginRight:-0.5,  fontSize: 14 }}/>}

           component={Link}
           to={to}
 

          > {text} </Button>
 


        </Box>

        </Tooltip>
        </div>
  )

     
  };



  export const CopyText = ({ to,  text, tooltipText, textToCopy  }) => {
 
    const toast = useToast()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return(

    <div>
        <Tooltip label={tooltipText} 
                 aria-label='A tooltip'
                 padding={2} borderRadius={5}
                  bg= {colors.primary[900]} color={ colors.grey[text2.color] } 
                 >
        
       
        <Box >
          {/* <OpenInNewIcon   sx={{ marginRight:1,  fontSize: 14 }}   /> */}
          <Button variant="text" 
           style=  {{ textDecoration: 'none',
           display: 'flex',
           alignItems: 'center',
           color: colors.grey[300],
          
           position: 'relative' , left:"-6px"  }}
          startIcon={ <ContentCopyOutlinedIcon sx={{ marginRight:-0.5,  fontSize: 14 }}/>}
           onClick={() =>  {
            
            CopyToClipboard( textToCopy )
             
             
              toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
              })
          





           }
        }
 

          > {text} </Button>
 


        </Box>

        </Tooltip>
     </div>

  )

     
  };



export const CustomLinkWithIcon = ({ to, children, text, tooltipText }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return(

    <div>
        <Tooltip label={tooltipText} 
                 aria-label='A tooltip'
                 padding={5} borderRadius={5}
                  bg= {colors.primary[900]} color={ colors.grey[text2.color] } 
                 >
        
       
        <Box >
          {/* <OpenInNewIcon   sx={{ marginRight:1,  fontSize: 14 }}   /> */}
          <Button variant="text" 
           style=  {{ textDecoration: 'none',
           display: 'flex',
           alignItems: 'center',
           color: colors.grey[300],
          
           position: 'relative' , left:"-6px"  }}
          startIcon={ <OpenInNewIcon sx={{ marginRight:-0.5,  fontSize: 14 }}/>}
          onClick={() => openEtherScanLink( to )}
 

          > {text} </Button>
 


        </Box>

        </Tooltip>
     </div>

  )

     
  };
 

function openEtherScanLink( url){

    window.open(url, "_blank");
}

 