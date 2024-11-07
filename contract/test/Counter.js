const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Counter", function () {
  // Fixture to deploy the contract
  async function deployCounterFixture() {
    const Counter = await ethers.getContractFactory("Counter");
    const counter = await Counter.deploy();
    await counter.waitForDeployment();
    return { counter };
  }

  describe("Deployment", function () {
    it("Should initialize with a count of 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      expect(await counter.getCount()).to.equal(0);
    });
  });

  describe("Increment", function () {
    it("Should increment the count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.increment();
      expect(await counter.getCount()).to.equal(1);

      await counter.increment();
      expect(await counter.getCount()).to.equal(2);
    });
  });

  describe("Decrement", function () {
    it("Should decrement the count by 1", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      await counter.increment(); // Increment first to avoid underflow
      await counter.decrement();
      expect(await counter.getCount()).to.equal(0);
    });

    it("Should revert if decrement is called when count is 0", async function () {
      const { counter } = await loadFixture(deployCounterFixture);
      await expect(counter.decrement()).to.be.revertedWith("Counter is already at zero");
    });
  });
});
