import { NFT as NFTType } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "../../styles/Sale.module.css";
import profileStyles from "../../styles/Profile.module.css";
import {
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
  

//=======
import ChainContext from "../../context/Chain.js";
import { addressesByNetWork } from "../../scenes/chainSelection/index.jsx";

import { useContext } from "react";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======



//import { useRouter } from "next/router";
import {  useNavigate  } from 'react-router-dom';

 
 
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import { tokens, themeSettings, buttonStyle } from "../../theme";
import { useTheme } from "@mui/material";

 



export default function SaleInfo({ nft }) { // : Props

  //const router = useRouter();
  const navigate = useNavigate ();

  const theme = useTheme();
  const colors =  tokens(theme.palette.mode);
  const element = themeSettings(theme.palette.mode);
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  // Connect to marketplace contract
  const { contract: marketplace } = useContract(  addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS,  "marketplace-v3" );
    
   
 

  // useContract is a React hook that returns an object with the contract key.
  // The value of the contract key is an instance of an NFT_COLLECTION on the blockchain.
  // This instance is created from the contract address (NFT_COLLECTION_ADDRESS)
  const { contract: nftCollection } = useContract(  addressesByNetWork[selectedChain].LAYER_ADDRESS  );

  // Hook provides an async function to create a new auction listing
  const { mutateAsync: createAuctionListing } =
    useCreateAuctionListing(marketplace);

  // Hook provides an async function to create a new direct listing
  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  // Manage form submission state using tabs and conditional rendering
  const [tab, setTab] = useState("direct");   // <"direct" | "auction">

  // Manage form values using react-hook-form library: Auction form
  const { register: registerAuction, handleSubmit: handleSubmitAuction } =
    useForm({  // <AuctionFormData>
      defaultValues: {
        nftContractAddress: addressesByNetWork[selectedChain].LAYER_ADDRESS,
        tokenId: nft.metadata.id,
        currency:  addressesByNetWork[selectedChain].WUCOIN ,


        startDate: new Date(),
        endDate: new Date(),
        floorPrice: "0",
        buyoutPrice: "0",
      },
    });

  // User requires to set marketplace approval before listing
  async function checkAndProvideApproval() {
    // Check if approval is required
    const hasApproval = await nftCollection?.call("isApprovedForAll", [
      nft.owner,
      addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS,
    ]);

    // If it is, provide approval
    if (!hasApproval) {
      const txResult = await nftCollection?.call("setApprovalForAll", [
        addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS,
        true,
      ]);

      if (txResult) {
        toast.success("Marketplace approval granted", {
          icon: "👍",
          style: toastStyle,
          position: "bottom-center",
        });
      }
    }

    return true;
  }

  // Manage form values using react-hook-form library: Direct form
  const { register: registerDirect, handleSubmit: handleSubmitDirect } =
    useForm ({
      defaultValues: {
        nftContractAddress: addressesByNetWork[selectedChain].LAYER_ADDRESS,
        tokenId: nft.metadata.id,
        currency:  addressesByNetWork[selectedChain].WUCOIN,

        startDate: new Date(),
        endDate: new Date(),
        price: "0",
      },
    });

  async function handleSubmissionAuction(data ) {
    await checkAndProvideApproval();
    const txResult = await createAuctionListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      currencyContractAddress:  addressesByNetWork[selectedChain].WUCOIN ,//data.currency,


      buyoutBidAmount: data.buyoutPrice,
      minimumBidAmount: data.floorPrice,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });

    return txResult;
  }

  async function handleSubmissionDirect(data ) {
    await checkAndProvideApproval();
    const txResult = await createDirectListing({
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      currencyContractAddress:  addressesByNetWork[selectedChain].WUCOIN ,//data.currency,


      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    });

    return txResult;
  }

  return (
    <>
 
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={styles.saleInfoContainer} >    
     
        <div className={profileStyles.tabs}>
          <h3
            className={`${profileStyles.tab} 
        ${tab === "direct" ? profileStyles.activeTab : ""}`}
            onClick={() => setTab("direct")}
          >
            Direct
          </h3>
           <h3
            className={`${profileStyles.tab}  ${tab === "auction" ? profileStyles.activeTab : ""}`}
            style={{ 
              
              color: tab === "auction" ? element.palette.blueSelectedTab : colors.grey[400] 
            
            
            }}  

            onClick={() => setTab("auction")}
          >
            Auction
          </h3> 
  
        </div>

        {/* Direct listing fields */}
        <div
          className={`${
            tab === "direct"
              ? styles.activeTabContent
              : profileStyles.tabContent
          }`}
          style={{ flexDirection: "column" }}
        >
          <h4 className={styles.formSectionTitle}>When </h4>

          {/* Input field for auction start date */}
          <legend className={styles.legend}> Listing Starts on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerDirect("startDate")}
            aria-label="Auction Start Date"
          />

          {/* Input field for auction end date */}
          <legend className={styles.legend}> Listing Ends on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerDirect("endDate")}
            aria-label="Auction End Date"
          />
          <h4 className={styles.formSectionTitle}>Price </h4>

          {/* Input field for buyout price */}
          <legend className={styles.legend}> Price per token</legend>
          <input
            className={styles.input}
            type="number"
            step={0.000001}
            {...registerDirect("price")}
          />

          <Web3Button
            contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}

            className="tw-web3button--connect-wallet" 
            style={{ backgroundColor: colors.blueAccent[  buttonStyle.colorBlue  ], flex: 1,  width: '100%', height: buttonStyle._buttonHeight }}



            action={async () => { await handleSubmitDirect(handleSubmissionDirect)();
              
            }}
            onError={(error) => {
              toast(`Listed Failed! Reason: ${error.cause}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
              });
            }}
            onSuccess={async (txResult) => {
              toast("Listed Successfully!", {
                icon: "🥳",
                style: toastStyle,
                position: "bottom-center",
              });
               
              const allListings = await marketplace?.directListings.getAll({ tokenId: nft.metadata.id  } );
              console.log(" sucess added listing: " , allListings );
                let lastListing;
               if ( allListings ) { lastListing =  allListings[  (allListings.length-1 ) ];}
               console.log(" sucess here is last listing: " , lastListing );
               navigate(`/tokenByListingID/${  addressesByNetWork[selectedChain].LAYER_ADDRESS }/${nft.metadata.id}/${lastListing?.id}/NAN`);
              
               
            }}
          >
            Create Direct Listing
          </Web3Button>
        </div>

        {/* Auction listing fields */}
        <div
          className={`${
            tab === "auction"
              ? styles.activeTabContent
              : profileStyles.tabContent
          }`}
          style={{ flexDirection: "column" }}
        >
          <h4 className={styles.formSectionTitle}>When </h4>

          {/* Input field for auction start date */}
          <legend className={styles.legend}> Auction Starts on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerAuction("startDate")}
            aria-label="Auction Start Date"
          />

          {/* Input field for auction end date */}
          <legend className={styles.legend}> Auction Ends on </legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerAuction("endDate")}
            aria-label="Auction End Date"
          />
          <h4 className={styles.formSectionTitle}>Price </h4>

          {/* Input field for minimum bid price */}
          <legend className={styles.legend}> Allow bids starting from </legend>
          <input
            className={styles.input}
            step={0.000001}
            type="number"
            {...registerAuction("floorPrice")}
          />

          {/* Input field for buyout price */}
          <legend className={styles.legend}> Buyout price </legend>
          <input
            className={styles.input}
            type="number"
            step={0.000001}
            {...registerAuction("buyoutPrice")}
          />

          <Web3Button
            contractAddress={ addressesByNetWork[selectedChain].MARKETPLACE_ADDRESS}
            action={async () => {
              return await handleSubmitAuction(handleSubmissionAuction)();
            }}
            onError={(error) => {
              toast(`Listed Failed! Reason: ${error}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
              });
            }}
            onSuccess={async (txResult) => {
              toast("Listed Successfully!", {
                icon: "🥳",
                style: toastStyle,
                position: "bottom-center",
              });

              const allAuctions = await marketplace?.englishAuctions.getAll({tokenId: nft.metadata.id } );
              console.log(" sucess added allAuctions: " , allAuctions );

              let lastAuction;
               if ( allAuctions ) {lastAuction =  allAuctions[  (allAuctions.length-1 ) ];}
               console.log(" sucess here is last listing: " , lastAuction );
              navigate(`/tokenByListingID/${ addressesByNetWork[selectedChain].LAYER_ADDRESS }/${nft.metadata.id}/NAN/${lastAuction?.id}`);

              /*
              http://localhost:3000/tokenByListingID/0x06a33CD093aDD0C6A8F685888f1B3E0C119b2461/2/NAN/5
              */


              // router.push(
               
              // );
            }}
          >
            Create Auction Listing
          </Web3Button>
        </div>
      </div>
    </>
  );
}
