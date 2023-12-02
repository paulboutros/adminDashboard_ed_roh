import { useContract, useDirectListings , useActiveListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from  "../../const/addresses.ts";
//import styles from "../styles/Home.module.css";
import { PackNFTCard } from "../../components/PackNFT";

export default function Shop() {
    const {
        contract: marketplace,
        isLoading: loadingMarketplace,
    } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");

    const {
        data: directListings,
        isLoading: loadingDirectListings,
    } = useDirectListings(
        marketplace,
        {
            tokenContract: PACK_ADDRESS,
            
        }
    );
    console.log("DirectPack", directListings);

    return (
        <div  >
            <h1>Shop Packs</h1>
            <div >
                {!loadingDirectListings ? (
                    directListings?.map((listing, index) => (
                        <div key={index}>
                            <PackNFTCard
                                contractAddress={listing.assetContractAddress}
                                tokenId={listing.tokenId}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
};