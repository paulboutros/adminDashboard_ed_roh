import   { useState, useEffect } from 'react';
 
import { tokens } from "../theme";
 
import { Box, Grid, Divider,  Typography, useTheme } from "@mui/material";
import { useDropTimeContext } from   '../context/DropTimeContext'; // to get user data from context provider

import { RowChildrenAlignCenter,
  VerticalStackAlignCenter ,
  VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,RowChildrenAlignLeft,
  RowChildrenAlignRight,
  VerticalSpace,
   RoundedBox,
   BoxWithTopBar,
   HorizontalSpace,
   RoundedBoxInfo
 } from "./Layout.jsx"  
 
function CountdownTimer( /*{ futureDate , GetRewardNextTime  , onCountdownFinish}*/ ) {

  const { dropTime } = useDropTimeContext();

    
 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    
    const [futureDate, setfutureDate] = useState(0);
    const [canRecall, setCanRecall] = useState(true);


    useEffect(() => {
      if (!dropTime){return; }

      setfutureDate( dropTime.NextGiveAway );
       

     
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



  export function CountdownTimerWithArg({ startTime, endTime , color }) {
    let endTimeInSecondsX = endTime - startTime;
  
     const currentTimestamp = new Date().getTime() /1000;
     endTimeInSecondsX = endTime - currentTimestamp;

     let dayText;
     const calculateTimeLeft = () => {
     const days = Math.floor(endTimeInSecondsX / (24 * 60 * 60));
     const hours = Math.floor((endTimeInSecondsX % (24 * 60 * 60)) / 3600);
     const minutes = Math.floor((endTimeInSecondsX % 3600) / 60);
     const remainingSeconds =Math.floor(endTimeInSecondsX % 60); 
    
 
     dayText  = days > 1 ? 'Days' : 'Day'; 

      if ( endTimeInSecondsX <=0 ){

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

       return { days, hours, minutes, seconds: remainingSeconds }
    };
  
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  const _variant1 ='h3';
  const _variant2 ='h5';
   

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
  
      return () => clearInterval(timer);
    }, [endTimeInSecondsX]);
  
    return (
      <div  whiteSpace="nowrap" >
       
        <div>
         
         <RowChildrenAlignLeft>
          {/* =================================================================================== */}

    {timeLeft.days >0  && (<div>
        <VerticalStackAlignLeft> 

           <Typography color={color} variant= {_variant1} >   {timeLeft.days} </Typography>

           <VerticalSpace space={2}/>  
           <Typography color={color} variant= {_variant2}  >   {dayText.toString().padStart(2, '0')}   </Typography>
           
          </VerticalStackAlignLeft>

        <HorizontalSpace space={3}/> 
        </div>)}
{/* =================================================================================== */}
            <VerticalStackAlignLeft> 
             <Typography color={color} variant= {_variant1} >   {timeLeft.hours.toString().padStart(2, '0')   }  </Typography>
            <VerticalSpace space={2}/> 
            <Typography color={color} variant= {_variant2} >   Hours  </Typography>
            
            </VerticalStackAlignLeft>

        <HorizontalSpace space={3}/> 

{/* =================================================================================== */}
           <VerticalStackAlignLeft> 
             <Typography color={color} variant= {_variant1} >   {timeLeft.minutes.toString().padStart(2, '0') } </Typography>
            <VerticalSpace space={2}/> 
            <Typography color={color} variant= {_variant2} >   Minutes  </Typography>
            
            </VerticalStackAlignLeft>

          <HorizontalSpace space={3}/>         
{/* =================================================================================== */}
<VerticalStackAlignLeft> 
             <Typography color={color} variant= {_variant1} >  {timeLeft.seconds.toString().padStart(2, '0') } </Typography>
            <VerticalSpace space={2}/> 
            <Typography color={color} variant= {_variant2} >   Secondes  </Typography>
            
            </VerticalStackAlignLeft>

          <HorizontalSpace space={3}/>         
{/* =================================================================================== */}



            </RowChildrenAlignLeft>

          
 
           
        </div>
      </div>
    );
  }
 

export default CountdownTimer;
