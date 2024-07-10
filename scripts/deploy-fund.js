const { ethers } = require('hardhat');

async function main () {
    const SpadFund = await ethers.getContractFactory('SpadFund');
    console.log('Deploying SpadFund...');
    const spadFund = await SpadFund.deploy("0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF"); 
    console.log('SpadFund deployed to:', spadFund.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0xC10d97302ab0174c58bfeA223940284664e8be6D