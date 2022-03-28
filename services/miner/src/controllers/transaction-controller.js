'use strict';

module.exports = function TransactionController({ services, repositories }) {
  const memPool = async function memPool() {
    const transactions = await repositories.mempoolRepository.fetchAllPendingTransactions();
    return { data: { transactions: transactions.map(t => t.transaction) } };
  };

  const createTransaction = async function createTransaction({ transaction }) {
    const { sender, receiver, transactionValue, feeValue, message } = transaction;
    const uuid = services.uuidService.uuidV4();
    await repositories.mempoolRepository.createTransaction({
      transaction: {
        uuid,
        sender,
        receiver,
        transactionValue,
        feeValue,
        message,
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
