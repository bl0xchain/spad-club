const { ethers } = require('hardhat');

async function main () {
    const Factory = await ethers.getContractFactory('Factory');
    const factory = Factory.attach('0x5FbDB2315678afecb367f032d93F642f64180aa3');
    const tx = await factory.setActionsAddress("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
    await tx.wait();
    console.log("Updated the SpadActionAddress.");
  }
  
  main();