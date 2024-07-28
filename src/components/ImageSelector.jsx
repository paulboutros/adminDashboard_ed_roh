
import   React, { useEffect , useState } from 'react';
   
import {  Box,  colors,    } from "@mui/material";
   
import { useAllLayersContext } from '../context/AllLayerAvailableContext.js'; 

 import LayerBaseInfo from "./LayerBaseInfo.jsx";
import { useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react';
  
  //=======
import ChainContext from "../context/Chain.js";
import { addressesByNetWork } from "../scenes/chainSelection/index.jsx";
import { useContext } from 'react';
import { getSDK_fromPrivateKey } from '../data/API.js';
 //const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======

const maxLayers = 11;
// get all layers from user, and update to add owning, and supply info for
// also update selected image so they match the default character combination
const ImageSelector = ({   setSelectedImages, selectedImages  }) => {
  






    const [NFTdata, setNFTdata] = useState(null); // what is the difference betwwen NFTdata & allLayers (this is unclear)
    const [allLayers, setAllLayers] = useState(null);
    const { selectedChain, setSelectedChain } = useContext(ChainContext);
    const address = useAddress(); 
    const { contract } = useContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);
    
     

    const { data, isLoading } = useOwnedNFTs(contract, address);
    const [ownedNftData, setOwnedNfts] = useState(null);
    useEffect(()=>{
        if (!data)return;
          setOwnedNfts (data);
    
       }, [data]);





// get all Layer once, makre SURE it load ONCE 
//================================================================================================================
async function getAllNFTs(){

   
    const sdk = getSDK_fromPrivateKey(selectedChain); 
    const contract = await sdk.getContract(addressesByNetWork[selectedChain].LAYER_ADDRESS);  // , "edition"
    const nfts = await contract.erc1155.getAll();


    console.log("ImageSelector: getAllNFTs  getAllNFTs   ",  nfts );


    setNFTdata(nfts);
  }




  
useEffect(() => {
   
  getAllNFTs();

}, []);
//================================================================================================================

 







    useEffect( ()=>{
  


      
         
        // nothing is going to load if wallet is not connected
        if (address && !ownedNftData){return;}
        if (!NFTdata){ return;} 
  


        // console.log(  " address =====  " ,  address  );
        // console.log(  " ownedNftData =====  " ,   ownedNftData  );
        // console.log(  " NFTdata =====  " ,   NFTdata  );

         // cretae basic layers available to choose from in the app
         const initialize = async ()=>{
              const layers  = await Create_Initial_layerToChooseFrom( NFTdata, ownedNftData );
  

              console.log(  " Create_Initial_layerToChooseFrom =====  " ,   layers  );

              setAllLayers(layers); 
         }
         initialize();
 
     }, [  // user,// this will need to re-run when the user logout for example 
          NFTdata, ownedNftData  // we get the supply from contract now, no more from Mongo
     ]); 

 


    // const { allLayers} = useAllLayersContext(); 
   
 
    const _layerSelectorScrollareaHeight =520;
    
   // getlayer supply should only change when a new layer is given away
    useEffect( ()=>{
     console.log(  " ImageSelector allLayers  =====  " , allLayers  );
      
       if (!allLayers || allLayers.lenght === 0)return;
       if ( allLayers.he === null ) return;
       if ( allLayers.sh === null ) return;
       if ( allLayers.we === null ) return;
       if ( allLayers.be === null ) return;
       if ( allLayers.kn === null ) return;
       const indexTotal = allLayers.he.length + allLayers.sh.length + allLayers.we.length + allLayers.be.length + allLayers.kn.length;
       if (indexTotal !== 55)return; // to make sure they are all length of 11
       setSelectedImages(null);
 
        
          // from 1 to 11
          
         // console.log( "Image COmposer:    allLayers   =  "  ,  allLayers   );
      // not that sometimes it reached this part of code code while
      //allLayers.lenght   so we added a check
       let he_rand = Math.floor(Math.random() * 10)+1;    const he = allLayers.he[he_rand];
       let sh_rand = Math.floor(Math.random() * 10)+1;    const sh = allLayers.sh[sh_rand];
 
       let we_rand = Math.floor(Math.random() * 10)+1;    const we = allLayers.we[we_rand];
       let be_rand = Math.floor(Math.random() * 10)+1;    const be = allLayers.be[be_rand];
 
       let kn_rand = Math.floor(Math.random() * 10)+1;    const kn = allLayers.kn[kn_rand];
       
       
       setSelectedImages( {
         forearn: [{ imagePath:GetCharacterBodyPartImage("fa",1),  layerName: 1, owning:0 }],  // Example image paths
         bo:      [{ imagePath:GetCharacterBodyPartImage("bo",1),  layerName: 1, owning:0 }], // Example image paths
 
         kn:      [{ imagePath: GetCharacterBodyPartImage("kn", kn_rand),  layerName: kn_rand, owning:kn.owning, tokenID:kn.tokenID  }], // Example image paths
         be:      [{ imagePath: GetCharacterBodyPartImage("be", be_rand),  layerName: be_rand, owning:be.owning, tokenID:be.tokenID  }],  // Example image paths
         we:      [{ imagePath: GetCharacterBodyPartImage("we", we_rand),  layerName: we_rand, owning:we.owning, tokenID:we.tokenID  }], // Example image paths
         
         collar:  [{ imagePath: GetCharacterBodyPartImage("co",1),  layerName: 1, owning:0 }], // Example image paths
         he:      [{ imagePath: GetCharacterBodyPartImage("he", he_rand),  layerName: he_rand, owning:he.owning, tokenID:he.tokenID  }], // Example image paths
         sh:      [{ imagePath: GetCharacterBodyPartImage("sh", sh_rand),  layerName: sh_rand, owning:sh.owning, tokenID:sh.tokenID  }]   // Example image paths
         
         
       }
          
       );
  
     
     }, [ allLayers ]);
  
   function GetCharacterBodyPartImage( category, designNumber ){
 
    return `layersForCharacterCompo/${category}/${designNumber }.png`;
 }
    //setSelectedImages which is SetSelected image passed by parent component
    // will update images once we click on one image fromlayer selection bowar
   const handleImageSelect = (category, obj   ) => {
 
     const image = GetCharacterBodyPartImage( category, obj.layerName );// `${category}/${obj.layerName }.png`
   
      console.log(  " handle image select : " , obj  );
           
          
    //    sendTracking(user , category, image, "setSelectedImages" ,  "ComposedCharacter " );
   
        const updatedSelectedImages = { ...selectedImages };
  
        if (!updatedSelectedImages.hasOwnProperty(category)) {
          throw new Error(`Category '${category}' does not exist in selectedImages.`);
        }
         
      
  
         updatedSelectedImages[category] = [
           {
             ...obj,//updatedSelectedImages[category][0], // Shallow copy of the existing object
             imagePath:   image // Update the imagePath property
           }
         ];
  
  
          
        
          setSelectedImages(updatedSelectedImages);
    
  
      };
     
   
     return (
       
     //  <Box maxHeight="calc(100vh)"  overflow="auto" >
        <Box m="0 0 0 0" height= {_layerSelectorScrollareaHeight} > 
     <React.Fragment> 
       { allLayers ? ( 
            <LayerBaseInfo   
            
              layerToChooseFrom={ allLayers}   
              handleImageSelect ={handleImageSelect} 
             colors ={colors}
             />
             ):(
 
                <p> allLayers are loading... </p>
             )
       }
       </React.Fragment>
         </Box> 
       // </Box>
       
 
 
     );
 };
 export default ImageSelector;



 
