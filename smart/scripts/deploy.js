
const main = async ()=> {
  const EnergyToken = await hre.ethers.getContractFactory("EnergyToken");
  const energyToken = await EnergyToken.deploy(200000,4000040,50,8,100000000000);
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