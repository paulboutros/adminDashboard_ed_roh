import { ethers } from 'ethers';
import {wulayerABI} from "./wulayerABI"; // Adjust the path to your ABI file
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Adjust to your contract address

const provider = new ethers.providers.JsonRpcProvider( process.env.REACT_APP_RPC );

const getContract = () => {
  const signer = new ethers.Wallet(process.env.REACT_APP_THIRDWEB_WALLET_PRIVATE_KEY, provider);
  return new ethers.Contract(contractAddress, wulayerABI, signer);
};

export default getContract;