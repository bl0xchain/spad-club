const { ethers } = require('hardhat');

async function main () {
    const SpadClubFactory = await ethers.getContractFactory('SpadClubFactory');
    console.log('Deploying SpadClubFactory...');
    const spadClubFactory = await SpadClubFactory.deploy("0x555e75EEb0520d8e3FCcfC5ad178620cb88Ce59d"); 
    console.log('SpadClubFactory deployed to:', spadClubFactory.address);
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1