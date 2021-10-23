const { recoverAddress } = require("@ethersproject/transactions");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let myToken;

describe("MyNFT", function () {
  let buyer, owner;
  before(async () => {
    const [owner_, buyer_] = await ethers.getSigners();
    buyer = buyer_;
    owner = owner_;
    const MyToken = await ethers.getContractFactory("MyToken");
    const payees = [owner.address];
    const shares = [100];
    myToken = await MyToken.deploy(payees, shares, "ipfs://hash");
    await myToken.deployed();
  });

  it("should not allow mints when paused", async () => {
    try {
      await myToken.connect(buyer).mint(1);
    } catch (error) {
      expect(error.message).to.contain("Pausable: paused");
    }
  });

  it("should mint token", async () => {
    await myToken.connect(owner).unpause();
    await myToken
      .connect(buyer)
      .mint(1, { value: ethers.utils.parseEther("0.04") });
    expect(await myToken.totalSupply()).to.equal(1);
  });
});
