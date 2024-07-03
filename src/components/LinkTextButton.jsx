import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
import {Button, Box,   useTheme   } from "@mui/material";
import { Link } from 'react-router-dom';

import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
  //https://chakra-ui.com/docs/components/button
 import { 
  useToast,
   Tooltip
} from "@chakra-ui/react";

 

 
import {CopyToClipboard } from "../utils.js";
import {  text2,   tokens } from "../theme.js";
   
 
 

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
           fontSize: "15px",
           position: 'relative' , left:"-6px", bottom:"7px"  }}
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

 