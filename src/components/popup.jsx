import React, { useState } from 'react';
//import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
 
import { tokens } from "../theme";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import {Grid, Box ,Button, IconButton, Typography, useTheme, colors } from "@mui/material";

import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';  

import {sendTracking} from "../data/API"

const debugMode = true;


const showImage =() =>{




    return(

<div>




</div>






    );
}


const PopupButton =  ({ text, style , selectedImages   }) => {

 
    const { user } = useUserContext();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    sendTracking(user , "category", "image" , "Claim" ,  "imageComposer jsx")   ;
  const [open, setOpen] = useState(false);



  const excludedKeys = ["forearn", "bo", "collar"];

 
    
const modifiedImageData = Object.fromEntries(
    Object.entries(selectedImages)
      .filter(([key]) => !excludedKeys.includes(key))
      .map(([key, imageUrl]) => [key, imageUrl.replace('layersForCharacterCompo/', '')])
  );


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 




  return (
    <div>
      <Button variant="outlined" style={style} onClick={handleOpen}   >
         {text}
      </Button>

      <Dialog open={open} onClose={handleClose}   >
        <DialogTitle  sx={{ width: "600px", height: "100px" }}  >Missing Items</DialogTitle>
        <DialogContent  >
              
        <Box  sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%" >
           

             
               </Box>
        

                   <Box > 

                            <Grid container spacing={0} display="flex"
                             justifyContent="space-between" alignItems="center"
                            
                              >
                                {Object.entries(modifiedImageData).map(([key, imageUrl], index) => (
                                    <Grid item xs={12} sm={6} md={2} key={index}>
                                    <Card
                                        sx={{
                                        position: 'relative',
                                        border: '1px solid grey', // Customize border style
                                        backgroundColor: 'transparent',
                                        }}
                                    >
                                        <CardMedia
                                        component="img"
                                        alt={key}
                                        width="100%"
                                        height="100%"
                                        image={imageUrl}
                                        />
                                    </Card>
                                    </Grid>
                                ))}
                                </Grid>      
                        




</Box>  

   



                 
             
 
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupButton;
