/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('hardhat-contract-sizer');

const { API_URL, PRIVATE_KEY, NEW_PRIVTE_KEY, GOERLI_API_URL, ARBITRUM_GOERLI_API_URL, ARBITRUM_SEPOLIA_API_URL, BASE_SEPOLIA_API_URL, HARHAT_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "arbitrumSepolia",
  networks: {
    hardhat: {},
    // sepolia: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    // goerli: {
    //   url: GOERLI_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    // arbitrumGoerli: {
    //   url: ARBITRUM_GOERLI_API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_API_URL,
      accounts: [`0x${NEW_PRIVTE_KEY}`]
    },
    // baseSepolia: {
    //   url: BASE_SEPOLIA_API_URL,
    //   accounts: [`0x${NEW_PRIVTE_KEY}`]
    // },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};
