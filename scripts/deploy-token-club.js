const { ethers } = require('hardhat');

async function main () {
    const TokenClub = await ethers.getContractFactory('TokenClub');
    console.log('Deploying TokenClub...');
    const tokenClub = await TokenClub.deploy(); 
    console.log('TokenClub deployed to:', tokenClub.address);
  }
  
  main();

// Goerli TokenClub Address: 0x809Ebb9D6Fa2473430FAc38A5137123ed8e6D4D3