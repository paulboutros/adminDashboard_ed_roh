 
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";
import {   tokens, DataGridStyle } from "../../theme";
 import DataGridHeader from "../DataGridHeader.jsx"

import {   useContract,
    
     useContractEvents 
    
   } from "@thirdweb-dev/react";    
import { 
    MARKETPLACE_ADDRESS,
    
 } from "../../const/addresses.ts";  
   
//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";

import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======

 
   

const Offers = ( { nft , isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { selectedChain, setSelectedChain } = useContext(ChainContext);



  const { contract } = useContract( addressesByNetWork[selectedChain].LAYER_ADDRESS );
 // const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  
  
  const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 

       
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
