import React from "react";
import { NFT as NFTType } from "@thirdweb-dev/sdk";
//import { useRouter } from "next/router";
import { NavigateFunction, useNavigate  } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Web3Button, useAddress ,useContract, useCreateAuctionListing, useCreateDirectListing } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS, REWARDS_ADDRESS } from "../const/addresses";
 import { Box, Input, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

type Props = {
    nft: NFTType;
};

type DirectFormData = {
    nftContractAddress: string;
    tokenId: string;
    currency: string,

    price:string,
    quantity: string,
    startDate: Date;
    endDate: Date;
};

//Add for Auction
type AuctionFormData = {
    nftContractAddress: string;
    tokenId: string;
    currency: string,

    startDate: Date;
    endDate: Date;
    floorPrice: string;
    buyoutPrice: string;
};

export default function SaleInfo({ nft }: Props) {
    const address = useAddress();
    const navigate = useNavigate ();
    //const router = useRouter();
    const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const { contract: nftCollection } = useContract(TOOLS_ADDRESS);

    //add for listing
    const { mutateAsync: createDirectListing } = useCreateDirectListing(marketplace);
    //Add for Auction
    const { mutateAsync: createAuctionListing } = useCreateAuctionListing(marketplace);


    async function checkAndProvideApproval() {
        const hasApproval = await nftCollection?.call(
            "isApprovedForAll",
            [address!, MARKETPLACE_ADDRESS]
            
        );

        if (!hasApproval) {
            const txResult = await nftCollection?.call(
                "setApprovalForAll",
                [MARKETPLACE_ADDRESS, true]
            );

            if (txResult) {
                console.log("Approval provided");
            }
        }

        return true;
    }

    // use form
    const { register: registerDirect, handleSubmit: handleSubmitDirect } = useForm<DirectFormData>({
        defaultValues: {
            nftContractAddress: TOOLS_ADDRESS,
            tokenId: nft.metadata.id,
            currency: REWARDS_ADDRESS ,

            price: "0",
            quantity:"1",
            startDate: new Date(),
            endDate: new Date(),
        },
    });

    const { register: registerAuction, handleSubmit: handleSubmitAuction } =  useForm<AuctionFormData>({
   
      defaultValues: {
        nftContractAddress: TOOLS_ADDRESS,
        tokenId: nft.metadata.id,
        currency: REWARDS_ADDRESS ,

        startDate: new Date(),
        endDate: new Date(),
        floorPrice: "0",
        buyoutPrice: "0",
      },
    });
 
    //handle submission
    async function handleSubmissionDirect(data: DirectFormData) {
        await checkAndProvideApproval();
        const txResult = await createDirectListing({
            assetContractAddress: data.nftContractAddress,
            tokenId: data.tokenId,
            currencyContractAddress: REWARDS_ADDRESS ,//data.currency,

            pricePerToken: data.price,
            quantity: data.quantity,
            startTimestamp: new Date(data.startDate),
            endTimestamp: new Date(data.endDate),
        });

        return txResult;
    }
    async function handleSubmissionAuction(data: AuctionFormData) {
        await checkAndProvideApproval();
        const txResult = await createAuctionListing({
            assetContractAddress: data.nftContractAddress,
            tokenId: data.tokenId,
            currencyContractAddress: REWARDS_ADDRESS ,//data.currency,

            buyoutBidAmount: data.buyoutPrice,
            minimumBidAmount: data.floorPrice,
            startTimestamp: new Date(data.startDate),
            endTimestamp: new Date(data.endDate),
        });

        return txResult;
    }





    
    

    

    

    return (
        <Tabs>
            <TabList>
                <Tab>Direct | </Tab>
                <Tab>| Auction</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <Stack spacing={8}>
                        <Box>
                            <Text>Listing starts on:</Text>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                {...registerDirect("startDate")}
                            />
                            <Text mt={2}>Listing ends on:</Text>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                {...registerDirect("endDate")}
                            />
                        </Box>

                        <Box>
                            <Text fontWeight={"bold"}>currency:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="text"
                                {...registerDirect("currency")}
                            />
                        </Box>
                        <Box>
                            <Text fontWeight={"bold"}>quantity:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="number"
                                {...registerDirect("quantity")}
                            />
                        </Box>
                        <Box>
                            <Text fontWeight={"bold"}>Price:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="number"
                                {...registerDirect("price")}
                            />
                        </Box>
                        <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={async () => {
                                await handleSubmitDirect(handleSubmissionDirect)();
                            }}
                            onSuccess={async (txResult) => {

                                   //listing:
                        //`/tokenByListingID/${TOOLS_ADDRESS}/${nft.metadata.id}/${AlllistingData?.id}/NAN`
                        //auction
                       //to={`/tokenByListingID/${TOOLS_ADDRESS}/${nft.metadata.id}/NAN/${AuctionListingData?.id}`}

                       const allListings = await marketplace?.directListings.getAll({
                            tokenId: nft.metadata.id 
                       }
                        
                       );
                       console.log(" sucess added listing: " , allListings );


                       let lastListing;
                         if ( allListings ) {
                            lastListing =  allListings[  (allListings.length-1 ) ];
                         }
                          console.log(" sucess here is last listing: " , lastListing );

                           navigate(`/tokenByListingID/${TOOLS_ADDRESS}/${nft.metadata.id}/${lastListing?.id}/NAN`);
                                     //  navigate(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);
                                //navigate.push(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);

                               // router.push(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);
                            }}
                        >Create Direct Listing</Web3Button>
                    </Stack>
                </TabPanel>
                <TabPanel>
                <Stack spacing={8}>
                        <Box>
                            <Text>Listing starts on:</Text>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                {...registerAuction("startDate")}
                            />
                            <Text mt={2}>Listing ends on:</Text>
                            <Input
                                placeholder="Select Date and Time"
                                size="md"
                                type="datetime-local"
                                {...registerAuction("endDate")}
                            />
                        </Box>

                        <Box> 
                            <Text fontWeight={"bold"}>currency:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="text"
                                {...registerDirect("currency")}
                            />
                        </Box>

                        <Box>
                            <Text fontWeight={"bold"}>Starting bid from:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="number"
                                {...registerAuction("floorPrice")}
                            />
                        </Box>
                        <Box>
                            <Text fontWeight={"bold"}>Buyout price:</Text>
                            <Input
                                placeholder="0"
                                size="md"
                                type="number"
                                {...registerAuction("buyoutPrice")}
                            />
                        </Box>
                        <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={async () => {
                                return await handleSubmitAuction(handleSubmissionAuction)();
                            }}
                            onSuccess={ async (txResult) => {


                          
                              //auction
                       //to={`/tokenByListingID/${TOOLS_ADDRESS}/${nft.metadata.id}/NAN/${AuctionListingData?.id}`}

                                   const allAuctions = await marketplace?.englishAuctions.getAll({
                                           tokenId: nft.metadata.id 
                                    }
                                        
                                    );
                                    console.log(" sucess added allAuctions: " , allAuctions );
 
                                    let lastAuction;
                                        if ( allAuctions ) {
                                            lastAuction =  allAuctions[  (allAuctions.length-1 ) ];
                                        }
                                        console.log(" sucess here is last listing: " , lastAuction );
  

                                  navigate(`/tokenByListingID/${TOOLS_ADDRESS}/${nft.metadata.id}/NAN/${lastAuction?.id}`);
                                     // navigate(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);
                               //  navigate.push(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);
                               // router.push(`/token/${TOOLS_ADDRESS}/${nft.metadata.id}`);
                            }}
                        >Create Auction Listing</Web3Button>
                    </Stack>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}