const { ethers } = require('hardhat');

async function main () {
    const TokenClubFactory = await ethers.getContractFactory('TokenClubFactory');
    console.log('Deploying TokenClubFactory...');
    const tokenClubFactory = await TokenClubFactory.deploy("0xb2AFB2c40b07cc67D985E5575dDA1F274D7be635"); 
    console.log('TokenClubFactory deployed to:', tokenClubFactory.address);
  }
  
  main();

// Goerli TokenClubFactory Address: 0x46cBD40e17c43dCbdAb2A5b9C4D105413FD1353b