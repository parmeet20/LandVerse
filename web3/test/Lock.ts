import { ethers } from 'hardhat'
import { expect } from "chai"
import { Signer } from "ethers"
import { Land } from '../typechain-types'

describe('LandTests', () => {
  let land: Land;
  let owner: Signer;
  let add1: Signer;
  let result;
  const NAME: string = "My Land";
  const SYMBOL: string = "MLND";

  beforeEach(async () => {
    const Cont = await ethers.getContractFactory("Land");
    land = await Cont.deploy();
    [owner, add1] = await ethers.getSigners();
    await land.mint("House", 10, 10, 0, 5, 10, 5, { value: ethers.parseEther("1.0") });
    await land.connect(owner).approve(await add1.getAddress(), 1);
  })

  describe('Deployment', () => {
    it('contract name and symbol should be correct', async () => {
      expect(await land.name()).to.equal(NAME);
    })
    it('contract symbol should be correct', async () => {
      expect(await land.symbol()).to.equal(SYMBOL);
    })
    it('Returns the number of buildings sold', async () => {
      expect(await land.totalSupply()).to.equal(1); // After minting, the total supply should be 1
    })
    it('Returns the number of buildings available', async () => {
      expect(await land.maxSupply()).to.equal(5);
    })
  })

  describe('Minting', () => {
    describe('Success', () => {
      it('should successfully mint a new building', async () => {
        const buildingOwner = (await land.getBuilding(1)).owner;
        expect(buildingOwner).to.equal(await owner.getAddress());
      })
      it('should update building details', async () => {
        result = await land.getBuilding(1);
        expect(result.name).to.equal('House');
        expect(result.posX).to.equal(10);
        expect(result.posY).to.equal(10);
        expect(result.posZ).to.equal(0);
        expect(result.sizeX).to.equal(5);
        expect(result.sizeY).to.equal(10);
        expect(result.sizeZ).to.equal(5);
      })
    })
    describe('Failure', () => {
      it('should fail if the cost is less than 1 eth', async () => {
        await expect(
          land.mint("House", 10, 10, 0, 5, 10, 5, { value: ethers.parseEther("0.1") })
        ).to.be.revertedWith("Not enough Ether sent");
      });
    });
  })

  describe('Transfers', () => {
    it('should update building owner after transfer', async () => {
      await land.connect(owner).transferFrom(await owner.getAddress(), await add1.getAddress(), 1);

      result = await land.getBuilding(1);

      expect(result.owner).to.equal(await add1.getAddress());
    });
  })

})
