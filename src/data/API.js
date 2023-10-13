


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

   /*
   "discord": "eokatr#1265",
        "walletShort": "0xDd..8CAC",
        "scoreShare": 1.42,
        "earning": 7.1
   
   */