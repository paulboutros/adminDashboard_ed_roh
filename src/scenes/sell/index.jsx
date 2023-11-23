import { Box, Button, Card, Container, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { ThirdwebNftMedia, lightTheme, useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

import { 
    MARKETPLACE_ADDRESS,
    TOOLS_ADDRESS 
} from "../../const/addresses";
//import type { NFT as NFTType } from "@thirdweb-dev/sdk";
//import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import NFTGrid from "../../components/NFTGrid";
import SaleInfo from "../../components/SaleInfo";
import { GetAllNFTfromSDK } from "../../data/API.js"

import { useAllLayersContext } from '../../context/AllLayerAvailableContext.js'; // to get user data from context provider


export default function Sell() {
    const { contract } = useContract(TOOLS_ADDRESS);
    const address = useAddress();



     const { data, isLoading } = useOwnedNFTs(contract, address);
     const [selectedNFT, setSelectedNFT] = useState();

    //const { ownedNftData } = useAllLayersContext();
    const [ownedNfts, setOwnedNfts] = useState(null);
    /*
    
       useEffect(()=>{
         async function get(){
             const result =  await  GetAllNFTfromSDK(address);
             setAllOwnedNFTs(result);
             console.log( "owner result",   result  );
        }
       
       get();
        
     }, [   ]);
     */   
     const [allNFTs, setAllNFTs] = useState();
     useEffect(()=>{
       async function get(){
           const result =  await  GetAllNFTfromSDK(data);
          // setAllNFTs(result);
           setOwnedNfts(result);
        console.log( "owned  with metadata added = ", result    );
      }
      
      get();
       
    }, [data]);



     useEffect(()=>{ 
        if ( !data)return;


        data.forEach(element => {
             
                if ( element.metadata.uri ===""){ 

                    console.log( " missing uri for token id  = ",  element.metadata.id  );
                    console.log( "element.metadata  = ",  element.metadata   );
                }

          });
           
       

     }, [  data ]);




     useEffect(()=>{ 
       // if ( !ownedNftData){

         //   console.log( "ownedNftData  = ", ownedNftData );
     //   }

     }, [   ]);

 
      return (
        // <div>  this was disabled to temporarily to fix the metadata nft bug, you can turn it back if fixed</div>
      
        ownedNfts   ?(
            <Container maxW={"1200px"} p={5}>
            <Heading>Sell NFTs</Heading>
            <Text>Select which NFT to sell below.</Text>
            {!selectedNFT ? (
                <NFTGrid
                    NFTdata={ownedNfts}
                    isLoading={false}
                    overrideOnclickBehavior={(nft) => {
                        setSelectedNFT(nft);
                    }}
                    emptyText={"You don't own any NFTs yet from this collection."}
                />
            ) : (
                <Flex justifyContent={"center"} my={10}>
                    <Card w={"75%"}>
                        <SimpleGrid columns={2} spacing={10} p={5}>
                            <ThirdwebNftMedia
                                metadata={selectedNFT.metadata}
                                width="100%"
                                height="100%"
                            />
                            <Stack>
                                <Flex justifyContent={"right"}>
                                    <Button
                                        onClick={() => {
                                            setSelectedNFT(undefined);
                                        }}
                                    >X</Button>
                                </Flex>
                                <Heading>{selectedNFT.metadata.name}</Heading>
                                <SaleInfo
                                    nft={selectedNFT}
                                />
                            </Stack>
                        </SimpleGrid>
                    </Card>
                </Flex>
            )}
        </Container>
        ):(
          <div>  ccccc</div>
        )
       
     )
 

     if (ownedNfts){
        return (
            <Container maxW={"1200px"} p={5}>
                <Heading>Sell NFTs</Heading>
                <Text>Select which NFT to sell below.</Text>
                {!selectedNFT ? (
                    <NFTGrid
                        NFTdata={ownedNfts}
                        isLoading={false}
                        overrideOnclickBehavior={(nft) => {
                            setSelectedNFT(nft);
                        }}
                        emptyText={"You don't own any NFTs yet from this collection."}
                    />
                ) : (
                    <Flex justifyContent={"center"} my={10}>
                        <Card w={"75%"}>
                            <SimpleGrid columns={2} spacing={10} p={5}>
                                <ThirdwebNftMedia
                                    metadata={selectedNFT.metadata}
                                    width="100%"
                                    height="100%"
                                />
                                <Stack>
                                    <Flex justifyContent={"right"}>
                                        <Button
                                            onClick={() => {
                                                setSelectedNFT(undefined);
                                            }}
                                        >X</Button>
                                    </Flex>
                                    <Heading>{selectedNFT.metadata.name}</Heading>
                                    <SaleInfo
                                        nft={selectedNFT}
                                    />
                                </Stack>
                            </SimpleGrid>
                        </Card>
                    </Flex>
                )}
            </Container>
        )
     }else{

        return(

            <></>
        )
     }
    
}