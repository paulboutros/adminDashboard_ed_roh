import   { useState, useEffect } from 'react';
 
import { tokens } from "../theme";
 
import { Box, Grid, Divider,  Typography, useTheme } from "@mui/material";
import { useDropTimeContext } from   '../context/DropTimeContext'; // to get user data from context provider

  
 
function CountdownTimer( /*{ futureDate , GetRewardNextTime  , onCountdownFinish}*/ ) {

  const { dropTime } = useDropTimeContext();

    
 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    const [futureDate, setfutureDate] = useState(0);
    const [canRecall, setCanRecall] = useState(true);


    useEffect(() => {
      if (!dropTime){return; }

      setfutureDate( dropTime.NextGiveAway );
      
    //  GetRewardNextTime ={GetRewardNextTime} 
   //  onCountdownFinish={handleCountdownFinish}

/*
     const giveAwayTiming = {
      NextGiveAway: timing_response.giveAwayTiming.NextGiveAway,
      frequency:frequency,
      lastGiveAway: lastGiveAway, 
      Next_Drop_title: `NextGiveAway \n every:${frequency}`   
 };
*/




     
    }, [dropTime]);





    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const futureTime = new Date(futureDate).getTime();
      const difference = futureTime - now;
  
     

     if (difference <= 0) {
            
         if (canRecall) {
          //onCountdownFinish(); 
       
           setCanRecall(false);
      }


        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
  
      let seconds = Math.floor(difference / 1000);
      const days = Math.floor(seconds / (24 * 60 * 60));
      const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((seconds % (60 * 60)) / 60);
      seconds %= 60;
  
      if (difference > 0) {
        if (!canRecall) {
            setCanRecall(true); // Reset canRecall when timeLeft is greater than 0
        }
      }
  

      return { days, hours, minutes, seconds };
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearTimeout(timer);
    }, [timeLeft]);
  
    return (
      <div>
        {timeLeft.days > 0 && (
          <div>
            {timeLeft.days} {timeLeft.days === 1 ? 'day' : 'days'}
          </div>
        )}
        <div>
          {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>
    );
  }





export default CountdownTimer;
