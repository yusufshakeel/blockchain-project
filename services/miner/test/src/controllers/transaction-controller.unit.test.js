'use strict';

const TransactionController = require('../../../src/controllers/transaction-controller');

describe('Testing TransactionController', () => {
  const blockchain = {
    getMemPool: jest.fn(() => []),
    createTransaction: jest.fn(() => 'fa63a485-69cd-496a-af27-7dd8c17155e3')
  };

  const transactionController = TransactionController({ blockchain });

  describe('Testing memPool', () => {
    test('Should be able to return transactions in mempool', () => {
      expect(transactionController.memPool()).toStrictEqual({ data: { transactions: [] } });
    });
  });

  describe('Testing createTransaction', () => {
    test('Should be able to create transaction', () => {
      expect(
        transactionController.createTransaction({ transaction: { key: 'value' } })
      ).toStrictEqual({ data: { uuid: 'fa63a485-69cd-496a-af27-7dd8c17155e3' } });
    });
  });
});
