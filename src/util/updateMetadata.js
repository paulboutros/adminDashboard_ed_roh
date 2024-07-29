   
import {
   
   
   PACK_ADDRESS,
  
   
   wuCharacterDropAddress,
   wuCharacterDropAddress_721 } from "../const/addresses";


import {CreateBundlePackWEB2, getSDK_fromPrivateKey} from "../data/API";  

import {
  NATIVE_TOKEN_ADDRESS
} from "@thirdweb-dev/sdk";

 


const urlBase = "https://wulibuild.s3.eu-west-3.amazonaws.com/WulirocksLayerNFTimages/"
  

export async function gainExp(
    nft,//: NFT,
    level,//: string,
    exp,//: string,
    nftTokenId//: string,
){
    try {
         

         

        var updatedExp = await parseInt(exp) + 50;
     //   var updatedLvl = await parseInt(level);

        if (updatedExp >= 100) {
           // updatedLvl += 1;
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

     

       // const newUri = await sdk.storage.upload(metadata);

        /*
        const updateNFT = await contract.call(
            "setTokenURI",
            [
                nftTokenId,
                newUri,
            ]
        );*/

        return { success: "Pokemon Trained!" };
    } catch (error) {
        console.log(error);
    }
};

export async function evolve(
    nft, 
    level, 
    nftTokenId, 
    LAYER_ADDRESS

){
    try {
        const category ="kn"; 
     //   const catOffSet = 1;
       //  const resultNumber = parseInt(nftTokenId) + catOffSet;


          // console.log( " >>>>>    resultNumber" + resultNumber);
        const sdk = getSDK_fromPrivateKey();

     //   const contract = await sdk.getContract( LAYER_ADDRESS );
 
       
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
      
           const newUri = await sdk.storage.upload(metadata);
       

        return;
    } catch (error) {
        console.log(error);
    }
}

 
export async function CreateListingPack( WUCOIN  , MARKETPLACE_ADDRESS  ){

   
  const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
 
   const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );

// https://portal.thirdweb.com/typescript/sdk.englishauctions

 
// direct listing a pack
  console.log("start CreateListing Pack ");
   
  const txResult = await marketContract.directListings.createListing({
      assetContractAddress: PACK_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId:0,// 5 , // Required - token ID of the NFT to sell
      pricePerToken: "0.076", // Required - price of each token in the listing
      currencyContractAddress: WUCOIN , // Optional - smart contract address of the currency to use for the listing
      isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
      quantity: 55 ,  //  fianl real case is 11 
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
    });
 


    console.log(">>>>>>    CreateListing    PACK     "   , txResult); 
}

export async function CreateListing( LAYER_ADDRESS, WUCOIN  , MARKETPLACE_ADDRESS   ){

   
    const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
   
     const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );
   
  // https://portal.thirdweb.com/typescript/sdk.englishauctions

  // auction listing a layer
     const txResult = await marketContract.englishAuctions.createAuction({
      assetContractAddress: LAYER_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId: 40, // Required - token ID of the NFT to sell
      buyoutBidAmount:"0.09", // Required - amount to buy the NFT and close the listing
      minimumBidAmount:"0.01", // Required - Minimum amount that bids must be to placed
      currencyContractAddress: WUCOIN, // Optional - smart contract address of the currency to use for the listing
      quantity: 1, // Optional - number of tokens to sell (1 for ERC721 NFTs)
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      bidBufferBps: 5, // Optional - percentage the next bid must be higher than the current highest bid (default is contract-level bid buffer bps)
      timeBufferInSeconds: 60 * 10, // Optional - time in seconds that are added to the end time when a bid is placed (default is contract-level time buffer in seconds)
    });

     
    // direct listing a layer
   /*
     const txResult = await marketContract.directListings.createListing({
      assetContractAddress: LAYER_ADDRESS, // Required - smart contract address of NFT to sell
      tokenId: 40 , // Required - token ID of the NFT to sell
      pricePerToken: "0.076", // Required - price of each token in the listing
      currencyContractAddress: WUCOIN , // Optional - smart contract address of the currency to use for the listing
      isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
      quantity: 1 ,  //  fianl real case is 11 
      startTimestamp: new Date(), // Optional - when the listing should start (default is now)
      endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
    });
*/
  // direct listing a pack
     
    /*
    const txResult = await marketContract.directListings.createListing({
        assetContractAddress: PACK_ADDRESS, // Required - smart contract address of NFT to sell
        tokenId: 5 , // Required - token ID of the NFT to sell
        pricePerToken: "0.076", // Required - price of each token in the listing
        currencyContractAddress: WUCOIN , // Optional - smart contract address of the currency to use for the listing
        isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
        quantity: 55 ,  //  fianl real case is 11 
        startTimestamp: new Date(), // Optional - when the listing should start (default is now)
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });
*/


      console.log(">>>>>>    CreateListing         "   , txResult); 
}

