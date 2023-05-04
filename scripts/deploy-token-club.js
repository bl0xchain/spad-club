const { ethers } = require('hardhat');

async function main () {
    const TokenClub = await ethers.getContractFactory('TokenClub');
    console.log('Deploying TokenClub...');
    const tokenClub = await TokenClub.deploy(); 
    console.log('TokenClub deployed to:', tokenClub.address);
  }
  
  main();

// Goerli TokenClub Address: 0xE963f725d80Ec176Bd764A330e8046f6A8ff786B