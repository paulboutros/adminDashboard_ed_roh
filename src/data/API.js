
import axios from "axios";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {  useAddress } from "@thirdweb-dev/react";

 
import metadataList from "../metadata/nftmetadata.json"
 
import { TOOLS_ADDRESS } from "../const/addresses.ts"
 
export function getSDK_fromPrivateKey() {
   
        const chain =process.env.REACT_APP_ETH_NETWORK;
      const sdk =   ThirdwebSDK.fromPrivateKey(
          process.env.REACT_APP_THIRDWEB_WALLET_PRIVATE_KEY,
          chain,
          {
              clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID,
          }
      );
   
     
      return sdk;
  };
   
export async function GetAllNFTfromSDK( ownedNft  /*address*/ ){
       
  const sdk = getSDK_fromPrivateKey(); 
  const contract = await sdk.getContract(TOOLS_ADDRESS);

    let nfts;
    if ( ownedNft ){
       nfts = ownedNft;
     }else{
       nfts = await contract.erc1155.getAll();
     //  console.log( " >>>>  contract.erc1155.getAll() =" , nfts    );
     
     }
   

     if (   !nfts  ){
        console.log( " >>>>null    nfts=" , nfts    );
          return;
     }
 
   //console.log( " >>>>>>>>>>>>>>>      address=" , address   );
   const allNfts =[];
    
   if (ownedNft){
    for (let i = 0; i < nfts.length; i++) {
      // const elementFound = metadataList.find(metadata => metadata.id === i.toString());
       const elementFound = metadataList.find(metadata => metadata.metadata.id === i.toString() );
       
       //if (elementFound && elementFound.metadata) {
         if ( !nfts[i] || !nfts[i].metadata || !elementFound || typeof elementFound !== 'object' || !elementFound.metadata  ) {
           console.warn(`No metadata found for id ${i}`);
       } else {
         nfts[i].metadata = elementFound.metadata;
       
       }

      // console.log( "elementFound " , elementFound );
        allNfts.push(nfts[i]);
      // You can append more properties as needed
      }
    }else{
      for (let i = 0; i < nfts.length; i++) {
         nfts[i].metadata = metadataList[i].metadata;
         allNfts.push(nfts[i]);
         // You can append more properties as needed
        }
 
    }
   
   

    return allNfts ;
 
  //  setNFT(nfts);
   
  
  }   


export async function  authorize   () {
  //const getData_enpPoint = API_URL + "getData";
  const endpoint = `${process.env.REACT_APP_API_URL}authorize`; // make it specific (filter to twitter fields)
  const result  = await fetch(endpoint);
 
 const resultsJson = await result.json();
  
   return resultsJson;
} 

let avatarURL="/he/1.png"; // add default avatar here
let tempClickAmount = 0;
const REACT_APP_YOUROAUTH2URL = process.env.REACT_APP_YOUROAUTH2URL; 
// just check if current auth token ID match a user, if so th euser is logged in already



export async function  getUserMe   () {
 
  const endpoint = `${process.env.REACT_APP_API_URL}user/me`; // make it specific (filter to twitter fields)

 

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include' // This sets the 'withCredentials' option to true (automatically include coolies in header)
      , headers: {
        //'Referral-Code': myCookieValue,
      }
    });
  
    if (!response.ok) {
      console.log("!response.ok: User is not connected to discord.")
     // throw new Error(`user/me Error: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();

  if ( data) 
      
    return data.user;

  } catch (error) {
     
    console.error('user/me Error:', error);
    throw error; // You can handle the error further as needed
  }
 

} 

export async function getAllLayersAvailable(){



}

