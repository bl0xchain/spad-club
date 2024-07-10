const { ethers } = require('hardhat');

async function main () {
    const Factory = await ethers.getContractFactory('Factory');
    console.log('Deploying Factory...');
    const factory = await Factory.deploy(); 
    console.log('Factory deployed to:', factory.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1