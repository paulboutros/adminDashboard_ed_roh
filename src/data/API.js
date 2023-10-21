
//import axios from "axios";
import axios from "axios";
export async function  authorize   () {
  //const getData_enpPoint = API_URL + "getData";
  const endpoint = `${process.env.REACT_APP_API_URL}authorize`; // make it specific (filter to twitter fields)
  const result  = await fetch(endpoint);
 //const result  = await fetch("/api/findUsersWithNonZeroProperties");
 const resultsJson = await result.json();
  
   return resultsJson;
} 
let tempClickAmount = 0;
export async function  getUserMe   () {


  const endpoint = `${process.env.REACT_APP_API_URL}user/me`; // make it specific (filter to twitter fields)

  console.log("process.env.REACT_APP_API_URL = " +  process.env.REACT_APP_API_URL );
  console.log("user me endpoint = " +  endpoint );

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include' // This sets the 'withCredentials' option to true
    });
  
    if (!response.ok) {
      throw new Error(`user/me Error: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('user/me Error:', error);
    throw error; // You can handle the error further as needed
  }

 


/*

   try {
    const response = await axios.get(endpoint, {withCredentials:true});
    return response.data;
  } catch (error) {
    console.error(' user/me  Error:', error);
    throw error; // You can handle the error further as needed
  }
 
*/


} 

export async function  globalData   () {


    


    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}globalData`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
   const resultsJson = await result.json();
    
     return resultsJson;
} 
export async function  getData   () {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}getData`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
   const resultsJson = await result.json();
    
     return resultsJson;
   } 

   export async function  bestEarner   () {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}bestEarner`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
   const resultsJson = await result.json();
    
     return resultsJson;
   } 

   export async function  userEarning(userId) {
    //const getData_enpPoint = API_URL + "getData";
    const endpoint = `${process.env.REACT_APP_API_URL}userEarning?userId=${userId}`; // make it specific (filter to twitter fields)
    const result  = await fetch(endpoint);
   //const result  = await fetch("/api/findUsersWithNonZeroProperties");
   const resultsJson = await result.json();
    
     return resultsJson;
   } 

    // send click data
   export async function  sendTracking(user , category, image  ) {
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
          button: "Button react app ",
          pageSource: "composittion",
          time: "2023-10-16 14:30:15" 
        }
      
    }
 

  console.log("tempClickAmount  "    +  tempClickAmount  )  
  if ( user ){
  //REACT_APP_YOUROAUTH2URL
 
  }else{
      console.log("   tempClickAmount   ==   "   +  tempClickAmount);
     if (  tempClickAmount  > 10 ){
      tempClickAmount = 0;
      const url = process.env.REACT_APP_YOUROAUTH2URL;
      window.open(url, '_blank'); // Opens in a new tab or window

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


 



 