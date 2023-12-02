import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS, REWARDS_ADDRESS, PACK_ADDRESS, MARKETPLACE_ADDRESS } from "../const/addresses";
import {getSDK_fromPrivateKey} from "../data/API";  


const imageToUpload = // "../../public/be/1.png"
 "https://coffee-doubtful-unicorn-619.mypinata.cloud/ipfs/QmVB8b68bXt5p7Jvup5qiYzrYt8JGF1XWDE9u2iV8qbrbD/4.png";
  
export async function gainExp(
    nft,//: NFT,
    level,//: string,
    exp,//: string,
    nftTokenId//: string,
){
    try {
        const sdk = getSDK_fromPrivateKey();

        const contract = await sdk.getContract(TOOLS_ADDRESS);

        var updatedExp = await parseInt(exp) + 50;
        var updatedLvl = await parseInt(level);

        if (updatedExp >= 100) {
            updatedLvl += 1;
            updatedExp -= 100;
        }

        const metadata = {
            ...nft.metadata,
            attributes: [
                {
                    trait_type: "he",
                    value: "123",
                } 
            ],
        };

     

        const newUri = await sdk.storage.upload(metadata);

        const updateNFT = await contract.call(
            "setTokenURI",
            [
                nftTokenId,
                newUri,
            ]
        );

        return { success: "Pokemon Trained!" };
    } catch (error) {
        console.log(error);
    }
};

export async function evolve(
    nft,//: NFT,
    level,//: string,
    nftTokenId //: string,
){
    try {
        const category ="kn"; 
        const catOffSet = 1;
          const resultNumber = parseInt(nftTokenId) + catOffSet;


          // console.log( " >>>>>    resultNumber" + resultNumber);
        const sdk = getSDK_fromPrivateKey();

        const contract = await sdk.getContract(TOOLS_ADDRESS);
 
       
            const metadata = {
                ...nft.metadata,
                 // name: "sh02" //(category+( resultNumber ).toString() ),
             //    image: "https://coffee-doubtful-unicorn-619.mypinata.cloud/ipfs/QmVB8b68bXt5p7Jvup5qiYzrYt8JGF1XWDE9u2iV8qbrbD/7.png",
              //  description: (category+resultNumber.toString() )  ,
               
                 attributes: [
                    {
                        trait_type:category,
                        value: "5",// resultNumber.toString(),   //updatedLvl.toString()
                     }
                    
                ],
                   
                
            };


          //  const data = await sdk.storage.downloadJSON(nft.metadata.uri);

      //  console.log("data json = " , data);
           const newUri = await sdk.storage.upload(metadata);

     // this upldate the contract name and description not the nft inside of it
       /*
            const txResult = await contract.metadata.update({
                name: "WuliRocks Layers",
                description: "Layer to get combo reward",
                index: 0 // Specify the index of the NFT you want to update
               // image: "/path/to/image.jpg", // URL, URI, or File object
               // external_link: "https://myapp.com",
            });*/
 
          //   const dd = await use_SetClaimConditions(contract, REWARDS_ADDRESS);
   

         // const txResult = await contract.erc1155.burn(0, 2);
           
         const updateNFT = await contract.call(
            "setTokenURI",
            [
                nftTokenId,
                newUri,
            ]
        );
 
      //  }

        return;
    } catch (error) {
        console.log(error);
    }
}




export async function CreateListing(){


    const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
   
    const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );
 


    console.log("CreateListing         ");
    const txResult = await marketContract.directListings.createListing({
        assetContractAddress: PACK_ADDRESS, // Required - smart contract address of NFT to sell
        tokenId: 0 , // Required - token ID of the NFT to sell
        pricePerToken: "0.05", // Required - price of each token in the listing
        currencyContractAddress: REWARDS_ADDRESS , // Optional - smart contract address of the currency to use for the listing
        isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
        quantity: 11 , // Optional - number of tokens to sell (1 for ERC721 NFTs)
        startTimestamp: new Date(), // Optional - when the listing should start (default is now)
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });



      console.log("CreateListing         "   , txResult); 
}

export async function UpdateListing (){

     const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
   
    const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );



    const txResult = await marketContract.directListings.updateListing( 9 , {
        assetContractAddress:  PACK_ADDRESS , // Required - smart contract address of NFT to sell
        tokenId: 0, // Required - token ID of the NFT to sell
        pricePerToken: "0.05", // Required - price of each token in the listing
        currencyContractAddress: REWARDS_ADDRESS, // Optional - smart contract address of the currency to use for the listing
        isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
        quantity: 11, // Optional - number of tokens to sell (1 for ERC721 NFTs)
        startTimestamp: new Date(), // Optional - when the listing should start (default is now)
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });

}

