 
 
import {
    
    Button,
     
    CircularProgress,
    LinearProgress,
   /// makeStyles,
  } from '@mui/material';
 
  import React, { useEffect, useState } from "react";
 import { useTheme } from "@emotion/react";
import { StyledCircularProgress, StyledWeb3Button, tokens   } from "../../theme";
 
 
   
  
let intervalId;
  // a button that locks until the return has fully finished a set of API calls
  export function ServerButton({children,
      
       action,
       onConditionMet,
       checkCondition,
       ...props 
       
        }) {

   
    const theme = useTheme(); 
    const colors = tokens(theme.palette.mode);
    const [isButtonDisabled, setButtonDisabled] = useState(false);
  
    useEffect(() => {
      return () => {
        clearInterval(intervalId);
      };
    }, []); // Empty dependency array ensures the cleanup runs once when the component unmounts
  
    const buttonClicked = () => {
      action();
      // Your existing logic for buttonClicked
      // console.log( "calling server button function current: DISTstakedAmount = " , tokenStakedBeforeClicking );
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
  
          onConditionMet(  conditionMet  );
          // Enable the button
          setButtonDisabled(false);
        }
        // Note: If the condition is not met, the interval will continue running.
      }, 4000);
    };
  
    // Replace this with your actual condition check logic
  
  
    return (
      <Button

        variant="contained"
        sx={{ backgroundColor: theme.debugModeColor , width: props.width  }}
        onClick={buttonClicked}
        disabled={isButtonDisabled}
         
      >

        { }
        {/* {!isButtonDisabled ?  <CircularProgress size='20px'  variant="indeterminate" color="success"    /> : children   }   */}
        {isButtonDisabled ?  <StyledCircularProgress size='20px'  variant="indeterminate"  /> : children   }  
        
        {/* {!isButtonDisabled ?  <LinearProgress   variant="indeterminate" color="success" /> : children   }   */}


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
