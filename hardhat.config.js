/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('hardhat-contract-sizer');

const { API_URL, PRIVATE_KEY, GOERLI_API_URL, ARBITRUM_GOERLI_API_URL } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "arbitrumGoerli",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    goerli: {
      url: GOERLI_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    arbitrumGoerli: {
      url: ARBITRUM_GOERLI_API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
  },
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  }
};
