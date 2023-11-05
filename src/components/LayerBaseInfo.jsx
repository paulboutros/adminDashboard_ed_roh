
 
import Tooltip from '@mui/material/Tooltip';
import {Grid, Box, Button, IconButton, Typography, useTheme, colors } from "@mui/material";
 
 
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';  
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import { tokens } from "../theme";
 

/*
layer based info is used by 
-layer slectionPanel
-popup to validate claim
it  takes a list of layer object and display image, how many are owned  etc..
*/


 const LayerBaseInfo = ({layerToChooseFrom , handleImageSelect  }  ) => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);


     // console.log(   " LayerBaseInfo >  layerToChooseFrom"  ,  layerToChooseFrom  );



    return( 
        <div > 
       <Grid container spacing={2}  >
            {Object.keys(layerToChooseFrom).map((category) => (
   
                 
                 layerToChooseFrom[category].filter(ob=>ob.layerName !== 0).map((obj, index) => (
                  
                 
                   <Grid item xs={12} sm={6} md={4} key={index} >
                      <Card
                     sx={{  position: 'relative',   border: colors.grey[500],   backgroundColor: 'transparent',  }}
               
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
                

                 <Tooltip title= {`layer supply: ${ obj.supply }`}      >
                   <Typography
                    
                        
                       style={{
                        color: colors.grey[500],
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
                    
                    
                    {  obj.supply }  
                  </Typography> 
                  </Tooltip>



                     


                  <Tooltip title=
                   {`layer ID: ${ obj.layerName }\n  
                     you own : ${ obj.owning }`}  
 

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

                
                    {obj.owning > 0 ? (
                    <CheckCircleRoundedIcon sx={{ color: colors.greenAccent[500] }} />
                    ) : (
                        <CancelRoundedIcon sx={{
                            
                            //color:  colors.primary[500]  
                            //color:  colors.grey[300]  
                            //color:  colors.redAccent[200]  
                            color: colors.redAccent[500]
                        
                        
                        }} />
                    )}
                
                  
                   <Typography>
   
                   {  obj.owning }  
                   </Typography>
                     
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