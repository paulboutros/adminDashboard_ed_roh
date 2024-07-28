import {createContext, useContext,  useState, useEffect } from "react";

import {   getSDK_fromPrivateKey   } from "../data/API.js";
 


 
import { useContract,  useOwnedNFTs, useAddress  } from "@thirdweb-dev/react";

//=======
import ChainContext from "../context/Chain.js";
import { addressesByNetWork } from "../scenes/chainSelection/index.jsx";
 //const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======





const maxLayers = 11;
const AllLayersContext = createContext();

export function useAllLayersContext() { return useContext(AllLayersContext);}
 
 
export function AllLayersProvider({ children }) {
  
    const { selectedChain  } = useContext(ChainContext);
    const { contract } = useContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);
  
    const address = useAddress(); 
    const { data, isLoading } = useOwnedNFTs(contract, address);

    
    // we are replacing, because it seems (useNFTs) loads every 1 minute... which trigger many other useEffect
    const [NFTdata, setNFTdata] = useState(null); // what is the difference betwwen NFTdata & allLayers (this is unclear)
    const [allLayers, setAllLayers] = useState(null);
     
   
    const [infoMap, setInfoMap] = useState(null);
     


  
    


// get all Layer once, makre SURE it load ONCE 
//================================================================================================================
    async function getAllNFTs(){
      const sdk = getSDK_fromPrivateKey(selectedChain); 
      const contract = await sdk.getContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);  // , "edition"
      const nfts = await contract.erc1155.getAll();
 

    


      setNFTdata(nfts);
    }


  useEffect(() => {
     
    getAllNFTs();
  
  }, []);
//================================================================================================================

    
    const [ownedNftData, setOwnedNfts] = useState(null);


    //===============================================================================================================
     
   
   useEffect(()=>{
    if (!data)return;
 
    // 60: it could be any large number, make sure the number os superior to the total amount of design
      const infoMapTempX =  Array(60).fill(0).map(() => ({ supply: 0, quantityOwned: 0 }));
  

      for (let e = 0; e < data.length; e++ ){
 
        infoMapTempX[ data[e].metadata.id ] = {  supply:  data[e].supply   ,  quantityOwned:   data[e].quantityOwned   }; 
         
      }
      
    // this is used by ImageSeelctor legend: sh 1, he 2, we 0 etc...
      setInfoMap( infoMapTempX  );
 

     setOwnedNfts (data);

   }, [data]);


//==============================================================================================================
 /*
    useEffect( ()=>{
  
       // nothing is going to load if wallet is not connected
       if (address && !ownedNftData){return;}
       if (!NFTdata){ return;} 
 
        // cretae basic layers available to choose from in the app
        const initialize = async ()=>{
             const layers  = await Create_Initial_layerToChooseFrom( NFTdata, ownedNftData );
 
             setAllLayers(layers); 
        }
        initialize();

    }, [  // user,// this will need to re-run when the user logout for example 
         NFTdata, ownedNftData  // we get the supply from contract now, no more from Mongo
    ]); 
*/
      

    return (
      <AllLayersContext.Provider value={{infoMap, allLayers, NFTdata, ownedNftData,  setAllLayers }}>
        {children}
      </AllLayersContext.Provider>
    );
  }


//[1] (These will be displayed if user is not logged in)
/* build genrate basic list of all layers available in the App regardless of whether we are a Guest or a register user
NO API call for this

//[2] (These will be displayed if user is not logged in , will override or add extra user specific info on each layers)
 later  we want to display supply, and apply owning per layer info, if user is registered
 calling API Add_owning_and_otherLayerInfo()

*/
 
//if address is not connected, ownedNftData will be NULL, so "we" or the "user" owns nothing
async function Create_Initial_layerToChooseFrom( NFTdata, ownedNftData ){
    // the code was moved to  ImageSeelctor.cs 

}
  