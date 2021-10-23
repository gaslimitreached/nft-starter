const { recoverAddress } = require("@ethersproject/transactions");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let myToken;

describe("MyNFT", function () {
  before(async () => {
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy();
    await myToken.deployed();
  });

  describe("Cappin", async () => {
    it("soda has right cap address", async () => {
      expect(await soda.bottleCaps()).to.equal(caps.address);
    });
    it("Gives me caps on mint", async () => {
      const [owner, buyer, addr2] = await ethers.getSigners();
      await soda.connect(buyer).pour(1);
      expect(await soda.totalSupply()).to.equal(1);
      // await soda.tokenURI(1);
      const c = await caps.balanceOf(buyer.address);

      expect(c.toString()).to.equal("400000000000000000000");
    });
  });

  describe("Bubble Maker", async () => {
    it("bobbles", async () => {
      const prick = await bubbles.random(40, 400, 24);
      expect(await bubbles.random(1, 1, 24)).to.eq(1);
      expect(prick).to.be.gt(40);
      expect(prick).to.be.lt(401);
    });
  });

  describe("ERC721 Pseudopop", async () => {
    it("pour a beverage", async () => {
      const [, buyer] = await ethers.getSigners();

      expect(await soda.maxSupply()).to.equal(50);
      await soda.connect(buyer).pour(1);
      expect(await soda.totalSupply()).to.equal(2);
    });
    it("gives me bobble", async () => {
      const oof = await soda.tokenURI(1);
      //const svg = await soda.getSVG(12, 1602453390);

      console.log(oof);
      expect(oof).to.exist;
    });
  });
});
