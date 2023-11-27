import   { useEffect , useState } from 'react';



import { ThirdwebSDK } from "@thirdweb-dev/sdk";

import { ConnectWallet, MediaRenderer, useAddress,
  useContract, useContractRead,
   useOwnedNFTs ,useTokenSupply, useClaimToken , Web3Button,
  
   useSetClaimConditions,
 
 
  } from "@thirdweb-dev/react";
import { FARMER_ADDRESS, REWARDS_ADDRESS, STAKING_ADDRESS, TOOLS_ADDRESS, DROP_ADDRESS } from "../../const/addresses.ts";
import { ClaimFarmer } from "../../components/FARMER/ClaimFarmer";
import { Equipped } from "../../components/FARMER/Equipped";
import { Inventory } from "../../components/FARMER/Inventory";
 
  
import { BigNumber, ethers } from "ethers";
import { Text, Box, Card, Container, Flex, Heading, SimpleGrid, Spinner, Skeleton } from "@chakra-ui/react";
 

// Your smart contract address
const contractAddress = TOOLS_ADDRESS ;//"{{contract_address}}";

const FarmerPage2 = () => {

  const amount = 1;
  //const {amount, setAmount }  = useState(); 
  const address = useAddress();
// here, these hook return an object
 
  const { contract } = useContract(contractAddress);
  const {
    mutateAsync: setClaimConditions,
    isLoading,
    error,
  } = useSetClaimConditions(contract);

  return (
    <Web3Button
      contractAddress= {contractAddress}
      action={() =>
        setClaimConditions({
          phases: [
            { 

              metadata: { name: 'name4' },
              startTimestamp: 0, 
              maxClaimableSupply: 2, 
              supplyClaimed: 0, 
              quantityLimitPerWallet: 0,
              merkleRoot: 0,
               pricePerToken: 2000,
               currency: "0x6c66Ec1087419Da555ea989489f160B6e7f2E920" 
             
            
             }
              ],
        })
      }
    >
      Set Claim Conditions
    </Web3Button>
  );
 
};
//export default FarmerPage2;
 
