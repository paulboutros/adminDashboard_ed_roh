//import { Container, Flex, Heading, Link } from "@chakra-ui/react";
import { ConnectWallet } from "@thirdweb-dev/react";

import { Link } from 'react-router-dom';

import {Box , Typography, Container ,Button} from "@mui/material";
import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
import ImageCard from "./ImageCard";


export default function NavBar() {
    return (
        <Container maxW={"1200px"} py={4}>
            <Box>
                <Typography>Crypto Farm</Typography>
                <Box alignItems={"center"}>
                    <Link href={"/"} mx={2}>Play</Link>
                    <Link href={"/shop"} mx={2}>Shop</Link>
                </Box>
                <ConnectWallet/>
            </Box>
        </Container>
    )
};