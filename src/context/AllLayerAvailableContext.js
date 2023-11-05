import {createContext, useContext,    useState, useEffect } from "react";

import { getAllLayersAvailable  } from "../data/API.js";
import { Add_owning_and_otherLayerInfo  } from "../data/API.js";
import { GetLayerSupply } from "../data/API.js";


import { useUserContext } from './UserContext.js'; // to get user data from context provider


 

const AllLayersContext = createContext();

export function useAllLayersContext() {
  return useContext(AllLayersContext);
}


export function AllLayersProvider({ children }) {

    const { user } = useUserContext();
    

    
    const [allLayers, setAllLayers] = useState(null);
    //const [layerToChooseFrom, set_layerToChooseFromUserowned] = useState( initialLayerToChooseFrom);

    useEffect( ()=>{
        // cretae basic layers available to choos efrom in the app
        const initialize = async ()=>{
            const layers  = await Create_Initial_layerToChooseFrom();
            setAllLayers(layers); 
        }
        initialize();

    }, [ user ]); // this will need to re-run when the user logout for example 

    // if logged in , add user owning data on each layer previously created
    useEffect( ()=>{
        if (!user)return;
          const _fetching = async ()=>{
          // these are  all layers available for selection, plain layers
          const updatedLayerToChooseFrom = await Add_owning_and_otherLayerInfo( user, allLayers  );
          setAllLayers(updatedLayerToChooseFrom); 
          // set_layerToChooseFromUserowned(updatedLayerToChooseFrom);
         }
     
  _fetching();
   
    
 

 }, [ user  ]);






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
async function Create_Initial_layerToChooseFrom(){



     
     // we do not need to be registered to see supply
    const allSupply = await GetLayerSupply();

    console.log( "  >>>>    GetLayerSupply  GetLayerSupply" , allSupply   );

    const categories = ['he', 'sh', 'we', 'be', 'kn'];
    const layerCount = 10+1;

    const baseObject = Array.from({ length: layerCount }, (_, index) => ({
      layerName: index , 
      // fake data to make sure all layer are not sharring refference copy data
      // will be overriden
      owning:0,// Math.floor(Math.random() * 11), 
      supply:0,// Math.floor(Math.random() * 11),   
       
    }));

    const initialLayerToChooseFrom = {};

    for (const category of categories) {
     // initialLayerToChooseFrom[category] = [...baseObject];
     // use  the follow to create a DEEp copy of base object so they are independant copies
      initialLayerToChooseFrom[category] = JSON.parse(JSON.stringify(baseObject));

      let layerIndex=0; // create a zero useless layer.. so layer 1 is index 1 
      for (const layer of initialLayerToChooseFrom[category] ) {

             
             layer.supply =  allSupply[0].layers[category][layerIndex] ; 
                
                layerIndex++;
      }
    }
       

    //initialLayerToChooseFrom["be"][0].owning = 150;
  //  initialLayerToChooseFrom["be"][0].supply = 20;
   

  console.log(">>>>>>>>>   initialLayerToChooseFrom" ,  initialLayerToChooseFrom);


    return initialLayerToChooseFrom;

}
  