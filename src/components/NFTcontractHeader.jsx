import OpenInNewIcon from '@mui/icons-material/OpenInNew'; 
import {Button, Box,  Divider,  Typography, useTheme   } from "@mui/material";


import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
 //https://chakra-ui.com/docs/components/button
 import { MediaRenderer  } from "@thirdweb-dev/react";
import { Avatar, 
   // Container,
   
} from "@chakra-ui/react";

import { CustomLinkWithIcon } from "./LinkTextButton.jsx"
import { RowChildrenAlignCenter,
     VerticalStackAlignCenter ,
     VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,
     VerticalSpace,
      RoundedBox,
      BoxWithTopBar,
      HorizontalSpace
    } from "./Layout.jsx"  


import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../const/addresses.ts";
//import {getSDK } from "../../utils/updateMetadata";
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

        const sdk = getSDK_fromPrivateKey();//new ThirdwebSDK("goerli");
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

            <Divider   orientation="hotizontal" style={{ marginBottom:"20px",  width: '100%', height: '1px' }} />  



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

      {/* backgroundColor={colors.blueAccent[buttonStyle.colorBlue ]} */}


           <RowChildrenAlignCenter> 
           {/* <VerifiedUserOutlinedIcon  
            style={{
                color:  colors.greenAccent[buttonStyle.colorBlue-200 ] ,
                //  color:  colors.blueAccent[buttonStyle.colorBlue-200 ] ,
                 position: 'relative', bottom: '4px', right:"1px"
                }}
             />  */}
            <Typography
              
              style={{
                
                //  color:  colors.blueAccent[buttonStyle.colorBlue-200 ] ,
                 position: 'relative' , right:"2px"
                }}


             marginBottom={1} variant='h3' fontWeight={"bold"}>{contractMetadata.name}</Typography>
            </RowChildrenAlignCenter> 

            <Typography color={colors.grey[text2.color]} variant="h7" fontWeight= {text2.fontWeight} >
             Wulirocks Layers to use in Compo Reward.
            </Typography>





            {/* TOOLS_ADDRESS */}

            {/* <CustomLinkWithIcon   to={`/profile/${nft.owner}`} color={colors.grey[200]} >
            {`${nft.owner.slice(0, 6)}...${nft.owner.slice(-4)}`}
            </CustomLinkWithIcon>
            <Link backgroundColor={colors.grey[400]} 
            to={`/profile/${nft.owner}`}>
            </Link> */}
  {/* https://goerli.etherscan.io/address/ */}

           <CustomLinkWithIcon  
 
            to={`https://goerli.etherscan.io/address/${TOOLS_ADDRESS}`} 
            text={`${TOOLS_ADDRESS.slice(0, 6)}...${TOOLS_ADDRESS.slice(-4)}`}
            color={colors.grey[200]} 
            tooltipText={"vist goerli.etherscan"}
          >

           </CustomLinkWithIcon>

           

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
 

 