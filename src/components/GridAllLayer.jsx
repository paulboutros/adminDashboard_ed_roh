import {useEffect, useState} from "react";

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
  

import { useTheme } from "@mui/material";
 

const ContactGrid = ( { isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


const smallCell =0.1;
//==========================================================================
// pb added to fetch data
const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
useEffect(()=>{
  (async ()=> {

     
  
    const endpoint = `${process.env.REACT_APP_API_URL}getData`;

    const result  = await fetch(endpoint);
    // const result  = await fetch("https://express-to-vercel-main-fawn.vercel.app/getData");
     
   const resultsJson = await result.json();
    
   
   setRowData(resultsJson );
 
   })();

}, [ ]);

useEffect(() => {
   
}, [data]);
 

 


const columns  = [
//  { field: "_id", headerName: "ID", flex: 0.5 },
  {
    field: "wallet",
    headerName: "Wallet",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "allLayerScore",
    headerName: "All Layer Score",
    flex: 0.2,
    cellClassName: "name-column--cell",
    
  } ,
  
  { field: "he01",headerName: "he01",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he02",headerName: "he02",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he03",headerName: "he03",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he04",headerName: "he04",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he05",headerName: "he05",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he06",headerName: "he06",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he07",headerName: "he07",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he08",headerName: "he08",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he09",headerName: "he09",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "he10",headerName: "he10",flex: smallCell,cellClassName: "name-column--cell",} , 

  { field: "we01",headerName: "we01",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we02",headerName: "we02",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we03",headerName: "we03",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we04",headerName: "we04",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we05",headerName: "we05",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we06",headerName: "we06",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we07",headerName: "we07",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we08",headerName: "we08",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we09",headerName: "we09",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "we10",headerName: "we10",flex: smallCell,cellClassName: "name-column--cell",} , 

  { field: "sh01",headerName: "sh01",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh02",headerName: "sh02",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh03",headerName: "sh03",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh04",headerName: "sh04",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh05",headerName: "sh05",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh06",headerName: "sh06",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh07",headerName: "sh07",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh08",headerName: "sh08",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh09",headerName: "sh09",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "sh10",headerName: "sh10",flex: smallCell,cellClassName: "name-column--cell",} , 

  { field: "bo01",headerName: "bo01",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo02",headerName: "bo02",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo03",headerName: "bo03",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo04",headerName: "bo04",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo05",headerName: "bo05",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo06",headerName: "bo06",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo07",headerName: "bo07",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo08",headerName: "bo08",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo09",headerName: "bo09",flex: smallCell,cellClassName: "name-column--cell",} ,
  { field: "bo10",headerName: "bo10",flex: smallCell,cellClassName: "name-column--cell",} , 

    
    
    
    
  


  {
    field: "discord",
    headerName: "Discord",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } 
];
/*
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "discord",
      headerName: "Discord",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];
*/
 
  const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
  const _rowHeight = isDashboard ?  20: 40 ;
  const _headerHeight = isDashboard ?  20: 40 ;
  const _footerHeight = isDashboard ?  20: 40 ;
  return (
    <Box  >
        <Box
        
        Layers Selector
      >

      {data ? (
       <Box m="40px 0 0 0" height= {_height} style={{ width: '101%' }} > 
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

export default ContactGrid;

