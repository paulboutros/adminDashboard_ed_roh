
 
 
import Shop from "../shop/index.tsx"
import { Link, useParams } from 'react-router-dom';


const TokenPage =  ({  propContractAddress,  propTokenId, AlllistingData, displayMode  } ) => {
 
    
     let {  contractAddress,   tokenId } = useParams();
    

    //if prop underfined it means it is called from url (so we get props from url param)
 //   if( propContractAddress !==undefined && propTokenId !==undefined  ){
       // contractAddress = propContractAddress;
       // tokenId = propTokenId;
  //  }

    console.log("token page >>>>>>>>>>>>>>>.   tokenId =", tokenId);
   

     return(
        <div>
            <Shop display_mode="list"  filterTokenId={tokenId} /> 
        </div>

     )
    

  }
  export default TokenPage;

  

  
  
   
 