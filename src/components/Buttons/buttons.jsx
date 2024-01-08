import {
   
    useToast,


  } from "@chakra-ui/react";
 
import {
    Card,
    CardContent,
    Typography,
    Input,
    Grid,
    Button,
    Skeleton,
    Box,
    TextField,
   /// makeStyles,
  } from '@mui/material';






  import {
     
    useAddress,
    
  } from "@thirdweb-dev/react";
  import {
    Discord_tokenLess_stakinContract,
     
  } from "../../const/addresses";
  import React, { useEffect, useState } from "react";
 import { useTheme } from "@emotion/react";
import { StyledWeb3Button   } from "../../theme";
import { getSDK_fromPrivateKey  } from "../../data/API";
   
  
let intervalId;
  // a button that locks until the return has fully finished a set of API calls
  export function ServerButton({children,
      tokenStakedBeforeClicking,
       action,
       onConditionMet 
       
        }) {

    const address = useAddress();
    const theme = useTheme(); 
    const [isButtonDisabled, setButtonDisabled] = useState(false);
  
    useEffect(() => {
      return () => {
        clearInterval(intervalId);
      };
    }, []); // Empty dependency array ensures the cleanup runs once when the component unmounts
  
    const buttonClicked =   ()  => {
      action();
      // Your existing logic for buttonClicked
       console.log( "calling server button function current: DISTstakedAmount = " , tokenStakedBeforeClicking );
      // Disable the button on click
      setButtonDisabled(true);
  
      // Set an interval to check the condition every 4 seconds
        intervalId = setInterval( async () => {
        // Call your API endpoint and check the condition
        // For illustration purposes, assume your API call is a function checkCondition()
         const conditionMet = await checkCondition();
  
        if (conditionMet) {
          
          console.log( "  server button condition meet. now reanable ");
          // If condition is met, do nothing and clear the interval
          clearInterval(intervalId);
  
          // Enable the button
          setButtonDisabled(false);
        }
        // Note: If the condition is not met, the interval will continue running.
      }, 4000);
    };
  
    // Replace this with your actual condition check logic
    const checkCondition = async () => {
     
      
       const sdk = getSDK_fromPrivateKey(); 
       const dist_tokenLessContract = await sdk.getContract(   Discord_tokenLess_stakinContract  );
              
       const getStakeInfo = await dist_tokenLessContract.call("getStakeInfo",[ address]);
          
       const _rewards   =    parseInt ( getStakeInfo._rewards._hex, 16);
       const tokenStaked =   parseInt ( getStakeInfo._tokensStaked._hex, 16);
           
 // console.log("compare tokenStakedBeforeClicking =", 
//  tokenStakedBeforeClicking  , " with NEW value : "  , tokenStaked);
 
       if (tokenStaked !== tokenStakedBeforeClicking){

         
        onConditionMet();
        return true;
       }else{
        return false;
       }
      //
      // console.log(  ">>>> _rewards >>>  = " , _rewards );
    //   console.log(  ">>>> tokenStaked >>>  = " , tokenStaked );
        


      // Replace this with your actual condition logic
      
    };
  
    return (
      <Button
        variant="contained"
        sx={{ backgroundColor: theme.debugModeColor }}
        onClick={buttonClicked}
        disabled={isButtonDisabled}
      >
        {children}
      </Button>
    );
  }
  


  
  export function CustWeb3Button( {children, action, onSuccess, ...props }){


    const theme = useTheme(); 

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleClick = async () => {
        // Disable the button
        setIsButtonDisabled(true);
 
            try {
            // Call the user-defined action
               if (typeof action === 'function') {

                
                const result = await action();
                
             // at the moment action() should only return a transaction, if not we will get an error
                 if (result && result.receipt && result.receipt.status === 1) {
                //if ( receipt && receipt.status === 1) {
                    const receipt = result.receipt;
                    console.log(">>>>>>>>  receipt   " , receipt);
                    onSuccess();
                 }else{

                     console.log("something went wrong");  
                 }


               }
            } catch (error) {
            // Handle errors, such as transaction failure or user rejection
                console.error('Transaction error:', error.message);
            } finally {
            // Enable the button after the action is completed or in case of an error
                 setIsButtonDisabled(false);
            }
  
      };
 
     return(
      <>
       <StyledWeb3Button 
       variant="contained"  
       {...props} 


        onClick={handleClick}
        
        disabled={isButtonDisabled}
       
       >{children}
       </StyledWeb3Button>
 
      
      </>

     )
   }
