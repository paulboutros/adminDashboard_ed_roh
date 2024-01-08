import {createContext, useContext,    useState, useEffect } from "react";
import { getUserMe  } from "../data/API.js";

export const DISTStakeInfo ="DISTStakeInfo";
export const DISTStakeInfoGeneral ="DISTStakeInfoGeneral";

 

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
  
    const addDataToUser = (dataSource, data) => {
      setUser((prevUser) => ({
        ...prevUser,
        [dataSource]: data,
      }));
    };



    useEffect(() => {
      // Fetch user data from the API
      const fetchUserData = async () => {
        try {
          const response = await getUserMe();
          setUser(response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchUserData();
    }, []); // Empty dependency array runs the effect once
  
    return (
      <UserContext.Provider value={{ user, setUser, addDataToUser }}>
        {children}
      </UserContext.Provider>
    );
  }
  