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
      fetchNLatestMinedTransactions: jest.fn(async () => [
        {
          uuid: '752d91a7-beb4-48c0-a7f1-45cd7689761c',
          transaction: {
            uuid: '752d91a7-beb4-48c0-a7f1-45cd7689761c',
            sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            transactionValue: 0,
            feeValue: 0,
            rewardValue: 0,
            message: 'GENESIS TRANSACTION',
            transactionType: 'COIN_TRANSACTION',
            timestamp: {
              $date: {
                $numberLong: '1651254099330'
              }
            },
            _id: {
              $oid: '626c2353008b683892acabf5'
            }
          },
          status: 'MINED',
          timestamp: {
            $date: {
              $numberLong: '1651254099335'
            }
          },
          __v: 0,
          minedAt: {
            $date: {
              $numberLong: '1651254120730'
            }
          },
          updatedAt: {
            $date: {
              $numberLong: '1651254120730'
            }
          }
        }
      ])
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

  describe('Testing fetchAllPendingTransactions', () => {
    test('Should be able to return pending transactions from mempool', async () => {
      const result = await transactionController.fetchAllPendingTransactions();
      expect(result).toStrictEqual({ data: { transactions: [{ a: 1 }] } });
    });
  });

  describe('Testing fetchLatestMinedTransactionsFromMempool', () => {
    test('Should be able to return latest mined transactions from mempool', async () => {
      const result = await transactionController.fetchLatestMinedTransactionsFromMempool();
      expect(result).toStrictEqual({
        data: {
          transactions: [
            {
              minedAt: {
                $date: {
                  $numberLong: '1651254120730'
                }
              },
              status: 'MINED',
              timestamp: {
                $date: {
                  $numberLong: '1651254099335'
                }
              },
              transaction: {
                _id: {
                  $oid: '626c2353008b683892acabf5'
                },
                feeValue: 0,
                message: 'GENESIS TRANSACTION',
                receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
                rewardValue: 0,
                sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
                timestamp: {
                  $date: {
                    $numberLong: '1651254099330'
                  }
                },
                transactionType: 'COIN_TRANSACTION',
                transactionValue: 0,
                uuid: '752d91a7-beb4-48c0-a7f1-45cd7689761c'
              }
            }
          ]
        }
      });
    });
  });
});
