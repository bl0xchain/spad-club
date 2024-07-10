const API_URL = process.env.BASE_SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1";
const contractAbi = require("../artifacts/contracts/Factory.sol/Factory.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Updating the SpadActionAddress...");
    const tx = await contract.setActionsAddress("0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF");
    await tx.wait();
    console.log("Updated the SpadActionAddress.");
}
main();