export function createRedirectookie( redirectUrl){
   const data={
    
    redirectUrl: redirectUrl  /*  2 is the tab index "referral we want as initial state on the page" */
  }
  document.cookie = "tempRedirect=" + encodeURIComponent(JSON.stringify(data)) +
  "; max-age= 666060; samesite=None; secure; domain=" + document.domain + "; path=/";


// set a redirect link on user profile so user a redirected to that page when done
  //  setRedirectURL
  //   openOAuth2Url(null);
     
  
 

}
// will be use by discord after authorization process is completed
export function GetCookieRedirectURL(   address ){
 
 
    var myCookie = getCookie("tempRedirect");

    if (!myCookie  ) {
        // do cookie doesn't exist stuff;

     //   console.log(  "tempRedirect DOES  NOT  exist"   );

        return null; 
    }
    else {
    //  console.log(  "tempRedirect  exist"  , myCookie  );
        // do cookie exists stuff
        return myCookie;
    }
 
  





/*
  const dataToSend={ 
  //  ID : user.ID,
    redirectUrl: `profileWallet/${address}`
  }

const endpoint = `${process.env.REACT_APP_API_URL}setRedirectURL`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;*/
}
export async function addorupdate( user , address ){
 
    const dataToSend={ 
      ID : user.ID,
      id : user.id,
      discord  : user.discord,
      wallet   : address
    }

 const endpoint = `${process.env.REACT_APP_API_URL}addorupdate`; 
 const resultsPostJson = await axios.post(endpoint, dataToSend);

  console.log("data response :" ,   resultsPostJson.data );
  
  return resultsPostJson.data;
}

export async function GetLayerSupply(){
  const endpoint = `${process.env.REACT_APP_API_URL}GetLayerSupply`;
  const result = await fetch(endpoint);
  let allSupply = await result.json();
 
 

  return allSupply;
}


/*
export async function  Add_owning_and_otherLayerInfo( user , layerToChooseFrom ){



  const allSupply = await GetLayerSupply();

  

  const updatedLayerToChooseFrom = { ...layerToChooseFrom };
  const endpoint = `${process.env.REACT_APP_API_URL}findUsersWithNonZeroProperties?ID=${user.ID}`;
   const result = await fetch(endpoint);
   let userOwnedLayers = await result.json();

     // const copy_updatedLayerToChooseFrom = { ...updatedLayerToChooseFrom };
       for (const category in updatedLayerToChooseFrom) {
         const userOwnedLayersInCategory = userOwnedLayers[0].layers[category] ;//userOwnedLayers[category]; //<<< null

         const layersToChooseFromInCategory =  updatedLayerToChooseFrom[category]  ;
         
         let layerIndex=0; //from 0 to 11 ( we added a (useless) layer 0, to avoid compensation +1 or -1)
         for (const layer of layersToChooseFromInCategory) {

             
               layer.supply =  allSupply[0].layers[category][layerIndex] ; 
                
                layerIndex++;

             if (userOwnedLayersInCategory){
       
                 let ownedCount = 0;
                 for (const userLayer of userOwnedLayersInCategory) {
                   if (userLayer   === layer.layerName) {
                     ownedCount++;
                    }
                 }  
                 layer.owning = ownedCount; 
            
                    const targetLayer = updatedLayerToChooseFrom[category].find((item) => item.layerName === layer.layerName);

                         if (targetLayer) {
                           targetLayer.owning = ownedCount; // Assign the value 5 to the owning property
                         }

             }


         }
        
        //  console.log( "FINAL  category  =" , category,  "   layer=" ,  allSupply[0].layers[category] );
         // console.log( "FINAL >>>>>> ",category," updatedLayerToChooseFrom", updatedLayerToChooseFrom[category]);
          
         
          
       }
      
 
 


       console.log( "FINAL      updatedLayerToChooseFrom", updatedLayerToChooseFrom);
    return updatedLayerToChooseFrom;

}
*/











