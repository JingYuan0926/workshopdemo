async function main() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment(); // Use waitForDeployment instead of deployed
  
    console.log("Counter deployed to:", counter.target); // .target gives the deployed address
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  