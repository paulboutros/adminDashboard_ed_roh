import React, { useEffect } from 'react';
import {Box,    Skeleton,    Stack,    Typography,    useTheme,  } from '@mui/material';
import { BootstrapTooltip, CustomChip, HtmlTooltip, allCSS, tokens } from "../../theme";
  
import { BiCoinStack } from "react-icons/bi";
 


   import { FiExternalLink } from "react-icons/fi";
 import { addressShortened, copyTextToClipboard } from '../../utils';
  import { LuCopy } from "react-icons/lu";  
 import { useContract, useContractRead } from "@thirdweb-dev/react";
import { HorizontalSpace } from '../Layout';
import { ethers } from 'ethers';
import { AlignHorizontalLeft, AlignVerticalCenter, Height } from '@mui/icons-material';
 

  export function AddressBlock( {addressArg}){


     const linkToSpeliaScan = () => {
        
        window.location.href = `https://sepolia.etherscan.io/address/${addressArg}`;
    };

    
        const { contract } = useContract(addressArg);
        const { data: contractBalance, isLoading } = useContractRead(contract, "getBalance" )
      
        useEffect(() => {
           

            if (!contractBalance){ return; }
              
            const yy = Number( ethers.utils.formatEther( contractBalance._hex )).toFixed(2); 
            //    const yy =  ethers.utils.formatEther( contractBalance._hex ).toFixed(2)
                 console.log(  "yy    ", yy   );
           

        }, [ contractBalance ]);



 
  
      
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
     
    

       return(
        <>
    
         <div style={{ 
            color: colors.grey[400], fontWeight:"450",
            display: 'flex', alignItems: 'center'
            
            }}>

  <BootstrapTooltip  title="Reward contract Balance"  placement="left-start" >
         { !isLoading ? (

               <React.Fragment>

                 <BiCoinStack  size={"15px"} />  
                {/* <Typography  fontSize={"small"} fontWeight={"150"}> Balance: </Typography> */}
              

                 <Typography  fontSize={"small"} fontWeight={"150"}> 
                {Number( ethers.utils.formatUnits(contractBalance._hex, 18)).toFixed(2)}
             </Typography>  
             </React.Fragment>
           ):(
              <Skeleton variant="rounded" width={50} height={"26px"}  />
           )}  

     </BootstrapTooltip>
  </div> 
  <HorizontalSpace space={1}/> 
     
         <div  style={{
             display: "flex",
             flexDirection: "row",
             justifyContent: "space-between",
              alignItems: "center" 
 
         }}> 
   
                <BootstrapTooltip  title="Click To Copy"  placement="left-start" >

                <Box sx={  allCSS( theme.palette.mode, "160px","0px" ).addressBox  } >
                <Box onClick={ () => copyTextToClipboard ( addressArg  )} > 
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
                            
                            
                            {  addressShortened(addressArg)    }
                            
                            </span>
                        
                            </div>
                        </>
                        {/* </p>   */}
                
                    </Box>
                </Box>
                    </BootstrapTooltip>

                    <HorizontalSpace space={1}/> 
                <BootstrapTooltip  title="Go to Sepolia-Scan"  placement="right-start" >

                    <Box sx={  allCSS( theme.palette.mode, "100px","0px" ).externalLink }  >
                    <Box onClick={ () => linkToSpeliaScan ( addressArg  )} > 
                            {/* <p> Share link with friends  */}
                            <>

                            <div> 
                            
                                <span style={{ fontSize :"12px",  fontWeight:"900px",  borderRadius:"3px", padding:"3px", marginTop: "2px", display: "flex", flexDirection: "row", justifyContent:  "flex-start", 
                            
                                }} >

                                {"etherscan"}   
                                < FiExternalLink  style={{marginLeft:"5px", marginTop: "2px",  fontWeight: "900", }}   />
                                
                                
                                
                                
                                </span>
                            
                            </div>
                            </>
                            {/* </p>   */}

                        </Box>
                    </Box>
                </BootstrapTooltip>
           </div>


  
{/* 
     

        
           

   */}
     

         </>
        )
  }


  
  

 