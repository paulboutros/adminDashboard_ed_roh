import {createContext, useContext,    useState, useEffect } from "react";
import { myDiscordInvite  } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider
import { timeAgo } from "../utils.js";
 
 
let fetchInviteLock=0;
let fetchUserGuildLock=0;
const DiscordInviteContext = createContext();

export function useDiscordInviteContext() {
  return useContext(DiscordInviteContext);
}

let callInProgress = false; // defined outside of reatc component, so value independant from rendering
export function DiscordInviteProvider({ children }) {

    const { user } = useUserContext();
    const [discordInvite, setDiscordInvite] = useState(null);
    const [discordInviteLoaded, setdiscordInviteLoaded] = useState(false);
  

    const [ joinedServerData, setJoinedServer ] = useState(); // gieaway recived but not revealed yet, and not added to layers count

    useEffect(() => {
      if (!user)return;
      

     
       const fetchUserGuild  = async () => {
        try {
         
          const endpoint_t = `${process.env.REACT_APP_API_URL}getUserGuild?ID=${user.ID}`; // make it specific (filter to twitter fields)
          const result_t = await fetch(endpoint_t);
          let response_t = await result_t.json();
          
          if ( response_t.status ){
      
            // response_t.text = "Guild Member since :" +   timeAgo(response_t.joinedAt) 
              response_t.date = timeAgo(response_t.joinedAt);
            }else{
            
             response_t.text = "Join the Wulirocks server";
           }
           setJoinedServer(   response_t   );
 

        } catch (error) {
          // Handle errors if the API call fails
          console.error('context: Error fetching discordInvite Discord server:', error);
        }
      };
      if ( fetchUserGuildLock === 0 ){

          fetchUserGuildLock = 1;
           fetchUserGuild();
      }
       

      // Fetch discordInvite data from the API
      const fetchDiscordInviteData = async () => {
        try {
         
       //  console.log('>>>>>>> Discord context:  start fetching' );
          let discordInvite_response ;
           
             
            discordInvite_response = await myDiscordInvite(user.ID);
            callInProgress = true;
         
         // console.log('>>>>>>>  context:  discordInvite_response     :',  discordInvite_response);

          setDiscordInvite(discordInvite_response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching discordInvite data:', error);
        }
      };
     if  ( fetchInviteLock === 0 ){ 
         //   fetchInviteLock = 0;
               fetchDiscordInviteData();
       }

    }, [ user]);   // Empty dependency array runs the effect once
  
    return (
      <DiscordInviteContext.Provider value={{
         discordInvite, setDiscordInvite,
          discordInviteLoaded, setdiscordInviteLoaded,
          joinedServerData, setJoinedServer
          }}>
        {children}
      </DiscordInviteContext.Provider>
    );
  }
  