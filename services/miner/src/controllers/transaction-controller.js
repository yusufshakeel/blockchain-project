'use strict';

module.exports = function TransactionController({ blockchain, services, repositories }) {
  const memPool = function memPool() {
    const transactions = blockchain.getMemPool();
    return { data: { transactions } };
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
