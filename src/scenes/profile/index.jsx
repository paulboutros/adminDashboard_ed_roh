 
import { tokens } from "../../theme";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
 
import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
import { Box, Grid, Divider,  Typography, useTheme } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import ReferralLinkGrid from "../../components/ReferralLinkGrid";
import Header from "../../components/Header";
 
import GridImage from "../../components/GridImage";  
 
import ReferrerComponent from "../../components/ReferrerComponent"
import JoinIncentive from "../../components/JoinIncentive";
 import {useEffect, useState} from "react";
 

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
        <Header title="Profile" subtitle="Here you can see all the layers you own" />

       
      </Box>

       
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
       

      {/* ROW 3 */}
      <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
        >

           <Typography variant="h5" fontWeight="600">
           How To Get Layers?
          </Typography>

          <Box>
        
      
    
      
      <Typography variant="h6" fontWeight="100" color={colors.grey[200]} >
      <span style={{ marginRight: '8px' }}>&#8226;</span>
       Copy and Share the invite <ArrowCircleUpIcon 
         style= {{ transform: 'rotate(90deg)' }} 
         sx={{ position: 'relative', top: '8px', left: '5px',  height :"25px"}}
       />
         
      </Typography>
      
      <Typography variant="h6" fontWeight="100" color={colors.grey[200]} >
      <span style={{ marginRight: '8px' }}>&#8226;</span>
       Get 1 layer for each accepted Invite <ArrowCircleUpIcon 
         style= {{ transform: 'rotate(180deg)' }} 
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
 
      
    
        <ReferralInfoBlock  col={"span 8"}  row={"span 1"} />
 

        <Box
          gridColumn="span 12"  gridRow="span 6"  backgroundColor={colors.primary[400]}  padding="30px"
         >
          <Typography  variant="h5" fontWeight="600" sx={{ marginBottom: "0px" }} >
           Layer Board
          </Typography>
           
            <GridImage  
           
              queryId= {`&ID=${user.ID}`}
             sx={{ marginBottom: "15px" }} 
             />
           
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



// a component that fetches and display the current user referral code if it exist
function ReferralInfoBlock( {col, row}  ) {
    

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  return (
       

//ReferralLinkGrid
<Box
gridColumn={col}
gridRow={row}
backgroundColor={colors.primary[400]}
p={5} // padding around the grid
>
         
            
                  <ReferralLinkGrid  DealType={"appInvite"}  />  
              
             
           
         

    
</Box>
  
 
      
  );
}
 


 

 