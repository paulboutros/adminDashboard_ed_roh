
 
 
import Shop from "../shop/index.jsx"
import {   useParams } from 'react-router-dom';


const TokenPage =  ({  propContractAddress,  propTokenId, AlllistingData, displayMode  } ) => {
 
    
     let {  contractAddress,   tokenId } = useParams();
    

   
     console.log("token page >>>>>>>>>>>>>>>.   tokenId =", tokenId);
   

     return(
        <div>
            <Shop display_mode="list"  filterTokenId={tokenId} /> 
        </div>

     )
    

  }
  export default TokenPage;

  

  
  
   
 