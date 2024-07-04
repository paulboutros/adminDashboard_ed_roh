import {createContext, useContext,    useState, useEffect } from "react";
//import { useUserContext } from './UserContext.js'; // to get user data from context provider
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
    
    //const { user } = useUserContext();

     
   

   
    return (
      <DropTimeContext.Provider value={{ dropTime, setDropTime }}>
        {children}
      </DropTimeContext.Provider>
    );
  }
  