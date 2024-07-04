import {createContext, useContext  } from "react";
//import { myDiscordInvite  } from "../data/API.js";
//import { useUserContext } from './UserContext.js'; // to get user data from context provider
//import { timeAgo } from "../utils.js";
 
 
//let fetchInviteLock=0;
//let fetchUserGuildLock=0;
const DiscordInviteContext = createContext();

export function useDiscordInviteContext() {
  return useContext(DiscordInviteContext);
}

 
export function DiscordInviteProvider({ children }) {
// full code removed #discord #user #disabled
  }
  