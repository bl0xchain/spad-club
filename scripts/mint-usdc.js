const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0xd9037B8A07Ec697014E8c94c52Cb41f67132B4a8";
const contractAbi = require("../artifacts/contracts/CustomToken.sol/CustomToken.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Minting tokens...");
    const tx = await contract.mint("0xFe2aA7B0aF149Df874A8923Cd09a694044E120ed", "10000000000");
    await tx.wait();
    console.log("Tokens minted.");
}
main();