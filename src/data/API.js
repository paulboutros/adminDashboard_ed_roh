
import axios from "axios";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
 
 
import metadataList from "../metadata/nftmetadata.json"
 
import { referralRewardTabIndex } from "../scenes/profileWallet/index.jsx";
 

 
export function getSDK_fromPrivateKey(   selectedChain  ) {
   
  if (selectedChain == null) {  // Check for both undefined and null
    throw new Error("getSDK_fromPrivateKey: selectedChain is required and cannot be undefined or null");
  }
 


        const chain = selectedChain ; 
         const sdk =   ThirdwebSDK.fromPrivateKey(
          process.env.REACT_APP_THIRDWEB_WALLET_PRIVATE_KEY,
          chain,
          {
              clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID,
          }
      );
   
     
      return sdk;
  };
   
  


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
       
      }
    });

    
    //  ok means > response falls within the range of 200-299
    if (!response.ok) {
 
    
       console.log("!response.ok: User is not connected to discord.")
      const errorData = await response.json();
      console.log("!response.ok:   response.message " ,  errorData.message   )
      //return null;
      removeCookie( "token" );
       throw new Error(` !response.ok user/me Error: `);
    }
  
    const data = await response.json();


      //console.error('const response = await fetch(endpoint,  :', response);
    

  if ( data) 
      
    return data.user;

  } catch (error) {
     
    console.log( "API.js > catch user/me Error "  + error);
  //  console.error('user/me Error:', error);
   // throw error; // You can handle the error further as needed

    return null;
  }
 

} 

 

export async function  getUser   () {
 
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
  
    let data = await response.json();

  if ( data) 
      
    return data.user;

  } catch (error) {
    
  //  console.error('user/me Error:', error);
    console.log('user/me Error:  data: return null', error);
    return null;
  //  throw error; // You can handle the error further as needed
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
 
   

}


 
 // this function is actually the React SetState function 
export const setDebugMode = async (  setDebugModeContext ) => {
  try {
    const response = await globalData();
    
    console.log(" globalData >>   response[0]     " , response[0] );
        setDebugModeContext( response[0].debugMode );   // setDebugMode
  } catch (error) {
   
    console.error('Error fetching appLink data:', error);
  }
};

 // this function is actually the React SetState function 
 export const setSimulatedWuPrice = async (  setDebugModeContext ) => {
  try {
    const response = await globalData();
    
    console.log(" globalData >>   response[0]     " , response[0] );
        setDebugModeContext( response[0].debugMode );   // setDebugMode
  } catch (error) {
   
    console.error('Error fetching appLink data:', error);
  }
};


// later this should be only using credetial for ID (we still use ID parameter for debugging)
export async function DeleteAccountAPI( user ){
 
     const ID = user.ID;

    // console.log( "user" , user  );
     // return;
 
  const endpoint = `${process.env.REACT_APP_API_URL}deleteAccount?ID=${ID}`; 
     

  try {
    const response = await fetch(endpoint );
  
    if (!response.ok) {
      console.log("!response.ok: User is not connected to discord.")
     }
   

  } catch (error) {
    
  
    console.log('user/me Error:  data: return null', error);
    return null;
   }
 


}

// web2 custom bundle pack
export async function CreateBundlePackWEB2(  ){
 
  const dataToSend = {  ID : "" }
   
   const endpoint = `${process.env.REACT_APP_API_URL}CreateBundlePack`; 
   const resultsPostJson = await axios.post(endpoint, dataToSend);

   console.log("data response :" ,   resultsPostJson.data );
     return resultsPostJson.data;
}

 
/*
export async function setUserTask( user , address ){
 
  const dataToSend={  ID : user.ID  }
  
  
const endpoint = `${process.env.REACT_APP_API_URL}setUserTask`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log("setUserTask  >>> response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}
 */


