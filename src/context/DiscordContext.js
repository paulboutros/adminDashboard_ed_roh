import {createContext, useContext,    useState, useEffect } from "react";
import { myDiscordInfo  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider



 

const DiscordContext = createContext();

export function useDiscordContext() {
  return useContext(DiscordContext);
}


export function DiscordProvider({ children }) {
    const [discord, setDiscord] = useState(null);
  
    const { user } = useUserContext();

    useEffect(() => {
      // Fetch user data from the API
      const fetchDiscordData = async () => {
        try {

           if (!user)return;
          const response = await myDiscordInfo(user.ID);

          setDiscord( response[0] );
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching Discord data:', error);
        }
      };
  
      fetchDiscordData();
    }, [user]); // Empty dependency array runs the effect once
  
    return (
      <DiscordContext.Provider value={{ discord, setDiscord }}>
        {children}
      </DiscordContext.Provider>
    );
  }
  