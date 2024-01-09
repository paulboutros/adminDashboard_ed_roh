import {createContext, useContext,    useState, useEffect } from "react";
import { globalData, globalData_setDebugMode } from "../data/API";
import { useUserContext } from "./UserContext";
 
const DebugModeContext = createContext();

// will be called by component who needs ir
// this use DebugModeContext
export function useDebugModeContext() {
  return useContext(DebugModeContext);
}
 
// Remember to add this as a wrapper to the App.js
export function DebugModeProvider({ children }) {

    
  const {user} = useUserContext();

    const [debugMode, setDebugMode] = useState(false);
 
    useEffect(() => {
      if (!user)return;

      const fetch_debugMode = async () => {
          try {
            const response = await globalData();
            
            setDebugMode(response[0].debugMode);
          } catch (error) {
           
            console.error('Error fetching appLink data:', error);
          }
      };
      fetch_debugMode();
     }, [ user ]); // Empty dependency array runs the effect once

    return (
      <DebugModeContext.Provider value={{ debugMode,   setDebugMode   }}>
        {children}
      </DebugModeContext.Provider>
    );
  }
  