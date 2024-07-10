const { ethers } = require('hardhat');

async function main () {
    const Privacy = await ethers.getContractFactory('Privacy');
    console.log('Deploying Privacy...');
    const privacy = await Privacy.deploy("0xED7Fe405F8e895963b7D62D6c9904CD7F11a14cF"); 
    console.log('SpadPitch deployed to:', privacy.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0x6046F5Cae674c603D8c0D83E3C858De7Dcf38750