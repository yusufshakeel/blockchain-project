'use strict';

module.exports = function TransactionController({ blockchain }) {
  const createTransaction = function createTransaction({ data }) {
    const { sender, receiver, transactionValue, feeValue, message } = data;
    const transaction = {
      sender,
      receiver,
      transactionValue,
      feeValue,
      message
    };
    const uuid = blockchain.createTransaction(transaction);
    return { data: { id: uuid } };
  };

  return {
    createTransaction
  };
};
