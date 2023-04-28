const { ethers } = require('hardhat');

async function main () {
    const TokenClubFactory = await ethers.getContractFactory('TokenClubFactory');
    console.log('Deploying TokenClubFactory...');
    const tokenClubFactory = await TokenClubFactory.deploy("0x809Ebb9D6Fa2473430FAc38A5137123ed8e6D4D3"); 
    console.log('TokenClubFactory deployed to:', tokenClubFactory.address);
  }
  
  main();

// Goerli TokenClubFactory Address: 0xA8410aB563838c7329faE8621214d0e62c645d9c