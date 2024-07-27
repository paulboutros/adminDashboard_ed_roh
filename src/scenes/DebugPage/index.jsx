import   React, { useEffect , useState } from 'react';

  
import {    Button,   useTheme,     } from "@mui/material";
 
   

import {   tokens  } from "../../theme.js";
 
 
  
  import { CreateListing,CreateListingPack,
      UpdateAllNFTLayers, UpdateListing, 
      UpdatePackMetaData, createBundle,
      mintToCollection,
      SetClaimConditions ,
      testReadcontract
    
    
    } from '../../util/updateMetadata.js';
 
   


/*
build on Base reward and community:
https://blog.thirdweb.com/introduction-coinbase-base-layer-2-blockchain/



https://blog.thirdweb.com/announcing-improved-claim-conditions/
https://portal.thirdweb.com/references/react/v4/useSetClaimConditions

currencyAddress
The address of the currency you want users to pay in.

This can be any ERC20 token value. If you want users to pay in the native currency (e.g. Ether on Ethereum),
 you can import the NATIVE_TOKEN_ADDRESS constant 
 from @thirdweb-dev/sdk . The default value is NATIVE_TOKEN_ADDRESS .

*/


import {
    useSetClaimConditions,
    useContract,
    Web3Button,
  } from "@thirdweb-dev/react";

   

  import {  
        wuCharacterDropAddress
    } from "../../const/addresses.ts"

    

export default function DebugPage(){


     return(
           
        
         <div><EditorButton/></div> 
          
         
     )
}



    function EditorButton(){
        const theme = useTheme();
        const colors = tokens(theme.palette.mode);
    
        return (
            <div> 
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => testReadcontract() } >   
                     testReadcontract
                </Button> 

                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => SetClaimConditions() } >   
                     Set Claim Conditions
                </Button> 
 
                

                            
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => createBundle() } >   
                     create Bundle web 2
                </Button> 
     
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor  }}
                    onClick={() => mintToCollection() } >   
                      mintToCollection
                </Button> 
     
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor  }}
                    onClick={() => UpdateListing() } >   
                      UpdateListing
                </Button>
    
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor }}
                    onClick={() => UpdatePackMetaData() } >   
                      UpdatePackMetaData
                </Button>
                
                
                <Button variant="contained" 
                  sx={{backgroundColor: theme.debugModeColor  }}
                    onClick={() =>  CreateListing() } >   
                      CreateListing
                </Button>
    
                <Button variant="contained" 
                  sx={{backgroundColor: colors.redAccent[500]  }}
                    onClick={() =>  CreateListingPack() } >   
                      CreateListingPack
                </Button>
                
                
                <Button variant="contained" 
                  sx={{backgroundColor: colors.redAccent[500]  }}
                    onClick={() =>  UpdateAllNFTLayers() } >   
                      UpdateAllNFTLayers
                </Button> 
     
            </div>
    
        )
      }