 
 import { globalData   } from "../data/API.js";
 import FavoriteIcon from '@mui/icons-material/Favorite';
 
import StatBox from "./StatBox";
import StatBoxDiscord from "./StatBoxDiscord";
import CustomLegend from "./Legend"
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider

import {useEffect, useState} from "react";

import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Grid from '@mui/material/Grid';

import ProgressBar from 'react-bootstrap/ProgressBar';

const debugMode = true;
 
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
const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row

useEffect(()=>{
  (async ()=> {
    const endpoint = `${process.env.REACT_APP_API_URL}getSocialData?source=discord&limit=${10}`; // make it specific (filter to discord fields)
    const result  = await fetch(endpoint);
    
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
    const resultsJson = await result.json();
    
    const temp = resultsJson.map((item) => ({

      discord: item.discord,
      id: item.id,
      data: { ...item },
    }));
    temp.sort((a, b) => b.data.invite_use - a.data.invite_use);

      setNewDataList(temp);


   setRowData(resultsJson );
 
   })();

}, [ ]);

useEffect(() => {
  
}, [data]);
  
const columns = [
 
  {
    field: "discord",
    headerName: "Discord",
    flex: 3,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "data",
    headerName: "Invites",
    flex: 15,
    renderCell: (params) => {
      return (
        <Box>
         
        {/* <Typography >  {params.value.id} </Typography>    */}
           
         <RenderCellA debugMode ={true}   colors={colors}  data={params.value}  /> 
  
        
        </Box>
      );
    },
  },
  
  
  
    {
      field: "walletShort",
      headerName: "Wallet",
      flex: 1,
      cellClassName: "name-column--cell" 
      
  
      
    } ,
    {
      field: "invite_code",
      headerName: "Invite Code",
      flex: 1,
      cellClassName: "name-column--cell",
      
    } ,
  
  
     
     
    {
      field: "total",   
      headerName: "Discord Score",
      flex: 1,
      cellClassName: "name-column--cell",
      
    } , 
    {
      field: "scoreShareAbsolute",   
      headerName: "Score share",
      flex: 1,
      cellClassName: "name-column--cell",
      
    }  
  
    
    /*
    {
      field: "discord",
      headerName: "Discord",
      flex: 1,
      cellClassName: "name-column--cell",
      
    } 
  */
  
  ];



 
  const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
  const _rowHeight = isDashboard ?  20: 40 ;
  const _headerHeight = isDashboard ?  20: 40 ;
  const _footerHeight = isDashboard ?  20: 40 ;
  return (
    <Box  >
      
        {/* <OneBar useCursor={true} data={20} text ={"REWARD PRIZE POOL"}  colors ={ colors.greenAccent[600] } /> */}
         <PoolRewardInfo/> 
         {/* <CustomLegend legendItems={legendItems} orientation="horizontal" />     */}
        <Box
        
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
             
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },

          "& .MuiDataGrid-footerContainer": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],  
          //  minHeight :"20px" // default is 52, see chrome element inspector
          },
          // .MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular, , .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolba
          "& .MuiTablePagination-toolbar, .MuiDataGrid-footerContainer": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
            
            minHeight :"10px" // default is 52, see chrome element inspector
          },
          // the area where it is written "row per page"| block 1 page out of X page
          
          "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
            marginBottom :"0px" ,marginTop :"0px"  // these affect pagination bar heights
            //marginBottom :"5px" ,marginTop :"5px"  // these affect pagination bar heights
          },
          // to go to next pagination page
          "& .MuiButtonBase-root ": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
            paddingBottom :"0px" ,paddingTop :"0px"  // initial was 8 (affect pagination bar height)
           
          },
           //  MuiTablePagination-select MuiSelect-standard MuiInputBase-input
           "& .MuiSelect-select": {
            paddingBottom :"0px" ,paddingTop :"0px"  // initial was 8 (affect pagination bar height)
           },
           "& .css-pwwg96": {
            marginTop :"0px"  // initial was 40 (affect distance with title)
           },
           
          
            //MuiButtonBase-root

/*
          MuiToolbar-root 
          MuiToolbar-gutters 
          MuiToolbar-regular 
          MuiTablePagination-toolbar 
          css-bvbdia-MuiTablePagination-root
          css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar
*/
     //MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
     "& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
      //minHeight: `10px !important`,
      // height: `30px !important`
    },
            
           
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
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

function GetLegendColor(  type){    
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    if (type === "message"){

      return colors.grey[500];
    }

     return  null;

}

const RenderCellA = ({ debugMode , colors , data }) => {
  return (

     

   <Box
    
  
  >
       <Box
    // key={0}
    sx={{ marginLeft: '5px' }}
    display="flex"
   
    alignItems="center"
    height="100%"
  
  >
  
     <OneBar data={data.invite_use} text ={"used"}  colors ={ colors.greenAccent[600] } />
     <OneBar data={data.invite_sent} text ={""}  colors ={ colors.blueAccent[600] }  minus={data.invite_use} />
     
     </Box>
  
     <Box  sx={{ marginLeft: '5px' }}>
    
     <OneBar data={data.message} text ={""}  colors ={  GetLegendColor("message")  } />
     </Box>

    </Box>
    
 



 )

}

