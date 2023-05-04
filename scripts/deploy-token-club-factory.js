const { ethers } = require('hardhat');

async function main () {
    const TokenClubFactory = await ethers.getContractFactory('TokenClubFactory');
    console.log('Deploying TokenClubFactory...');
    const tokenClubFactory = await TokenClubFactory.deploy("0xE963f725d80Ec176Bd764A330e8046f6A8ff786B"); 
    console.log('TokenClubFactory deployed to:', tokenClubFactory.address);
  }
  
  main();

// Goerli TokenClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD