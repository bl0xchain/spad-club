const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x6e557F271447FD2aA420cbafCdCD66eCDD5A71A8";
const contractAbi = require("../artifacts/contracts/CustomToken.sol/CustomToken.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="arbitrum-goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Minting tokens...");
    const tx = await contract.mint("0xFe2aA7B0aF149Df874A8923Cd09a694044E120ed", "10000000000");
    await tx.wait();
    console.log("Tokens minted.");
}
main();