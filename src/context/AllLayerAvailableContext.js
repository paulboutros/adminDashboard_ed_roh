import {createContext, useContext,  useState, useEffect } from "react";

import { getAllLayersAvailable , GetAllNFTfromSDK, getSDK_fromPrivateKey   } from "../data/API.js";
//import { Add_owning_and_otherLayerInfo  } from "../data/API.js";
import { GetLayerSupply } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider

import { TOOLS_ADDRESS } from "../const/addresses.ts";
import { useContract,  useOwnedNFTs, useAddress  } from "@thirdweb-dev/react";

const maxLayers = 11;
const AllLayersContext = createContext();

export function useAllLayersContext() { return useContext(AllLayersContext);}
 
 
export function AllLayersProvider({ children }) {
  
    const { user } = useUserContext();

    const { contract } = useContract(TOOLS_ADDRESS);
   
     
     
     
    
 
 
    const address = useAddress(); 
    const { data, isLoading } = useOwnedNFTs(contract, address);

    
    // we are replacing, because it seems (useNFTs) loads every 1 minute... which trigger many other useEffect
    const [NFTdata, setNFTdata] = useState(null); // what is the difference betwwen NFTdata & allLayers (this is unclear)
    const [allLayers, setAllLayers] = useState(null);
    //const { data: NFTdata }   = useNFTs(contract);    // get all neft
   

// get all Layer once, makre SURE it load ONCE 
//================================================================================================================
    async function getAllNFTs(){
      const sdk = getSDK_fromPrivateKey(); 
      const contract = await sdk.getContract(TOOLS_ADDRESS);  // , "edition"
      const nfts = await contract.erc1155.getAll();
      setNFTdata(nfts);
    }
  useEffect(() => {
     
    getAllNFTs();
  
  }, []);
//================================================================================================================




    useEffect(()=>{
       
    console.log( "allNFTs" , NFTdata);

    }, [  NFTdata  ]);

 
   
    const [ownedNftData, setOwnedNfts] = useState(null);


    //===============================================================================================================
     
   
   useEffect(()=>{
    if (!data)return;
 
     setOwnedNfts (data);

   }, [data ]);


//==============================================================================================================
 
    useEffect( ()=>{
  
       // nothing is going to load if wallet is not connected
       if (address && !ownedNftData){return;}
       if (!NFTdata){ return;} 
 
        // cretae basic layers available to choos efrom in the app
        const initialize = async ()=>{
             const layers  = await Create_Initial_layerToChooseFrom( NFTdata, ownedNftData );
             setAllLayers(layers); 
        }
        initialize();

    }, [  user,// this will need to re-run when the user logout for example 
         NFTdata, ownedNftData  // we get the supply from contract now, no more from Mongo
    ]); 

      

    return (
      <AllLayersContext.Provider value={{ allLayers, NFTdata, ownedNftData,  setAllLayers }}>
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
  

  console.log( "  Create_Initial_layerToChooseFrom   >>>>    NFTdata" ,  NFTdata   );
  


    const initialLayerToChooseFrom = {};

     

    const categories = ['he', 'sh', 'we', 'be', 'kn'];
    const layerCount = maxLayers;
    const baseObject = Array.from({ length: layerCount }, (_, index) => ({
      layerName: index , 
      tokenID:0  , 
      // fake data to make sure all layer are not sharring refference copy data
      // will be overriden
      owning:0,// Math.floor(Math.random() * 11), 
      supply:0,// Math.floor(Math.random() * 11),   
    }));

    for (const category of categories) {
       // use  the follow to create a DEEp copy of base object so they are independant copies
       initialLayerToChooseFrom[category] = JSON.parse(JSON.stringify(baseObject));
    }

//================================================================================

  
 let ownerLayerFound = 0;

  
 for ( let i = 0 ; i < NFTdata.length; i++  ){ 
 
      const nft  =  NFTdata[i];
   
        if  ( !nft.metadata.attributes  ){console.log(  "  attribute of  :" ,  i , " is  undefined  "); continue; }
 
 
             const category     = nft.metadata.attributes[0].trait_type ;
            const layerNumber  = nft.metadata.attributes[0].value ;   
            const supply       = nft.supply;
 
            initialLayerToChooseFrom[category][layerNumber].supply = supply;
            initialLayerToChooseFrom[category][layerNumber].tokenID = nft.metadata.id ;
          
  };
    
  //ownedNftData will be NULL is address is not conencted, so [meta.value].owning will keep initial value of 0
  if (ownedNftData ){
    for ( let i = 0 ; i < ownedNftData.length; i++  ){ 

     const ownedNFT =ownedNftData[i];
      if  ( !ownedNFT.metadata.attributes ){  console.log(  " ownedNFT attribute of  :" ,  i , " is  undefined  "); continue;  }
     
      const meta = ownedNFT.metadata.attributes[0];
      initialLayerToChooseFrom[ meta.trait_type][meta.value].owning = ownedNFT.quantityOwned;
       
      };
  } 
  
//=====================================================================================
 
    return initialLayerToChooseFrom;

}
  