 
 import { globalData   } from "../data/API.js";
 import FavoriteIcon from '@mui/icons-material/Favorite';
 
import StatBox from "./StatBox";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider

import {useEffect, useState} from "react";

import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Grid from '@mui/material/Grid';

const debugMode = true;
const barScaleFactor = 20;
const DiscordGrid = ( { isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


   
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
 
 


/*
const columns = [
  
{
  field: "discord",
  headerName: "Access Level",
  flex: 1,
  renderCell: ({ row: { access } }) => {
    return (
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        backgroundColor={
          access === "admin"
            ? colors.greenAccent[600]
            : access === "manager"
            ? colors.greenAccent[700]
            : colors.greenAccent[700]
        }
        borderRadius="4px"
      >

       <LockOpenOutlinedIcon />
        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
        {access === "manager" && <SecurityOutlinedIcon />}
        {access === "user" && <LockOpenOutlinedIcon />}
        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
          {access}
        </Typography>
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
    field: "invite_use",
    headerName: "Invite Use",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,

  {
    field: "fake_invite",  
    headerName: "Fake Invite",
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

  
   
  {
    field: "discord",
    headerName: "Discord",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } 
 

];
 */



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
      <FavoriteIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        <OneBar data={20} text ={"REWARD PRIZE POOL"}  colors ={ colors.greenAccent[600] } />
         <PoolRewardInfo/> 
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
       <Box m="40px 0 0 0" height= {_height} style={{ width: '101%' }} > 
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

const RenderCellA = ({ debugMode , colors , data }) => {
  return (

     <Box  display="grid" gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="60px" gap="0">
  
     {/* <Box gridColumn="span 4" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.primary[500] } : {}}   > </Box>
     <Box gridColumn="span 2" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.redAccent[300] } : {}}   > </Box> */}

 <Box
    key={0}
    sx={{ marginLeft: '20px' }}
    display="flex"
   
    alignItems="center"
    height="100%"
  >
    

  {/* invite sent */}
     <OneBar data={data.invite_use} text ={"invite used"}  colors ={ colors.greenAccent[600] } />
     <OneBar data={data.invite_sent} text ={"invite sent"}  colors ={ colors.blueAccent[600] }  minus={data.invite_use} />
     
{/* invite sent END */}






    </Box>





  

  {/* <Box  sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%" > */}

  {/* <img
           key={0}
           src= "he/1.png"
           alt={`Layer ${1 + 1}`}
           style={{
             // position: 'absolute',
               top: 0,
             // left: 0,
              width: '30%',
              height: '30%',
           }}
         /> */}
    

  {/* </Box>   */}
</Box> 



 )

}

function OneBar( {data , text,  colors , minus = 0}) {
  return (

    <div> 
      
    <Box
    sx={{  width: (data - minus ) * barScaleFactor,   height: 10,  backgroundColor:   colors,

top: 0, // Position it at the same level as the background bar
left: 30, // Offset it by the width of the background bar
   }}

>

<Typography  display="flex" justifyContent="flex-end" alignItems="center" height="100%"  >
{data <= 3 ? "" : `${text}`}  {data}
</Typography>

</Box>
</div>
  );
}



const CustomLegend = ({ legendItems     }) => (
  <Box>
     {legendItems.map((item, index) => (
  <Box
    key={index}
    sx={{ marginLeft: '20px' }}
    display="flex"
    justifyContent="flex-start"
    alignItems="center"
    height="100%"
  >
    <Box sx={{ width: 15, height: 10, backgroundColor: item.color }}></Box>
    <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>   {item.label} </Typography>
  </Box>
))}
  </Box>
);


function PoolRewardInfo() {

  const { user } = useUserContext();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    
  const [glData, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row
  async function GetData(){


    const resultsJson= await globalData();
        setGlobalData(resultsJson );
  
   }
  
    useEffect(()=>{
       if (!user)return;
      GetData();
    }, [ user ]);

 
  return (
     
    <Box
    display="grid"
    gridTemplateColumns="repeat(12, 1fr)"
    gridAutoRows="60px"
    gap="20px"
  >
    {/* ROW 1 */}
    
    
    <Box
      gridColumn="span 3"
      gridRow="span 2"
      backgroundColor={colors.primary[400]}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <StatBox
       title={glData && glData.length > 0 ? glData[0].all_invites_used : "Default Value"}

        subtitle="total Invite used"
        progress="0.30"
        increase="+5%"
        icon={
          <PersonAddIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    </Box>

     {/* Reward pool begin */}
    <Box
      gridColumn="span 3"
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
            Reward Pool
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
             {/* {glData && glData.length > 0 ?glData[0].all_retweets : "Default Value"} */}
             {glData && glData.length > 0 ? `$${glData[0].reward_pool}` : "Default Value"}
              
          </Typography>
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
            Smart Contract #
          </Typography>
          <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
          >
             {/* {glData && glData.length > 0 ?glData[0].all_retweets : "Default Value"} */}
             {"x0f7875515455545445454 (Mock Data)"  }
              
          </Typography>
        </Box>
        
      </Box>
      <Box height="250px" m="-20px 0 0 0">
        
      </Box>
    </Box>

    
    
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