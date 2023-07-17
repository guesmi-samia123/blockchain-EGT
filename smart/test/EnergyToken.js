const { expect } = require("chai");
const hre = require("hardhat");

describe("EnergyToken function", function() {
  // global vars
  let Token;
  let energyToken;
  let owner;
  let addr1;
  let addr2;
  let tokenCap = 200000000;
  let tokenBlockReward = 50;
  let tokeninitialsupply = 100000000;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("EnergyToken");
    [owner, addr1, addr2] = await hre.ethers.getSigners();

    energyToken = await Token.deploy(tokeninitialsupply,tokenCap, tokenBlockReward);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await energyToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await energyToken.balanceOf(owner.address);
      expect(await energyToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await energyToken.cap();
      expect(Number(hre.ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await energyToken.blockReward();
      expect(Number(hre.ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      // Transfer 50 tokens from owner to addr1
      await energyToken.transfer(addr1.address, 50);
      const addr1Balance = await energyToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      // Transfer 50 tokens from addr1 to addr2
      // We use .connect(signer) to send a transaction from another account
      await energyToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await energyToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await energyToken.balanceOf(owner.address);
      // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
      // `require` will evaluate false and revert the transaction.
      await expect(
        energyToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

      // Owner balance shouldn't have changed.
      expect(await energyToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await energyToken.balanceOf(owner.address);

      // Transfer 100 tokens from owner to addr1.
      await energyToken.transfer(addr1.address, 100);

      // Transfer another 50 tokens from owner to addr2.
      await energyToken.transfer(addr2.address, 50);

      // Check balances.
      const finalOwnerBalance = await energyToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

      const addr1Balance = await energyToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await energyToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
  
});