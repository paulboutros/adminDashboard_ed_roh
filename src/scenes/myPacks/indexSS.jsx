import { ThirdwebNftMedia, Web3Button, useAddress, useContract, useOwnedNFTs } from '@thirdweb-dev/react'
 import styles from '../../styles/Home.module.css'
import Container from "../../components/Container/Container";


import { BasicScrollable } from "../../components/Layout";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useState } from 'react';
import NFTGrid from "../../components/NFTGrid";
 

import {PackRewardCard} from '../../components/PackRewardCard';
 
import {PACK_ADDRESS} from  '../../const/addresses';
import tokenPageStyles from "../../styles/Token.module.css";
import NFTListed from '../../components/FARMER/NFTlisted';

export default function MyPacks() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const address = useAddress();

    const { contract }        = useContract(PACK_ADDRESS, "pack");
    const { data, isLoading } = useOwnedNFTs(contract, address);

    const [openPackRewards, setOpenPackRewards] = useState(); // <PackRewards>

    async function openPack(packId ) {// :string
        const cardRewards = await contract?.open(parseInt(packId), 1);
        console.log(cardRewards);
        setOpenPackRewards(cardRewards);
    };
    

    console.log( "data    ======>  " , data);
     
    // return (
    //     <BasicScrollable>
    //       <Container maxWidth="lg">


            

    //          <Typography sx={ theme.title }  > Sell NFTs </Typography>
            
    //           <>
             
    //             <Typography sx={ theme.titleDescription }  >Select which NFT you&rsquo;d like to sell below.</Typography>
    //               <NFTGrid
    //                  isLoading={isLoading}

    //                  NFT_contract={PACK_ADDRESS}
    //                  NFTdata={data} 
    //                 emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
    //              />  
                    

    //           </>
           
    //       </Container>
    //       </BasicScrollable>
    //     );






    return (
        <Container maxWidth="lg">
           
            <div >  
                {!isLoading ? (
                    data?.map((pack, index) => (

                        <div className={tokenPageStyles.container}    key={index}     >
                         <div className={tokenPageStyles.metadataContainer}>
                          <div className={tokenPageStyles.imageContainer}>
                        
                            <ThirdwebNftMedia
                            metadata={pack.metadata}
                            />
                            <div className={styles.cardinfo}>  
                                <h3>{pack.metadata.name}</h3>
                                <p>Qty: {pack.quantityOwned}</p>
                            </div>
                            <Web3Button
                                contractAddress={PACK_ADDRESS}
                                action={() => openPack(pack.metadata.id)}
                             
                            >Open Pack</Web3Button>
                        </div>

                        </div>
                       </div>
                        






                    ))
                    ) : (
                    <p>Loading...</p>
                )}
            </div>
            {openPackRewards && openPackRewards.erc1155Rewards?.length && (
                <div  > {/* className={styles.container} */}
                    <h3>Pack Rewards:</h3>
                    <div >  {/* className={styles.grid} */}
                        {openPackRewards.erc1155Rewards.map((card, index) => (
                        <PackRewardCard
                            reward={card}
                            key={index}
                        />
                        ))}
                    </div>
                </div>
            )}
        </Container>
    )
}