const hre = require("hardhat");

const API_URL = process.env.BASE_SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF";
const contractAbi = require("../artifacts/contracts/SpadActions.sol/SpadActions.json");

// const provider = new ethers.providers.JsonRpcProvider(API_URL);
const provider = hre.network.provider;
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Updating ModuleAddresses...");
    const tx = await contract.setModuleAddresses("0xC10d97302ab0174c58bfeA223940284664e8be6D", "0xc6F31D742F030d7DafC740cCacca92D7ABCb02D4", "0x6046F5Cae674c603D8c0D83E3C858De7Dcf38750");
    await tx.wait();
    console.log("Updated ModuleAddresses.");
}
main();