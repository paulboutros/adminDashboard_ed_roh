import {createContext, useContext,    useState, useEffect } from "react";
import { myAppLink  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
 
 

const AppLinkContext = createContext();

export function useAppLinkContext() {
  return useContext(AppLinkContext);
}


export function AppLinkProvider({ children }) {

    const { user } = useUserContext();
    const [appLink, setAppLink] = useState(null);
  
    useEffect(() => {

      //console.log('>>>>>>  fetching appLink data for user:', user);
       if (!user)return;
        
      // Fetch appLink data from the API
      const fetchAppLinkData = async () => {
        try {

         
          const response = await myAppLink(user.ID);
          setAppLink(response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching appLink data:', error);
        }
      };
  
      fetchAppLinkData();
    }, [user]); // Empty dependency array runs the effect once
  
    return (
      <AppLinkContext.Provider value={{ appLink, setAppLink }}>
        {children}
      </AppLinkContext.Provider>
    );
  }
  