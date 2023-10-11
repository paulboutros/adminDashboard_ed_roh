import {useEffect, useState} from "react";

import { Box } from "@mui/material";
 //import dotenv from "dotenv";

import ContactGrid from "../../components/GridAllLayer";
import Header from "../../components/Header";
 
 
 
  
//const API_URL = process.env.API_URL;
const Contacts = () => {
 
   



//==========================================================================
// pb added to fetch data
const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
useEffect(()=>{
  (async ()=> {
  
      //const getData_enpPoint = API_URL + "getData";
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
  return (
    <Box m="20px">
      <Header
        title="Layer Board"
        subtitle="Layer owned and Layer score"
      />
     
      {data ? (
      <Box m="40px 0 0 0" height="75vh">
        <ContactGrid/>
        {/* <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}  
        /> */}
      </Box>
    ) : (
      <div>Loading...</div> // You can replace this with a loading spinner or message
    )}


      </Box>
    
  );
};

export default Contacts;
