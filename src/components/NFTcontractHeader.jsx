import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
import {Button, Box,  Divider,  Typography, useTheme   } from "@mui/material";


  //https://chakra-ui.com/docs/components/button
 import { MediaRenderer  } from "@thirdweb-dev/react";
 
import { CustomLinkWithIcon } from "./LinkTextButton.jsx"
import { RowChildrenAlignCenter,
     
     VerticalStackAlignLeft, 
     
    } from "./Layout.jsx"  


import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../const/addresses.ts";
 import {buttonStyle, text2, text1, tokens } from "../theme.js";
 
import { getSDK_fromPrivateKey } from "../data/API.js";
  
import {useEffect, useState} from "react";
 
import { Link, useParams } from 'react-router-dom';
 
  function NFTContratHeader(){
     
    let {  contractAddress,   tokenId } = useParams();
  const [nft, setNFT] = useState();
  const [contractMetadata, setContractMetadata] = useState(); 
 

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 


  useEffect(() => {
    // Function to fetch NFT data
    const fetchNFT = async () => {

        const sdk = getSDK_fromPrivateKey(); 
        const contract = await sdk.getContract(TOOLS_ADDRESS);
        
        
       let contractMetadataResult;
      try {
 
        contractMetadataResult = await contract.metadata.get();

         setContractMetadata(contractMetadataResult);
 
     //   setNFT(nftResult);
 
      } catch (error) {
        console.error('Error fetching NFT:', error);
      }
    };

    
    // Call the fetch functions when component mounts
    fetchNFT();
     
  }, [contractAddress, tokenId]);
  
   if (!contractMetadata ){
    return (
        <div>Loading contract data...</div>
    )
   }else{
    return (
        <div>
           <VerticalStackAlignLeft>
          
           <RowChildrenAlignCenter>
              
          <Box  > 
              
                   
                      <Box  >
                          <MediaRenderer
                              src={contractMetadata.image}
                              style={{ width: '65%', height: 'auto' , position: 'relative', left: '65px'  }}
                          />
                      </Box>
                  
               
          </Box>
              
          <VerticalStackAlignLeft>
          
          <NftInfoStack nft ={nft}  contractMetadata ={contractMetadata} /> 
          
          </VerticalStackAlignLeft>
          
          </RowChildrenAlignCenter> 
            </VerticalStackAlignLeft>

            <Divider   orientation="horizontal" style={{ marginBottom:"20px",  width: '100%', height: '1px' }} />  



        </div>


        )   
   }
   

   }
 export default NFTContratHeader;

   
  function NftInfoStack ( {nft, contractMetadata } ){
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    
    return (
        <div>
 

         </div>
    )
  }

   
   

   

function openEtherScanLink( url){

    window.open(url, "_blank");
}


const ExternalLink = ({ to, backgroundColor, children }) => (
    <a href={to} target="_blank" rel="noopener noreferrer" >
      {children}
    </a>
  );
 

 