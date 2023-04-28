const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x6e6268c2F3b9FAd851A94602c2c100b64B6901d1";
const contractAbi = require("../artifacts/contracts/CustomToken.sol/CustomToken.json");

const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Minting tokens...");
    const tx = await contract.mint("0xa8da7eB9ED0629dE63cA5D7150a74e1AFbEfAac0", "1000000000000000000000000");
    await tx.wait();
    console.log("Tokens minted.");
}
main();