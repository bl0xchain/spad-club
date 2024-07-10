const { ethers } = require("hardhat");

// scripts/deploy.js
async function main () {
  
  const USDCToken = await ethers.getContractFactory('SpadToken');
  console.log('Deploying USDCToken...');
  const usdcToken = await USDCToken.deploy("USD Coin", "USDC", 6);
  await usdcToken.deployed();
  console.log('USDCToken deployed to:', usdcToken.address);

  const DAIToken = await ethers.getContractFactory('SpadToken');
  console.log('Deploying DAIToken...');
  const daiToken = await DAIToken.deploy("Dai Stablecoin", "DAI", 18);
  await daiToken.deployed();
  console.log('DAIToken deployed to:', daiToken.address);

  const Factory = await ethers.getContractFactory('Factory');
  console.log('Deploying Factory...');
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log('Factory deployed to:', factory.address);

  const tx1 = await factory.updateValidCurrency(usdcToken.address, true);
  await tx1.wait();
  console.log("Added USDC as valid in Factory");

  const tx2 = await factory.updateValidCurrency(daiToken.address, true);
  await tx2.wait();
  console.log("Added DAI as valid in Factory");

  const SpadActions = await ethers.getContractFactory('SpadActions');
  console.log('Deploying SpadActions...');
  const spadActions = await SpadActions.deploy(factory.address);
  await spadActions.deployed();
  console.log('SpadActions deployed to:', spadActions.address);

  const tx3 = await factory.setActionsAddress(spadActions.address);
  await tx3.wait();
  console.log("Updated Actions address");

  const SpadFund = await ethers.getContractFactory('SpadFund');
  console.log('Deploying SpadFund...');
  const spadFund = await SpadFund.deploy(spadActions.address);
  await spadFund.deployed();
  console.log('SpadFund deployed to:', spadFund.address);

  const SpadPitch = await ethers.getContractFactory('SpadPitch');
  console.log('Deploying SpadPitch...');
  const spadPitch = await SpadPitch.deploy(spadActions.address);
  await spadPitch.deployed();
  console.log('SpadPitch deployed to:', spadPitch.address);

  const Privacy = await ethers.getContractFactory('Privacy');
  console.log('Deploying Privacy...');
  const privacy = await Privacy.deploy(spadActions.address);
  await privacy.deployed();
  console.log('Privacy deployed to:', privacy.address);

  const tx4 = await spadActions.setModuleAddresses(spadFund.address, spadPitch.address, privacy.address);
  await tx4.wait();
  console.log("Module addresses are updated in Actions");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });