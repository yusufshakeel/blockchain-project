'use strict';

const BlockchainController = require('../../../src/controllers/blockchain-controller');
const fakeBlockchain = require('../../test-data/fake-blockchains.json');

describe('Testing BlockchainController', () => {
  describe('Testing fetchBlockByIndex', () => {
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

  describe('Testing fetchStatistics', () => {
    test('Should return the statistics', async () => {
      const repositories = {
        blockchainRepository: {
          fetchStatistics: jest.fn(() => ({ totalNumberOfBlocksMined: 1 }))
        }
      };
      const blockchainController = BlockchainController({ repositories });
      const result = await blockchainController.fetchStatistics();
      expect(result).toStrictEqual({
        data: { statistics: { totalNumberOfBlocksMined: 1 } }
      });
    });
  });

  describe('Testing fetchLatestMinedBlocksSummary', () => {
    describe('When there is no block in the blockchain', () => {
      test('Should return empty summary', async () => {
        const repositories = {
          blockchainRepository: {
            fetchLatestNBlocks: jest.fn(() => [])
          }
        };
        const blockchainController = BlockchainController({ repositories });
        const result = await blockchainController.fetchLatestMinedBlocksSummary();
        expect(result).toStrictEqual({ data: { blocks: [] } });
      });
    });

    describe('When there are blocks in the blockchain', () => {
      test('Should return summary', async () => {
        const repositories = {
          blockchainRepository: {
            fetchLatestNBlocks: jest.fn(() => fakeBlockchain)
          }
        };
        const blockchainController = BlockchainController({ repositories });
        const result = await blockchainController.fetchLatestMinedBlocksSummary();
        expect(result).toStrictEqual({
          data: {
            blocks: [
              {
                coins: 128,
                index: 0,
                numberOfTransactions: 2,
                timestamp: {
                  $date: '2022-04-27T16:15:30.222Z'
                }
              },
              {
                coins: 129,
                index: 1,
                numberOfTransactions: 2,
                timestamp: {
                  $date: '2022-04-28T04:22:01.159Z'
                }
              },
              {
                coins: 132,
                index: 2,
                numberOfTransactions: 3,
                timestamp: {
                  $date: '2022-04-28T04:22:31.298Z'
                }
              },
              {
                coins: 129.0001,
                index: 3,
                numberOfTransactions: 3,
                timestamp: {
                  $date: '2022-04-28T04:24:33.295Z'
                }
              }
            ]
          }
        });
      });
    });
  });
});
