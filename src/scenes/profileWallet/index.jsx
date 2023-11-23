import { Container, Heading, Text } from "@chakra-ui/react";
import { useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import React from "react";
import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS } from "../../const/addresses";

 
import { useNavigate , Link, useParams} from 'react-router-dom';
//import { useRouter } from "next/router";
 

import NFTGrid from "../../components/NFTGrid";

export default function ProfilePage() {


    const { address } = useParams();
    const navigate = useNavigate ();
  //  const router = useRouter();

    const {contract: nftCollection} = useContract(TOOLS_ADDRESS);

    const { contract: marketplace} = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");  

    const {data: ownedNfts, isLoading: loadingOwnedNfts} = useOwnedNFTs(
        nftCollection,
        address
        //router.query.address as string
    );
        console.log(ownedNfts);

        return (
 <div>  this was disabled to temporarily to fix the metadata nft bug, you can turn it back if fixed</div>
        )
    return (
        <Container maxW={"1200px"} p={5}>
            <Heading>{"Owned NFT(s)"}</Heading>
            <Text>Browse and manage your NFTs from this collection.</Text>
            <NFTGrid 
                NFTdata={ownedNfts}
                isLoading={loadingOwnedNfts}
                emptyText={"You don't own any NFTs yet from this collection."}
            />
        </Container>
    )
}