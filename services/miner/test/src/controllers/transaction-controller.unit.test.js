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
      fetchAllPendingTransactions: jest.fn(async () => []),
      createTransaction: jest.fn(async () => {})
    }
  };

  const transactionController = TransactionController({ services, repositories });

  describe('Testing memPool', () => {
    test('Should be able to return transactions in mempool', async () => {
      const result = await transactionController.memPool();
      expect(result).toStrictEqual({ data: { transactions: [] } });
    });
  });

  describe('Testing createTransaction', () => {
    test('Should be able to create transaction', async () => {
      const result = await transactionController.createTransaction({
        transaction: { key: 'value' }
      });
      expect(result).toStrictEqual({ data: { uuid: '6a72c7b6-b727-43eb-9672-88ba2557b512' } });
    });
  });
});
