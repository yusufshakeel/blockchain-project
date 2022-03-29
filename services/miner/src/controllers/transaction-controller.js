'use strict';

const { TRANSACTION_TYPE_COIN } = require('../constants');

module.exports = function TransactionController({ services, repositories }) {
  const memPool = async function memPool() {
    const transactions = await repositories.mempoolRepository.fetchAllPendingTransactions();
    return { data: { transactions: transactions.map(t => t.transaction) } };
  };

  const createTransaction = async function createTransaction({ transaction }) {
    const { sender, receiver, transactionValue, feeValue, message } = transaction;
    const uuid = services.uuidService.uuidV4();
    await repositories.mempoolRepository.createTransaction({
      uuid,
      transaction: {
        uuid,
        sender,
        receiver,
        transactionValue,
        feeValue,
        message,
        transactionType: TRANSACTION_TYPE_COIN,
        timestamp: services.timeService.now()
      },
      status: 'PENDING'
    });
    return { data: { uuid } };
  };

  return {
    createTransaction,
    memPool
  };
};
