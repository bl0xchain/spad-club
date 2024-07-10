const { ethers, network } = require('hardhat');
const API_URL = process.env.BASE_SEPOLIA_API_URL;
const PRIVATE_KEY = process.env.HARHAT_PRIVATE_KEY;
const factoryAbi = require("../artifacts/contracts/Factory.sol/Factory.json");
const actionsAbi = require("../artifacts/contracts/SpadActions.sol/SpadActions.json");

// const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, network.provider);

async function main () {
    const Factory = await ethers.getContractFactory('Factory');
    console.log('Deploying Factory...');
    const factory = await Factory.deploy(); 
    console.log('Factory deployed to:', factory.address);

    const SpadActions = await ethers.getContractFactory('SpadActions');
    console.log('Deploying SpadActions...');
    const spadActions = await SpadActions.deploy(factory.address); 
    console.log('SpadActions deployed to:', spadActions.address);

    const factoryContract = new ethers.Contract(factory.address, factoryAbi.abi, signer);
    console.log("Updating the SpadActionAddress...");
    const tx = await factoryContract.setActionsAddress(spadActions.address);
    await tx.wait();
    console.log("Updated the SpadActionAddress.");

    const SpadFund = await ethers.getContractFactory('SpadFund');
    console.log('Deploying SpadFund...');
    const spadFund = await SpadFund.deploy(spadActions.address); 
    console.log('SpadFund deployed to:', spadFund.address);

    const SpadPitch = await ethers.getContractFactory('SpadPitch');
    console.log('Deploying SpadPitch...');
    const spadPitch = await SpadPitch.deploy(spadActions.address); 
    console.log('SpadPitch deployed to:', spadPitch.address);

    const Privacy = await ethers.getContractFactory('Privacy');
    console.log('Deploying Privacy...');
    const privacy = await Privacy.deploy(spadActions.address); 
    console.log('SpadPitch deployed to:', privacy.address);

    const actionsContract = new ethers.Contract(spadActions.address, actionsAbi.abi, signer);
    console.log("Updating ModuleAddresses...");
    const tx2 = await contract.setModuleAddresses(spadFund.address, spadPitch.address, privacy.address);
    await tx2.wait();
    console.log("Updated ModuleAddresses.");
  }
  
  main();

// Goerli SpadClubFactory Address: 0x8DF563004df853a5575679950e59369B169D8EBD
// Arbitrum Goerli SpadClubFactory Address: 0x6ff9aF755c4305d349b578dc91fC33Cf61f0D6A1
// Base Sepolia : 0xf851eE0b5b99090CF2039d3a7da30Aa196451b35