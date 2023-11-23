import {createContext, useContext,    useState, useEffect } from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import {  useAddress } from "@thirdweb-dev/react";

import metadataList from "../metadata/nftmetadata.json"
import { TOOLS_ADDRESS } from "../const/addresses.ts";


const NftContext = createContext();

export function useNftContext() {
  return useContext(NftContext);
}


export function NftProvider({ children }) {
    const [allNft, setAllNft] = useState(null);
    const { contract } = useContract(TOOLS_ADDRESS);


    useEffect(() => {
      // Fetch nft data from the API
      async function GetAllNFTfromSDK(contract){
       
        const nfts = await contract.erc1155.getAll();
 
      let index = 0;
        metadataList.forEach(element => {
        // console.log( ">>>>> meta ", index, "=", element.metadata);
      //  if ( element.metadata.attributes === undefined ){

          console.log( ">>>>> meta JSON  ", index, "=", element.metadata);
      //  }
         index++;

       });
       for (let i = 0; i < nfts.length; i++) {
        // Append metadata properties to each NFT
        nfts[i].metadata = metadataList[i].metadata;
        // You can append more properties as needed
      }

      setAllNft(nfts);
     
      //  setNFT(nfts);
       
      
      }    
      GetAllNFTfromSDK(contract);


    }, [contract]); // Empty dependency array runs the effect once
  
    return (
      <NftContext.Provider value={{ allNft, setAllNft }}>
        {children}
      </NftContext.Provider>
    );
  }
  