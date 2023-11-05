
import axios from "axios";
export async function  authorize   () {
  //const getData_enpPoint = API_URL + "getData";
  const endpoint = `${process.env.REACT_APP_API_URL}authorize`; // make it specific (filter to twitter fields)
  const result  = await fetch(endpoint);
 
 const resultsJson = await result.json();
  
   return resultsJson;
} 
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
      throw new Error(`user/me Error: ${response.status} ${response.statusText}`);
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
export async function GetLayerSupply(){
  const endpoint = `${process.env.REACT_APP_API_URL}GetLayerSupply`;
  const result = await fetch(endpoint);
  let allSupply = await result.json();

  return allSupply;
}

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


   // Define your conditional function
export const openOAuth2Url = (user) => {
  
   if (!user){
      window.open(REACT_APP_YOUROAUTH2URL, "_blank");
   }else{
    //logout

    
    
   }
    
   
};

 

 