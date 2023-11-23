 
import { tokens } from "../../theme";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
 
import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
import { Box, Grid, Divider,  Typography, useTheme } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";


import DiscordDataBox from "../../components/DiscordDataBox";
import AppLinkDataBox from "../../components/AppLinkDataBox";



import ReferralLinkGrid from "../../components/ReferralLinkGrid";
import Header from "../../components/Header";
 
// import N FT Gri d from "../../components/N FT Gr id";  
 
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
 import JoinIncentive from "../../components/JoinIncentive";
import {useEffect, useState} from "react";
import  CountdownTimer from "../../components/CountdownTimer";

const Profile =  () => {

  const { user } = useUserContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    
  const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row

 async function GetData(){

 

 }

  useEffect(()=>{
     if (!user)return;
    GetData();
  }, [ user ]);
   

  return (
    <div>
      {user ? ( 
    // maxHeight should be  100 - the height of the top bar
    <Box m="20px" maxHeight="calc(88vh)" overflow="auto" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Get Layers" subtitle="Wulirocks Reward Program" />

       
      </Box>

       
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
       

      <GetLayersByAppInvite
        title={"Get Free Layers"} 
        benefits1 ={"Get 1 layer for each accepted Invite"}
        />
      <GetLayersByAppInvite 
       title = {"Join the server on Server"}  
       benefits1 = {"Recieve 1 new layer"} 
       />
      <GetLayersByAppInvite 
       title   = {"Invite 2 friends on Server"} 
       benefits1 = {"Recieve 1 new layer every week"} 
       />
{/* 
      <GetLayersByAppInvite  title={"How to claim"}  /> */}
        
        <DiscordDataBlock  col={"span 1.5"}  row={"span 1"} />
        <AppLinkDataBlock  col={"span 1.5"}  row={"span 1"} />

        

        <AppReferralBlock  col={"span 9"}  row={"span 1"} />
        

        <BigTimer 
          title   = {"Next Drop"} 
      // benefits1 = {"Recieve 1 new layer every week"} 
       />
        
        <Box
          gridColumn="span 12"  gridRow="span 6"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Layer Board
          </Typography>
           
            {/* <NF TG rid  
           
              queryId= {`&ID=${user.ID}`}
             sx={{ marginBottom: "15px" }} 
             /> */}
           
        </Box>

      </Box> 

      
    </Box>

      ) : (
        <div>
           <JoinIncentive/>
        
        </div>
      )}
</div>

  );
};

export default Profile;



function BigTimer ( {title}){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  

     return(

      <Box
      gridColumn="span 3"
      gridRow="span 1"
      backgroundColor={colors.primary[400]}
      p="30px"
    >
      <Typography variant="h5" fontWeight="600">
       {title} 
      </Typography>
       <Box
  
   >

    
        <Typography variant="h2" fontWeight="500" color={colors.grey[300]} >
        {/* <span style={{ marginRight: '8px' }}>&#8226;</span> */}
        <CountdownTimer   />   
            
        </Typography>
        
        <Typography variant="h6" fontWeight="100" color={colors.grey[200]} >
        <span style={{ marginRight: '8px' }}>&#8226;</span>
         <EmojiEventsOutlinedIcon 
           // style= {{ transform: 'rotate(180deg)' }} 
            sx={{ position: 'relative', top: '8px', left: '5px',  height :"25px"}}
        />
        </Typography>
  
    </Box>


    <Box
      color={colors.grey[400]}
      display="flex"
      flexDirection="column"
      alignItems="flex-end" // Align items to the right (horizontal alignment)
      justifyContent="flex-end" // Align items to the bottom (vertical alignment)
      sx={{ position: 'relative', bottom: '10px', left: '20px' }}
    >
     <HelpOutlineOutlinedIcon />
   </Box>  
     


 </Box>
   


     )
}

function GetLayersByAppInvite( { title="No title" , benefits1}){

    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
     
    return (
        <Box
        gridColumn="span 3"
        gridRow="span 1"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h5" fontWeight="600">
         {title} 
        </Typography>
         <Box
    
     >

     
          <Typography variant="h6" fontWeight="100" color={colors.grey[200]} >
          <span style={{ marginRight: '8px' }}>&#8226;</span>
            Copy and Share the invite <ArrowCircleUpIcon 
              style= {{ transform: 'rotate(90deg)' }} 
              sx={{ position: 'relative', top: '8px', left: '5px',  height :"25px"}}
          />
              
          </Typography>
          
          <Typography variant="h6" fontWeight="100" color={colors.grey[200]} >
          <span style={{ marginRight: '8px' }}>&#8226;</span>
          {benefits1} <EmojiEventsOutlinedIcon 
             // style= {{ transform: 'rotate(180deg)' }} 
              sx={{ position: 'relative', top: '8px', left: '5px',  height :"25px"}}
          />
          </Typography>
    
      </Box>


      <Box
        color={colors.grey[400]}
        display="flex"
        flexDirection="column"
        alignItems="flex-end" // Align items to the right (horizontal alignment)
        justifyContent="flex-end" // Align items to the bottom (vertical alignment)
        sx={{ position: 'relative', top: '0px', left: '20px' }}
      >
       <HelpOutlineOutlinedIcon />
     </Box>  
       


   </Box>
    )
  }

   
// a component that fetches and display the current user referral code if it exist
function AppReferralBlock( {col, row}  ) {
    

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
 
  return (
       

 <Box
gridColumn={col}
gridRow={row}
backgroundColor={colors.primary[400]}
p={5} // padding around the grid
>
         
     <ReferralLinkGrid col1_title={"App Invite"}  />  
                  
              
    
</Box>
  
 
      
  );
}
function DiscordDataBlock( {col, row}  ) {
    

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
 
  return (
       

 <Box
gridColumn={col}
gridRow={row}
backgroundColor={colors.primary[400]}
p={5} // padding around the grid
>
         
<DiscordDataBox col1_title={"App Invite"}  />  
                  {/* <ReferralLinkGrid col1_title={"App Invite"}  />   */}
              
    
</Box>
  
 
      
  );
}

function AppLinkDataBlock( {col, row}  ) {
    

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
 
  return (
       

 <Box
gridColumn={col}
gridRow={row}
backgroundColor={colors.primary[400]}
p={5} // padding around the grid
>
         
    <AppLinkDataBox/>  
                  
              
    
</Box>
  
 
      
  );
}

 