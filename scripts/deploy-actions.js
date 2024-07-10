const { ethers } = require('hardhat');

async function main () {
    const SpadActions = await ethers.getContractFactory('SpadActions');
    console.log('Deploying SpadActions...');
    const spadActions = await SpadActions.deploy("0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1"); 
    console.log('SpadActions deployed to:', spadActions.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF