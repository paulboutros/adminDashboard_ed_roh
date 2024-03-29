import React from 'react';
import {Box, Divider,Grid,  Paper, Typography , useTheme  } from '@mui/material';
import { tokens } from "../theme";
import CopyToClipboard  from './CopyToClipboard'; // to get user data from context provider

import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider
import { useDropTimeContext } from   '../context/DropTimeContext'; // to get user data from context provider


import {useNotificationContext }   from '../context/NotificationContext.js'; // to get user data from context provider
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useEffect, useState} from "react";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
 
import { formatTimestampToCustomFormat ,  formatMilliseconds} from  "../utils.js"
   

import  CountdownTimer from "./CountdownTimer";
 
 let intervalId;
  const ReferralLinkGrid = (  {col1_title}   ) => {


   let base_referral_link = `${process.env.REACT_APP_URL}?referralCode=`;  // ${one_referral_Code}


    const { notification , setNotification } = useNotificationContext();
    const { user } = useUserContext();
    //const { dropTime } = useDropTimeContext();


  const [referralData, setReferralCode] = useState(); // Set rowData to Array of Objects, one Object per Row
   
  const [TempGiveAway, setTempGiveAway] = useState(); // gieaway recived but not revealed yet, and not added to layers count

  const GetReferralCodeData = async () => {
    
    if (!user){return;}

    const userID =  user.ID;
    const endpoint = `${process.env.REACT_APP_API_URL}GetReferralCode?ID=${userID}`; // make it specific (filter to twitter fields)
     const result = await fetch(endpoint);
     let response = await result.json();
     

   // if              no one has accepted yet
      if (response.referralCode.referredUser.length === 0 ){
      response.referralCode.referredUser=[
        "not accepted yet"
       ]
    }

      setReferralCode(response.referralCode);


      const endpoint_t = `${process.env.REACT_APP_API_URL}GetTempGiveAway?ID=${userID}`; // make it specific (filter to twitter fields)
      const result_t = await fetch(endpoint_t);
      let response_t = await result_t.json();
      
      
      setTempGiveAway(response_t.tempGiveAway );

              

  };  
  

  useEffect( ()=>{
     
    if (!user)return;

    if (col1_title === "App Invite" ){
        GetReferralCodeData();
    }
     

  //   GetRewardNextTime();

  }, [ user  ]);

   
   
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (




        
          <>
   
   { referralData  ? (

            <div> 
                  
                  
                     {/* this first row act as the top header of the grid */}
                       <Row  


                          Comp_discordClipBoard={

                            <Box display="flex" justifyContent="center">
                            <CopyToClipboard copyText={referralData.shareableLink}  backgroundColor={colors.primary[400]}  textColor={colors.greenAccent[400]}
                            />
                           </Box>
                          }

                           Comp1={
  
                           <Box display="flex" justifyContent="center">
                               <CopyToClipboard copyText={referralData.shareableLink}  backgroundColor={colors.primary[400]}  textColor={colors.greenAccent[400]}
                               />
                            </Box>
                    
                          }
 
                       
                          col2={
                            <Box  
                           
                             
                             textAlign="center" // Add this line
                              justifyContent="center" 
                            //  backgroundColor={colors.primary[500]}
                              // backgroundColor={colors.primary[500]}
                             height={30}
                              borderRadius="10%" // Optionally, round the background
                               padding="0px 6px 5px " // to move the icon change here
                               bottom ="5px"
                              margin="5px 60px 0px 60px"
                            >
                            <PersonAddIcon
                            style={{ fontSize: '25px', color:colors.grey[200] }}
                            
                           
                           
                            />
                            </Box> 
                            // "user who accepted"
                        
                        }

                        col3={
                            <Box  
                           
                             
                            textAlign="center" // Add this line
                             justifyContent="center" 
                           //  backgroundColor={colors.primary[500]}
                             // backgroundColor={colors.primary[500]}
                            height={30}
                             borderRadius="10%" // Optionally, round the background
                              padding="0px 6px 5px " // to move the icon change here
                              bottom ="5px"
                             margin="5px 60px 0px 60px"
                           >
                            <DoneOutlineIcon
                            style={{ fontSize: '25px', color:colors.grey[200] }}
                            />
                            </Box>

                         }


                        
                        />


                       {/* this is where the information startf to get display HEADER  */}
                        <Row 
                          
                           Comp_discordHeadertext={ 

                            
                            <Typography variant="body2" align="center">  {"Discord Invite"} </Typography>
                              
                           }

                           Comp2={ 

                            
                            <Typography variant="body2" align="center">  {"App Invite"} </Typography>
                              
                           }

                           CompPrevDrop ={

                            <Typography variant="body2" align="center">
                            Previous give Away
                           </Typography>
                         }

                           
                         
                        
                        col2={
                            <Typography variant="body2" align="center">
                             users who accepted 
                             </Typography>
                            }
                        col3={
                            <Typography variant="body2" align="center">
                            Rewarded Layer
                            </Typography>
                        }

                            
                        />

                        <Grid item xs={12} container direction="column" justifyContent="center" alignItems="center">
                        <Divider orientation="horizontal" style={{ height: "1px", width: '100%' }} />
                        </Grid>

                        {referralData.referredUser.map((data, index) => (
                            <div key={index}>
                                
                                <Row 
                                
                                Comp2={ 
                                 <Typography variant="body2" align="center">  {referralData.code} </Typography>
                                 }
                                
                                 CompPrevDrop ={

                                    <Typography variant="body2" align="center">
                                   
                                   </Typography>
                                 }


                               


                                 col2={
                                  <Typography variant="body2" align="center">
                                  {data}
                                    </Typography>
                                    
                                 }

                                 col3={
                                     
                                    <Box>
                                   {TempGiveAway ? (
                                    TempGiveAway.map((data, index) => (

                                        <Typography variant="body2" align="center" key={index} style={{ display: 'inline-block', marginLeft:"5px"  }} >
                                         {rewardedLayerFullName(data.category, data.layer) }
                                         


                                        </Typography>

                                         ))

                                        ) : (
                                            <div>No Give Away</div>
                                        )}
                                      </Box>
                                 }

                                 
                                 
                                 
                                 />
                        </div>
                        ))}


                      </div>
                 ) : (
                            <p>you have no referral code</p>
                  )}

           </>





           

    );
  };
  
  export default ReferralLinkGrid;
  function rewardedLayerFullName(category , layer ){
     return   category + layer ;

  }


  //construction of the basic row
  const Row = (  {
    Comp_discordClipBoard,Comp_discordHeadertext,
    
    Comp1, Comp2,CompPrevDrop, CompNextDrop,    col2 , col3}    ) => {
    
     
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
 
    return (
 
       
<Box>
 
  
<Grid item container direction="row">


<Grid item xs={1} >
 
 {Comp_discordClipBoard} {/* this is the icon on top of Invite,it is also a link copy/paste button */}
 {Comp_discordHeadertext}  {/*  <CountdownTimer/>   column title */}
 
</Grid>

{/* DIVIDER */}
<Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
 <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
</Grid>
 {/* COLUMN #1 */}
  <Grid item xs={1} >
 
    {Comp1} {/* this is the icon on top of Invite,it is also a link copy/paste button */}
    {Comp2}  {/*  <CountdownTimer/>   column title */}
    
  </Grid>

  {/* DIVIDER */}
  <Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
    <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
  </Grid>


 {/* COLUMN #2 */}
  <Grid item xs={2} >
   
     {col2 } {/* user who accepted all in one bit, should be broken does in bits ofr argument */}
    
  </Grid>

{/* DIVIDER */}
  <Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
    <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
  </Grid>

  {/* COLUMN #3 */}
  <Grid item xs={2} style={{ width: '100px' }}>
    {col3 }
   </Grid>


{/* DIVIDER */}
<Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
 <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
</Grid>
 {/* COLUMN #4 */}
  <Grid item xs={2} style={{ width: '200px' }}>
 
 {Comp1} {/* this is the icon on top of Invite,it is also a link copy/paste button */}
 {CompPrevDrop}  {/*  <CountdownTimer/>   column title */}
 
</Grid>

{/* DIVIDER */}
<Grid item xs={0.2} container direction="row" justifyContent="center" alignItems="center">
 <Divider orientation="vertical" style={{ height: '50%', width: '1px' }} />
</Grid>
 {/* COLUMN #5 */}
  <Grid item xs={3}  >
 
 {/* {Comp1} this is the icon on top of Invite,it is also a link copy/paste button */}
 {/* {CompNextDrop}    <CountdownTimer/>   column title */}
 
</Grid>
 {/* END  */}

</Grid>

 

</Box>



    )

  }


  function PollingComponent(interval, maxIterations, onPoll) {
    let iterations = 0; maxIterations =10;
  
    console.log(  "PollingComponent" );
    const poll = () => {

        console.log(  "    iterations   "  ,iterations  ,"   maxIterations    "   ,maxIterations  );
      if (iterations < maxIterations) {


        console.log(  ">>>   iterations", iterations ," interval"    , interval );
        onPoll(iterations);
        iterations++;
        setTimeout(poll, interval);
      }
    };
  
    poll();
  }
 

 