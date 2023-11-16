import {createContext, useContext,    useState, useEffect } from "react";

import { getAllLayersAvailable  } from "../data/API.js";
import { Add_owning_and_otherLayerInfo  } from "../data/API.js";
import { GetLayerSupply } from "../data/API.js";
import { useUserContext } from './UserContext.js'; // to get user data from context provider

import { TOOLS_ADDRESS } from "../const/addresses.ts";
import { useContract, useNFTs } from "@thirdweb-dev/react";

const maxLayers = 11;
const AllLayersContext = createContext();

export function useAllLayersContext() { return useContext(AllLayersContext);}
 



export function AllLayersProvider({ children }) {
  
    const { user } = useUserContext();

    const { contract } = useContract(TOOLS_ADDRESS);
    const { data: NFTdata } = useNFTs(contract);

    //console.log(  "  AllLayersProvider         NFTdata   "   , NFTdata);
    
    const [allLayers, setAllLayers] = useState(null);
    //const [layerToChooseFrom, set_layerToChooseFromUserowned] = useState( initialLayerToChooseFrom);

    useEffect( ()=>{



      if (!NFTdata){ return};

     
        // cretae basic layers available to choos efrom in the app
        const initialize = async ()=>{
            const layers  = await Create_Initial_layerToChooseFrom( NFTdata );
            setAllLayers(layers); 
        }
        initialize();

    }, [  user,// this will need to re-run when the user logout for example 
         NFTdata  // we get the supply from contract noe, no more from Mongo
    ]); 



    // if logged in , add user owning data on each layer previously created with " Create_Initial_layerToChooseFrom "
    useEffect( ()=>{
        if (!user)return;
        if (!allLayers)return;
          const _fetching = async ()=>{
          // these are  all layers available for selection, plain layers
          const updatedLayerToChooseFrom = await Add_owning_and_otherLayerInfo( user, allLayers  );
          setAllLayers(updatedLayerToChooseFrom); 
          // set_layerToChooseFromUserowned(updatedLayerToChooseFrom);
         }
       //NFTdata
        _fetching();
    
 }, [ user, allLayers  ]);






    /*
    useEffect(() => {
      // Fetch allLayers data from the API
      const fetchAllLayersData = async () => {
        try {

          if (!user)return; 
          const response = await getAllLayersAvailable();
          setAllLayers(response);
        } catch (error) {
          // Handle errors if the API call fails
          console.error('Error fetching allLayers data:', error);
        }
      };
  
      fetchAllLayersData();
    }, [ user ]); // Empty dependency array runs the effect once
  */


    return (
      <AllLayersContext.Provider value={{ allLayers, setAllLayers }}>
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
async function Create_Initial_layerToChooseFrom( NFTdata ){
  
    const initialLayerToChooseFrom = {};

     // we do not need to be registered to see supply
    const allSupply = await GetLayerSupply();

    console.log( "  >>>>    GetLayerSupply  GetLayerSupply" , allSupply   );

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
      // initialLayerToChooseFrom[category] = [...baseObject];
      // use  the follow to create a DEEp copy of base object so they are independant copies
       initialLayerToChooseFrom[category] = JSON.parse(JSON.stringify(baseObject));
    }

//================================================================================

console.log( "  >>>>    Create_Initial_layerToChooseFrom " , NFTdata   );
 
NFTdata.forEach((nft) => {
  // console.log(`Token ID: ${nft.id}, Supply: ${nft.supply}`);
 
  console.log("Token ID: ",    nft.metadata.id  , 
               "trait_type:   ",  nft.metadata.attributes[0].trait_type ,
              "value:   ",  nft.metadata.attributes[0].value,   
               "supply:   " ,  nft.supply  
             
             );
             const category     = nft.metadata.attributes  [0].trait_type ;
            const layerNumber  = nft.metadata.attributes[0].value ;   
            const supply       = nft.supply;


            initialLayerToChooseFrom[category][layerNumber].supply = supply;
            initialLayerToChooseFrom[category][layerNumber].tokenID = nft.metadata.id ;
            

            console.log(">>>>   initialLayerToChooseFrom[category][layerNumber].supply" , 
              initialLayerToChooseFrom[category][layerNumber].supply)
              
             
              ;

  });
   


  console.log(">>>> NFT   >>>>>   initialLayerToChooseFrom" ,  initialLayerToChooseFrom);




//=====================================================================================
    
/*
    for (const category of categories) {
     // initialLayerToChooseFrom[category] = [...baseObject];
     // use  the follow to create a DEEp copy of base object so they are independant copies
      initialLayerToChooseFrom[category] = JSON.parse(JSON.stringify(baseObject));

      let layerIndex=0; // create a zero useless layer.. so layer 1 is index 1 
      for (const layer of initialLayerToChooseFrom[category] ) {

             
          //   layer.supply =  allSupply[0].layers[category][layerIndex] ; 
                
                layerIndex++;
      }
    }
    */
  //console.log(">>>>>>>>>   initialLayerToChooseFrom" ,  initialLayerToChooseFrom);


    return initialLayerToChooseFrom;

}
  