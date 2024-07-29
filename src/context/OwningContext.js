import {createContext, useContext,    useState, useEffect } from "react";
import { getSDK_fromPrivateKey } from "../data/API";
 


//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";
import { useAddress, useOwnedNFTs } from "@thirdweb-dev/react";
  //const { selectedChain, setSelectedChain } = useContext(ChainContext);
 // addressesByNetWork[selectedChain].LAYER_ADDRESS
 //=======

const OwningContext = createContext();

// will be called by component who needs ir
// this use OwningContext
export function useOwningContext() {
  return useContext(OwningContext);
}


// this provides OwningContext
export function NotificationProvider({ children }) {

     /*
    const address = useAddress(); 
    const { selectedChain  } = useContext(ChainContext);
    const [notification, setOwning] = useState(null);
    const { data, isLoading } = useOwnedNFTs( addressesByNetWork[selectedChain].LAYER_ADDRESS  , address);
 



    useEffect(() => {
        // Function to fetch NFT data
        const getit = async () => {
       
          try {
           // const sdk  = getSDK_fromPrivateKey( selectedChain); 
           // const contract = await sdk.getContract(  addressesByNetWork[selectedChain].LAYER_ADDRESS  );
          
      
          } catch (error) {
            console.error('Error fetching NFT:', error);
          }
        };
      
        
        // Call the fetch functions when component mounts
        getit();
         
      }, [ data ]); 


*/








   
    return (
      <OwningContext.Provider value={{  }}>
        {children}
      </OwningContext.Provider>
    );
  }
  