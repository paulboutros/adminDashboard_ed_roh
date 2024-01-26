import React, { useEffect } from 'react';
import {Box,    Skeleton,       Typography,    useTheme,  } from '@mui/material';
import { BootstrapTooltip,   allCSS, cool_orange, tokens } from "../../theme";
  
  

 import { useContract, useContractRead } from "@thirdweb-dev/react";
import { HorizontalSpace } from '../Layout';
import { ethers } from 'ethers';
import { AddressCopyBlock, EtherScanLinkBlock, ContractBalance  } from '../BlockLink/BlockLinks';
  

  export function AddressBlock( {addressArg}){

     const theme = useTheme();
     const colors = tokens(theme.palette.mode);
     

    
        const { contract } = useContract(addressArg);
        const { data: contractBalance, isLoading } = useContractRead(contract, "getBalance" )
      
     useEffect(() => {
           

            if (!contractBalance){ return; }
              
            const yy = Number( ethers.utils.formatEther( contractBalance._hex )).toFixed(2); 
            //    const yy =  ethers.utils.formatEther( contractBalance._hex ).toFixed(2)
                 console.log(  "yy    ", yy   );
           

        }, [ contractBalance ]);
 

       return(
        <>
    
         <div style={{ 
            color: colors.grey[400], fontWeight:"450",
            display: 'flex', alignItems: 'center'
            
            }}>


          <ContractBalance addressArg={addressArg}   />   
         
   
       </div> 
         <HorizontalSpace space={1}/> 
     
         <div  style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center" 
 
         }}> 
   
  
                   <AddressCopyBlock addressArg={addressArg}   /> 
 
                    <HorizontalSpace space={1}/> 
 
                    <EtherScanLinkBlock addressArg={addressArg}    _colors = {cool_orange}    _alpha={0.05} />   
                
           </div>


   

         </>
        )
  }




  
  

 