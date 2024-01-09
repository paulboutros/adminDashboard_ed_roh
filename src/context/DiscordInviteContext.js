import {createContext, useContext,    useState, useEffect } from "react";
import { myDiscordInvite  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
 
 

const DiscordInviteContext = createContext();

export function useDiscordInviteContext() {
  return useContext(DiscordInviteContext);
}

let callInProgress = false; // defined outside of reatc component, so value independant from rendering
export function DiscordInviteProvider({ children }) {

    const { user } = useUserContext();
    const [discordInvite, setDiscordInvite] = useState(null);
    const [discordInviteLoaded, setdiscordInviteLoaded] = useState(false);
  
    useEffect(() => {
      if (!user)return;
        
      // Fetch discordInvite data from the API
      const fetchDiscordInviteData = async () => {
        try {

         
        //  if (!discordInviteLoaded)return;
           //   setdiscordInviteLoaded(true);
          let discordInvite_response ;
          
         //  if (!callInProgress){
            console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  context:  discordInvite:',  discordInvite);
           discordInvite_response = await myDiscordInvite(user.ID);
           callInProgress = true;
         //  }
         
          setDiscordInvite(discordInvite_response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching discordInvite data:', error);
        }
      };
  
      fetchDiscordInviteData();
    }, [ user]);   // Empty dependency array runs the effect once
  
    return (
      <DiscordInviteContext.Provider value={{ discordInvite, setDiscordInvite , discordInviteLoaded, setdiscordInviteLoaded  }}>
        {children}
      </DiscordInviteContext.Provider>
    );
  }
  