 // React Component for the Referred User
 
 import { useLocation } from 'react-router-dom';
 import {useEffect, useState} from "react";
 import { Box } from "@mui/material";
 //import dotenv from "dotenv";
 
 import NFTGrid from "../../components/NFTGrid";
 import Header from "../../components/Header";
 import ImageComposer from "../../components/ImageComposer";
 
 import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
  
 import { TOOLS_ADDRESS } from "../../const/addresses";
 import { useContract, useNFTs } from "@thirdweb-dev/react";
 
 import Shop from "../shop/index"
 
 //const API_URL = process.env.API_URL;
 const AllLayerImage = () => {
   
   const { contract } = useContract(TOOLS_ADDRESS);
   const { data, isLoading } = useNFTs(contract);
    
 
   const { user } = useUserContext();
 
   useEffect(()=>{
     if (!user)return;
 
      
     
  }, [ user ]);
 
 
  return (
   <Box m="20px" maxHeight="calc(85vh)"  overflow="auto"  >  
      {/* <Header title="All Layer image" subtitle="Image for all NFT Layers" /> */}
      
      <Box   >
     
      {/* {user ? ( <ImageComposer  queryId= {`&userId=${user.ID}&limit=1`}/>  ) : ( <div>User is not defined.</div> )} */}
 
         <ReferredUserComponent/>
          <ImageComposer/>  
       
          {/* <Shop display_mode='grid'/>  */}
         <NFTGrid
        
           
        isLoading={isLoading} 
        NFTdata={data} 
        emptyText={"No NFTs found"}
        
        
        />  


   

      </Box>
    </Box>
  );
 };
 
 export default AllLayerImage;
 
 
 
 
 
  function ReferredUserComponent() {
   const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
   const referralCode =   queryParams.get('referralCode');
 
 
   
   useEffect(() => {
     const processReferral = async () => {
       try {
         const endpoint = `${process.env.REACT_APP_API_URL}processReferral?referralCode=${encodeURIComponent(referralCode)}`;
         const response = await fetch(endpoint);
        
      
        
         //  window.location.href = response.url;
           if(response.ok) {
           const data = await response.json();
           // Process the JSON response data here
           console.log(data);
 
            
           document.cookie = "referralData=" + encodeURIComponent(JSON.stringify(data)) +
           "; max-age= 60; samesite=None; secure; domain=" + document.domain + "; path=/";
 
           const REACT_APP_YOUROAUTH2URL = process.env.REACT_APP_YOUROAUTH2URL;
           window.location.href = REACT_APP_YOUROAUTH2URL;
   
 
 
         } else {
           // Handle API error here
           console.error('API request failed');
         }
  
 
       } catch (error) {
         // Handle any unexpected errors here
         console.error(error);
       }
 
       
     };
 
     if (referralCode) {
       processReferral();
     }
   }, [referralCode]);
 
   return (
     <div>
       {/* <p>Welcome to our platform!</p>
       
       <p>referal code {referralCode} </p> */}
 
     </div>
   );
 }
  
 
 