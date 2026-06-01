import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying CABRUCA Token on Arbitrum...");

  // Get signer
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying from:", deployer.address);

  // Deploy contract
  const CABRUCAToken = await ethers.getContractFactory("CABRUCAToken");
  const cabruToken = await CABRUCAToken.deploy();

  await cabruToken.waitForDeployment();

  const address = await cabruToken.getAddress();
  console.log("✅ CABRUCA Token deployed to:", address);

  // Save deployment info
  const deploymentInfo = {
    network: "arbitrum",
    contract: "CABRUCAToken",
    address: address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  };

  console.log("\n📦 Deployment Info:", deploymentInfo);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
