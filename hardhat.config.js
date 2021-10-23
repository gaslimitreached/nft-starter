require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

require('dotenv').config()

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const PROJECT_ID = process.env.PROJECT_ID
const PK = process.env.PK

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
 module.exports = {
  // defaultNetwork: "hardhat",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    hardhat: { chainId: 1337 },
  },
  solidity: "0.8.4",
};
