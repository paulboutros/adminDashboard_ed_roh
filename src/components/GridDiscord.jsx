 
 import { getAvatar, getManyUserData, globalData   } from "../data/API.js";
 import FavoriteIcon from '@mui/icons-material/Favorite';
 
import StatBox from "./StatBox";
import StatBoxDiscord from "./StatBoxDiscord";
import CustomLegend from "./Legend"
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider

import {useEffect, useState} from "react";

import { Avatar, Box , Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataGridStyle, tokens } from "../theme";
import Grid from '@mui/material/Grid';

import ProgressBar from 'react-bootstrap/ProgressBar';
let totalInvite=0;
  
const grid_gap ="20px";

const box_horiz_align =

{display: 'flex', 
  justifyContent: 'flex-start',
   alignItems: 'center',
    height: '100%',
    
  }
  const box_vertical_align = {
    display: 'flex', // Create a flex container
    flexDirection: 'column', // Stack child elements vertically
  };



const DiscordGrid = ( { isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const legendItems = [
    { color: colors.blueAccent[400], label: 'Label 1' },
    { color: colors.blueAccent[500], label: 'Label 2' },
    { color: colors.greenAccent[400], label: 'Label 3' },
    { color: colors.greenAccent[500], label: 'Label 4' }
    // Add more legend items as needed
  ];
   
//==========================================================================
// pb added to fetch data
//const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row
/*
useEffect(()=>{
  (async ()=> {
    
    const endpoint = `${process.env.REACT_APP_API_URL}getDiscordScore`;  //getDiscordScore
     const result  = await fetch(endpoint);
    //========
    let resultsJson = await result.json();
 
    console.log(  "resultsJson"  ,resultsJson);
 
     const listOfID = resultsJson.map(item => item.id);
     let referredUserListDetails  = await getManyUserData(  listOfID   );
  
    const useMockData = true;
 
    const invite_use =[];
     let ss = resultsJson.map((item, index ) => {

      const invite_use_value = useMockData ? Math.floor(Math.random() * 21)  : item.data.invite_use;
      invite_use.push(invite_use_value)  ;
      totalInvite += invite_use_value;
     });


    let temp = resultsJson.map((item, index ) =>  {

     // const invite_use = useMockData ? Math.floor(Math.random() * 31)  : item.data.invite_use;
     const invite_share = ( (invite_use[index] / totalInvite) * 100 ).toFixed(4);

     const nextInviteMaxThreshhold =  invite_use[index]<=10 ? 10 : 20
      return {
      discord: item.discord,
      invite_code : item.invite_code,

      id: item.id,
      data: { ...item,
      
        invite_use:invite_use[index],
        invite_share:invite_share,
        nextInviteMaxThreshhold: nextInviteMaxThreshhold

      },  //... spreading it just for creating a shallow copy (Not reference)
      discordUserData:  referredUserListDetails[index].discordUserData ,
      invite_share: invite_share,
      tokenClaimPerDay:  invite_use[index]<=10 ? 100 : 200
     
      };


    } );
  
//===========================
    temp.sort((a, b) => b.data.invite_use - a.data.invite_use);
  
      setNewDataList(temp);
      
  
 
   })();

}, [ ]);
*/


useEffect(()=>{
  (async ()=> {
    
    const endpoint = `${process.env.REACT_APP_API_URL}getDiscordScore`;  //getDiscordScore MOCK
     const result  = await fetch(endpoint);
   
    let resultsJson = await result.json();
 
     

   console.log(  " resultsJson   = "   ,resultsJson );


 
     const listOfID = resultsJson.map(item => item.id);
     let referredUserListDetails  = await getManyUserData(  listOfID   );

    let temp = resultsJson.map((item, index ) =>  {
      return {
        ...item, //  this part is more related to invites numbers and score

        discordUserData: referredUserListDetails[index].discordUserData, // this is use to access avatar and maybe more later about discord user
      } 
     });
  
//===========================
    temp.sort((a, b) => b.data.invite_use - a.data.invite_use);
  
      setNewDataList(temp);
      
      console.log(  "temp"  ,temp);
 
   })();

}, [ ]);




const columns = [
 
  {
    field: "discordUserData", //(params.value)
    headerName: "Discord",
    flex: 2,
   
    width: 200,
    renderCell: (params) => { // (params.value   = field )
       
      return (
        <>
      
          <Avatar  src= { getAvatar( params.value ) } />  
          <p> {params.value.username}  </p>
         
        </>
      );
    }
     
  } ,
    
  {
    field: "invite_code",
    headerName: "Invite Code",
    flex: 2,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "data", // stores from items (params.value)
    headerName: "Invites",
    flex: 2,
    renderCell: (params) => {
      return (
        <Box>
             <p> { params.value.invite_use}  </p>    
   
        </Box>
      );
    },
  } 
  
  ];






 
  /*  //  use this for mock data ...
   const columns = [
 
  {
    field: "discordUserData", //(params.value)
    headerName: "Discord",
    flex: 2,
   
    width: 200,
    renderCell: (params) => { // (params.value   = field )
       
      return (
        <>
           <Avatar  src= { getAvatar( params.value ) } />  
          <p> {params.value.username}  </p>
         
        </>
      );
    }
     
  } ,
    
  {
    field: "invite_code",
    headerName: "Invite Code",
    flex: 2,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "data", // stores from items (params.value)
    headerName: "Invites",
    flex: 2,
    renderCell: (params) => {
      return (
        <Box>
           
            <p> { params.value.invite_use}  /   {  params.value.nextInviteMaxThreshhold }  </p>    
 
           <HorizontalBars  invite_use={ params.value.invite_use } />
         
        </Box>
      );
    },
  },
  {
    field:  "tokenClaimPerDay", // "invite_share", // stores from items (params.value)
    headerName: "TKN per day",
    flex: 2,
    renderCell: (params) => {
      return (
        <Box>
         
        <p> { params.value }   </p> 
         
        </Box>
      );
    },
  } 
  
  ];
*/


 
  const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
  const _rowHeight = isDashboard ?  20: 40 ;
  const _headerHeight = isDashboard ?  20: 40 ;
  const _footerHeight = isDashboard ?  20: 40 ;
  return (
   

    <Box  >
      
        {/* <OneBar useCursor={true} data={20} text ={"REWARD PRIZE POOL"}  colors ={ colors.greenAccent[600] } /> */}
         {/* <PoolRewardInfo/>  */}
         {/* <CustomLegend legendItems={legendItems} orientation="horizontal" />     */}
        <Box
        
         sx={DataGridStyle(theme, colors)}
      >

      {newDataList ? (
       <Box m= {` ${grid_gap}  0 0 0 `} height= {_height} style={{ width: '101%' }} > 
        <DataGrid
          rows={newDataList}
          columns={columns}
          toolbar={false}  
    

          // components={{ Toolbar: GridToolbar }}
          // {...(!isDashboard && { components: { Toolbar: GridToolbar } })}
          rowHeight={_rowHeight} // Set the row height to 40 pixels
           headerHeight={_headerHeight}   
           footerHeight={_footerHeight}   
          
         
         
        />
       </Box>
    ) : (
      <div>Loading...</div> // You can replace this with a loading spinner or message
    )}

    </Box>



   

    </Box>
  );
};

export default DiscordGrid;

// function GetLegendColor(  type){    
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//     if (type === "message"){

//       return colors.grey[500];
//     }

//      return  null;

// }

 

const HorizontalBars = ( { invite_use }) => {

  const _width= '100px';
  const _height = "10px";
  const containerStyle = {
    position: 'relative',
    height: _height,
    width: '100px',
  };

  const barStyle = {
    height: _height,
    width: _width ,
    backgroundColor: "#2a2a2a",
    position: 'absolute',
    top: '0',
    left: '0',
  };

  const overlappingBarStyle = {
    height: _height,
   // width:  `${invite_use}px`  , //{ invite_use }    '100px' ,
   width:  `${(invite_use / 100) * 10 * 100}px`,

    position: 'absolute',
    top: '0',
    left: '0',
    backgroundColor: 'blue',
     
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle}></div>
      <div style={overlappingBarStyle}></div>
    </div>
  );
};
 
 

