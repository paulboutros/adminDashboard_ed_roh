import {createContext, useContext,    useState, useEffect } from "react";
import { myDiscordInfo  } from "../data/API.js";
//import { useUserContext } from './UserContext.js'; // to get user data from context provider

 

const DiscordContext = createContext();

export function useDiscordContext() {
  return useContext(DiscordContext);
}


export function DiscordProvider({ children }) {
       // full code removed #discord #user #disabled
  }
  