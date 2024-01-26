import {createContext, useContext,    useState, useEffect } from "react";
import { myAppLink  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
 
 

const AppLinkContext = createContext();

export function useAppLinkContext() {
  return useContext(AppLinkContext);
}


export function AppLinkProvider({ children }) {

    const { user } = useUserContext();
   // const [appLink, setAppLink] = useState(null);
   const [referralData, setReferralCode] = useState(); // Set rowData to Array of Objects, one Object per Row

    useEffect(() => {

        if (!user)return;
        
      // Fetch appLink data from the API
      const fetchAppLinkData = async () => {
        try {
       //   console.log('>>>>>> try:  fetching appLink data ' );
         
          const response = await myAppLink(user.ID);

          //console.log('>>>>>>  referralData = ', response);
          setReferralCode(response);
         // setAppLink(response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching appLink data:', error);
        }
      };
  
      fetchAppLinkData();
    }, [user]); // Empty dependency array runs the effect once
  
    return (
      <AppLinkContext.Provider value={{
        referralData, setReferralCode
        // appLink, setAppLink 
        }}>
        {children}
      </AppLinkContext.Provider>
    );
  }
  