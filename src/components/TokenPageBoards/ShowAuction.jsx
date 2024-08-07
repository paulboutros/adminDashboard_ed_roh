 
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";
import {  text2, tokens, DataGridStyle } from "../../theme";
 
import {GetContractName} from "../../util/GetMarketContractEventData.js"   

import {  useContract, useContractEvents} from "@thirdweb-dev/react";  
import DataGridHeader from "../DataGridHeader.jsx"

  //=======
import   ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useContext } from "react";

 //const { selectedChain, setSelectedChain } = useContext(ChainContext);
 //addressesByNetWork[selectedChain].LAYER_ADDRESS
 //======= 
      
  

const ShowAuction = ( { nft , auctionId, listingId, title, isDashboard = false }  ) => {

  const { selectedChain } = useContext(ChainContext);




  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  const gridtext  = text2.color;
  const gridFont  = text2.fontSize;
 // const _height = isDashboard ? 220: 340 ;//  "25vh": "75vh" ;
 const _rowHeight = isDashboard ?  20: 40 ;
 const _headerHeight = isDashboard ?  20: 40 ;
 const _footerHeight = isDashboard ?  20: 40 ;
//const maxRowsPerPage = 5;          
  
  const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
        
             const { data: transferEvents, isLoading: loadingTransferEvents } =
           
             useContractEvents(marketplace, "NewBid", {
          //   useContractEvents(nftCollection, "Transfer", {
                 queryFilter: {
                 filters: {
                     tokenId: nft?.metadata.id,
                 },
                 order: "desc",
                 },
             });   

  
//==========================================================================
// pb added to fetch data
// const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row
const [_height, setHeight] = useState(300);

useEffect (()=>{


     if (!transferEvents) return;
(async ()=> {
  

  let gridData;  
    if (auctionId){
       gridData= await  GetContractName (marketplace ,  nft,auctionId, listingId,"auction" );//auctionId

       setHeight( gridData.length * _rowHeight   + _headerHeight + _rowHeight );
       


    }
    if (listingId){
      gridData= await  GetContractName (marketplace ,  nft, auctionId, listingId,"listing" );//auctionId

      const maxRows =5;
      setHeight( maxRows * _rowHeight  + _headerHeight + _rowHeight  );
   }  

   setNewDataList(gridData);

     
})();
  

}, [ transferEvents , auctionId]);
 

useEffect(() => {
  
}, [nft]);
  
   
let columns;

if (auctionId){
  columns = [
 
    {
      field: "auctionId",
      headerName: "auction Id",
      flex: 0.5,
      cellClassName: "name-column--cell",
       
    } ,
    {
      field: "tokenId",
      headerName: "token Id",
      flex: 1,
      cellClassName: "name-column--cell",
       
    } ,
    {
      field: "eventName",
      headerName: "eventName",
      flex: 1,
      cellClassName: "name-column--cell",
       
    } ,
      
    {
      field: "price",
      headerName: "ethValue",
      flex: 1,
      cellClassName: "name-column--cell",
      
    } ,
    {
        field: "usdPrice",   
        headerName: "USDPrice",
        flex: 1,
        cellClassName: "name-column--cell",
        
    } , 
     {
        field: "from",   
        headerName: "bidder",
        flex:1,
        cellClassName: "name-column--cell",
        
      } ,
      {
       // field: "expiration",   
       // headerName: "Expiration",
       field: "date",   
       headerName: "Date",
        flex: 1,
        renderCell: (params) => {
          return (
            <Box>
              <Typography fontSize={colors.grey[gridFont]} color={colors.grey[gridtext]} >{params.value}</Typography>
             </Box>
          );
        },
        
      }   
    
       
    
    ];
}
// for auction
if (listingId){
  columns = [
 
    {
      field: "listingID",
      headerName: "listing Id",
      flex: 0.5,
      cellClassName: "name-column--cell",
       
    } ,
    {
      field: "tokenId",
      headerName: "token Id",
      flex: 1,
      cellClassName: "name-column--cell",
       
    } ,
    {
      field: "eventName",
      headerName: "eventName",
      flex: 1,
      cellClassName: "name-column--cell",
       
    } ,
      
    {
      field: "price",
      headerName: "ethValue",
      flex: 1,
      cellClassName: "name-column--cell",
      
    } ,
    {
        field: "usdPrice",   
        headerName: "USDPrice",
        flex: 1,
        cellClassName: "name-column--cell",
        
    } , 
     {
        field: "from",   
        headerName: "from",
        flex:1,
        cellClassName: "name-column--cell",
        
      } ,
      {
       // field: "expiration",   
       // headerName: "Expiration",
       field: "date",   
       headerName: "Date",
        flex: 1,
        renderCell: (params) => {
          return (
            <Box>
              <Typography fontSize={colors.grey[gridFont]} color={colors.grey[gridtext]} >{params.value}</Typography>
             </Box>
          );
        },
        
      }   
    
       
    
    ];
}



 
 

  if (!newDataList){ 
      return(
       <div>  newDataList undefined</div>
 
       )
   }

   
  return (
    <Box  >
      
      
        <Box  sx={DataGridStyle(theme, colors)} >
        
      
        {/* height= {_height} */}
      {newDataList ? (
 
         <div>

        <DataGridHeader  title={title} /> 
         <Box    height= {_height} style={{ width: '100%' }}  >
       
         
        <DataGrid
          rows={newDataList}
          columns={columns}
          toolbar={false}  
    

          // components={{ Toolbar: GridToolbar }}
          // {...(!isDashboard && { components: { Toolbar: GridToolbar } })}
          rowHeight={_rowHeight} // Set the row height to 40 pixels
           headerHeight={_headerHeight}   
           footerHeight={_footerHeight}  
         //  autoHeight

         //  pageSize={maxRowsPerPage}
            pagination
 
         
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

export default ShowAuction;

 
 