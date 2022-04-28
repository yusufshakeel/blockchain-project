'use strict';

const TransactionController = require('../../../src/controllers/transaction-controller');

describe('Testing TransactionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const now = new Date().toISOString();
  const services = {
    uuidService: {
      uuidV4: jest.fn(() => '6a72c7b6-b727-43eb-9672-88ba2557b512')
    },
    timeService: {
      now: jest.fn(() => now)
    }
  };

  const repositories = {
    mempoolRepository: {
      fetchAllPendingTransactions: jest.fn(async () => [{ id: 1, transaction: { a: 1 } }]),
      createTransaction: jest.fn(async () => {})
    },
    blockchainRepository: {
      fetchAllBlocks: jest.fn(() => [
        {
          transactions: [
            {
              uuid: 'ff3b88ac-7f84-42c1-80dd-ff2061dd312e',
              sender: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
              receiver: 'a0ac878f4c67b38ed22b8d075172799936cc1546b191f380aed6ca544f761d39',
              transactionValue: 2,
              feeValue: 0,
              rewardValue: 0,
              message: 'string',
              transactionType: 'COIN_TRANSACTION',
              timestamp: {
                $date: '2022-04-28T04:22:29.571Z'
              },
              _id: {
                $oid: '626a16857f28463260110cae'
              }
            }
          ],
          timestamp: {
            $date: '2022-04-27T16:15:30.222Z'
          },
          __v: 0
        }
      ])
    }
  };

  const transactionController = TransactionController({ services, repositories });

  describe('Testing memPool', () => {
    test('Should be able to return transactions in mempool', async () => {
      const result = await transactionController.memPool();
      expect(result).toStrictEqual({ data: { transactions: [{ a: 1 }] } });
    });
  });
});