function OneBar( {data , text,  colors , minus = 0, useCursor = false , barScaleFactor  = 20}) { 
  return (

    <div> 
      
    <Box
    sx={{  width: (data - minus ) * barScaleFactor,   height: 10,  backgroundColor:   colors,

top: 0, // Position it at the same level as the background bar
left: 0, // Offset it by the width of the background bar
   }}

>

<Typography  display="flex" justifyContent="flex-end" alignItems="center" height="100%"  >
{data <= 3 ? "" : `${text}`}  {data}
</Typography>



 
{data > 3 && useCursor ? (

    
            <div
              style={{
                position: 'relative',
                top: -25,
                
                left: (data - minus ) * barScaleFactor     - 10,
                width: 10,
                height: 10,
                // backgroundColor: 'red',
              }}
            >
                 
                {/* <FavoriteIcon   sx={{ color:  colors, fontSize: "26px" }} /> */}
                <FavoriteIcon   sx={{ color:  colors, fontSize: "15px" }} /> 
          





              {/* You can place an icon or text here */}
            </div>
          ) : null}
  


</Box>
</div>
  );
}


 


function PoolRewardInfo() {

  
  
  
   


  const { user } = useUserContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const legendItems = [ 
    { color:  GetLegendColor("message") , label:  'messages' },
    
   { color: colors.blueAccent[500], label: 'sent Invites' },
   { color: colors.greenAccent[400], label: 'Used Invites' } 
   
   // Add more legend items as needed
 ];
  const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row
  async function GetData(){


    const resultsJson= await globalData();
        setGlobalData(resultsJson );
  
   }
  
    useEffect(()=>{
       //if (!user)return;
      GetData();
    }, [   ]);

 
  return (
     
    <Box
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="60px"
    gap= {grid_gap}  
  >
    {/* ROW 1 */}
    
    
    <Box
      gridColumn="span 4"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBoxDiscord
       title={glData && glData.length > 0 ? glData[0].all_invites_used : "Default Value"}

        subtitle="total Invite used"
        progress="0.30"
        increase="+5%"
        icon={
          <PersonAddIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
        discordLegend ={

          <CustomLegend legendItems={legendItems}   />    
        }
      />
    </Box>

     {/* Reward pool begin */}
    <Box
      gridColumn="span 2"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
    >
      <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography   variant="h5"  fontWeight="600"  color={colors.grey[100]}  >
          
            Reward Pool
          </Typography>
          <Typography  variant="h3"  fontWeight="bold"  color={colors.greenAccent[500]}  >

           $1000    
           {/* {glData && glData.length > 0 ? `$${glData[0].reward_pool}` : "Default Value"} */}
             
          </Typography>
           
      {/* box just for space */}
          <Box height="5px" /> 

 

          {/* <Box sx={ box_horiz_align  } >
            
         
          <Box   sx={ box_vertical_align }  >
              
              <Typography variant="h5"  >
              1st
              </Typography>
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              $500         
              </Typography>

         </Box>

         <Box   sx={ box_vertical_align }  >
              
              <Typography variant="h5"  >
              1st
              </Typography>
              <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
              $500
              </Typography>
              
         </Box>

          
 
          </Box> */}
  

        </Box>
        
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        
      </Box>
    </Box>
  {/* Reward pool End */}
   


      
     {/* Smart contract number */}
    <Box
      gridColumn="span 6"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
    >
      <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
            Smart Contract # (Mock Data)
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
             {/* {glData && glData.length > 0 ?glData[0].all_retweets : "Default Value"} */}
             {"0x4eba90B4124DA7240C7Cd36A9EFE7Ff9F81Cf601"  }
              
          </Typography>
        </Box>
        
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        
      </Box>
    </Box>

     {/* legend */}
     {/* <Box
      gridColumn="span 12"
      gridRow="span 0.5"
      backgroundColor={colors.primary[400]}
    >
      <Box
        mt="25px"
        p="0 30px"
        display="flex "
        justifyContent="space-between"
        alignItems="center"
      >

       
        <Box sx={ box_horiz_align  }>
          <Typography    
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
          >
          
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
            
             <CustomLegend legendItems={legendItems} orientation="horizontal" />    
              
          </Typography>
        </Box>
        
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        
      </Box>
    </Box> */}
    
  </Box>


  );
}




const RewardBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          {/* <ProgressCircle progress={progress} /> */}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};


function StackedExample() {
  return (
    <ProgressBar>
      <ProgressBar striped variant="success" now={35} key={1} />
      <ProgressBar variant="warning" now={20} key={2} />
      <ProgressBar striped variant="danger" now={10} key={3} />
    </ProgressBar>
  );
}