import { Box, Typography,  Skeleton  } from "@mui/material";
import { BootstrapTooltip, StyledExternalLink, allCSS, cool_orange, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { FiExternalLink } from "react-icons/fi";
import { addressShortened, copyTextToClipboard } from "../../utils";
import { LuCopy } from "react-icons/lu";  
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { ethers } from "ethers";
import { BiCoinStack } from "react-icons/bi";
import { HorizontalSpace } from "../Layout";
import { color } from "framer-motion";



export function EtherScanLinkBlock( {addressArg, _colors, _alpha, toolTipMessage="Go to Sepolia-Scan" } ){

 

    const theme = useTheme();

   

    const linkToSpeliaScan = ( ) => {
     
      const pageTab =  "#tokentxns";// this should be a a parameter
       window.open(`https://sepolia.etherscan.io/address/${addressArg}${pageTab}`, "_blank");
     //  window.location.href = `https://sepolia.etherscan.io/address/${addressArg}`;
   };
    return(

        <BootstrapTooltip  title= {toolTipMessage}  placement="right-start" >

    {/* _width={_width} */}

        
       <StyledExternalLink  _colors={_colors} width={"100px"} _alpha={_alpha} >  
         {/* <Box sx={  allCSS( theme.palette.mode, "100px","0px" ).externalLink }  > */}
        <Box onClick={ () => linkToSpeliaScan ( addressArg  )} > 
                 <>
                 <div> 
                     <span style={{ fontSize :"12px",  fontWeight:"900px", 
                        borderRadius:"3px", padding:"3px", marginTop: "2px",
                         display: "flex", flexDirection: "row", justifyContent:  "flex-start", 
                     }} >
                     {"etherscan"}   
                    < FiExternalLink  style={{marginLeft:"5px", marginTop: "2px",  fontWeight: "900", }}   />
                     </span>
                
                </div>
                </>
                

            </Box>
        {/* </Box> */}
        </StyledExternalLink>

    </BootstrapTooltip>



    )
  }

export function AddressCopyBlock  ( {addressArg} ){
    const theme = useTheme();
    //const colors = tokens(theme.palette.mode);
   

  return(
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
    

  )

}

export function ContractBalance  ( {addressArg} ){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    

      // this should be moved into the Staking DIST context provider
       const { contract } = useContract(addressArg);
       const { data: contractBalance, isLoading } = useContractRead(contract, "getBalance" )
     
    useEffect(() => {
          

           if (!contractBalance){ return; }
             
           const yy = Number( ethers.utils.formatEther( contractBalance._hex )).toFixed(2); 
           //    const yy =  ethers.utils.formatEther( contractBalance._hex ).toFixed(2)
                console.log(  "yy    ", yy   );
          

       }, [ contractBalance ]);
 

   return(
    <BootstrapTooltip  title="Reward contract Balance"  placement="left-start" >
     
       
       <Box sx={  allCSS( theme.palette.mode, "130px","0px" ).externalLink }  >
        
        
       { !isLoading && contractBalance? (
           < >
               {/* color={cool_orange}  */}
               <BiCoinStack  size={"15px"} />  
               <HorizontalSpace space={1}/> 

               <Typography  fontSize={"small"} fontWeight={"150"}> 
              {Number( ethers.utils.formatUnits(contractBalance._hex, 18)).toFixed(2)}  
              </Typography>  
        </ >
      ):(
         <Skeleton variant="rounded" width={50} height={"26px"}  />
      )}  
        
        
        
        
        
        
        
           </Box>

   </BootstrapTooltip>


   )
}