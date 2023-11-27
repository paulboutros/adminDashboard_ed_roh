import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NFT } from "@thirdweb-dev/react";
import { TOOLS_ADDRESS, REWARDS_ADDRESS } from "../const/addresses";
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