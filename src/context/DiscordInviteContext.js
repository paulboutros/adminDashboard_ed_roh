import {createContext, useContext,    useState, useEffect } from "react";
import { myDiscordInvite  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
 
 

const DiscordInviteContext = createContext();

export function useDiscordInviteContext() {
  return useContext(DiscordInviteContext);
}


export function DiscordInviteProvider({ children }) {

    const { user } = useUserContext();
    const [discordInvite, setDiscordInvite] = useState(null);
  
    useEffect(() => {

        
      // Fetch discordInvite data from the API
      const fetchDiscordInviteData = async () => {
        try {

          if (!user)return;
          const response = await myDiscordInvite(user.ID);
          setDiscordInvite(response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching discordInvite data:', error);
        }
      };
  
      fetchDiscordInviteData();
    }, [user]); // Empty dependency array runs the effect once
  
    return (
      <DiscordInviteContext.Provider value={{ discordInvite, setDiscordInvite }}>
        {children}
      </DiscordInviteContext.Provider>
    );
  }
  