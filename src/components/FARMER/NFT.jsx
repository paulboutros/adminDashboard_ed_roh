 
import { MediaRenderer, Web3Button, useActiveClaimCondition, useContract } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";
import { TOOLS_ADDRESS } from "../../const/addresses";
import { ethers } from "ethers";


import {Box , Typography, Container ,Button} from "@mui/material";
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";



export default function NFTComponent({ nft } ) {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data, isLoading } = useActiveClaimCondition(
        contract,
        nft.metadata.id, // Token ID required for ERC1155 contracts here.
      );

    return (
        <Card key={nft.metadata.id} overflow={"hidden"}>
            <MediaRenderer
                src={nft.metadata.image}
                height="100%"
                width="100%"
            />
            <Typography  >   {nft.metadata.name} </Typography>
            {!isLoading && data ? (
                <Typography  >
                     Cost: {ethers.utils.formatEther(data?.price)} 
                     {" " + data?.currencyMetadata.symbol}</Typography>
            ) :(
                <Typography>Loading...</Typography>
            )}
            <Web3Button
                contractAddress={TOOLS_ADDRESS}
                action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
            >Buy</Web3Button>
        </Card>
    )
};