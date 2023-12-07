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

  export function RowChildrenAlignRight( {children} ){
  
    return(
      <Box  //make thing vertically centered
      display="flex"
      flexDirection="row"
      alignItems="flex-end"
      marginLeft="auto" // Pushes children to the left edge
     >
       {children}
      </Box>
  
     )
  
  }
  export function RowChildrenAlignLeft( {children , expand } ){
  
    return(
      <Box  //make thing vertically centered
      width= {expand ? '100%' : null }  //  width= {null}// '100%
      display="flex"
      flexDirection="row"
      alignItems="flex-start"
      //marginLeft="auto" // actually, this push children to the right side
     >
       {children}
      </Box>
  
     )
  
  }

export function RowChildrenAlignLeftBottom( {children} ){

  
    return(
      <Box  //make thing vertically centered
      display="flex"
      flexDirection="row"
      alignItems="flex-end" // align to the bottom
      justifyContent="flex-start" // align to the left

       
     >
       {children}
      </Box>
    
  
     )
  
  }

  export function RowChildrenAlignTop ( {children} ){

  
    return(
      <Box  //make thing vertically centered
      width= 'auto'// '100%'
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
  
  //neutral, respect whatever horizontal alignement of the children
  export function VerticalStackAlign(  {children  , padding , expand } ){
   
    return (

      <Box
      width= {expand ? '100%' : null }  //  width= {null}// '100%'
      padding ={padding}
    //  display="flex" 
     // flexDirection="column"
     // alignItems="flex-start" 
   //   justifyContent="center"
   >
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



export function RoundedBoxInfo ( { name ,value, _height = "110px", _width = "60px"  }){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const boxColor = colors.primary[400];
  const  _borderColor = colors.primary[400]
  const _borderRadius= "10px";
   const  paddingPX = "0px";
   const trait_margin = "15px";

return(
  <Box  sx={{  height: _height, width: _width }} //,  width: "60px" 
  padding= {2}   border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius}
 
 >
                <Typography 
               fontWeight="200"
              
              
               sx={{ color: colors.grey[200] ,  position: 'relative', top:"-5px"  }}
                >{name}</Typography>
                
               <RowChildrenAlignCenter>  
                   <Box
                       display="flex"
                       flexDirection="column"
                       alignItems="center"
                       justifyContent="center"

                        padding={1}
                        border={1}
                        borderColor={ _borderColor} //borderRadius={_borderRadius}
                        borderRadius={2}
                   >
                       <Typography fontSize="small">{value}</Typography>
                       
                   </Box>
                   </RowChildrenAlignCenter>   
     
</Box>

)

}
 

export function RoundedBoxSmall(  {children} ){
 
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

export function RoundedBox(  {children , _height , backgroundColor ,  padding=0 , margin=0} ){
 
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const boxColor = colors.primary[400];
    const  _borderColor = colors.primary[400]
    const _borderRadius= "10px";


    return (
      <Box  
         backgroundColor = {backgroundColor || null} 
         margin={margin}
         padding={padding}
         height={_height ? _height  : 'auto'}
         border= {1}  borderColor={ _borderColor   }   borderRadius={_borderRadius} 
      >
      {children}
     </Box>

    )

}
export function BoxWithTopBar(  {children  ,timeLeft, topBarHeight = 20  , boxHeight = 200 }  ){


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
                 >

 

                 <Box style={{  position: 'absolute', right:"10px"}}  >
                 <RowChildrenAlignCenter>
                 <Typography >
                     Sale ends in:
                    </Typography>
                   <Typography 
                      sx={{ marginLeft: "10px", color: colors.grey[text1.color]     }}
                   >{timeLeft}</Typography>
                     </RowChildrenAlignCenter>
                  </Box>
                
         
                 </Box>
                <Box height=  {boxHeight}  paddingTop={20} paddingBottom={20}  >   
                 {/* padding="20px" */}
                 <Divider   orientation="horizontal" style={{    width: '100%', height: '1px' }} />  
              
                 <Box padding="20px" > 
                 {children}
                 </Box>

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

 

  
  