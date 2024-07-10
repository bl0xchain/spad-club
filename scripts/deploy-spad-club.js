const { ethers } = require('hardhat');

async function main () {
    const SpadClub = await ethers.getContractFactory('SpadClub');
    console.log('Deploying SpadClub...');
    const spadClub = await SpadClub.deploy(); 
    console.log('SpadClub deployed to:', spadClub.address);
  }
  
  main();

// Goerli SpadClub Address: 0xE963f725d80Ec176Bd764A330e8046f6A8ff786B
// Arbitrum Goerli SpadClub Address: 0x555e75EEb0520d8e3FCcfC5ad178620cb88Ce59d
// Base Sepolia : 0xD153E33D806367c29B99F82905C2911A9aCd388D
// Arbitrum Sepolia : 0xD153E33D806367c29B99F82905C2911A9aCd388D