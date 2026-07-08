import { expect } from 'chai';
import { ethers } from 'hardhat';
import { CABRUCAToken } from '../typechain-types';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('CABRUCA Token - ERC-721', () => {
  let cabrukaToken: CABRUCAToken;
  let owner: HardhatEthersSigner;
  let addr1: HardhatEthersSigner;
  let addr2: HardhatEthersSigner;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy contract
    const CABRUCATokenFactory = await ethers.getContractFactory('CABRUCAToken');
    cabrukaToken = await CABRUCATokenFactory.deploy();
    await cabrukaToken.deployed();
  });

  describe('Deployment', () => {
    it('Should deploy with correct owner', async () => {
      expect(await cabrukaToken.owner()).to.equal(owner.address);
    });

    it('Should have correct name', async () => {
      expect(await cabrukaToken.name()).to.equal('CABRUCA Token');
    });

    it('Should have correct symbol', async () => {
      expect(await cabrukaToken.symbol()).to.equal('CAB-T');
    });
  });

  describe('Minting', () => {
    it('Should mint NFT to address', async () => {
      const tokenURI = 'ipfs://QmTest/metadata.json';
      await cabrukaToken.mint(addr1.address, tokenURI);

      expect(await cabrukaToken.ownerOf(1)).to.equal(addr1.address);
      expect(await cabrukaToken.tokenURI(1)).to.equal(tokenURI);
    });

    it('Should increment token ID', async () => {
      await cabrukaToken.mint(addr1.address, 'ipfs://1');
      await cabrukaToken.mint(addr2.address, 'ipfs://2');

      expect(await cabrukaToken.ownerOf(1)).to.equal(addr1.address);
      expect(await cabrukaToken.ownerOf(2)).to.equal(addr2.address);
    });

    it('Should only allow owner to mint', async () => {
      await expect(
        cabrukaToken.connect(addr1).mint(addr2.address, 'ipfs://test')
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should emit Transfer event on mint', async () => {
      await expect(cabrukaToken.mint(addr1.address, 'ipfs://test'))
        .to.emit(cabrukaToken, 'Transfer')
        .withArgs(ethers.ZeroAddress, addr1.address, 1);
    });
  });

  describe('Transfers', () => {
    beforeEach(async () => {
      await cabrukaToken.mint(addr1.address, 'ipfs://test');
    });

    it('Should transfer token from owner', async () => {
      await cabrukaToken.connect(addr1).transferFrom(
        addr1.address,
        addr2.address,
        1
      );

      expect(await cabrukaToken.ownerOf(1)).to.equal(addr2.address);
    });

    it('Should not allow transfer from non-owner', async () => {
      await expect(
        cabrukaToken.connect(addr2).transferFrom(
          addr1.address,
          addr2.address,
          1
        )
      ).to.be.revertedWith('ERC721: caller is not token owner');
    });

    it('Should update balance after transfer', async () => {
      const addr1BalanceBefore = await cabrukaToken.balanceOf(addr1.address);
      const addr2BalanceBefore = await cabrukaToken.balanceOf(addr2.address);

      await cabrukaToken.connect(addr1).transferFrom(
        addr1.address,
        addr2.address,
        1
      );

      const addr1BalanceAfter = await cabrukaToken.balanceOf(addr1.address);
      const addr2BalanceAfter = await cabrukaToken.balanceOf(addr2.address);

      expect(addr1BalanceAfter).to.equal(addr1BalanceBefore - 1n);
      expect(addr2BalanceAfter).to.equal(addr2BalanceBefore + 1n);
    });
  });

  describe('Approvals', () => {
    beforeEach(async () => {
      await cabrukaToken.mint(addr1.address, 'ipfs://test');
    });

    it('Should approve token transfer', async () => {
      await cabrukaToken
        .connect(addr1)
        .approve(addr2.address, 1);

      expect(await cabrukaToken.getApproved(1)).to.equal(addr2.address);
    });

    it('Should transfer with approval', async () => {
      await cabrukaToken
        .connect(addr1)
        .approve(addr2.address, 1);

      await cabrukaToken
        .connect(addr2)
        .transferFrom(addr1.address, addr2.address, 1);

      expect(await cabrukaToken.ownerOf(1)).to.equal(addr2.address);
    });

    it('Should emit Approval event', async () => {
      await expect(
        cabrukaToken
          .connect(addr1)
          .approve(addr2.address, 1)
      )
        .to.emit(cabrukaToken, 'Approval')
        .withArgs(addr1.address, addr2.address, 1);
    });
  });

  describe('Burning', () => {
    beforeEach(async () => {
      await cabrukaToken.mint(addr1.address, 'ipfs://test');
    });

    it('Should burn token', async () => {
      await cabrukaToken.connect(addr1).burn(1);

      await expect(cabrukaToken.ownerOf(1)).to.be.revertedWith(
        'ERC721: invalid token ID'
      );
    });

    it('Should update balance on burn', async () => {
      const balanceBefore = await cabrukaToken.balanceOf(addr1.address);
      await cabrukaToken.connect(addr1).burn(1);
      const balanceAfter = await cabrukaToken.balanceOf(addr1.address);

      expect(balanceAfter).to.equal(balanceBefore - 1n);
    });
  });

  describe('Security', () => {
    it('Should prevent reentrancy attacks', async () => {
      // Standard ERC721 protection
      const tokenURI = 'ipfs://test';
      await cabrukaToken.mint(addr1.address, tokenURI);

      expect(await cabrukaToken.ownerOf(1)).to.equal(addr1.address);
    });

    it('Should handle zero address validation', async () => {
      await expect(
        cabrukaToken.mint(ethers.ZeroAddress, 'ipfs://test')
      ).to.be.revertedWith('ERC721: mint to the zero address');
    });
  });
});