export async function createBundle(  ){
           
    
    const sdk =   getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
  
    const packAddress = PACK_ADDRESS;
    const cardAddress =  "0xdA637F0BAA8CB69e7e23926915F6Cec5b248B3B4" ;//"0xF810082B4FaC42d65156Da88D5212dfAA75D0117";
  
    const pack = await sdk.getContract(packAddress, "pack");
  
    const card = await sdk.getContract(cardAddress, "edition");
          await card.setApprovalForAll(packAddress, true);
    console.log("Approved card contract to transfer cards to pack contract");
  
    const packImage =  "https://d391b93f5f62d9c15f67142e43841acc.ipfscdn.io/ipfs/bafybeiffqlsjlkbibt44ahcrukz3upc7ycfwx54ziqxikfcr2ws6psh5gm/logo512.png";
  
    console.log("Creating pack");
    const createPacks = await pack.create({
        packMetadata: {
            name: "Pack 2",
            description: "A new card pack",
            image: packImage,
        },
        erc1155Rewards: 
        [
            {
              contractAddress: cardAddress,
              tokenId: 0,
              quantityPerReward: 1,
              totalRewards: 1
            },
            {
              contractAddress: cardAddress,
              tokenId: 1,
              quantityPerReward: 1,
              totalRewards: 2
            } ,
            {
                contractAddress: cardAddress,
                tokenId: 2,
                quantityPerReward: 1,
                totalRewards: 3
            },
            {
                contractAddress: cardAddress,
                tokenId: 3,
                quantityPerReward: 1,
                totalRewards: 4
            } ,
            {
                contractAddress: cardAddress,
                tokenId: 4,
                quantityPerReward: 1,
                totalRewards: 5
            }, 
            {
                contractAddress: cardAddress,
                tokenId: 5,
                quantityPerReward: 1,
                totalRewards: 6
            }, 
            {
                contractAddress: cardAddress,
                tokenId: 6,
                quantityPerReward: 1,
                totalRewards: 7
            },  
            {
                contractAddress: cardAddress,
                tokenId: 7,
                quantityPerReward: 1,
                totalRewards: 8
            }, 
            {
                contractAddress: cardAddress,
                tokenId: 8,
                quantityPerReward: 1,
                totalRewards: 9
            },
            {
                contractAddress: cardAddress,
                tokenId: 9,
                quantityPerReward: 1,
                totalRewards: 10
            }, 
               

          ]
        
        ,
        rewardsPerPack: 5,
    });
  
    console.log("Packs created");
   
  
  }

  export async function UpdateAllNFTLayers(
    
){
    try {

 const urlBase = "https://wulibuild.s3.eu-west-3.amazonaws.com/WulirocksLayerNFTimages/"
        const sdk =   getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
        const cardAddress =  "0xdA637F0BAA8CB69e7e23926915F6Cec5b248B3B4" ;//"0xF810082B4FaC42d65156Da88D5212dfAA75D0117";
     //const contract = await sdk.getContract(TOOLS_ADDRESS);
        const contract = await sdk.getContract(cardAddress, "edition");
        const nfts = await contract.erc1155.getAll();

        
        const categories =["he","sh","we","be","kn"]; 
         
        
          // console.log( " >>>>>    resultNumber" + resultNumber);
       for (let c = 0; c < 1 ; c++ ){
         const category = categories[c];
         for (let i = 0; i < 4 ; i++ ){
            const metadata = {
                  ...nfts[i].metadata,
                  name: (category + ( i + 1 ).toString() ),
                  image:(urlBase + category + "/" + ( i + 1 ).toString() + ".png"  ) ,
                  description: (category + ( i + 1).toString() )  ,
                  attributes: [
                  {
                    trait_type:category,
                    value: i.toString(),  
                  }
                 ],
             };
             const newUri = await sdk.storage.upload(metadata);  
             const updateNFT = await contract.call(  "setTokenURI", [ i, newUri ] );  
         }
        }
          


          //  const data = await sdk.storage.downloadJSON(nft.metadata.uri);

      //  console.log("data json = " , data);
           

     // this upldate the contract name and description not the nft inside of it
       /*
            const txResult = await contract.metadata.update({
                name: "WuliRocks Layers",
                description: "Layer to get combo reward",
                index: 0 // Specify the index of the NFT you want to update
               // image: "/path/to/image.jpg", // URL, URI, or File object
               // external_link: "https://myapp.com",
            });*/
 
          //   const dd = await use_SetClaimConditions(contract, REWARDS_ADDRESS);
   

         // const txResult = await contract.erc1155.burn(0, 2);
           
      //  }

        return;
    } catch (error) {
        console.log(error);
    }
}


  export async function mintToCollection(){

    const sdk = getSDK_fromPrivateKey();
    const contract = await sdk.getContract("0xdA637F0BAA8CB69e7e23926915F6Cec5b248B3B4");
 
 
   let maxLayer = 10;// 50;
      for (let i = 0; i < maxLayer; i++) {
             
        const metadata = {
          name: "Cool NFT #1",
          description: "This is a cool NFT",
          image: "https://roarblogs.s3.amazonaws.com/mgm/casino/en/blog/wp-content/uploads/2020/04/28093620/SlotSymbols.jpg", // URL, IPFS URI, or File object
          // ... Any other metadata you want to include
        };
                
              const tx = await contract.erc1155.mint({
                   metadata: metadata,
                 supply: i+1, // The number of this NFT you want to mint
               });
               
 

        
      }
    
   

  }
  
    




async function  use_SetClaimConditions( contract , currencyAdress){

    const txResult = await contract.erc1155.claimConditions.set(
          0 , // ID of the token to set the claim conditions for
        [
          {
            metadata: {
              name: "Phase 1", // The name of the phase
            },
            currencyAddress: currencyAdress, // The address of the currency you want users to pay in
            price: 500, // The price of the token in the currency specified above
            maxClaimablePerWallet: 5, // The maximum number of tokens a wallet can claim
            maxClaimableSupply: 25, // The total number of tokens that can be claimed in this phase
            startTime: new Date(), // When the phase starts (i.e. when users can start claiming tokens)
            waitInSeconds: 60 * 60 * 1   //(one hour) The period of time users must wait between repeat claims
            
          },
        ],
        false, // Whether to resetClaimEligibilityForAll (i.e. reset state of claims for previous claimers)
      );



 }