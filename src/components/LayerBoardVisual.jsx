 
 
 
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
//import {  Avatar, Tooltip } from "@mui/core";


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
 
// pb added to fetch data
//const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

const [userData, setUserData] = useState( );
const [groupedLayers, set_groupedLayers] = useState( );

 
useEffect(()=>{
  (async ()=> {

     
  
    const endpoint = `${process.env.REACT_APP_API_URL}getLayersFull`;

    const result  = await fetch(endpoint);
    // const result  = await fetch("https://express-to-vercel-main-fawn.vercel.app/getData");
     
   const resultsJson = await result.json();
  
    
   setUserData(resultsJson );

   //const groupedLayers = userData.map((user) => {
     const _groupedLayers = resultsJson.map((user) => {
    return {
      id: user.id,
      discord: user.discord,
      wallet: user.wallet,
      layers: Object.keys(user.layers).map((category) => {
        return user.layers[category].map((layerId) => ({
          category: category,
          layerId: layerId,
          imageURL: `${category}/${layerId}.png`,
        }));
      }),
    };
  });
  set_groupedLayers(_groupedLayers);

  console.log(JSON.stringify(_groupedLayers, null, 2));


 
   })();

}, [ ]);

useEffect(() => {
   
}, [userData]);
 


  
 
const debugMode = true; 
const legendItems = [
  { color: colors.blueAccent[400], label: 'Label 1' },
  { color: colors.blueAccent[500], label: 'Label 2' },
  { color: colors.greenAccent[400], label: 'Label 3' },
  { color: colors.greenAccent[500], label: 'Label 4' }
  // Add more legend items as needed
];





const columns = [
//  { field: "_id", headerName: "ID", flex: 0.5 },
/*
{
  field: "Access",
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
 */
  
{
    field: "layers",
  headerName: "Access Level",
  flex: 10,
   // renderCell: (params) => <UserLayers layers={params.value} />,


  
    //  renderCell: ({ row: { layers } }) => {
    renderCell: ( params ) => {
            return (
           <Box   sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%"   >
     
     {/* <Box  display="grid" gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="60px" gap="0">
     
        <Box gridColumn="span 4" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.primary[100] } : {}}   > </Box>
        <Box gridColumn="span 4" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.primary[300] } : {}}   > </Box>
        <Box gridColumn="span 4" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.primary[500] } : {}}   > </Box>
     </Box> */}

        {/* <RenderCell_1 debugMode={debugMode} colors={colors}  />; */}
        
        {/* <Typography >  {"lAAA"} </Typography>
        <Typography >  {params.value.length} </Typography>  */}
       
         
        {params.value[0].length > 0 ? (
  <Grid container spacing={0} className="image-grid"  width= '50%'  >
    {params.value[0].map((item, index) => (
      <Grid item xs={2}  key={index}>
        
        <img
          src={item.imageURL}
          alt={`Layer ${index + 1}`}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Grid>
    ))}
  </Grid>
) : null}

        {/* <UserLayers layers={layers.value}/> */}
     {/* <UserLayers layers={layers.value} /> 
  
     <CustomLegend legendItems={legendItems}   layers={layers.value}     /> */}
       
      </Box>
    );


    
  },
 


},


/*
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
    
  }  ,

  */
 
  {
    field: "discord",
    headerName: "Discord",
    flex: 4,
    cellClassName: "name-column--cell",
    
  } 
 

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

      {userData ? (
       <Box m="40px 0 0 0" height= {_height} style={{ width: '101%' }} > 
        <DataGrid
        //   rows={userData} columns={columns}
         
          rows={groupedLayers} columns={columns}  
          // components={{ Toolbar: GridToolbar }}
          {...(!isDashboard && { components: { Toolbar: GridToolbar } })}
          rowHeight={60}  // Set the row height to 40 pixels {_rowHeight}
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

const RenderCell_1 = ({ debugMode , colors }) => {
     return (
 
        <Box  display="grid" gridTemplateColumns="repeat(3, 1fr)" gridAutoRows="60px" gap="0">
     
        <Box gridColumn="span 4" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.primary[500] } : {}}   > </Box>
        <Box gridColumn="span 2" gridRow="span 1"   style={debugMode ? { backgroundColor: colors.redAccent[300] } : {}}   > </Box>

     <Box  sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%" >

     <img
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
            />
       

     </Box>  
   </Box> 



    )

}

const UserLayers = ({ layers }) => {
    return (
        
         
        <Box>
        {layers.map((item, index) => (
     <Box
       
     >
        
       <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>  {item.imageURL} </Typography>
          <img
              key={index}
              src= {item.imageURL}
              alt={`Layer ${index + 1}`}
              style={{
                // position: 'absolute',
                  top: 0,
                // left: 0,
                 width: '50%',
                 height: '50%',
              }}
            />
       

        
        
    
     </Box>
   ))}
     </Box>
    );
  };




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



const CustomLegend = ({ legendItems  ,layers    }) => (
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

     
     {/* <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>   {item.label} </Typography> */}
    <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>   {layers[0][0].imageURL} </Typography>
  </Box>
))}
  </Box>
);