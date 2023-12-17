import {createContext, useContext,    useState, useEffect } from "react";
 
const DebugModeContext = createContext();

// will be called by component who needs ir
// this use DebugModeContext
export function useDebugModeContext() {
  return useContext(DebugModeContext);
}
 
// Remember to add this as a wrapper to the App.js
export function DebugModeProvider({ children }) {
    const [debugMode, setDebugMode] = useState(false);
   
    return (
      <DebugModeContext.Provider value={{ debugMode, setDebugMode }}>
        {children}
      </DebugModeContext.Provider>
    );
  }
  