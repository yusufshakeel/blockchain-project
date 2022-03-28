'use strict';

const BlockchainController = require('../../../src/controllers/blockchain-controller');

describe('Testing BlockchainController', () => {
  describe('Testing getBlockById', () => {
    describe('When block exists', () => {
      test('Should return the block', async () => {
        const repositories = {
          blockchainRepository: {
            fetchBlockByIndex: jest.fn(() => ({ index: 1 }))
          }
        };
        const blockchainController = BlockchainController({ repositories });
        const result = await blockchainController.fetchBlockByIndex({ blockIndex: 1 });
        expect(result).toStrictEqual({
          data: { block: { index: 1 } }
        });
      });
    });

    describe('When block does not exists', () => {
      test('Should return the block', async () => {
        const repositories = {
          blockchainRepository: {
            fetchBlockByIndex: jest.fn(() => {})
          }
        };
        const blockchainController = BlockchainController({ repositories });
        try {
          await blockchainController.fetchBlockByIndex({ blockIndex: 1 });
          throw new Error('Should have failed!');
        } catch (e) {
          expect(e.message).toBe('Block not found');
        }
      });
    });
  });
});
