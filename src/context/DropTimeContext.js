import {createContext, useContext,    useState, useEffect } from "react";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
import { formatTimestampToCustomFormat ,  formatMilliseconds} from  "../utils.js"


const DropTimeContext = createContext();



// will be called by component who needs ir
// this use NotificationContext
export function useDropTimeContext() {
  return useContext(DropTimeContext);
}


// this provides NotificationContext
export function DropTimeProvider({ children }) {
    const [dropTime, setDropTime] = useState(null);
    
    const { user } = useUserContext();

    
    const GetRewardNextTimeAPI = async () =>{

        if (!user){return;}
    
      const userID =  user.ID;
        const timing_endpoint = `${process.env.REACT_APP_API_URL}GetRewardNextTime?ID=${userID}`;  
        const timing_result = await fetch(timing_endpoint);
        let timing_response = await timing_result.json();
    
        return timing_response;
       }
  
    useEffect(() => {

 

   const GetRewardNextTime = async () =>{

   
    if (!user){return;}
  
    //const userID =  user.ID;
    
    let timing_response = await GetRewardNextTimeAPI();
    
   const giveawayFrequency =  
         timing_response.giveAwayTiming.frequency ;// 7 * 60 * 60 * 1000; // Assuming the frequency is 1 hour, convert to milliseconds
     
       //   setNotification(new Date());
   
        
        //   console.log("NextGiveAwayTime ",  timing_response.giveAwayTiming.NextGiveAway );
       //     console.log("frequency        ",  timing_response.giveAwayTiming.frequency );
  
  
    const lastGiveAway =  formatTimestampToCustomFormat( timing_response.giveAwayTiming.lastGiveAway  );
       const frequency = formatMilliseconds(giveawayFrequency);
   
             const giveAwayTiming = {
                  NextGiveAway: timing_response.giveAwayTiming.NextGiveAway,
                  frequency:frequency,
                  lastGiveAway: lastGiveAway, 
                  Next_Drop_title: `NextGiveAway \n every:${frequency}`   
             };
  
  
             setDropTime(giveAwayTiming);
  
           return timing_response;
   }
   GetRewardNextTime();
 

    }, [ user ]); // Empty dependency array runs the effect once










   
    return (
      <DropTimeContext.Provider value={{ dropTime, setDropTime }}>
        {children}
      </DropTimeContext.Provider>
    );
  }
  