const { ethers } = require('hardhat');

async function main () {
    const CustomToken = await ethers.getContractFactory('CustomToken');
    console.log('Deploying ExternalToken...');
    const externalToken = await CustomToken.deploy("External Token", "EXT"); 
    console.log('ExternalToken deployed to:', externalToken.address);
  }
  
  main();

// Goerli ExternalToken Address: 0x84D3B907F8e86BB23C1705f730E81856272b6091
// Arb Sepolia : 0xA9A11Da9Ffab98DBB151E57ac7229dC15475Abe7