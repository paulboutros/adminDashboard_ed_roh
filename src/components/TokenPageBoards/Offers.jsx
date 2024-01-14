import { convertEthToUsd } from "../../data/API.js";
import { ethers } from "ethers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";
import { text1, tokens, DataGridStyle } from "../../theme";
 import DataGridHeader from "../DataGridHeader.jsx"

import {   useContract,
    
     useContractEvents 
    
   } from "@thirdweb-dev/react";    
import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
 } from "../../const/addresses.ts";  
   
 
  
const grid_gap ="20px";
  

const Offers = ( { nft , isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   



  const { contract } = useContract(TOOLS_ADDRESS);
 // const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  
  
  const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 

       //    const { contract: nftCollection } = useContract(TOOLS_ADDRESS);
             // Load historical transfer events: TODO - more event types like sale
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
 const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row

useEffect (()=>{


     if (!transferEvents) return;
(async ()=> {
     // const gridData= await  GetContractName (marketplace , transferEvents);
     // setNewDataList(gridData);
})();
  

}, [ transferEvents ]);
 

useEffect(() => {
  
}, [nft]);
  

/*
            eventName: eventName, 
            ethValue: ethValue,
            USDPrice: USDPrice,
            bidder:bidder
 
*/
const columns = [
 
  {
    field: "eventName",
    headerName: "eventName",
    flex: 2,
    cellClassName: "name-column--cell",
    
  } ,
    
  {
    field: "ethValue",
    headerName: "ethValue",
    flex: 2,
    cellClassName: "name-column--cell",
    
  } ,
  {
      field: "USDPrice",   
      headerName: "USDPrice",
      flex: 2,
      cellClassName: "name-column--cell",
      
  } , 
   {
      field: "bidder",   
      headerName: "bidder",
      flex: 6,
      cellClassName: "name-column--cell",
      
    }  
  
     
  
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
      
       
      <Box  sx={DataGridStyle(theme, colors)} >

      {newDataList ? (
       <Box    height= {_height} style={{ width: '100%' }}  >
  {/* m= {` ${grid_gap}  0 0 0 `} height= {_height} style={{ width: '100%' }}  */}
        <DataGridHeader  title={"Offers"} />  
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

export default Offers;

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

     

   <Box>
    
  
  
       <Box
    // key={0}
    sx={{ marginLeft: '5px' }}
    display="flex"
   
    alignItems="center"
    height="100%"
  
  >
     
     <OneBar data={data.invite_use} text ={"used"}  colors ={ colors.greenAccent[600] } />
      
     </Box>
  
     <Box  sx={{ marginLeft: '5px' }}>
    
    {/* message */}
     {/* <OneBar data={data.message} text ={""}  colors ={  GetLegendColor("message")  } /> */}
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
