import {useEffect, useState} from "react";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
  //import dotenv from "dotenv";

import { useTheme } from "@mui/material";
//dotenv.config();
//const API_URL = process.env.API_URL;
const GridTwitter = ( { isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


   
//==========================================================================
// pb added to fetch data
const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
useEffect(()=>{
  (async ()=> {
    //const getData_enpPoint = API_URL + "getData";
    //const result  = await fetch("/api/getData");
    const result  = await fetch("https://express-to-vercel-main-fawn.vercel.app/getData");
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
   const resultsJson = await result.json();
    
   
   setRowData(resultsJson );
console.log( "data   = "  + data);
   })();

}, [ ]);

useEffect(() => {
  console.log("data =", data); // This will log the updated value of data
}, [data]);
 






const columns = [
//  { field: "_id", headerName: "ID", flex: 0.5 },
  {   // twitter_like:0, twitter_retweet:0, twitterScore:0,
    field: "wallet",
    headerName: "Wallet",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "twitter_like",
    headerName: "likes",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "twitter_retweet",
    headerName: "retweets",  // we could fetch impression per retweet
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
    field: "twitterScore",   
    headerName: "Twitter Score",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } , 
  
  {
    field: "discord",
    headerName: "Discord",
    flex: 1,
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
           
          
          
     "& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular.css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
      
    },
            
           
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >

      {data ? (
       <Box m="40px 0 0 0" height= {_height} > 
        <DataGrid
          rows={data}
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

export default GridTwitter;
