 // React Component for the Referred User
 
 import { useLocation } from 'react-router-dom';
 import {useEffect, useState} from "react";
 import { Box } from "@mui/material";
 //import dotenv from "dotenv";
 
  import NFTGrid from "../../components/NFTGrid";
  import ImageComposer from "../../components/ImageComposer";
 
 
  
 import { TOOLS_ADDRESS } from "../../const/addresses";
 import { useContract, useNFTs } from "@thirdweb-dev/react";
import { BasicScrollable } from '../../components/Layout';
import Container from '../../components/Container/Container';
 
  
 //const API_URL = process.env.API_URL;
 const AllLayerImage = () => {
   
   const { contract } = useContract(TOOLS_ADDRESS);
    const { data, isLoading } = useNFTs(contract);
   
    const { data: allNFTs } = useNFTs(contract); // get all neft
   // const [allNFTs, setAllNFTs] = useState();
   useEffect(()=>{
    /*
     async function get(){
         const result =  await  GetAllNFTfromSDK();
          setAllNFTs(result);
     }
    
    get();
     */
  }, [   ]);
 
  
  return (
    !allNFTs ? (
      <div>alllayerimage.js allNFTs not loaded</div>
    ) : (
      //  <Container maxWidth="lg">
      //<Box margin="0px 20px 20px 20px"  maxHeight="calc(85vh)"  overflow="auto"  >  
      <BasicScrollable>
        <Container  maxWidth="lg">
           <Box>
     
      {/* {user ? ( <ImageComposer  queryId= {`&userId=${user.ID}&limit=1`}/>  ) : ( <div>User is not defined.</div> )} */}
 
         <ReferredUserComponent/>
          <ImageComposer/>  
       
          {/* <Shop display_mode='grid'/>  */}
         <NFTGrid
            isLoading={isLoading} 
            NFTdata={allNFTs} 
            emptyText={"No NFTs found"}
         />  


   

           </Box>
        </Container>
     </BasicScrollable> //</Box>

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
  
 
 