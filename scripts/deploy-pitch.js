const { ethers } = require('hardhat');

async function main () {
    const SpadPitch = await ethers.getContractFactory('SpadPitch');
    console.log('Deploying SpadPitch...');
    const spadPitch = await SpadPitch.deploy("0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF"); 
    console.log('SpadPitch deployed to:', spadPitch.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0xc6F31D742F030d7DafC740cCacca92D7ABCb02D4