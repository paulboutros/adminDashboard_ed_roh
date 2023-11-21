import { convertEthToUsd } from "../../data/API.js";
import { ethers } from "ethers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid  } from "@mui/x-data-grid";
import { text1,text2, tokens } from "../../theme";
import  { addressShortened } from "../../utils.js"
import  {GetFromVAlue} from "../../utils/GetMarketContractEventData.js"


import { MediaRenderer, ThirdwebNftMedia, Web3Button, useContract,
    useMinimumNextBid, useValidDirectListings,
     useValidEnglishAuctions , useMakeBid,
     useContractEvents, useNFTs, useNFT
    
   } from "@thirdweb-dev/react";    
import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
 } from "../../const/addresses.ts";  
   
 
  
const grid_gap ="20px";
  

const Listing = ( { nft , isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   
  const gridtext  = text2.color;
  const gridFont  = text2.fontSize;


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
      const gridData= await  GetContractName (marketplace , transferEvents);
      setNewDataList(gridData);
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
    flex: 1,
    cellClassName: "name-column--cell",
     
  } ,
    
  {
    field: "ethValue",
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
      field: "bidder",   
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
      
       
        <Box
        
        sx={{
          "& .MuiDataGrid-root": {
           // border: "none",
          },
          "& .MuiDataGrid-cell": {
           // borderBottom: "none",
          },
          

          "& .MuiDataGrid-cellContent": {
            fontSize:14,
          },  
          

          "& .name-column--cell": {
            color: colors.grey[gridtext], fontSize:  colors.grey[gridFont] 
          },
          "& .MuiDataGrid-columnHeaders": {
             
            backgroundColor: colors.primary[600],
           // borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            // that is color of each row
            backgroundColor: colors.primary[500],
          },

          "& .MuiDataGrid-footerContainer": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
           // borderTop: "none",
            backgroundColor: colors.primary[600],  
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
       <Box m= {` ${grid_gap}  0 0 0 `} height= {_height} style={{ width: '101%' }} > 
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

export default Listing;

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

async function  GetContractName (contract , selectEvent){


    const events = await contract.events.getAllEvents();
    const eventNames = events.map(event => event.eventName);
    
 
    const ethToUsdRate = await convertEthToUsd( ); ;
 
   let gridData = new Array();
  let index =0;
      selectEvent.forEach(element => {
 
        /*
        const bidAmountHex =  element.data.bidAmount._hex;
        const bidAmountDecimal = parseInt(bidAmountHex, 16);
        const ethValue = ethers.utils.formatEther(bidAmountDecimal);
        const USDPrice = ethValue * ethToUsdRate; 
           */


        const eventName = element.eventName;
 
        
     //   const bidder = addressShortened(element.data.bidder) ;
        
        const cellData = GetFromVAlue(element , eventName); 

        const data ={
            id:index,
            eventName: eventName, 
            ethValue: cellData.ethValue,
            usdPrice: ("$"+ (cellData.ethValue * ethToUsdRate ).toFixed(2)),
            bidder:cellData.from, //bidder
            expiration: cellData.expiration,
            date: cellData.date,
        }
        /*
        const data ={
          id:index,
          eventName: eventName, 
          
          from : cellData.from,
          to   : cellData.to,

          price: cellData.ethValue,//ethValue,
          usdPrice: ("$"+ (cellData.ethValue * ethToUsdRate ).toFixed(2)),
        
          date: cellData.date,

         
           }
        */








        index++;
        gridData.push(data);

      });

   

     return gridData;
 
  };
 
 
 