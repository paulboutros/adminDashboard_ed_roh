import {
    useContract,
    useOwnedNFTs,
    useValidDirectListings,
    useValidEnglishAuctions,
  } from "@thirdweb-dev/react"; 
  import React, { useState } from "react";
  import Container from "../../components/Container/Container";
  //import ListingWrapper from "../../components/ListingWrapper/ListingWrapper";
  import NFTListed from "../../components/FARMER/NFTlisted.jsx"  


  import Skeleton from "../../components/Skeleton/Skeleton";
  import styles from "../../styles/Profile.module.css";
  import randomColor from "../../util/randomColor";
  import { MARKETPLACE_ADDRESS, TOOLS_ADDRESS } from "../../const/addresses";

 
import { useNavigate , Link, useParams} from 'react-router-dom';
//import { useRouter } from "next/router";
 

import NFTGrid from "../../components/NFTGrid";


const [randomColor1, randomColor2, randomColor3, randomColor4] = [
    randomColor(),
    randomColor(),
    randomColor(),
    randomColor(),
  ];



export default function ProfilePage() {

    const [tab, setTab] = useState("nfts");  // <"nfts" | "listings" | "auctions"> (from typescript)
    const { address } = useParams();
    const navigate = useNavigate ();
  //  const router = useRouter();


 // this is used in shop component as well and passed in the component props, 
 // but here in  Profile we currently hard code them as we think, a pack can not be listed by a user..
 // so there is no alternative and we
  const display_mode="grid"; 
  const NFT_CONTRACT= TOOLS_ADDRESS;



    const {contract: nftCollection} = useContract(TOOLS_ADDRESS);

    const { contract: marketplace} = useContract(MARKETPLACE_ADDRESS, "marketplace-v3");  

    const {data: ownedNfts, isLoading: loadingOwnedNfts} = useOwnedNFTs(
        nftCollection,
        address
        //router.query.address as string
    );

 
    
      const { data: directListings, isLoading: loadingDirects } =
        useValidDirectListings(marketplace, {
          seller:  address  ,
        });
    
      const { data: auctionListings, isLoading: loadingAuctions } =
        useValidEnglishAuctions(marketplace, {
          seller: address ,
      });

 

       
        return (
            <Container maxWidth="lg">
              <div className={styles.profileHeader}>
                <div
                  className={styles.coverImage}
                  style={{
                    background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
                  }}
                />
                <div
                  className={styles.profilePicture}
                  style={{
                    background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
                  }}
                />
                <h1 className={styles.profileName}>
                  {address ? (
                    address.toString().substring(0, 4) +
                    "..." +
                    address.toString().substring(38, 42)
                  ) : (
                    <Skeleton width="320" />
                  )}
                </h1>
              </div>
        

              <div className={styles.tabs}>
                <h3 className={`${styles.tab} ${tab === "nfts" ? styles.activeTab : ""}`}
                   onClick={() => setTab("nfts")}
                >
                  NFTs
                </h3>
                <h3
                  className={`${styles.tab}  ${tab === "listings" ? styles.activeTab : ""}`}
                  onClick={() => setTab("listings")}
                >
                  Listings
                </h3>
                <h3
                  className={`${styles.tab}  ${tab === "auctions" ? styles.activeTab : ""}`}
                  onClick={() => setTab("auctions")}
                >
                  Auctions
                </h3>
              </div>
              
        
              <div
                className={`${
                  tab === "nfts" ? styles.activeTabContent : styles.tabContent
                }`}
              >
                <NFTGrid
                  data={ownedNfts}
                  isLoading={loadingOwnedNfts}
                  emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
                />
              </div>
        
              <div
                className={`${
                  tab === "listings" ? styles.activeTabContent : styles.tabContent
                }`}
              >
                {loadingDirects ? (
                  <p>Loading...</p>
                ) : directListings && directListings.length === 0 ? (
                  <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
                ) : (
                  directListings?.map((listing) => (
                    // <ListingWrapper listing={listing} key={listing.id} />
                        <NFTListed
                        propContractAddress = {listing.assetContractAddress}
                        propTokenId = {listing.tokenId}
                        AlllistingData ={listing}
                        AuctionListingData ={null}  

                        displayMode = {display_mode}

                        NFT_CONTRACT ={NFT_CONTRACT}
                    /> 


                  ))
                )}
              </div>
        
              <div
                className={`${
                  tab === "auctions" ? styles.activeTabContent : styles.tabContent
                }`}
              >
                {loadingAuctions ? (
                  <p>Loading...</p>
                ) : auctionListings && auctionListings.length === 0 ? (
                  <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
                ) : (
                  auctionListings?.map((listing) => (
                    // <ListingWrapper listing={listing} key={listing.id} />
                    <NFTListed
                    propContractAddress = {listing.assetContractAddress}
                    propTokenId = {listing.tokenId}
    
                    AlllistingData ={null}
                    AuctionListingData = {listing}
    
                    displayMode = {display_mode}
    
                    NFT_CONTRACT ={NFT_CONTRACT}
                   /> 

                  ))
                )}
              </div>
            </Container>
        );
}