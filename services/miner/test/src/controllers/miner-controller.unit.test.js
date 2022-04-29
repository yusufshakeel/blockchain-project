'use strict';

const Controllers = require('../../../src/controllers');
const Services = require('../../../src/services');

describe('Testing MinerController', () => {
  const services = new Services();
  const minerAddress = '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202';

  describe('Testing mine', () => {
    describe('When mempool is empty', () => {
      const repositories = {
        blockchainRepository: {
          createBlock: jest.fn(),
          fetchAllBlocks: jest.fn()
        },
        mempoolRepository: {
          fetchAllPendingTransactions: jest.fn(() => []),
          updateMinedTransactions: jest.fn()
        }
      };

      test('Should return without mining any block', async () => {
        const controllers = new Controllers({
          repositories,
          services,
          minerAddress
        });
        const { minerController } = controllers;
        await minerController.mine();
        expect(repositories.mempoolRepository.fetchAllPendingTransactions).toHaveBeenCalledTimes(1);
        expect(repositories.blockchainRepository.createBlock).toHaveBeenCalledTimes(0);
      });
    });

    describe('When mempool has some transactions', () => {
      describe('When blockchain is empty', () => {
        const repositories = {
          blockchainRepository: {
            createBlock: jest.fn(() => ({ index: 0 })),
            fetchAllBlocks: jest.fn(() => [])
          },
          mempoolRepository: {
            fetchAllPendingTransactions: jest.fn(() => [
              {
                _id: { $oid: '626ad179a410005da6ff0939' },
                uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694',
                transaction: {
                  uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694',
                  sender: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                  receiver: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                  transactionValue: 0,
                  feeValue: 0,
                  rewardValue: 0,
                  message: 'GENESIS TRANSACTION',
                  transactionType: 'COIN_TRANSACTION',
                  timestamp: { $date: { $numberLong: '1651167609890' } },
                  _id: { $oid: '626ad179a410005da6ff093a' }
                },
                status: 'PENDING',
                timestamp: { $date: { $numberLong: '1651167609895' } },
                __v: 0,
                updatedAt: { $date: { $numberLong: '1651167630675' } }
              }
            ]),
            updateMinedTransactions: jest.fn(() => ({
              modifiedCount: 1
            }))
          }
        };

        test('Should mine a new block', async () => {
          const controllers = new Controllers({
            repositories,
            services,
            minerAddress
          });
          const { minerController } = controllers;
          await minerController.mine();
          expect(repositories.mempoolRepository.fetchAllPendingTransactions).toHaveBeenCalledTimes(
            1
          );
          expect(repositories.blockchainRepository.createBlock).toHaveBeenCalledTimes(1);
          expect(repositories.blockchainRepository.createBlock).toHaveBeenCalledWith({
            hash: expect.any(String),
            index: 0,
            nonce: expect.any(Number),
            previousHash: '0',
            timestamp: expect.any(String),
            transactions: [
              {
                _id: { $oid: '626ad179a410005da6ff093a' },
                feeValue: 0,
                message: 'GENESIS TRANSACTION',
                receiver: minerAddress,
                rewardValue: 0,
                sender: minerAddress,
                timestamp: { $date: { $numberLong: '1651167609890' } },
                transactionType: 'COIN_TRANSACTION',
                transactionValue: 0,
                uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694'
              },
              {
                feeValue: 0,
                message: 'Reward coin',
                receiver: minerAddress,
                rewardValue: 128,
                sender: 'ROOT_COIN_SOURCE',
                timestamp: expect.any(String),
                transactionType: 'REWARD_COIN_TRANSACTION',
                transactionValue: 0,
                uuid: expect.any(String)
              }
            ]
          });
        });
      });

      describe('When blockchain has some blocks', () => {
        const repositories = {
          blockchainRepository: {
            createBlock: jest.fn(() => ({ index: 1 })),
            fetchAllBlocks: jest.fn(() => [
              {
                _id: { $oid: '626ad18ea410005da6ff0949' },
                index: 0,
                nonce: 25185,
                previousHash: '0',
                hash: '000063b1defe3c5cda1c28637dc06a001d1e77e800bc0aeebb9045fb56b47e30',
                transactions: [
                  {
                    uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694',
                    sender: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                    receiver: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                    transactionValue: 0,
                    feeValue: 0,
                    rewardValue: 0,
                    message: 'GENESIS TRANSACTION',
                    transactionType: 'COIN_TRANSACTION',
                    timestamp: { $date: { $numberLong: '1651167609890' } },
                    _id: { $oid: '626ad179a410005da6ff093a' }
                  },
                  {
                    uuid: 'e8f8ce72-9d13-4c32-8d2e-1759e623b533',
                    sender: 'ROOT_COIN_SOURCE',
                    receiver: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                    transactionValue: 0,
                    feeValue: 0,
                    rewardValue: 128,
                    message: 'Reward coin',
                    transactionType: 'REWARD_COIN_TRANSACTION',
                    timestamp: { $date: { $numberLong: '1651167630011' } },
                    _id: { $oid: '626ad18ea410005da6ff094b' }
                  }
                ],
                timestamp: { $date: { $numberLong: '1651167630660' } },
                __v: 0
              }
            ])
          },
          mempoolRepository: {
            fetchAllPendingTransactions: jest.fn(() => [
              {
                _id: { $oid: '626ad179a410005da6ff0939' },
                uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694',
                transaction: {
                  uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694',
                  sender: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                  receiver: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
                  transactionValue: 1,
                  feeValue: 0,
                  rewardValue: 0,
                  message: 'Some message',
                  transactionType: 'COIN_TRANSACTION',
                  timestamp: { $date: { $numberLong: '1651167609890' } },
                  _id: { $oid: '626ad179a410005da6ff093a' }
                },
                status: 'PENDING',
                timestamp: { $date: { $numberLong: '1651167609895' } },
                __v: 0,
                updatedAt: { $date: { $numberLong: '1651167630675' } }
              }
            ]),
            updateMinedTransactions: jest.fn(() => ({
              modifiedCount: 1
            }))
          }
        };

        test('Should mine a new block', async () => {
          const controllers = new Controllers({
            repositories,
            services,
            minerAddress
          });
          const { minerController } = controllers;
          await minerController.mine();
          expect(repositories.mempoolRepository.fetchAllPendingTransactions).toHaveBeenCalledTimes(
            1
          );
          expect(repositories.blockchainRepository.createBlock).toHaveBeenCalledTimes(1);
          expect(repositories.blockchainRepository.createBlock).toHaveBeenCalledWith({
            hash: expect.any(String),
            index: 1,
            nonce: expect.any(Number),
            previousHash: '000063b1defe3c5cda1c28637dc06a001d1e77e800bc0aeebb9045fb56b47e30',
            timestamp: expect.any(String),
            transactions: [
              {
                _id: { $oid: '626ad179a410005da6ff093a' },
                feeValue: 0,
                message: 'Some message',
                receiver: minerAddress,
                rewardValue: 0,
                sender: minerAddress,
                timestamp: { $date: { $numberLong: '1651167609890' } },
                transactionType: 'COIN_TRANSACTION',
                transactionValue: 1,
                uuid: '6ef809dc-95fe-4d61-b738-72b7740b4694'
              },
              {
                feeValue: 0,
                message: 'Reward coin',
                receiver: minerAddress,
                rewardValue: 128,
                sender: 'ROOT_COIN_SOURCE',
                timestamp: expect.any(String),
                transactionType: 'REWARD_COIN_TRANSACTION',
                transactionValue: 0,
                uuid: expect.any(String)
              }
            ]
          });
        });
      });
    });
  });

  describe('Testing genesisTransaction', () => {
    describe('When no block exists in the blockchain', () => {
      const repositories = {
        blockchainRepository: {
          fetchAllBlocks: jest.fn(() => [])
        },
        mempoolRepository: {
          createTransaction: jest.fn()
        }
      };

      test('Should be able to create genesis transaction', async () => {
        const controllers = new Controllers({
          repositories,
          services,
          minerAddress
        });
        const { minerController } = controllers;
        await minerController.genesisTransaction();
        expect(repositories.mempoolRepository.createTransaction).toHaveBeenCalledTimes(1);
        expect(repositories.mempoolRepository.createTransaction).toHaveBeenCalledWith({
          status: 'PENDING',
          transaction: {
            feeValue: 0,
            message: 'GENESIS TRANSACTION',
            receiver: minerAddress,
            sender: minerAddress,
            timestamp: expect.any(String),
            transactionType: 'COIN_TRANSACTION',
            transactionValue: 0,
            uuid: expect.any(String)
          },
          uuid: expect.any(String)
        });
      });
    });

    describe('When at least one block exists in the blockchain', () => {
      const repositories = {
        blockchainRepository: {
          fetchAllBlocks: jest.fn(() => [{ someKey: 'someValue' }])
        },
        mempoolRepository: {
          createTransaction: jest.fn()
        }
      };

      test('Should not create genesis transaction', async () => {
        const controllers = new Controllers({
          repositories,
          services,
          minerAddress
        });
        const { minerController } = controllers;
        await minerController.genesisTransaction();
        expect(repositories.mempoolRepository.createTransaction).toHaveBeenCalledTimes(0);
      });
    });
  });
});
