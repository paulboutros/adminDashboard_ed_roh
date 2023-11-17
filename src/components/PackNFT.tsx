import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS } from "../const/addresses";
import { MediaRenderer, Web3Button, useAddress, useContract, useDirectListings, useNFT } from "@thirdweb-dev/react";
import { IconButton , Button, TextField , CardMedia, Box, Grid, Divider,  Typography, useTheme /*, Skeleton */ } from "@mui/material";

import { RowChildrenAlignCenter,
    VerticalStackAlignCenter ,
    VerticalStackAlignLeft,VerticalStackAlignTopLeft, RowChildrenAlignTop,
    VerticalSpace,
     RoundedBox,
     BoxWithTopBar
   } from "../components/Layout.jsx"
   

type Props = {
    contractAddress: string;
    tokenId: any;
};

export const PackNFTCard = ({ contractAddress, tokenId }: Props) => {

    const quantityDesired = 1;
    const address = useAddress();

    const { contract: marketplace, isLoading: loadingMarketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");
    const { contract: packContract } = useContract(contractAddress);
    const { data: packNFT, isLoading: loadingNFT } = useNFT(packContract, tokenId);


    const { data: packListings, isLoading: loadingPackListings } = 
    useDirectListings(
        marketplace,
        {
            tokenContract: TOOLS_ADDRESS,//PACK_ADDRESS,
        }
    );
    console.log("Pack Listings: ", packListings);

    async function buyPack() {
        let txResult;

        if (packListings?.[tokenId]) {
            txResult = await marketplace?.directListings.buyFromListing(
                packListings[tokenId].id,
                quantityDesired
            )
        } else {
            throw new Error("No valid listing found");
        }
            
        return txResult;
    };
  return(

    
        <BoxWithTopBar boxHeight={250} >
             
              {!loadingNFT && !loadingPackListings ? (
              
      <RowChildrenAlignCenter>

                           


                        <MediaRenderer
                            src={packNFT?.metadata.image}
                            style={{  width: '150px',height: '150px', position: 'relative', left: '10px',  top:"10px" }}
                            
                        />  
                         <Box height="150px" width="150px" >
                                
                                <VerticalStackAlignCenter>
                                
                                    
                                </VerticalStackAlignCenter>
                        </Box>
                       

<p>Cost: {packListings![tokenId].currencyValuePerToken.displayValue} {` ` + packListings![tokenId].currencyValuePerToken.symbol}</p>
                        <p>Supply: {packListings![tokenId].quantity}</p>
                        <p>creator: {packListings![tokenId].creatorAddress}</p>
                        <p>ends: {packListings![tokenId].endTimeInSeconds}</p>
                        <p>price per token: {packListings![tokenId].pricePerToken}</p>
                        {!address ? (
                            <p>Login to buy</p>
                        ) : (
                            <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={() => buyPack()}
                            >Buy Pack</Web3Button>
                        )}

     </RowChildrenAlignCenter>


       ) : (
                <p>Loading...</p>
            )}
            
        </BoxWithTopBar>
            
  )  
    return (
        <div className="{vvvvpackCard}">
            {!loadingNFT && !loadingPackListings ? (
                <div className="{styles.shopPack}">
                    <div>
                        <MediaRenderer
                            src={packNFT?.metadata.image}
                            width="20%"
                            height="100%"
                        />
                    </div>
                    <div className="{styles.packInfo}">
                        <h3>{packNFT?.metadata.name}</h3>
                        
                        <p>Cost: {packListings![tokenId].currencyValuePerToken.displayValue} {` ` + packListings![tokenId].currencyValuePerToken.symbol}</p>
                        <p>Supply: {packListings![tokenId].quantity}</p>
                        <p>creator: {packListings![tokenId].creatorAddress}</p>
                        <p>ends: {packListings![tokenId].endTimeInSeconds}</p>
                        <p>price per token: {packListings![tokenId].pricePerToken}</p>
                        {!address ? (
                            <p>Login to buy</p>
                        ) : (
                            <Web3Button
                            contractAddress={MARKETPLACE_ADDRESS}
                            action={() => buyPack()}
                            >Buy Pack</Web3Button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};