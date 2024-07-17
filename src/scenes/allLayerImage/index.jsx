 // React Component for the Referred User
 
 import { useLocation, useNavigate } from 'react-router-dom';
 import {useEffect, useState} from "react";
 import { Box } from "@mui/material";
 //import dotenv from "dotenv";
 
  import NFTGrid from "../../components/NFTGrid";
  import ComposedCharacter from "../../components/ComposedCharacter";
 
 
  import stylesBuy from "../../styles/Buy.module.css";
 import { TOOLS_ADDRESS } from "../../const/addresses";
 import { useContract, useNFTs } from "@thirdweb-dev/react";
import { BasicScrollable } from '../../components/Layout';
import Container from '../../components/Container/Container';
import { useAllListingsContext } from '../../context/AllListingContext';
import { AllNFTWrapper } from '../shop';
import {   getCookie, removeCookie } from '../../data/API';
import { useAllLayersContext } from '../../context/AllLayerAvailableContext';
 
  
 //const API_URL = process.env.API_URL;
 const AllLayerImage = () => {
   
 const navigate = useNavigate();
  
 const cookieName = "tempRedirect"; 
 const redirectCookie = getCookie(cookieName);//GetCookieRedirectURL();
 
 

    const { contract } = useContract(TOOLS_ADDRESS);
    const { data, isLoading } = useNFTs(contract);
    //const { data: allNFTs } = useNFTs(contract); // get all neft
    const { NFTdata } = useAllLayersContext();
    const { allNFTsWithListing  } = useAllListingsContext();
    
      
  
  if (redirectCookie){ 

    const redirectUrl = redirectCookie.redirectUrl;
     navigate(`/${ redirectUrl}`) ;

    // for unknown reasons, without delay navivigate will not work.
    // even when setting a later detah time in the cookie 
    setTimeout(() => {
      removeCookie( cookieName );
  }, 250); // 4000 milliseconds = 4 seconds


     
    //removeCookie( cookieName )
   // document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
   return (<>
   
   
   </>)
    
   }


  return (
    !NFTdata ? (
      <div>alllayerimage.js NFTdata not loaded</div>
    ) : (

      

      //  <Container maxWidth="lg">
     
      
        <Container  maxWidth="lg">
           <Box>
           
 
         <ReferredUserComponent/>
          <ComposedCharacter/>  
       
      
       





     {/* this shows all listing  START*/}

          <div className={ stylesBuy.nftGridContainer } > 
          
            {isLoading ? (
              <p>Loading...</p>
            ) : (allNFTsWithListing && allNFTsWithListing.length === 0) ? (
              <p></p>
            ) : (
                //  <p>  allNFTsWithListing.length  = {allNFTsWithListing?.length} </p>
                  <AllNFTWrapper allNFTsWithListing={allNFTsWithListing} NFT_CONTRACT={TOOLS_ADDRESS} />
                
            )}
         
            </div>
       
 {/* this shows all listing ENDS HERE */}









           </Box>
        </Container>
      

    )
  );
  



  // return (

    
  
  // );



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
  
 
 