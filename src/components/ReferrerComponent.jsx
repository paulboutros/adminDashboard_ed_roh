import { tokens } from "../theme";
import axios from "axios";
 
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider 
import CopyToClipboard  from "./CopyToClipboard";
import { useState} from "react";
import {Button, IconButton, Typography, useTheme, colors } from "@mui/material";

         
 import ButtonGroup from '@mui/material/ButtonGroup'

function ReferrerComponent( { onResult } ) {
    const [referralCode, setReferralCode] = useState('');
    const { user } = useUserContext();
  
    const [showCopyButton, setShowCopyButton] = useState(false);
   

  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const generateReferralLink = async () => {
      // Make an API call to generate a referral code and get the unique link.
      // This API call should save the referral code in your database and associate it with the referrer's account.
   

      const resultCC = 'This is the result from the child component';
    
      // Call the function passed from the parent with the result
      onResult(resultCC);

     
      const userID =  user.ID;
      const dataToSend= { 
        ID: userID ,
        one_referral_Code: "123456789test"
      }
   
        const endpoint = `${process.env.REACT_APP_API_URL}generateReferralCode`; // make it specific (filter to twitter fields)
        const result = await axios.post(endpoint, dataToSend);
    
            console.log("referal :"  +   result.data.shareableLink);
            setReferralCode(result.data.shareableLink);
            setShowCopyButton(true);
              
  
    };
  
    return (
      <div   >

<ButtonGroup variant="contained" aria-label="outlined button group" 

 
>
        <Button
               style={{
               // backgroundColor :  colors.greenAccent[500],
                  // color: colors.primary[500],

                  backgroundColor :  colors.primary[500],
                  
                   color: colors.grey[200]  ,
                        // borderColor: colors.greenAccent[500], // Set border color
                        // height: "25px",borderWidth: '2px',
                        // textTransform: 'none', // Prevent text from being transformed to uppercase
                    }}
           onClick={generateReferralLink}>
            Generate Link
            
            </Button>

             
            
                <Button
                    variant="h5"
                    fontWeight="600"
                    style={{
                       width:"350px",
                    backgroundColor: colors.primary[400],
                    color: colors.greenAccent[500],
                    
                    
                    }}
                >

                    {DisplayIsolatedCode(referralCode)}
                    {/* {referralCode ==="" ? (
                      
                     ):(
                   // <p>your referral code will appear here</p>
                     )} */}
                </Button>
               

            
 
               
                  
                  



        {/* <p>Your Referral Link: {referralCode}</p> */}
       
        <CopyToClipboard copyText={referralCode}  backgroundColor={colors.primary[600]} textColor={ colors.grey[200]}/>
     </ButtonGroup>     

      </div>
    );
  }
  export default ReferrerComponent;

  function DisplayIsolatedCode( copyText ){
    // const queryString = url.split('=')[1];
     return copyText ;//copyText.split('=')[1];
    
   }
