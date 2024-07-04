import {createContext, useContext,    useState, useEffect } from "react";
import { getUserMe  } from "../data/API.js";

export const DISTStakeInfo ="DISTStakeInfo";
//export const DISTStakeInfoGeneral ="DISTStakeInfoGeneral";

 

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
  
  


    useEffect(() => {
      // Fetch user data from the API
      const fetchUserData = async () => {
        try {
          const response = await getUserMe();
 
         // console.log('  User context : response.data is null  >>>   setUser(null); ', response );
          setUser(response);
        } catch (error) {

          setUser(null);
          // Handle errors if the API call fails
          console.log(' setUser(null);; '  );
        //  console.error('Error fetching user data:', error);
         }
      };
  
      fetchUserData();
    }, []); // Empty dependency array runs the effect once
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  