import {createContext, useContext,    useState, useEffect } from "react";
import { globalData, globalData_setDebugMode } from "../data/API";
 
const DebugModeContext = createContext();

// will be called by component who needs ir
// this use DebugModeContext
export function useDebugModeContext() {
  return useContext(DebugModeContext);
}
 
// Remember to add this as a wrapper to the App.js
export function DebugModeProvider({ children }) {
    const [debugMode, setDebugMode] = useState(false);


    function set_DebugMode( value ){

         globalData_setDebugMode( value);
    }

     useEffect(() => {

      const fetchAppLinkData = async () => {
          try {
            const response = await globalData();
            
            setDebugMode(response[0].debugMode);
          } catch (error) {
           
            console.error('Error fetching appLink data:', error);
          }
      };
      fetchAppLinkData();
     }, []); // Empty dependency array runs the effect once

    return (
      <DebugModeContext.Provider value={{ debugMode, set_DebugMode }}>
        {children}
      </DebugModeContext.Provider>
    );
  }
  