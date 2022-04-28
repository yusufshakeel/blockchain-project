'use strict';

const {
  TRANSACTION_TYPE_COIN,
  MEMPOOL_TRANSACTION_STATUS_PENDING,
  NUMBER_OF_DECIMAL_PLACES
} = require('../constants');
const { getAddressBalance } = require('../helpers');
const TransactionValidator = require('../validators/transaction-validation')();
const InvalidTransactionRequestError = require('../errors/invalid-transaction-request-error');

module.exports = function TransactionController({ services, repositories }) {
  const createTransaction = async function createTransaction({ transaction }) {
    const { sender, receiver, transactionValue, feeValue, message } = transaction;

    const coinToTransfer = Number((transactionValue + feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
    const blockchain = await repositories.blockchainRepository.fetchAllBlocks();
    const { coinBalance } = getAddressBalance({ address: sender, blockchain });
    const isValid = TransactionValidator.isValidSendingTransactionValue(
      transactionValue,
      feeValue,
      coinBalance
    );
    if (!isValid) {
      const coinShortage = Number((coinToTransfer - coinBalance).toFixed(NUMBER_OF_DECIMAL_PLACES));
      throw new InvalidTransactionRequestError({ coinBalance, coinToTransfer, coinShortage });
    }

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
      status: MEMPOOL_TRANSACTION_STATUS_PENDING
    });

    return { data: { uuid } };
  };

  return {
    createTransaction
  };
};
