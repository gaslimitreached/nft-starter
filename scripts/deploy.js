const hre = require('hardhat');

async function main() {
  const Contract = await hre.ethers.getContractFactory("MyToken");
  const payee = ["some-address"];
  const shares = [100];
  const contract = await Contract.deploy(payee, shares, "ipfs://some-hash");
  await contract.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  });
