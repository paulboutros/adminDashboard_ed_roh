
 
import Tooltip from '@mui/material/Tooltip';
import {Grid, Box, Typography, useTheme,  Avatar } from "@mui/material";
 
 
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';  
 



 import {tokens   } from "../theme";
import { useAllLayersContext } from '../context/AllLayerAvailableContext';
import { useEffect } from 'react';
 

/*
layer based info is used by 
-layer selectionPanel  imageComposer.jsx
-popup to validate claim
it  takes a list of layer object and display image, how many are owned  etc..
*/


 const LayerBaseInfo = ({layerToChooseFrom , handleImageSelect  }  ) => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  

 
 const { infoMap} = useAllLayersContext(); 

 useEffect(() => {
     
   if (!infoMap)return;
    console.log  (    " infoMap   in layer basde info   >>  ownedNftData     ===============    "   ,  infoMap);

}, [ infoMap ]);
       
  





 const NumberCircle = (  number  ) => {
  let circleColor ;//= blue[500]; // Default color

  if ( Number(number) > 0) {
    circleColor = colors.greenAccent[500]; // Set color to green if number is positive
  } else  {
    circleColor =colors.grey[500]; // Set color to red if number is negative
  }

  return circleColor;
}


    return( 
        <div > 
       <Grid container spacing={2}  >
            {Object.keys(layerToChooseFrom).map((category) => (
   
                 
                 layerToChooseFrom[category].filter(ob=>ob.layerName !== 0).map((obj, index) => (
                  
                 
                   <Grid item xs={12} sm={6} md={4} key={index} >
                      <Card
                     sx={{  position: 'relative',   border: colors.grey[500], 
                       backgroundColor:  colors.primary[400], // 'transparent',
                        
                      }}
               
                     >
   
                   
                        <CardMedia
                          component="img"
                          src={`/${category}/${obj.layerName}.png`}
                          alt={index}
                          onClick={() =>
                          //  handleImageSelect(category, `${category}/${obj.layerName }.png`)
                              handleImageSelect(category, obj )
                          } 
                          style={{
                            cursor: 'pointer',
                            maxWidth: '100%',
                            height: 'auto',
                          }}
                        />
                

                  <Tooltip title= {`token supply: ${ obj.supply }`}      >
                   <Typography
                    
                        
                       style={{
                        color: colors.grey[500],
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        position: 'absolute',
                        top: '5px',
                        right: '5px',
                        //backgroundColor: 'white',
                        borderRadius: '50%',
                      // padding: '3px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                     }}
                   >
                    
                    
                    {  obj.supply }  
                  </Typography> 
                  </Tooltip>


                  <Tooltip title= {`Token ID#: ${ obj.tokenID }`}      >
                   <Typography
                    
                        
                       style={{
                        color:   colors.grey[500],
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        position: 'absolute',
                        top: '5px',
                        left: '5px',
                        //backgroundColor: 'white',
                        borderRadius: '50%',
                      // padding: '3px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                     }}
                   >
                    
                    
                    #{  obj.tokenID }  
                  </Typography> 
                  </Tooltip>
               



 


                  <Tooltip title=
                   {`you own : ${ obj.owning } of \n Token ID: ${  obj.tokenID } `}  
                       
 

                       >
                   <Box
                     style={{

                       // color: colors.grey[500],
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                        //backgroundColor: 'white',
                        borderRadius: '50%',
                      // padding: '3px 8px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                     }}
                   >

                
                    {/* {obj.owning > 0 ? (
                         <CheckCircleRoundedIcon sx={{ color: colors.greenAccent[500] }} />
                    ) : (
                        <CancelRoundedIcon sx={{ color:   element.palette.cancelIconColor   //colors.redAccent[500]
                         }} />
                    )}
                   
                   <Typography>  {  obj.owning }   </Typography> */}
   
   
                        {/* <Box sx={{ 
                             display: "flex",
                             width: "16px",
                             height: "16px", backgroundColor: NumberCircle(  obj.owning ),   borderRadius: "50%",  
                            }}>
                            {  obj.owning}
                          </Box> */}
                  {/* bgcolor: NumberCircle(  obj.owning )   basic gray looks nice */}   
                        <Avatar sx={{   width: 16, height: 16 }}>
                            { 
                            
                            
                           infoMap?.[ obj.tokenID] ? (
                            <span>{ infoMap[ obj.tokenID ].quantityOwned }</span>
                          ) : (
                            <span>0</span>
                          ) 



                            
                            
                            
                            }
                          </Avatar>  


                        
                     
                   </Box>  

                   </Tooltip>









   
                  </Card>
                   </Grid>
                 
                   
                 ))
               ))
           }
   
       </Grid>
   
   
   
   
        </div>
   
    )
   
   }

   export default LayerBaseInfo;