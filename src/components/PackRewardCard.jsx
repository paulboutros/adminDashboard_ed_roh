import { ThirdwebNftMedia, useContract, useNFT } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";
 import styles from "../styles/Home.module.css";
 import { TOOLS_ADDRESS  } from "../const/addresses";
import NFTListed from "./FARMER/NFTlisted";

 /*
type Props = {
    reward: {
        tokenId: string | number | bigint | BigNumber;
        contractAddress: string;
        quantityPerReward: string | number | bigint | BigNumber;
    };
};
*/

export const PackRewardCard = ({ reward }) => { // : Props
    const { contract } = useContract( TOOLS_ADDRESS , "edition");
    const { data } = useNFT(contract, reward.tokenId);
     //  className={styles.nftCard}  
    return (
         < > 
            {data && (
                <>

                   <NFTListed
                    propContractAddress = { TOOLS_ADDRESS }
                    propTokenId = {data.metadata.id } // 
                    NFT={data}
                  /> 
                 
                    {/* <ThirdwebNftMedia
                        metadata={data.metadata}
                        height="200px"
                        width="200px"
                    />
                    <h3>{data.metadata.name}</h3> */}
                </>
            )}
        </ >
    )
};