import React from 'react';
import {Box,    useTheme,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
  import { useUserContext } from '../../context/UserContext.js'; // to get user data from context provider
 
  
 import { addressShortened, copyTextToClipboard } from '../../utils';
 import { useAppLinkContext } from '../../context/AppLinkContext';
 import { LuCopy } from "react-icons/lu";  

  export function AddressBlock( {address}){

    const { appLink } = useAppLinkContext();
    
    //const { contract: rewardContract } = useContract(BURN_TO_CLAIM);
  //  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
     
 
     const { user } = useUserContext();
      
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    function linkAdressToDiscord(){
   
    }
    

       return(
        <>
          <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

             <Box sx={  allCSS( theme.palette.mode, "300px","0px" ).addressBox  }   onClick={() => linkAdressToDiscord()}>
               <Box onClick={ () => copyTextToClipboard ( address  )} > 
                     {/* <p> Share link with friends  */}
                     <>

                       <div> 
                      
                         <span style={{
                            fontSize :"12px",
                            marginRight: '20px',fontWeight:"900px",  borderRadius:"3px", padding:"3px",
                            
                            marginTop: "2px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent:  "flex-start",// "space-between",
                             
                            }} >
                         <LuCopy  style={{marginRight:"5px", marginTop: "2px",  fontWeight: "900", }}   />
                         
                         
                           {  addressShortened(address)    }
                           
                           </span>
                      
                        </div>
                     </>
                      {/* </p>   */}
            
                 </Box>
               </Box>
          </BootstrapTooltip>
         </>
        )
  }
  

 