//if address is not connected, ownedNftData will be NULL, so "we" or the "user" owns nothing
async function Create_Initial_layerToChooseFrom( NFTdata, ownedNftData ){
  

    const initialLayerToChooseFrom = {};
 
    const categories = ['he', 'sh', 'we', 'be', 'kn'];
    const layerCount = maxLayers;
    const baseObject = Array.from({ length: layerCount }, (_, index) => ({
       layerName: index , 
       tokenID:0  , 
      
      // will be overriden
      owning:0,// Math.floor(Math.random() * 11), 
      supply:0,// Math.floor(Math.random() * 11),
         
    }));

    for (const category of categories) {
       // use  the follow to create a DEEp copy of base object so they are independant copies
        
       initialLayerToChooseFrom[category] = JSON.parse(JSON.stringify(baseObject));
    }

 
//================================================================================
//console.log("XXX   snapshotBeforeModification: ",  initialLayerToChooseFrom );
 //const snapshotBeforeModification = JSON.parse(JSON.stringify(initialLayerToChooseFrom));
  
 
 console.log(  " Image Selector attribute of  :" ,  NFTdata  );
 for ( let i = 0 ; i < NFTdata.length; i++  ){ 
 
      const nft  =  NFTdata[i];
   
      if  ( !nft.metadata.attributes  ){ console.log(  "  attribute of  :" ,  i , " is  undefined  "); continue; }
  
            const layerNumber  = nft.metadata.attributes.attributes[0].value ;   
            const category     = nft.metadata.attributes.attributes[0].trait_type ;
            const supply       = nft.supply;
  
          
             let numberValue = parseInt(layerNumber);
             initialLayerToChooseFrom[category][  numberValue ].supply = supply;
             initialLayerToChooseFrom[category][  numberValue ].tokenID = nft.metadata.id ;
          
          

           
  };

   const sssss = JSON.parse(JSON.stringify(initialLayerToChooseFrom));
  
    
  //ownedNftData will be NULL is address is not conencted, so [meta.value].owning will keep initial value of 0
  if (ownedNftData ){
    for ( let i = 0 ; i < ownedNftData.length; i++  ){ 

     const ownedNFT =ownedNftData[i];
      if  ( !ownedNFT.metadata.attributes ){  
        // console.log(  " ownedNFT attribute of  :" ,  i , " is  undefined  ");
         continue; 
        
        }
     
       const meta = ownedNFT.metadata.attributes[0];
      initialLayerToChooseFrom[ meta.trait_type][meta.value].owning = ownedNFT.quantityOwned;
       
      };
  } 
   
//=====================================================================================
console.log(  " >>> NFTdata =====  " ,  NFTdata  );
console.log(  ">>> ownedNftData =====  " ,  ownedNftData  );

    return initialLayerToChooseFrom;

}
  