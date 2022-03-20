'use strict';

module.exports = function TransactionController({ blockchain }) {
  const memPool = function memPool() {
    const transactions = blockchain.getMemPool();
    return { data: { transactions } };
  };

  const createTransaction = function createTransaction({ transaction }) {
    const uuid = blockchain.createTransaction(transaction);
    return { data: { uuid } };
  };

  return {
    createTransaction,
    memPool
  };
};
