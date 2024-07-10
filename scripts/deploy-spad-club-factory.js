const { ethers } = require('hardhat');

async function main () {
  const SpadClubFactory = await ethers.getContractFactory('SpadClubFactory');
  console.log('Deploying SpadClubFactory...');
  const spadClubFactory = await SpadClubFactory.deploy("0xD153E33D806367c29B99F82905C2911A9aCd388D"); 
  console.log('SpadClubFactory deployed to:', spadClubFactory.address);
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exitCode = 1;
  });

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0xc84b70e660ba75E2F4eD8DbE335C969B60f461C9
// Arbitrum Sepolia : 0xc84b70e660ba75E2F4eD8DbE335C969B60f461C9