const FarmerPage = () => {

  const amount = 1;
  //const {amount, setAmount }  = useState(); 
  const address = useAddress();
// here, these hook return an object
  const { contract: farmercontract } = useContract(FARMER_ADDRESS);
  const {  contract:toolsContract } = useContract(TOOLS_ADDRESS);
  const {  contract:stakingContract } = useContract(STAKING_ADDRESS);
  const {  contract:rewardContract } = useContract(REWARDS_ADDRESS);


   
  //const {  contract:rewardContract } = useContract(REWARDS_ADDRESS);
  const tokenDropContract = useContract( DROP_ADDRESS, "token-drop").contract;
  const { data: tokenSupply} = useTokenSupply(tokenDropContract);
 
 const { mutate: claimTokens, isLoading } = useClaimToken(tokenDropContract);
  console.log( "  >>>>   tokenDrop",tokenDropContract);
// this was just to test the SDK
  //getContract();
  //getSDKSigner(    address  );
 


  const { data: ownedFarmers, isLoading: loadingOwnedFarmers } = useOwnedNFTs(farmercontract, address);
  const { data: ownedTools, isLoading: loadingOwnedTools } = useOwnedNFTs(toolsContract, address);

  const { data: equippedTools } = useContractRead(
    stakingContract, 
    "getStakeInfo",
    [address]
  );

  const { data: rewardBalance } = useContractRead(rewardContract, "balanceOf", [address]);
  
  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex direction={"column"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Heading my={"40px"}>Welcom to Crypto Farm</Heading>
          
          <ConnectWallet />
        </Flex>
      </Container>
    );
  }

  if (loadingOwnedFarmers) {
    return(
      <Container maxW={"1200px"}>
        <Flex h={"100vh"} justifyContent={"center"} alignItems={"center"}>
          <Spinner />
        </Flex>
      </Container>
    );
  }

  if (ownedFarmers?.length === 0) {
    return (
      <Container maxW={"1200px"}>
        <ClaimFarmer />
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <SimpleGrid columns={2} spacing={10}>
        <Card p={5}>
          <Heading>Farmer:</Heading>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              {ownedFarmers?.map((nft) => (
                <div key={nft.metadata.id}>
                  <MediaRenderer 
                    src={nft.metadata.image} 
                    height="100%"
                    width="100%"
                  />
                </div>
              ))}
            </Box>
            <Box>
            <Text my={"40px"}>token supply { tokenSupply?.displayValue } { tokenSupply?.symbol }</Text>

              <Text fontSize={"small"} fontWeight={"bold"}>$CARROT Balance:</Text>
                {rewardBalance && (
                    <p>{ethers.utils.formatUnits(rewardBalance, 18)}</p>
                  )}
                   {/* <input type ="number" value={amount} onChange={e=> setAmount(e.target.value)  } ></input> */}
                    {/* <input type ="number" value={amount} onChange={e=> transfert()  } ></input> */}


                 <button  
                 onClick={  () => transfert() }
                 disabled ={isLoading}
                 >
                    transfet
                 </button>
 

                 <button  
                 onClick={  () => claimTokens({ amount, to: address})  }
                 disabled ={isLoading}
                 >
                    cl amount
                 </button>
                  {/* <Web3Button
                    colorMode="dark"
                  contractAddress= {STAKING_ADDRESS}
                    action={(contract) => contract.erc20.claim(amount)}
                    onSuccess={() => alert("Claimed!")}
                    onError={(err) => alert(err)}
                  >
                    Claim Tokens
                  </Web3Button>    */}
                    

              </Box>

               
          </SimpleGrid>
        </Card>
        <Card p={5}>
          <Heading>Inventory:</Heading>
          <Skeleton isLoaded={!loadingOwnedTools}>
            <Inventory
              nft={ownedTools}
            />     
          </Skeleton>
        </Card>
      </SimpleGrid>
      <Card p={5} my={10}>
        <Heading mb={"30px"}>Equiped Tools:</Heading>
        <SimpleGrid columns={3} spacing={10}>
            {equippedTools &&
              equippedTools[0].map((nft ) => (
                <Equipped
                  key={nft.toNumber()}
                  tokenId={nft.toNumber()}
                />
              ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
};

 export default FarmerPage;
 



async function transfert( ){
  
  const signer = new ethers.Wallet(process.env.REACT_APP_THIRDWEB_WALLET_PRIVATE_KEY  ); // "{{private_key}}"
   const sdk = await ThirdwebSDK.fromSigner(signer, process.env.REACT_APP_ETH_NETWORK, {
    clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID , // Use client id if using on the client side, get it from dashboard settings
    secretKey: process.env.REACT_APP_THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings. Do NOT expose your secret key to the client-side
  });
   
 

const contract = await sdk.getContract("0x6c66Ec1087419Da555ea989489f160B6e7f2E920");

// Address of the wallet you want to send the tokens to
const toAddress = "0x4eba90B4124DA2240C7Cd36A9EEE7Ff9F81Cf601";
// The amount of tokens you want to send
const amount = 500; // 106000000000000000000
await contract.erc20.transfer(toAddress, amount);

}



//https://portal.thirdweb.com/typescript/sdk.thirdwebsdk.fromsigner
async function  getSDKSigner(   address  ){
  // An example of a signer using the ethers library
 const signer = new ethers.Wallet(process.env.REACT_APP_THIRDWEB_WALLET_PRIVATE_KEY  ); // "{{private_key}}"

const sdk = await ThirdwebSDK.fromSigner(signer, process.env.REACT_APP_ETH_NETWORK, {
  clientId: process.env.REACT_APP_THIRDWEB_CLIENT_ID , // Use client id if using on the client side, get it from dashboard settings
  secretKey: process.env.REACT_APP_THIRDWEB_SECRET_KEY, // Use secret key if using on the server, get it from dashboard settings. Do NOT expose your secret key to the client-side
});



const contract = await sdk.getContract( DROP_ADDRESS );

 
console.log( " >>>>>>>>>>>>>>>>>>     address"  ,  address  );
//console.log( " >>>>>>>>>>>>>>>>>>    sdk contract"  , contract  );
const tx = await contract.erc20.claim(address, 100.50);
  
}
 