const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x84D3B907F8e86BB23C1705f730E81856272b6091";
const contractAbi = require("../artifacts/contracts/CustomToken.sol/CustomToken.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Minting tokens...");
    const tx = await contract.mint("0xFe2aA7B0aF149Df874A8923Cd09a694044E120ed", "1000000000000000000000000");
    await tx.wait();
    console.log("Tokens minted.");
}
main();