const { ethers } = require('hardhat');

async function main () {
    const TokenClub = await ethers.getContractFactory('TokenClub');
    console.log('Deploying TokenClub...');
    const tokenClub = await TokenClub.deploy(); 
    console.log('TokenClub deployed to:', tokenClub.address);
  }
  
  main();

// Goerli TokenClub Address: 0xb2AFB2c40b07cc67D985E5575dDA1F274D7be635