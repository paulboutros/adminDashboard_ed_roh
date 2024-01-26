

import  React,{ useEffect, useState } from "react";
 import { Divider,  Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
 import {   VerticalSpace } from "../Layout";
  

import { BiCoin } from "react-icons/bi";
import { BiCoinStack } from "react-icons/bi";

 
import { TbExternalLink } from "react-icons/tb";
import { useTheme } from "@emotion/react";
 
import ToDoList from "../List/ToDoList";
import ReferredFriendsList from '../List/ReferredFriendsList.jsx';
import { useDISTContext } from "../../context/DISTstakingContext.js";
 
import { EtherScanLinkBlock } from "../BlockLink/BlockLinks";
import { Discord_tokenLess_stakinContract } from "../../const/addresses";
import { tokens } from "../../theme";

const size1 = "12px";
const pad ="15px";
export function PopRewardDiscordInviteContent(){
 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {DISTStakeInfoGeneral } = useDISTContext();

 return(

    <React.Fragment>
 
       <PopUpTitle title= "$DIST"/>
 
       {/* <Typography padding={pad} fontSize={"15px"}>{"Discord invite staking token"}</Typography>  */}

        <Box padding ={pad}  >
        
        <p style={ {fontSize:size1} } > 
          <span>$DIST</span> <b>{"(Discord Invites)"}</b> are auto-staked for <span>$WU</span> 
        </p> 


        <VerticalSpace space={1} />
          <li> <b>Staking Ratio:</b>{ DISTStakeInfoGeneral?._numerator}  / { DISTStakeInfoGeneral?._denominator}   </li>  
          <li><b>timeUnit:</b> { DISTStakeInfoGeneral?.timeUnit} </li>
          <li> <b>initial Balance:</b> { DISTStakeInfoGeneral?.initialBalance} </li>
        </Box> 

        <Divider orientation="horizontal"  /> 
        <Box padding={pad} fontSize={"10px"} 
         
          display="flex"   flexDirection="row"   alignItems="center" 
        >

           <EtherScanLinkBlock addressArg={ 
            Discord_tokenLess_stakinContract} 
                 _colors={ colors.primary[100] } 
                 _alpha={0.05}
                 
                 toolTipMessage={"Discord Staking Contract"}
                 />  
            {/* <p style={{marginRight: "5px" }}  > <span>See more details</span>  </p> 
        
           <TbExternalLink     size={"15px"} /> */}
        </Box>

      {/* _denominator: parseInt(  ratioInfo._denominator._hex , 16),
_numerator: parseInt(  ratioInfo._numerator._hex , 16),
 timeUnit: parseInt(  timeUnit._hex , 16),
 initialBalance:  InitialbalanceRes */}
         
  </React.Fragment>



 )


}

export function PopRewardServerMemberContent(){

 
  const theme = useTheme();
   

return(

  <React.Fragment>

  <Box padding={pad} display="flex" 
    color={theme.palette.blueSelectedTab}  flexDirection="row"   alignItems="center"  justifyContent="space-between" >   


  <Typography fontSize={"15px"} color="inherit"> $DIST  </Typography>

  <Box 
    display="flex"   flexDirection="row"   alignItems="center" >

     <div style={{ position: "relative", top: "1.5px" }}>

     <BiCoin  size={"15px"}   /> 
     </div>
    <BiCoinStack  size={"15px"} /> </Box>

  </Box> 

     <Divider orientation="horizontal"  />


     {/* <Typography padding={pad} fontSize={"15px"}>{"Discord invite staking token"}</Typography>  */}

      <Box padding ={pad}  >
      
      <p style={ {fontSize:size1} } > 
        <span>$DIST</span> <b>{"(Discord Invites)"}</b> are auto-staked for <span>$WU</span> 
       
       </p> 


      <VerticalSpace space={1} />

       <li>As part of the Discord Member your invites are currently staked and reward you with $WU</li>  

       
      </Box> 

      <Divider orientation="horizontal"  /> 
      <Box padding={pad} fontSize={"10px"} 
       
        display="flex"   flexDirection="row"   alignItems="center" 
      >
         <p style={{marginRight: "5px" }}  > <span>See more details</span>  </p> 
      
         <TbExternalLink     size={"15px"} />
      </Box>

    {/* _denominator: parseInt(  ratioInfo._denominator._hex , 16),
_numerator: parseInt(  ratioInfo._numerator._hex , 16),
timeUnit: parseInt(  timeUnit._hex , 16),
initialBalance:  InitialbalanceRes */}
       
</React.Fragment>



)


}
 

export function PopWuRewardFomInviteStakingContent(){
 
   return(
    <React.Fragment>
       <Box padding={pad} > 
           <p style={ {fontSize:"12px"} } > 
             <span>$WU</span> reward (Unclaimed) from Discord Invite Staking contract <span>$DIST</span>. 
           </p>
       </Box>
    </React.Fragment>


   )
}

// task status: shows a list of invitee (real) and {mock data}
export function PopTaskStatusDiscordInviteContent ( {tasksArg} ){
  

  
  return(
    <React.Fragment>

      <PopUpTitle title= "Referred friends"/>       

     {/* <Typography color="inherit">Referred friends</Typography>
      <Typography fontSize={"15px"}>{ tasksArg[0].global_name }</Typography>  */}

      <Box>  <ReferredFriendsList tasks={tasksArg} /> </Box>    
     </React.Fragment>


  )
}

export function PopTaskStatusLoginContent ( {tasksArg} ){
  

  
    return(
               <React.Fragment>
                   <PopUpTitle title= "Login Tasks"/>
                 {/* <Typography fontSize={"15px"}>{"Link your Wallet to your Discord"}</Typography>  */}
                      <Box >
                         {/* <p style={ {fontSize:size1} } > 
                             <span>Connect</span> your <b>Wallet</b> to your <b>Discord</b>
                        </p>  */}
                        <Box> <ToDoList tasks={tasksArg}/>  </Box>  
                   </Box>   
               </React.Fragment>


    )
}
export function PopAppReferralContent ( {tasksArg} ){
  

  
  return(
    <React.Fragment>
    {/* <Typography color="inherit">Referred friends</Typography>
     <Typography fontSize={"15px"}>{ tasksArg[0].global_name }</Typography>  */}
     <PopUpTitle title= "Referred friends"/>    

     <Box>  <ReferredFriendsList tasks={tasksArg} /> </Box>  
    </React.Fragment>

  )
}

export function PopJoinedServerContent(){

   return(
     <React.Fragment></React.Fragment>

   )
}

export function PopUpTitle( {title}){

  const theme = useTheme();

   return(
       <React.Fragment>
          <Box padding={pad} display="flex" 
              color={theme.palette.blueSelectedTab}  flexDirection="row"   alignItems="center"  justifyContent="space-between" >   


            <Typography fontSize={"15px"} color="inherit"> {title}  </Typography>

            <Box 
              display="flex"   flexDirection="row"   alignItems="center" >

              <div style={{ position: "relative", top: "1.5px" }}>

              <BiCoin  size={"15px"}   /> 
              </div>
              <BiCoinStack  size={"15px"} /> </Box>

            </Box> 

              <Divider orientation="horizontal"  />
            
 

       </React.Fragment>

   )
}