// function PoolRewardInfo() {
 
//   const { user } = useUserContext();

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   const legendItems = [ 
//     { color:  GetLegendColor("message") , label:  'messages' },
    
//    { color: colors.blueAccent[500], label: 'sent Invites' },
//    { color: colors.greenAccent[400], label: 'Used Invites' } 
   
//    // Add more legend items as needed
//  ];
//   const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row
//   async function GetData(){


//     const resultsJson= await globalData();
//         setGlobalData(resultsJson );
  
//    }
  
//     useEffect(()=>{
//        //if (!user)return;
//       GetData();
//     }, [   ]);

 
//   return (
     
//     <Box
//     display="grid"
//     gridTemplateColumns="repeat(12, 1fr)"
//     gridAutoRows="60px"
//     gap= {grid_gap}  
//   >
//     {/* ROW 1 */}
    
    
//     <Box
//       gridColumn="span 4"
//       gridRow="span 2"
//       backgroundColor={colors.primary[400]}
//       display="flex"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <StatBoxDiscord
//        title={glData && glData.length > 0 ? glData[0].all_invites_used : "Default Value"}

//         subtitle="total Invite used"
//         progress="0.30"
//         increase="+5%"
//         icon={
//           <PersonAddIcon
//             sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
//           />
//         }
//         discordLegend ={

//           <CustomLegend legendItems={legendItems}   />    
//         }
//       />
//     </Box>

//      {/* Reward pool begin */}
//     <Box
//       gridColumn="span 2"
//       gridRow="span 2"
//       backgroundColor={colors.primary[400]}
//     >
//       <Box
//         mt="25px"
//         p="0 30px"
//         display="flex "
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box>
//           <Typography   variant="h5"  fontWeight="600"  color={colors.grey[100]}  >
          
//             Reward Pool
//           </Typography>
//           <Typography  variant="h3"  fontWeight="bold"  color={colors.greenAccent[500]}  >

//            $1000    
//            {/* {glData && glData.length > 0 ? `$${glData[0].reward_pool}` : "Default Value"} */}
             
//           </Typography>
           
//       {/* box just for space */}
//           <Box height="5px" /> 
 

//         </Box>
        
//       </Box>
//       <Box height="250px" m="-20px 0 0 0">
        
//       </Box>
//     </Box>
//   {/* Reward pool End */}
   


      
//      {/* Smart contract number */}
//     <Box
//       gridColumn="span 6"
//       gridRow="span 2"
//       backgroundColor={colors.primary[400]}
//     >
//       <Box
//         mt="25px"
//         p="0 30px"
//         display="flex "
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         <Box>
//           <Typography
//             variant="h5"
//             fontWeight="600"
//             color={colors.grey[100]}
//           >
//           Smart Contract # (Mock Data)
//           </Typography>
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             color={colors.greenAccent[500]}
//           >
//              {/* {glData && glData.length > 0 ?glData[0].all_retweets : "Default Value"} */}
//              {"0x4eba90B4124DA7240C7Cd36A9EFE7Ff9F81Cf601"  }
              
//           </Typography>
//         </Box>
        
//       </Box>
//       <Box height="250px" m="-20px 0 0 0">
        
//       </Box>
//     </Box>
 
//   </Box>


//   );
// }

 