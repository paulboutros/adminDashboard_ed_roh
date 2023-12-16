import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS,  REWARDS_ADDRESS, PACK_ADDRESS, MARKETPLACE_ADDRESS  } from "../const/addresses";
import {getSDK_fromPrivateKey} from "../data/API";  

const urlBase = "https://wulibuild.s3.eu-west-3.amazonaws.com/WulirocksLayerNFTimages/"
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


export async function CreateListingPack(){

   
  const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
 
   const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );

// https://portal.thirdweb.com/typescript/sdk.englishauctions

 
// direct listing a pack
  console.log("start CreateListing Pack ");
   
  const txResult = await marketContract.directListings.createListing({
      assetContractAddress: PACK_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId: 5 , // Required - token ID of the NFT to sell
      pricePerToken: "0.076", // Required - price of each token in the listing
      currencyContractAddress: REWARDS_ADDRESS , // Optional - smart contract address of the currency to use for the listing
      isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
      quantity: 55 ,  //  fianl real case is 11 
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
    });
 


    console.log(">>>>>>    CreateListing    PACK     "   , txResult); 
}

export async function CreateListing(){

   
    const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
   
     const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );
 
  // https://portal.thirdweb.com/typescript/sdk.englishauctions

  // auction listing a layer
     const txResult = await marketContract.englishAuctions.createAuction({
      assetContractAddress: TOOLS_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId: 40, // Required - token ID of the NFT to sell
      buyoutBidAmount:"0.09", // Required - amount to buy the NFT and close the listing
      minimumBidAmount:"0.01", // Required - Minimum amount that bids must be to placed
      currencyContractAddress: REWARDS_ADDRESS, // Optional - smart contract address of the currency to use for the listing
      quantity: 1, // Optional - number of tokens to sell (1 for ERC721 NFTs)
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      bidBufferBps: 5, // Optional - percentage the next bid must be higher than the current highest bid (default is contract-level bid buffer bps)
      timeBufferInSeconds: 60 * 10, // Optional - time in seconds that are added to the end time when a bid is placed (default is contract-level time buffer in seconds)
    });

     
    // direct listing a layer
   /*
     const txResult = await marketContract.directListings.createListing({
      assetContractAddress: TOOLS_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId: 40 , // Required - token ID of the NFT to sell
      pricePerToken: "0.076", // Required - price of each token in the listing
      currencyContractAddress: REWARDS_ADDRESS , // Optional - smart contract address of the currency to use for the listing
      isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
      quantity: 1 ,  //  fianl real case is 11 
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
    });
*/
  // direct listing a pack
    console.log("CreateListing         ");
    /*
    const txResult = await marketContract.directListings.createListing({
        assetContractAddress: PACK_ADDRESS, // Required - smart contract address of NFT to sell
        tokenId: 5 , // Required - token ID of the NFT to sell
        pricePerToken: "0.076", // Required - price of each token in the listing
        currencyContractAddress: REWARDS_ADDRESS , // Optional - smart contract address of the currency to use for the listing
        isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
        quantity: 55 ,  //  fianl real case is 11 
        startTimestamp: new Date(), // Optional - when the listing should start (default is now)
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });
*/


      console.log(">>>>>>    CreateListing         "   , txResult); 
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

//https://portal.thirdweb.com/typescript/sdk.contractmetadata
export async function UpdatePackMetaData(){
     
  const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const packAddress = PACK_ADDRESS;
 
  const packContract = await sdk.getContract(packAddress, "pack");

  //const card = await sdk.getContract(cardAddress, "edition");
        //await card.setApprovalForAll(packAddress, true);
  //console.log("Approved card contract to transfer cards to pack contract");

  const packImage = urlBase + "he/" + ( 1 ).toString() + ".png" ;

  console.log("Packs starts updating");
   
      const metadata= {
          name: "Pack 1",
          description: "Card pack for Test Layers",
          image: packImage,
      } 
      /*
      const newUri = await sdk.storage.upload(metadata);  
      const updateNFT = await packContract.call(  "setTokenURI", [ 0, newUri ] ); 
    */
    // an other way to do it
     // const updateNFT = await packContract.metadata.update( metadata);

           packContract = await sdk.getContract(packAddress );
      const newUri = await sdk.storage.upload(metadata);  
      const updateNFT = await packContract.call(  "setTokenURI", [ 0, newUri ] ); 


  /*
   setTokenURI is function in NFTmetadata.sol
  */

  console.log("Packs updated =" , updateNFT );
 

}

export async function createBundle(  ){
           
  const generatedData = generateData();

  console.log( "generatedData" , generatedData );
  // return ;

  const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const packAddress = PACK_ADDRESS;
  const cardAddress = TOOLS_ADDRESS;  

  const pack = await sdk.getContract(packAddress, "pack");

  const card = await sdk.getContract(cardAddress, "edition");
        await card.setApprovalForAll(packAddress, true);
  console.log("Approved card contract to transfer cards to pack contract");

  const packImage =  "https://wulibuild.s3.eu-west-3.amazonaws.com/WulirocksLayerNFTimages/giveAway/pack_01.png";

  console.log("Creating pack");
  const createPacks = await pack.create({
      packMetadata: {
          name: "Pack WuliRocks packs",
          description: "Get the right layers, cash in the reward",
          image: packImage,
      },
      erc1155Rewards:  generatedData
       ,
      rewardsPerPack: 5,
  });

  console.log("Packs created");
 

}

 export async function createBundle_smallTest(  ){
           
    
    const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
  
    const packAddress = PACK_ADDRESS;
    const cardAddress = TOOLS_ADDRESS; // "0xdA637F0BAA8CB69e7e23926915F6Cec5b248B3B4" ;//"0xF810082B4FaC42d65156Da88D5212dfAA75D0117";
  
    const pack = await sdk.getContract(packAddress, "pack");
  
    const card = await sdk.getContract(cardAddress, "edition");
          await card.setApprovalForAll(packAddress, true);
    console.log("Approved card contract to transfer cards to pack contract");
  
    const packImage =  "https://wulibuild.s3.eu-west-3.amazonaws.com/WulirocksLayerNFTimages/giveAway/pack_01.png";
  
    console.log("Creating pack");
    const createPacks = await pack.create({
        packMetadata: {
            name: "toollayer Pack test 2tk",
            description: "toollayer token 0=1 1=1",
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
              totalRewards: 1
            }  

          ]
        
        ,
        rewardsPerPack: 2,
    });
  
    console.log("Packs created");
   
  
  }

  export async function UpdateAllNFTLayers(
    
){
    try {
  
        const sdk =   getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
        const cardAddress = TOOLS_ADDRESS;
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


 
 function generateData(  ){

     
  const cardData = [];
  
  let totalRewards = 1;
  
  for (let tokenId = 0; tokenId < 50; tokenId++) {
  
  
    // const totalRewards = NFTs[ tokenId ].supply;
  
    cardData.push({
      contractAddress: TOOLS_ADDRESS,
      tokenId: tokenId,
      quantityPerReward: 1,
      totalRewards: totalRewards,
    });
  
    totalRewards++;
  
    if (totalRewards > 10) {
      totalRewards = 1;
    }
  }
  
  //console.log(cardData);

    return cardData;


}