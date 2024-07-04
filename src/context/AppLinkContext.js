import {createContext, useContext     } from "react";
//import { myAppLink  } from "../data/API.js";
//import { useUserContext } from './UserContext.js'; // to get user data from context provider
 
 

const AppLinkContext = createContext();

export function useAppLinkContext() {
  return useContext(AppLinkContext);
}


export function AppLinkProvider({ children }) {
   // full code removed #discord #user disabled 
  }
  