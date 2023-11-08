import { MediaRenderer, Web3Button, useAddress, useContract } from '@thirdweb-dev/react';
import { NFT } from '@thirdweb-dev/sdk';
import { STAKING_ADDRESS, TOOLS_ADDRESS } from '../../const/addresses';
import Link from 'next/link';
//import { Text, Box, Button, Card, SimpleGrid, Stack } from '@chakra-ui/react';
 
import {Box , Typography, Container ,Button} from "@mui/material";
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";


export function Inventory({ nft }) {
    const address = useAddress();
    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { contract: stakingContract } = useContract(STAKING_ADDRESS);

    async function stakeNFT(id) {
        if (!address) {
            return;
        }

        const isApproved = await toolContract?.erc1155.isApproved(
            address,
            STAKING_ADDRESS,
        );

        if (!isApproved) {
            await toolContract?.erc1155.setApprovalForAll(
                STAKING_ADDRESS,
                true,
            );
        }
        await stakingContract?.call("stake", [id, 1]);
    };

    if(nft?.length === 0) {
        return (
            <Box>
                <Typography>No tools.</Typography>
                <Link
                    href="/shop"
                >
                    <Button>Shop Tool</Button>
                </Link>
            </Box>
        )
    }

    return (
        <Grid columns={3} spacing={4}>
            {nft?.map((nft) => (
                <Card key={nft.metadata.id} p={5}>
                    <Box>
                    <MediaRenderer 
                        src={nft.metadata.image} 
                        height="100px"
                        width="100px"
                    />
                    <Typography>{nft.metadata.name}</Typography>
                    <Web3Button
                        contractAddress={STAKING_ADDRESS}
                        action={() => stakeNFT(nft.metadata.id)}
                    >Equip</Web3Button>
                    </Box>
                </Card>
            ))}
        </Grid>
    );
};