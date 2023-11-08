import { useContract, useNFTs } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS } from "../const/addresses";
import Link from "next/link";
//import { Text, Button, Container, Flex, Heading, SimpleGrid, Spinner } from "@chakra-ui/react";


import {Box , Typography, Container ,Button} from "@mui/material";
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";




import NFT from "../components/NFT";

export default function Shop()  {
    const { contract } = useContract(TOOLS_ADDRESS);
    const { data: nfts } = useNFTs(contract);
    console.log(nfts);

    return (
        <Container maxW={"1200px"}>
            <Box >
                <Link
                    href="/"
                >
                    <Button>Back</Button>
                </Link>
            </Box>
            <Typography mt={"40px"}>Shop</Typography>
            <Typography>Purchase tools with $CARROTS to increase your earnings.</Typography>
            {!nfts ? (
                <Typography h={"50vh"} justifyContent={"center"} alignItems={"center"}>
                    {/* <Spinner /> */}
                </Typography>
            ) : (
                <Grid columns={3} spacing={10}>
                    {nfts?.map((nftItem) => (
                        <NFT 
                            key={nftItem.metadata.id}
                            nft={nftItem}
                        />
                    ))}
                </Grid>
            )}
        </Container>
    )
};