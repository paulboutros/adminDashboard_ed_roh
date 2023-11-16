
import {useEffect, useState} from "react";
import { useContract, useNFTs, useContractRead, useAddress } from "@thirdweb-dev/react";
import {
   // LAYER_EDITION_ADDRESS,
    TOOLS_ADDRESS ,
    
    REWARDS_ADDRESS

} from "../../const/addresses";
import  { SetLayerSupply } from "../../data/API"
//import Link from "next/link";
import { Link } from 'react-router-dom';
 import { BigNumber, ethers } from "ethers";

import { Box, Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";
import NFT from "../../components/FARMER/NFT";

export default function Shop()  {
    const address = useAddress();

    const { contract: rewardContract } = useContract(REWARDS_ADDRESS);
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data: nfts } = useNFTs(contract);
     
    const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
 

    return (
        <Container maxW={"1200px"}>
            <Flex direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Link  to="/" >
                  
                 
                
                    <Button>Back</Button>
                </Link>
            </Flex>
            <Text> address {address}   </Text>
            <Box>
              <Text fontSize={"small"} fontWeight={"bold"}>$CARROT Balance:</Text>
                {rewardBalance && (
                    <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
                  )}
              </Box>  

            <Heading mt={"40px"}>Shop</Heading>
            <Text>Purchase tools with $CARROTS to increase your earnings.</Text>
 
            {!nfts ? (
                <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
                    <Spinner />
                </Flex>
            ) : (
                <SimpleGrid columns={3} spacing={10}>
                    {nfts?.map((nftItem) => (
                        
                        <NFT 
                            key={nftItem.metadata.id}
                            nft={nftItem}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Container>
    )
};