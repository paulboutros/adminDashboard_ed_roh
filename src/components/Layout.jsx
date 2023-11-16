import { Divider ,Box, IconButton, useTheme  , Button, Typography } from "@mui/material";
import {text2, text1, tokens } from "../theme";


export function RowCenterBox( {children} ){

  
    return(
      <Box  //make thing vertically centered
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
     >
       {children}
      </Box>
    
  
     )
  
  }
  
 export function VerticalStackAlignCenter(  {children} ){
   
  
      return (
        <Box 
       
        display="flex" 
        flexDirection="column"
        alignItems="center"
        justifyContent="center">
        {children}
       </Box>
  
      )
  
  
  }
  
  export function VerticalStackAlignLeft(  {children} ){
   
  
    return (

      <Box
      width="100%"
      display="flex" 
      flexDirection="column"
      alignItems="flex-start" 
      justifyContent="center">
      {children}
     </Box>

    )
}

export function RoundedBox(  {children} ){
 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const boxColor = colors.primary[400];
    const  _borderColor = colors.primary[400]
    const _borderRadius= "10px";


    return (
      <Box   
         border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
      >
      {children}
     </Box>

    )

}

  
  