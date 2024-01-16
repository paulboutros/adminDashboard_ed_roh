import React from 'react';
import {Box, Divider,Grid,  Paper, Typography , useTheme  } from '@mui/material';
import { tokens } from "../theme";
import CopyToClipboard  from './CopyToClipboard'; // to get user data from context provider

import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useDiscordContext } from '../context/DiscordContext.js'; // to get user data from context provider

import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
 import {useEffect, useState} from "react";
   
import  CountdownTimer from "./CountdownTimer";
 
  
  const DiscordBox = (  {col1_title}   ) => {
 

    const { notification , setNotification } = useNotificationContext();
    const { user }    = useUserContext();
    const { discord } = useDiscordContext();
   

  useEffect( ()=>{
     
    if (!discord)return;

     

  }, [ discord  ]);

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
 
        
          <>
   
   { discord ? (

            <div> 
                  
                  
                     {/* this first row act as the top header of the grid */}
                       <Row  


                          Comp_discordClipBoard={

                            <Box display="flex" justifyContent="center">
                            <CopyToClipboard copyText={"discordLink"}  backgroundColor={colors.primary[400]}  textColor={colors.greenAccent[400]}
                            />
                           </Box>
                          }
   
                        />


                       {/* this is where the information startf to get display HEADER  */}
                        <Row 
                          
                           Comp_discordHeadertext={ 

                            
                            <Typography variant="body2" align="center">  {"Discord Invite"} </Typography>
                              
                           }
 
                            
                        />

                        <Grid item xs={12} container direction="column" justifyContent="center" alignItems="center">
                        <Divider orientation="horizontal" style={{ height: "1px", width: '100%' }} />

                        <Row 
                            //  scoreData.discord.invite_code
                           Comp_discordHeadertext={ 
                             
                            
                           <Typography variant="body2" align="center">  {discord.scoreData.discord.invite_use} </Typography>
                              
                           }
 
                            
                        />




                        </Grid>
 

                      </div>
                 ) : (
                            <p>you have no referral code</p>
                  )}

           </>





           

    );
  };
  
  export default DiscordBox;
   


  //construction of the basic row
  const Row = (  {
    Comp_discordClipBoard,Comp_discordHeadertext,
    
    Comp1, Comp2,CompPrevDrop, CompNextDrop,    col2 , col3}    ) => {
    
     
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 
    return (
 
       
<Box>
 
  
<Grid item container direction="row">


<Grid item xs={11} >
 
 {Comp_discordClipBoard} {/* this is the icon on top of Invite,it is also a link copy/paste button */}
 {Comp_discordHeadertext}  {/*  <CountdownTimer/>   column title */}
 
</Grid>

{/* DIVIDER */}
<Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
 <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
</Grid>
  
 
 

</Grid>

 

</Box>



    )

  }

 

 