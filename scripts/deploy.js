const hre = require("hardhat");
// const fs = require("fs");

async function main() {
  const contract = await hre.ethers.deployContract("TestNFT");

  await contract.waitForDeployment();

  const deployContract = await contract.getAddress();

  //   fs.writeFileSync("contract.txt", deployContract);

  console.log(`deployed to ${deployContract}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});