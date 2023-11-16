 
import {  Web3Button,   useContract,ThirdwebNftMedia, useValidDirectListings, useValidEnglishAuctions
  
} from "@thirdweb-dev/react";
import { TOOLS_ADDRESS , MARKETPLACE_ADDRESS  } from "../../const/addresses";
import {evolve} from "../../utils/updateMetadata"

//import ImageCard from "../ImageCard";
 

 import { Box, Typography ,CardContent  ,Card , Grid, CardMedia   } from '@mui/material'; // Update this import

//import  Skeleton from '@material-ui/lab/Skeleton'

import { ethers } from "ethers";
import { Button } from "@chakra-ui/react";

/*
type Props = {
    nft: NFT;
};*/

export default function NFTComponent({ nft } ) {

  const  {contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

  const { data: directListing, isLoading: loadingDirectListing } = 
      useValidDirectListings(marketplace, {
          tokenContract: TOOLS_ADDRESS,
          tokenId: nft.metadata.id,
      });

  //Add for auciton section
  const { data: auctionListing, isLoading: loadingAuction} = 
      useValidEnglishAuctions(marketplace, {
          tokenContract: TOOLS_ADDRESS,
          tokenId: nft.metadata.id,
      });


      

      return (
        <Card key={nft.metadata.id} >
        <CardMedia
                 component="img"
                 alt={nft.metadata.id}
                 height="80%"//"80%"
                // height="200"
              //  width="100%"
                image={nft.metadata.image}
        />
         <CardContent>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={6}>
        
        
      <Box>
      {loadingMarketplace || loadingDirectListing || loadingAuction ? (
        <div> loading </div>  // <Skeleton />
      ) : directListing && directListing[0] ? (
        <Box>
          <Box>
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2">{`${directListing[0]?.currencyValuePerToken.displayValue} ${directListing[0]?.currencyValuePerToken.symbol}`}</Typography>
          </Box>
        </Box>
      ) : auctionListing && auctionListing[0] ? (
        <Box>
          <Box>
            <Typography variant="body2">Minimum Bid</Typography>
            <Typography variant="body2">{`${auctionListing[0]?.minimumBidCurrencyValue.displayValue} ${auctionListing[0]?.minimumBidCurrencyValue.symbol}`}</Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box>
            <Typography variant="body2">Price</Typography>
            <Typography variant="body2">Not Listed</Typography>
          </Box>
        </Box>
      )}
    </Box>
 



      </Grid>
      <Grid item xs={6}>
        {/* Right side with Typography */}
        <Typography variant="h5" fontWeight="fontWeightBold" style={{ marginTop: '5px', textAlign: 'center' }}>
          {nft.metadata.name}
        </Typography>
        {/* {!isLoading && data ? (
          <>
            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '5px' }}>
              Cost: {ethers.utils.formatEther(data?.price)} {data?.currencyMetadata.symbol}
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center', marginTop: '5px' }}>
              Supply: {data?.currentMintSupply} /{data?.maxClaimableSupply}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            Loading...
          </Typography>
        )} */}
      </Grid>
    </Grid>
  </CardContent>
      </Card>
    )


/*
    return (
        <Card key={nft.metadata.id} overflow={"hidden"}>
            <MediaRenderer
                src={nft.metadata.image}
                height="100%"
                width="100%"
            />
            <Text fontSize={"2xl"} fontWeight={"bold"} my={5} textAlign={"center"}>{nft.metadata.name}</Text>
            {!isLoading && data ? (
                <Text textAlign={"center"} my={5}>Cost: {ethers.utils.formatEther(data?.price)}{" " + data?.currencyMetadata.symbol}</Text>
            ) :(
                <Text>Loading...</Text>
            )}
            <Web3Button
                contractAddress={TOOLS_ADDRESS}
                action={(contract) => contract.erc1155.claim(nft.metadata.id, 1)}
            >Buy</Web3Button>
        </Card>
    )
*/


};