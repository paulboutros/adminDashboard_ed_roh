import { convertEthToUsd } from "../../data/API.js";
import { ethers } from "ethers";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useEffect, useState} from "react";
import { Box , Typography, useTheme } from "@mui/material";
import { DataGrid ,
   


} from "@mui/x-data-grid";

import { RowChildrenAlignCenter,
  VerticalStackAlignCenter ,
  VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,RowChildrenAlignLeft,
  RowChildrenAlignRight,
  VerticalSpace,
   RoundedBox,
   BoxWithTopBar,
   HorizontalSpace,
   RoundedBoxInfo
 } from "../../components/Layout.jsx"  




import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';


import { text1, tokens } from "../../theme";
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
  

const Activity = ( { nft ,listingID, isDashboard = false }  ) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
   



  const { contract } = useContract(TOOLS_ADDRESS);
  //const { data: nft, isLoading, error } = useNFT(contract, tokenId);

  
  
  const { contract: marketplace, isLoading: loadingMarketplace } =  useContract(MARKETPLACE_ADDRESS, "marketplace-v3"  ); 
 
   
//==========================================================================
// pb added to fetch data
 const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
const [newDataList, setNewDataList] = useState(); // Set rowData to Array of Objects, one Object per Row

useEffect (()=>{

    console.log( "useEffect:marketplace >>>>>>>>>>>>>>>>>>     = " , marketplace);


     if (!marketplace) return;
   async function fetchData( ) {
      const gridData= await  GetContractName (marketplace , nft, listingID  );


 // console.log( "gridData = " , gridData);


      setNewDataList(gridData);
   }
   fetchData();

}, [ marketplace ]);

 

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
      
       
        <Box
        
        sx={{ 
          "& .MuiDataGrid-root": {
           // border: "none",
            //borderTop: "none",
            // border: '1px solid #ddd', // Add border for better visibility
             border: `1px solid ${theme.palette.grey[700]}`, // Add border for better visibility
            borderTopLeftRadius: '0', // Top-left corner not rounded
            borderTopRightRadius: '0', // Top-right corner not rounded
            borderBottomLeftRadius: '10px', // Bottom-left corner rounded
            borderBottomRightRadius: '10px', // Bottom-right corner rounded
            overflow: 'hidden', // Ensure overflow is hidden to hide rounded corners

          },
          "& .MuiDataGrid-cell": {
           // borderBottom: "none",
          },
          

          "& .MuiDataGrid-cellContent": {
            fontSize:14,
          },
          "& .name-column--cell": {
            color: colors.grey[200],
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
           //  borderTop: "none",
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
       <Box height= {_height} style={{ width: '100%' }} >  
            {/* m= {` ${grid_gap}  0 0 0 `}  */}

       <Box 
        sx={{ 
          
           // border: "none",
            //borderTop: "none",
            // border: '1px solid #ddd', // Add border for better visibility
             border: `1px solid ${theme.palette.grey[700]}`, // Add border for better visibility
             borderBottom: "none",
            borderTopLeftRadius: '10px', // Top-left corner not rounded
            borderTopRightRadius: '10px', // Top-right corner not rounded
            borderBottomLeftRadius: '0', // Bottom-left corner rounded
            borderBottomRightRadius: '0', // Bottom-right corner rounded
            overflow: 'hidden', // Ensure overflow is hidden to hide rounded corners

          }}
        
         backgroundColor= { colors.primary[600]} height={50}  > 
           
            
           <RowChildrenAlignLeft > 
           <Typography m={2} >Activity</Typography>
           </RowChildrenAlignLeft> 
           
       </Box>
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

export default Activity;
  
 

async function  GetContractName (contract , nft, listingId){
     
    const events = await contract.events.getAllEvents();
    const eventNames = events.map(event => event.eventName);
    // console.log( "  all events    === " , events  );
  

    //  var data = await contract.GetAllListings(listingId,listingId);
    //  console.log( "  GetAllListings  for list id: ",listingId, " >> data = " , data  );
    //   const data = await contract?.call(
    //     "getAllListings", 
    //     [listingId, listingId]  
    //  );

    //const data = contract?.directListings;// GetAllListings( listingId,listingId );
    //"getAllListings"
    console.log( "  events = " , events  );

  


    const ethToUsdRate = await convertEthToUsd( ); ;
 
   let gridData = new Array();
  let index =0;
  events.forEach(element => {
 
       const eventName = element.eventName;
     
        
       // const ethValue = GetEtherValue(element , eventName); 
        const cellData = GetFromVAlue(element , eventName); 
       // const USDPrice = ethValue * ethToUsdRate; 
         
     //   const bidder = addressShortened(element.data.bidder) ;
         
        const data ={
            id:index,
            eventName: `${element.eventName} [${index}]`,// eventName, 
            
            from : cellData.from,
            to   : cellData.to,

            price: cellData.ethValue,//ethValue,
            usdPrice: ("$"+ (cellData.ethValue * ethToUsdRate ).toFixed(2)),
          
            date: cellData.date,

            listingID: cellData.listingID,
            auctionId: cellData.auctionId,
            tokenId: cellData.tokenId
             
           
        }
        index++;
        gridData.push(data);

      });

   

     return gridData;
 
  };
 




  // function GetEtherValue( element , eventName ){

  //    // for bugs related to  ethers.utils.formatEther(amountDecimal);
  //       //  /https://github.com/ethers-io/ethers.js/discussions/2814 for Big Number bugs
  //   let amountHex;
  //   let amountDecimal;

  //   let ethValue;
  //   switch (eventName ){
  //       case "NewBid": 
  //       amountHex =  element.data.bidAmount._hex;
  //       amountDecimal = parseInt(amountHex, 16);
  //       ethValue = amountDecimal  / 1000000000000000000;// ethers.utils.formatEther(amountDecimal);
  //   ;break;  

  //   case "NewSale":        
  //       amountHex  =  element.data.totalPricePaid._hex;
  //        amountDecimal = parseInt(amountHex, 16);
  //          ethValue =  amountDecimal  / 1000000000000000000;//   ethers.utils.formatEther(amountDecimal);
         
  //    break; 

  //    case "NewListing":        
  //       amountHex  =  element.data.listing.pricePerToken._hex;
  //        amountDecimal = parseInt(amountHex, 16);
  //         ethValue =  amountDecimal  / 1000000000000000000;//   ethers.utils.formatEther(amountDecimal);
         
  //    break; 
       
  //      default:  ethValue="" ; break;  
  //     }

  

  //     return ethValue;
  // }
 
 