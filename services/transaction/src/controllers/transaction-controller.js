'use strict';

const {
  TRANSACTION_TYPE_COIN,
  MEMPOOL_TRANSACTION_STATUS_PENDING,
  NUMBER_OF_DECIMAL_PLACES
} = require('../constants');
const { getAddressBalance } = require('../helpers');
const TransactionValidator = require('../validators/transaction-validation')();
const InsufficientTransactionCoinError = require('../errors/insufficient-transaction-coin-error');
const InvalidTransactionSignatureError = require('../errors/invalid-transaction-signature-error');
const InvalidTransactionSenderAddressError = require('../errors/invalid-transaction-sender-address-error');

module.exports = function TransactionController({ services, repositories }) {
  const createTransaction = async function createTransaction({ transaction, validation }) {
    const { signature, publicKey: base64EncodedPublicKey } = validation;
    const { sender, receiver, transactionValue, feeValue, message } = transaction;

    const isValidSenderAddress = TransactionValidator.isValidSenderAddress(
      base64EncodedPublicKey,
      sender
    );
    if (!isValidSenderAddress) {
      throw new InvalidTransactionSenderAddressError();
    }

    const isValidSignature = TransactionValidator.isTransactionSignatureValid(
      signature,
      base64EncodedPublicKey,
      transaction
    );
    if (!isValidSignature) {
      throw new InvalidTransactionSignatureError();
    }

    const coinToTransfer = Number((transactionValue + feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
    const blockchain = await repositories.blockchainRepository.fetchAllBlocks();
    const { coinBalance } = getAddressBalance({ address: sender, blockchain });
    const isValidTransactionValue = TransactionValidator.isValidSendingTransactionValue(
      transactionValue,
      feeValue,
      coinBalance
    );
    if (!isValidTransactionValue) {
      const coinShortage = Number((coinToTransfer - coinBalance).toFixed(NUMBER_OF_DECIMAL_PLACES));
      throw new InsufficientTransactionCoinError({ coinBalance, coinToTransfer, coinShortage });
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
