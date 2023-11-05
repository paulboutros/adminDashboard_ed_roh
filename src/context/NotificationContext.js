import {createContext, useContext,    useState, useEffect } from "react";
 
const NotificationContext = createContext();

// will be called by component who needs ir
// this use NotificationContext
export function useNotificationContext() {
  return useContext(NotificationContext);
}


// this provides NotificationContext
export function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
   
    return (
      <NotificationContext.Provider value={{ notification, setNotification }}>
        {children}
      </NotificationContext.Provider>
    );
  }
  