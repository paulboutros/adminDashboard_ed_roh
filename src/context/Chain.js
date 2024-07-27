import { createContext } from "react";

const ChainContext = createContext({  selectedChain: "sepolia",setSelectedChain: function(chain) {}   });
  
  


export default ChainContext;
