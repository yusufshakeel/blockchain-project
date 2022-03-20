'use strict';

const BlockchainController = require('../../../src/controllers/blockchain-controller');

describe('Testing BlockchainController', () => {
  describe('Testing getBlockById', () => {
    describe('When block exists', () => {
      test('Should return the block', () => {
        const blockchain = { getBlock: jest.fn(() => ({ index: 1 })) };
        const blockchainController = BlockchainController({ blockchain });
        expect(blockchainController.getBlockById({ blockId: 1 })).toStrictEqual({
          data: { block: { index: 1 } }
        });
      });
    });

    describe('When block does not exists', () => {
      test('Should return the block', () => {
        const blockchain = { getBlock: jest.fn() };
        const blockchainController = BlockchainController({ blockchain });
        expect(() => blockchainController.getBlockById({ blockId: 1 })).toThrow('Block not found');
      });
    });
  });
});
