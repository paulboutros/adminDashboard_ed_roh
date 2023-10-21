 
 
 
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
 


import {useEffect, useState} from "react";

import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Grid from '@mui/material/Grid';

 

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
 

const legendItems = [
  { color: colors.blueAccent[400], label: 'Label 1' },
  { color: colors.blueAccent[500], label: 'Label 2' },
  { color: colors.greenAccent[400], label: 'Label 3' },
  { color: colors.greenAccent[500], label: 'Label 4' }
  // Add more legend items as needed
];




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
    flex: 5,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "data",
    headerName: "Access Level",
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
          // components={{ Toolbar: GridToolbar }}
          {...(!isDashboard && { components: { Toolbar: GridToolbar } })}
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
    justifyContent="flex-start"
    alignItems="center"
    height="100%"
  >
    {/* <Box sx={{ width: data.invite_use * 30 , height: 10, backgroundColor:    colors.greenAccent[600]  }}>

      
    <Typography  display="flex" justifyContent="flex-end" alignItems="center" height="100%"  >
      {data.invite_use}
    </Typography>


    </Box> */}

<Box sx={{ width: data.invite_use * 30, height: 10, backgroundColor: colors.greenAccent[600] }}></Box>
<Box
  sx={{
    width: (data.invite_use + 10) * 30, // Adjust the width difference
    height: 10,
    backgroundColor:   colors.blueAccent[600],
   
    top: 0, // Position it at the same level as the background bar
    left: 10 * 30, // Offset it by the width of the background bar
  }}
></Box>







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

function MyComponent() {
  return (
     <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        {/* Add any component or image you want here */}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {/* Another component or image */}
      </Grid>
      {/* Add more Grid items for other content */}
    </Grid>
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