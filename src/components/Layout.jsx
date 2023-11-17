import { Divider ,Box, IconButton, useTheme  , Button, Typography } from "@mui/material";
import {text2, text1, tokens } from "../theme";


export function RowChildrenAlignCenter( {children} ){

  
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
  export function RowChildrenAlignTop( {children} ){

  
    return(
      <Box  //make thing vertically centered
      display="flex"
      flexDirection="row"
      alignItems="flex-start" // in row this align to top edge of container
      justifyContent="flex-start" // in row

       
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
  
  export function VerticalStackAlignLeft(  {children  , fullWidth } ){
   
      return (

        <Box
        width={fullWidth ? '100%' : 'auto'}
        display="flex" 
        flexDirection="column"
        alignItems="flex-start" 
        justifyContent="center">
        {children}
       </Box>
  
      )

    
    
}
export function VerticalStackAlignTopLeft(  {children  , fullWidth } ){
   
  return (

    <Box
    width={fullWidth ? '100%' : 'auto'}
    display="flex" 
    flexDirection="column"

    alignItems="flex-start" // horiz
    justifyContent="flex-start" // vertical
    
    >
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
export function BoxWithTopBar(  {children , topBarHeight = 20  , boxHeight = 200} ){


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const boxColor = colors.primary[400];
  const  _borderColor = colors.primary[400]
  const _borderRadius= "10px";
  return(
    <Box 
                border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
                overflow="hidden"   position="relative" >
                
                <Box
                    height= {topBarHeight} 
                    backgroundColor={colors.primary[700]}
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                />
                <Box height=  {boxHeight}   padding="20px" >
                 <Divider   orientation="hotizontal" style={{ marginBottom:"20px",  width: '100%', height: '1px' }} />  
              
                 {children}
              </Box>
       </Box>



  )

 }

export function VerticalSpace ( {space}){
 
 return(  <Box marginBottom={ space }> </Box>  )
 
}
export function HorizontalSpace ( {space}){
 
  return(  <Box marginLeft={ space }> </Box>  )
  
 
 }

 

  
  