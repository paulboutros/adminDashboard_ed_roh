
import  { addressShortened, hexToDaysAgo, hexToReadableTimestamp
} from "../utils.js"
import { convertEthToUsd } from "../data/API.js";


let ethToUsdRate;
export function GetFromVAlue( element , eventName  ){
    let amountHex;
    let amountDecimal;
     let ethValue;   
     let dataHex;
  
    let data = {from:"", to:"",ethValue:"", date:"", bidder:"", expiration:"", listingID:"", auctionId:"", tokenId:"" };
      switch (eventName ){
          case "NewBid": //( from a bidder)
          data.from = addressShortened(element.data.bidder); 
          data.to = "Market contract";
          
  
          amountHex =  element.data.bidAmount._hex;
          amountDecimal = parseInt(amountHex, 16);
          data.ethValue = amountDecimal  / 1000000000000000000;// ethers.utils.formatEther(amountDecimal);
  
          dataHex = element.data.auction.startTimestamp._hex;
          data.date = hexToReadableTimestamp(dataHex);// hexToDaysAgo(dataHex);
          break;  
  
        case "NewAuction": //( from creation of a bidder); 
        data.from =  addressShortened( element.data.auctionCreator);
        data.to = "Market contract";
  
       
  
        amountHex =  element.data.auction.minimumBidAmount._hex;
        amountDecimal = parseInt(amountHex, 16);
        data.ethValue = (amountDecimal  / 1000000000000000000);
  
        dataHex = element.data.auction.startTimestamp._hex;
        data.date = hexToReadableTimestamp(dataHex);// hexToDaysAgo(dataHex);
        break;  
  
        case "NewListing":  
        data.from =  addressShortened( element.data.listingCreator);
        data.to = "Market contract";
  
        amountHex  =  element.data.listing.pricePerToken._hex;
        amountDecimal = parseInt(amountHex, 16);
        data.ethValue =  amountDecimal  / 1000000000000000000;//   ethers.utils.formatEther(amountDecimal);
  
        dataHex = element.data.listing.startTimestamp._hex;
       //  data.date = hexToReadableTimestamp(dataHex);
         data.date = hexToReadableTimestamp(dataHex);// hexToDaysAgo(dataHex);
         
         break;
         case "CancelledListing":     //(  ); 
        data.from =  addressShortened( element.data.listingCreator);
        data.to = "Market contract";
         break; 
        
         case "NewSale":     
        data.from =  addressShortened( element.data.listingCreator);
        data.to =  ( addressShortened( element.data.buyer) + "(buyer)" );
  
        amountHex  =  element.data.totalPricePaid._hex;
        amountDecimal = parseInt(amountHex, 16);
        data.ethValue =  amountDecimal  / 1000000000000000000;//   ethers.utils.formatEther(amountDecimal);
         break; 
    
  
       default:  data="" ; break;  
   
      }
  
      if (element.data.listing){
       const listingIDHex = element.data.listingId._hex
       const listingIDDecimal = parseInt(listingIDHex, 16);
       data.listingID =  listingIDDecimal;
  
       const tokenIdDHex = element.data.listing.tokenId._hex
       const tokenIdDecimal = parseInt(tokenIdDHex, 16);
       data.tokenId = tokenIdDecimal;
    }
    if (element.data.auction){
        const  auctionIDHex = element.data.auctionId._hex
        const auctionIDDecimal = parseInt(auctionIDHex, 16);
        data.auctionId =  auctionIDDecimal;

        const  tokenIdHex = element.data.auction.tokenId._hex
        const tokenIdDecimal = parseInt(tokenIdHex, 16);
        data.tokenId =  tokenIdDecimal;
     }

  
      return data;
  
   }


    
export async function  GetContractName (contract , nft, auctionIdArg ,listingId,   boardtype ){
   // auctionIdArg=1;
    const events = await contract.events.getAllEvents();
    const eventNames = events.map(event => event.eventName);
    
    //console.log( "  events = " , events  );

    if (ethToUsdRate === undefined){
        console.log("ethToUsdRate  is now defined ");
        ethToUsdRate = await convertEthToUsd( );  
    }
     

    //const ethToUsdRate = await convertEthToUsd( );  
 
   let gridData = new Array();
  let index =0;
  //events.forEach(element => {
    for (let i = 0; i < events.length; i++) {
        const element = events[i];


  
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
   
        if (boardtype ==="listing"){
          if ( parseInt(cellData.listingID) === parseInt(listingId) ){ //auctionId 
           //  console.log( " MATCH >>>>>>   auctionId = " , auctionIdArg  ,  "cellData.auctionId = " , cellData.auctionId  );
          }else{
             continue;
          }
        }
        
         if (boardtype ==="auction"){
              if ( parseInt(cellData.auctionId) === parseInt(auctionIdArg) ){ //auctionId 
               //  console.log( " MATCH >>>>>>   auctionId = " , auctionIdArg  ,  "cellData.auctionId = " , cellData.auctionId  );
              }else{
                 continue;
              }
           }

        gridData.push(data);

       

      };
      //);

      if (parseInt(auctionIdArg) === 0 ){

        console.log( "XXXXXXXXXXXauctionIdArg= " ,  gridData  );  
    }

     return gridData;
 
  };
 