export async function myAppLink(user_ID){
     

   // we do not want to regenrate an invite as it will override previous one
   // so we check first if one exist
   // referralcode is an array, but for now we only use 1 element. 1 code per user.
   const endpointG = `${process.env.REACT_APP_API_URL}GetReferralCode?ID=${user_ID}`; // make it specific (filter to twitter fields)
    const resultG = await fetch(endpointG);
    let resultsJson = await resultG.json();
     
    // if no referral link has been created we generate one
      if (resultsJson.referralCode.length === 0){

        const dataToSend= { 
          ID: user_ID ,
          one_referral_Code: "xxx"
        }

     const endpoint = `${process.env.REACT_APP_API_URL}generateReferralCode`; // make it specific (filter to twitter fields)
     const resultsPostJson = await axios.post(endpoint, dataToSend);

      console.log("referal :" ,   resultsPostJson.data.shareableLink);
     //  setReferralCode(result.data.shareableLink);
     // setShowCopyButton(true);

        // set the refferal code to the one we jsut generate
       resultsJson = resultsPostJson;
     }
 
   // will be the one that exist or the one geenrate by the postrequest it it initially does not exist
     return resultsJson;
} 


export async function  GetRewardPrice(dataToSend   /*he,sh,we,be,kn*/ ){
  
 

       /*
       "he":   {  "layerNumber": 4, "tokenID": 4 } ,
         "sh":  {  "layerNumber": 4, "tokenID": 4 } ,
         "we":   {  "layerNumber": 1, "tokenID": 4 } ,
        "be":   {  "layerNumber": 1, "tokenID": 4 } ,
        
        "kn": {  "layerNumber": 3, "tokenID": 4 } 
       
       
        */
  const endpoint = `${process.env.REACT_APP_API_URL}GetReward`;
  const result = await axios.post(endpoint, dataToSend);
  //const rewardPrizeObject = await result.json();
  return result.data;
  


}



export async function testSDK( address ){

  



  return;
    
        
   
   



}


export async function ERC20claim( filteredImages_arg , address){
     
  

  const dataToSend= { 
  // ID:ID,
 // idToBurn: 21  ,
   filteredImages: filteredImages_arg  ,
   address:address 
  }


  console.log("dataToSend:" ,  dataToSend);
const endpoint = `${process.env.REACT_APP_API_URL}ERC20claim`; // make it specific (filter to twitter fields)
const resultsPostJson = await axios.post(endpoint, dataToSend);

 console.log("resultsPostJson" , resultsPostJson);
//  setReferralCode(result.data.shareableLink);
 // setShowCopyButton(true);

  // set the refferal code to the one we jsut generate
//  resultsJson = resultsPostJson;


return resultsPostJson;
}

export async function ERC20claim_discord_login_required(ID, filteredImages_arg , address){
     
  

       const dataToSend= { 
        ID:ID,
        filteredImages: filteredImages_arg  ,
        address:address 
       }


       console.log("dataToSend:" ,  dataToSend);
   const endpoint = `${process.env.REACT_APP_API_URL}ERC20claim`; // make it specific (filter to twitter fields)
   const resultsPostJson = await axios.post(endpoint, dataToSend);

      console.log("resultsPostJson" , resultsPostJson);
    //  setReferralCode(result.data.shareableLink);
      // setShowCopyButton(true);

       // set the refferal code to the one we jsut generate
    //  resultsJson = resultsPostJson;
    
 
    return resultsPostJson;
} 
 






export async function  myDiscordInfo   (user_ID) {


    


  //const getData_enpPoint = API_URL + "getData";
  const endpoint = `${process.env.REACT_APP_API_URL}myDiscordInfo?ID=${user_ID}`; // make it specific (filter to twitter fields)
  const result  = await fetch(endpoint);
 
 const resultsJson = await result.json();
  
/* //  response
 {    provider<discordresult>  scoreData.discord.invite_code   scoreData.discord.invite_use
        "ID": "423608837900206091",
        "discord": "Wulirocks",
        "scoreData": {
            "discord": {
                "invite_code": "TZszHsf92c",
                "invite_use": 119
            }
        }
    }
*/



   return resultsJson;
} 


