//const hre = require("hardhat");

const main = async ()=> {
    //const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    
    //const unlockTime = currentTimestampInSeconds + 60;
  
    //const lockedAmount = hre.ethers.utils.parseEther("0.001");
    //create an anstance of smart contract "object factory= smart contract factory" thst allows me to deploy instances of smart contract in ethereum network
    const EnergyToken = await hre.ethers.getContractFactory("EnergyToken");
    const energyToken = await EnergyToken.deploy(1000000000,2000000000,50);
    await energyToken.deployed(); 
  console.log("EnergyToken deployed to :" , energyToken.address );
    
  }
  const runMain =   async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
      
    }
  }
  
  runMain();
  
  