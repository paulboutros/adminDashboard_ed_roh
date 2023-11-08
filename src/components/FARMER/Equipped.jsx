import { MediaRenderer, Web3Button, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import { STAKING_ADDRESS, TOOLS_ADDRESS } from "../../const/addresses";
import { ethers } from "ethers";
//import { Text, Box, Card, Stack, Flex } from "@chakra-ui/react";
import {Box , Typography} from "@mui/material";

import Grid from '@mui/material/Grid';          
import Card from '@mui/material/Card';          
//import ImageCard from "./ImageCard";

/*  // props will be token id
interface EquippedProps {
    tokenId: number;
};*/

export const Equipped = (props ) => {
    

    const address = useAddress();

    const { contract: toolContract } = useContract(TOOLS_ADDRESS);
    const { data: nft } = useNFT(toolContract, props.tokenId);

    const { contract: stakingContract } = useContract(STAKING_ADDRESS);

    const { data: claimableRewards } = useContractRead(
        stakingContract,
        "getStakeInfoForToken",
        [props.tokenId, address]
    );

    return (
        <Box>
            {nft && (
                <Card p={5}>
                    <Box>
                        <Box>
                            <MediaRenderer
                                src={nft.metadata.image}
                                height="80%"
                                width="80%"
                            />
                        </Box>
                        <Box >
                            <Typography fontSize={"2xl"} fontWeight={"bold"}>{nft.metadata.name}</Typography>
                            <Typography>Equipped: {ethers.utils.formatUnits(claimableRewards[0], 0)}</Typography>
                            <Web3Button
                                contractAddress={STAKING_ADDRESS}
                                action={(contract) => contract.call("withdraw", [props.tokenId, 1])}
                            >Unequip</Web3Button>
                        </Box>
                    </Box>
                    <Box mt={5}>
                        <Typography>Claimable $CARROT:</Typography>
                        <Typography>{ethers.utils.formatUnits(claimableRewards[1], 18)}</Typography>
                        <Web3Button
                            contractAddress={STAKING_ADDRESS}
                            action={(contract) => contract.call("claimRewards", [props.tokenId])}
                        >Claim $CARROT</Web3Button>
                    </Box>
                </Card>
            )}
        </Box>
    )
};