export async function getOpenedPack (   userID){
  const dataToSend={ 
    
    userID: userID
  }
  
 // const endpoint = `${process.env.REACT_APP_API_URL}guildMemberAdd?ID=969712435869122560`; 
 // const endpoint = `${process.env.REACT_APP_API_URL}/emit/guildMemberAdd?modifiedInviteCode=4ymvf9xGY`; 
const endpoint = `${process.env.REACT_APP_API_URL}getOpenedPack`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

//console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;

}
export async function openPackServer(  openerAddress , userID){
 
  const dataToSend={ 
    openerAddress : openerAddress,
    userID: userID
  }
  
 // const endpoint = `${process.env.REACT_APP_API_URL}guildMemberAdd?ID=969712435869122560`; 
 // const endpoint = `${process.env.REACT_APP_API_URL}/emit/guildMemberAdd?modifiedInviteCode=4ymvf9xGY`; 
const endpoint = `${process.env.REACT_APP_API_URL}openPack`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

//console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}









export async function emit_guildMemberRemove( mock_leavingrMember_ID , discordInvite ){

   
  const endpoint = `${process.env.REACT_APP_API_URL}emit/guildMemberRemove?modifiedInviteCode=${discordInvite}&mock_leavingrMember_ID=${mock_leavingrMember_ID}`; // make it specific (filter to twitter fields)
  const resultsPostJson = await fetch(endpoint);
  const resultsJson = await resultsPostJson.json();
  
  
  return resultsJson ;
}

export async function emit_guildMemberAdd( user , discordInvite ){

 
const endpoint = `${process.env.REACT_APP_API_URL}emit/guildMemberAdd?modifiedInviteCode=${discordInvite}`; // make it specific (filter to twitter fields)
const resultsPostJson = await fetch(endpoint);
const resultsJson = await resultsPostJson.json();


return resultsJson ;
}


export async function setRewardStatusAndaddDist( user , taskID ){
 
  const dataToSend={ 
     ID : user.ID,
     taskID   : taskID
  }
  
 // const endpoint = `${process.env.REACT_APP_API_URL}guildMemberAdd?ID=969712435869122560`; 
 // const endpoint = `${process.env.REACT_APP_API_URL}/emit/guildMemberAdd?modifiedInviteCode=4ymvf9xGY`; 
const endpoint = `${process.env.REACT_APP_API_URL}setRewardStatusAndaddDist`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}



export async function setWallet( user , address ){
 
  const dataToSend={ 
    ID : user.ID,
     wallet   : address
  }
 
const endpoint = `${process.env.REACT_APP_API_URL}setWallet`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}


export async function updateChain( address ,chain ){
 
  const dataToSend={
     wallet : address,
     chain :chain
    }
 
const endpoint = `${process.env.REACT_APP_API_URL}updateChain`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log(" addorupdateWalletuser data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}

export async function addorupdateWalletuser( address ){
 
  const dataToSend={ 
     wallet   : address
  }

const endpoint = `${process.env.REACT_APP_API_URL}addorupdateWalletuser`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

console.log(" addorupdateWalletuser data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
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
 

 
 
// this mostly for testing purposes
export async function deleteDiscordInvite(user_ID){
 
  const endpoint = `${process.env.REACT_APP_API_URL}discord_invite_delete?ID=${user_ID}`; // make it specific (filter to twitter fields)
  const resultsPostJson = await fetch(endpoint);
  let MongoDeleteResult = await resultsPostJson.json();
  return MongoDeleteResult;
}

export async function myDiscordInvite(user_ID){
 
  // we do not want to regenerate an invite as it will override previous one
  // so we check first if one exist
  // referralcode is an array, but for now we only use 1 element. 1 code per user.
   const endpointG = `${process.env.REACT_APP_API_URL}GetDiscordInviteCode?ID=${user_ID}`; // make it specific (filter to twitter fields)
   const dataResponse = await fetch(endpointG);
   let resultsJson = await dataResponse.json();
 
   
   // if no referral link has been created we generate one
   //  if (resultsJson.referralCode.length === 0){
    /*
    if ( !resultsJson.inviteData ){
 
    const endpoint = `${process.env.REACT_APP_API_URL}discord_invite_create?ID=${user_ID}`; // make it specific (filter to twitter fields)
    const resultsPostJson = await fetch(endpoint);
    resultsJson = await resultsPostJson.json();

    console.log( "API myDiscordInvite: inviteData is NULL so we create one "  , resultsJson);
    }else{
      console.log( "API myDiscordInvite: inviteData EXIST so we ue "  , resultsJson);

    }*/

    
  // will be the one that exist or the one geenrate by the postrequest it it initially does not exist
    return resultsJson.inviteData   ;
} 


export async function GetChain (wallet){
     

  // we do not want to regenrate an invite as it will override previous one
  // so we check first if one exist
  // referralcode is an array, but for now we only use 1 element. 1 code per user.
  const endpointG = `${process.env.REACT_APP_API_URL}GetChain?wallet=${wallet}`; // make it specific (filter to twitter fields)
   const resultG = await fetch(endpointG);
   let resultsJson = await resultG.json();
     


  // will be the one that exist or the one geenrate by the postrequest it it initially does not exist
    return resultsJson;
} 



export async function myAppLink (user_ID){
     

   // we do not want to regenrate an invite as it will override previous one
   // so we check first if one exist
   // referralcode is an array, but for now we only use 1 element. 1 code per user.
   const endpointG = `${process.env.REACT_APP_API_URL}GetReferralCode?ID=${user_ID}`; // make it specific (filter to twitter fields)
    const resultG = await fetch(endpointG);
    let resultsJson = await resultG.json();
      


   // will be the one that exist or the one geenrate by the postrequest it it initially does not exist
     return resultsJson;
} 




export async function GetRewardPrice( dataToSend ){
  
   console.log( "> GetRewardPrice  ");
   
   const endpoint = `${process.env.REACT_APP_API_URL}GetRewardPrice`;
   const result = await axios.post(endpoint, dataToSend);
   //const rewardPrizeObject = await result.json();
   return result.data;
  


}



export async function testSDK( address ){

  



  return;
    
        
   
   



}


export async function ERC20claim( 
  filteredImages_arg ,
   address, 
  
   burnContract_arg,
   wucoin_arg,
   chain_arg,
   wuLayersAddress_arg
  ){
     
  

  const dataToSend= { 
     // ID:ID,
     // idToBurn: 21  ,
     filteredImages: filteredImages_arg  ,
     address:address ,

     burnContract: burnContract_arg,
     wucoin: wucoin_arg,
     chain: chain_arg,
     wuLayersAddress:   wuLayersAddress_arg
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
     
        // code removed reason: Discord integration removed
} 
 


export async function GetManyUsersFromDiscord ( IDlist  ){
  // if we did not invite anyone yet, the list provided as argument can be null
   if (!IDlist || IDlist.length === 0){ 
      return [];
   }

   const dataToSend={ IDlist : IDlist }
    
   

const endpoint = `${process.env.REACT_APP_API_URL}GetManyUsersFromDiscord`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

 //console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}

export async function getManyUserData( IDlist  ){
  // if we did not invite anyone yet, the list provided as argument can be null
   if (!IDlist || IDlist.length === 0){ 
      return [];
   }

   const dataToSend={ IDlist : IDlist }
    
   

const endpoint = `${process.env.REACT_APP_API_URL}getManyUserData`; 
const resultsPostJson = await axios.post(endpoint, dataToSend);

 //console.log("data response :" ,   resultsPostJson.data );

return resultsPostJson.data;
}


export async function  myDiscordInfo   (user_ID) {


    


  //const getData_enpPoint = API_URL + "getData";
  const endpoint = `${process.env.REACT_APP_API_URL}myDiscordInfo?ID=${user_ID}`; // make it specific (filter to twitter fields)
  const result  = await fetch(endpoint);
 
 const resultsJson = await result.json();   
  
/* //  response struct
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

export async function  globalData_setDebugMode   ( value , setDebugMode, ID ) {
  
 const dataToSend= {  value:value, ID: ID};
  

      console.log("dataToSend:" ,  dataToSend);
      const endpoint = `${process.env.REACT_APP_API_URL}globalData_setDebugMode`; // make it specific (filter to twitter fields)
      const resultsPostJson = await axios.post(endpoint, dataToSend);
       setDebugMode(  value  );
      return resultsPostJson;
} 

export async function  SetSimulatedWuUSDTpriceAPI   ( value , setSimulatedWuPrice, ID ) {
  
  const dataToSend= {  value:value, ID: ID};
   
 /*
      console.log("dataToSend:" ,  dataToSend);
     const endpoint = `${process.env.REACT_APP_API_URL}SetSimulatedWuUSDTpriceAPI`; // make it specific (filter to twitter fields)
     const resultsPostJson = await axios.post(endpoint, dataToSend);
  */
     setSimulatedWuPrice(  value  );
 
  //  return resultsPostJson;
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
        userID = user.ID;
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
     // this will log out
       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
       setUser(null);
    
   }
    
   
};


export async function openOAuth2Url_whenUserNotConnected( address ){

  // after discord athentication we need to come back to the same exact page,
   // so we save the  route path in a cookie , th redirect will happen of the root route.    
   createRedirectookie( `profileWallet/${address}/${referralRewardTabIndex}` ); // is refferal tab
   openOAuth2Url(null);
}  

export function getAvatar(  discordUserData ){

  // discordata is custom and store discord user data after sucesfully auth
 const discordData =  discordUserData;

   
 //if (discordData.displayAvatarURL && !discordData.displayAvatarURL ){

 // return discordData.displayAvatarURL;  
 //}


 if (!discordData ||discordData.avatar === null) {
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
  