export async function  globalData   () {


    


    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}globalData`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   
   const resultsJson = await result.json();
    
     return resultsJson;
} 
export async function  getData   () {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}getData`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   
   const resultsJson = await result.json();
    
     return resultsJson;
   } 


   async function getEthToUsdRate() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethToUsdRate = response.data.ethereum.usd;
      return ethToUsdRate;
    } catch (error) {
      console.error('Error fetching ETH to USD rate:', error.message);
      throw error;
    }
  }
 export async function convertEthToUsd( ) {
    const ethToUsdRate = await getEthToUsdRate();
   
    return ethToUsdRate;
  }
  




   export async function  bestEarner   () {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}bestEarner`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   
   const resultsJson = await result.json();
    
     return resultsJson;
   } 

   export async function  userEarning(userId) {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}userEarning?userId=${userId}`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   
   const resultsJson = await result.json();
    
     return resultsJson;
   } 

    // send click data
   export async function  sendTracking(user , category, image, _button,  _pageSource   ) {
    //const getData_enpPoint = API_URL + "getData";
     


    let  userID;
    let userType;

    if ( user ){
        userID = user.ID ;
        userType = "authenticated";
    }else{
      userID = "";
      userType = "guest";
    }
     


   const dataToSend= { 
      ID: userID ,
      userType : userType,
      oneClick: 
        {
          layer:{ category, image }, // for example:  he , 4 "he04"
          button: _button ,
          pageSource:  _pageSource ,
          time: new Date() 
        }
      
    }
 

 // console.log("tempClickAmount  "    +  tempClickAmount    +  "      ", JSON.stringify(dataToSend, null, 2)        )  
  if ( user ){
  //REACT_APP_YOUROAUTH2URL
 
  }else{
     // console.log("   tempClickAmount   ==   "   +  tempClickAmount);
     if (  tempClickAmount  > 10 ){
      tempClickAmount = 0;
    //  const url = process.env.REACT_APP_YOUROAUTH2URL;
    //  window.open(url, '_blank'); // Opens in a new tab or window

     } 
  }


    const endpoint = `${process.env.REACT_APP_API_URL}sendTracking`; // make it specific (filter to twitter fields)
     const result = await axios.post(endpoint, dataToSend);
 
     tempClickAmount++;
   // axios use result.data   instead of just ersult
    // console.log("result"   , result.data);
   //const resultsJson = await result.data;
    
     //return resultsJson;
   } 


   export function removeCookie( cookieName ){
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`

   }
   // discord login
export const openOAuth2Url = (user, setUser ) => {
  
   if (!user){
      window.open(REACT_APP_YOUROAUTH2URL, "_blank");
   }else{
     
       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       setUser(null);
    
   }
    
   
};


export function getAvatar( user ){

  // discordata is custom and store discord user data after sucesfully auth
 const discordData =  user.discordUserData;


  
 
 if (discordData.avatar === null) {
   // User has a default Discord avatar
   return `https://cdn.discordapp.com/embed/avatars/0.png`;
 } else {
   // User has a custom avatar
   avatarURL = discordData.avatar.startsWith('a_') // Check if it's a GIF avatar
   ? `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.gif`
   : `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`;
  
     return avatarURL;
  }
 }

 //https://www.tabnine.com/academy/javascript/how-to-get-cookies/
 export function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ');
  let res;
  cArr.forEach(val => {
    if (val.indexOf(name) === 0){
     res = val.substring(name.length);
     try {
      // Attempt to parse the cookie value as JSON
      res = JSON.parse(res);
    } catch (error) {
      // If parsing fails, assume it's a regular string
    }

    } 
  })

 


  return res
}
 function getCookie_XXX(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin === -1) {
      begin = dc.indexOf(prefix);
      if (begin !== 0) return null;
  }
  else
  {
      begin += 2;
      var end = document.cookie.indexOf(";", begin);
      if (end === -1) {
      end = dc.length;
      }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
} 



