
import { ethers } from "ethers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";

import {GetContractName} from "../../util/GetMarketContractEventData.js"   
import DataGridHeader from "../DataGridHeader.jsx"


import {  RowChildrenAlignLeft } from "../../components/Layout.jsx"  
  
 




 

import { text1, tokens ,DataGridStyle } from "../../theme";
  
import {  useContract,
    
    
   } from "@thirdweb-dev/react";    
import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
 } from "../../const/addresses.ts";  
   
 
  
   

const Activity = ( { nft ,listingID,  isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   



  const { contract } = useContract(TOOLS_ADDRESS);
  //const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  
  
  const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
 
   
//==========================================================================
// pb added to fetch data
 const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row

useEffect (()=>{

     


     if (!marketplace) return;
   async function fetchData( ) {
      const gridData= await  GetContractName (marketplace , nft, listingID  ,  "activity"   );


 // console.log( "gridData = " , gridData);


      setNewDataList(gridData);
   }
   fetchData();

}, [ marketplace ]);

 

useEffect(() => {
  
}, [nft]);
  
 
const columns = [
  
  
  {
    field: "tokenId",
    headerName: "Token Id",
    flex: 0.5,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "auctionId",
    headerName: "auction Id",
    flex: 0.5,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "listingID",
    headerName: "listing ID",
    flex: 0.5,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "eventName",
    headerName: "eventName",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
   {
      field: "from",   
      headerName: "From",
      flex: 1,
      cellClassName: "name-column--cell",
      
  } ,
  {
    field: "to",   
    headerName: "To",
    flex: 1,
    cellClassName: "name-column--cell",
    
} ,
  {
    field: "price",
    headerName: "Price",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "usdPrice",
    headerName: "USD price",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    cellClassName: "name-column--cell",
    
  } ,

//    {
//       field: "bidder",   
//       headerName: "bidder",
//       flex: 6,
//       cellClassName: "name-column--cell",
      
//     }  
  
     
  
  ];



 
  const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
  const _rowHeight = isDashboard ?  20: 40 ;
  const _headerHeight = isDashboard ?  20: 40 ;
  const _footerHeight = isDashboard ?  20: 40 ;

  if (!newDataList){ 
      return(
       <div>  newDataList undefined</div>
 
       )
   }

  return (
    <Box  >
      
       
      <Box sx={DataGridStyle(theme, colors)} >
        

        {newDataList ? (

      <div> 
         <DataGridHeader  title={"Activity"} /> 
       <Box height= {_height} style={{ width: '100%' }} >  
            {/* m= {` ${grid_gap}  0 0 0 `}  */}

      
      
        <DataGrid
          rows={newDataList}
          columns={columns}
          toolbar={false}  
    
 
          rowHeight={_rowHeight} // Set the row height to 40 pixels
           headerHeight={_headerHeight}   
           footerHeight={_footerHeight}   
          
         
         
        />
       </Box>
       </div>

    ) : (
      <div>Loading...</div> // You can replace this with a loading spinner or message
    )}

    </Box>



   

    </Box>
  );
};

export default Activity;
  
  
 