export async function UpdateListing (    MARKETPLACE_ADDRESS ){

     const sdk =  getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
   
    const marketContract = await sdk.getContract(MARKETPLACE_ADDRESS,"marketplace-v3" );


/*
    const txResult = await marketContract.directListings.updateListing( 9 , {
        assetContractAddress:  PACK_ADDRESS , // Required - smart contract address of NFT to sell
        tokenId: 0, // Required - token ID of the NFT to sell
        pricePerToken: "0.05", // Required - price of each token in the listing
        currencyContractAddress: WUCOIN, // Optional - smart contract address of the currency to use for the listing
        isReservedListing: false, // Optional - whether or not the listing is reserved (only specific wallet addresses can buy)
        quantity: 11, // Optional - number of tokens to sell (1 for ERC721 NFTs)
        startTimestamp: new Date(), // Optional - when the listing should start (default is now)
        endTimestamp: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Optional - when the listing should end (default is 7 days from now)
      });
*/
}

//https://portal.thirdweb.com/typescript/sdk.contractmetadata
export async function UpdatePackMetaData(){
     
  const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const packAddress = PACK_ADDRESS;
 
  const packContract = await sdk.getContract(packAddress, "pack");

   

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

// this is for our web2 pack ceration
 function createPacksWEB2(cardList, packSize) {
  const numberOfPacks = Math.floor(cardList.length / packSize);
  const packs = [];

  for (let i = 0; i < numberOfPacks; i++) {
    const pack = [];
    
    // Randomly pick cards for the pack
    for (let j = 0; j < packSize; j++) {
      const randomIndex = Math.floor(Math.random() * cardList.length);
      const selectedCard = cardList.splice(randomIndex, 1)[0];
      pack.push(selectedCard);
    }

    packs.push(pack);
  }

  return packs;
}

export async function createBundle(  LAYER_ADDRESS  ){
           /*
  const generatedData = generateData();

// for WEB2 pack geenration
const cardList = generatedData.flatMap((card) =>
  Array.from({ length: card.totalRewards }, () => card.tokenId)
);
const packSize = 5;
const packs = createPacksWEB2(cardList, packSize );

console.log( "packs" , packs );
*/
     CreateBundlePackWEB2();
  
   return ;  // web 3 version
/*

   const generatedData = generateData();
  const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const packAddress = PACK_ADDRESS;
  const cardAddress = LAYER_ADDRESS;  

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
 
  */

}
 

 export async function createBundle_smallTest( LAYER_ADDRESS  ){
           
    
    const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
  
    const packAddress = PACK_ADDRESS;
    const cardAddress = LAYER_ADDRESS;    
  
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

  export async function UpdateAllNFTLayers( LAYER_ADDRESS ){
    

    try {
  
        const sdk =   getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
        const cardAddress =  LAYER_ADDRESS;
     //const contract = await sdk.getContract( LAYER_ADDRESS);
        const contract = await sdk.getContract(cardAddress, "edition");
        const nfts = await contract.erc1155.getAll();

        
       
       // must be in same order as the NFT list
        const categories =["sh","be","he","kn","we"];  
        let currentDate = new Date();
        //we just want to see the time it take upload all metadata
        const satrtTime = currentDate.toLocaleString();
        console.log(  ">>>>  satrtTime    =  "  , satrtTime);


       let tokenID = 0;
       for (let c = 0; c < categories.length ; c++ ){  // should be: categories.length
         const category = categories[c];

         //if you need to test or filter to certain categoties;
        //  if ( category !== "sh"  ||  category !== "be"   ) {  continue;  } 
       
         for (let design = 0; design < 10 ; design++ ){ // should be:10  (layer by category) )

          const nameBase =  (category + ( design + 1 ).toString().padStart(2, '0')   ) ;

            const metadata = {
                  ...nfts[ tokenID ].metadata,
                  name: nameBase ,
                  image:(urlBase + category + "/" + ( design + 1 ).toString() + ".png"  ) ,
                  description: nameBase,// (category + ( i + 1).toString() )  ,
                  attributes: [
                  {
                    trait_type:category,
                    value:  ( design + 1 ).toString() ,  
                  }
                 ],
             };

              
             

             
               // filters here, we avoid continue so they do not affect   of tokenID++ and design++ incrementation count
            if ( category === "he"  ||  category === "kn"   ||  category === "we" ) {  

               console.log(`category = ${category}token ID= ${ tokenID } name =${  metadata.name } description =  ${  metadata.description }`);
               const newUri = await sdk.storage.upload(metadata);  
              const updateNFT = await contract.call(  "setTokenURI", [ tokenID , newUri ] );  
              console.log( `token${ tokenID } metadata =${ metadata.image }  ` );
            }


             tokenID++;
            
            
         }
        }
          


        currentDate = new Date();
        //we just want to see the time it take upload all metadata
        const endTime = currentDate.toLocaleString();
        console.log(  ">>>>  endTime    =  "  , endTime);

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
 
          //   const dd = await use_SetClaimConditions(contract, WUCOIN);
   

         // const txResult = await contract.erc1155.burn(0, 2);
           
      //  }

        return;
    } catch (error) {
        console.log(error);
    }
}



export async function claimToButton( to , amount ){
/*
  const client = getClientV5();
  const contract = getContract({ 
    client, 
    chain: defineChain(111 5   51 1 1), 
    address: wuCharacterDropAddress_721
    });

  const transaction = claimTo({
    contract,
    to,
    amount
  });
  
   */

}
 
 

export async function getContractV5(){


   /*
const client = createThirdwebClient({ 
clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID
});

// connect to your contract
const contract = getContract({ 
client, 
chain: defineChain(111  5511  1), 
address: wuCharacterDropAddress_721
});

console.log(  " data result = "   ,  contract  );
 
const contract_URI = await readContract({ 
  contract, 
  method: "function contractURI() view returns (string)", 
  params: [] 
})

const nextTokenIdToMint = await readContract({ 
  contract, 
  method: "function nextTokenIdToMint() view returns (uint256)", 
  params: [] 
})


 
const getActiveCondition = await readContract({ 
  contract, 
  method: "function getClaimConditionById(uint256 _conditionId) view returns ((uint256 startTimestamp, uint256 maxClaimableSupply, uint256 supplyClaimed, uint256 quantityLimitPerWallet, bytes32 merkleRoot, uint256 pricePerToken, address currency, string metadata) condition)", 
  params: [0] 
})

console.log(  "  getActiveCondition  = "   ,   getActiveCondition  );

  

const b = convertToInteger( nextTokenIdToMint.toString() )
console.log(  "  b  = "   ,   b  );


const obj = {

  contract: contract,
  client:client,
  chain: defineChain(111  55111),
  nextTokenIdToMint: nextTokenIdToMint.toString() ,
  getActiveCondition: getActiveCondition, 



  contractURI : contract_URI 



}
*/

    return null;// obj;

}

//=================================
function convertToInteger(input) {
  // Remove the trailing 'n' character
  const numberString = input.slice(0, -1);  // .replace('n', '')
  
  // Convert the string to an integer
  const number = parseInt(numberString, 10);
  
  // Check if the conversion is successful
  if (isNaN(number)) {
      throw new Error("Invalid input: not a number");
  }
  
  return number;
}



export async function testReadcontract(){

/*

     // create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({ 
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID
 });

// connect to your contract
const contract = getContract({ 
  client, 
  chain: defineChain(11155    111), 
  address: wuCharacterDropAddress_721
});
  
console.log(  " data result = "   ,  contract  );





const getActiveClaimConditionId = await readContract({ 
  contract, 
  method: "function getActiveClaimConditionId() view returns (uint256)", 
  params: [] 
})

console.log(  " getActiveClaimConditionId= "   ,  getActiveClaimConditionId  );



const totalSupply = await readContract({ 
  contract, 
  method: "function totalSupply() view returns (uint256)", 
  params: [] 
})

 
console.log(  " totalSupply = "   ,  totalSupply  );

const claimCondition = await readContract({ 
  contract, 
  method: "function claimCondition() view returns (uint256 currentStartId, uint256 count)", 
  params: [] 
})

console.log(  " claimCondition = "   ,  claimCondition  );

*/
}

//=================================


export async function SetClaimConditions( WUCOIN ){
 
    try {
  
        const sdk = getSDK_fromPrivateKey();  //ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");
       // if you test on base
       // use wuLayerDropERC1155BASE  and make sure you change chain ID to Base
        //wuCharacterDropAddress
        const contract = await sdk.getContract(wuCharacterDropAddress  );
  
       const dd = await use_SetClaimConditions(contract, WUCOIN);
    

       console.log(  " use_SetClaimConditions result = "   ,  dd  );

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


   // base contract 0x590b1670CD6b1d1aBeEc7b59BEE72EF8e40b695C

    const txResult = await contract.erc1155.claimConditions.set(
          10 , // ID of the token to set the claim conditions for
         [
          { 
            metadata: {
              name: "Entry Phase 1", // The name of the phase
            },
           // currencyAddress: NATIVE_TOKEN_ADDRESS, // currencyAdress, // The address of the currency you want users to pay in
          //  price: 0.005, // The price of the token in the currency specified above
          //  maxClaimablePerWallet: 2, // The maximum number of tokens a wallet can claim
          //  maxClaimableSupply: 5, // The total number of tokens that can be claimed in this phase
          //  startTime: new Date(), // When the phase starts (i.e. when users can start claiming tokens)
            waitInSeconds: 60 * 60 * 1   //(one hour) The period of time users must wait between repeat claims
            
          },
          /*
          {
            metadata: {
              name: "Entry Phase 2", // price doubles here
            },
            currencyAddress: NATIVE_TOKEN_ADDRESS, // currencyAdress, // The address of the currency you want users to pay in
            price: 0.01, // The price of the token in the currency specified above
            maxClaimablePerWallet: 1, // The maximum number of tokens a wallet can claim
            maxClaimableSupply: 5, // The total number of tokens that can be claimed in this phase
            startTime: new Date(Date.UTC(2023, 6, 25, 12, 24, 0)) , // July 25th, 2023, 7:24 PM EST, 
            waitInSeconds: 60 * 60 * 1   //(one hour) The period of time users must wait between repeat claims
            
          },*/


        ],
        false, // Whether to resetClaimEligibilityForAll (i.e. reset state of claims for previous claimers)
      );


      return txResult;
 }


 
 function generateData( LAYER_ADDRESS ){

     
  const cardData = [];
  
  let totalRewards = 1;
  
  for (let tokenId = 0; tokenId < 50; tokenId++) {
  
  
    // const totalRewards = NFTs[ tokenId ].supply;
  
    cardData.push({
      contractAddress: LAYER_ADDRESS,
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