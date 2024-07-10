const API_KEY = process.env.API_KEY;
const API_URL = process.env.BASE_SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.NEW_PRIVTE_KEY;
const CONTRACT_ADDRESS = "0xA9A11Da9Ffab98DBB151E57ac7229dC15475Abe7";
const contractAbi = require("../artifacts/contracts/CustomToken.sol/CustomToken.json");

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, signer);

async function main() {
    console.log("Minting tokens...");
    const tx = await contract.mint("0xa8da7eB9ED0629dE63cA5D7150a74e1AFbEfAac0", "1000000000000000000000000");
    await tx.wait();
    console.log("Tokens minted.");
}
main()
.then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });