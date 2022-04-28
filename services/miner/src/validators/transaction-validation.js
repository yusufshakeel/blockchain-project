'use strict';

const { NUMBER_OF_DECIMAL_PLACES } = require('../constants');
const { getAddressBalance } = require('../helpers');

module.exports = function TransactionValidator() {
  const isValidSendingTransactionValue = (
    senderAddress,
    transactionValue,
    feeValue,
    blockchain
  ) => {
    const { coinBalance } = getAddressBalance({ address: senderAddress, blockchain });
    const totalCoinsToSend = Number(
      (transactionValue + feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    return coinBalance - totalCoinsToSend >= 0;
  };

  return { isValidSendingTransactionValue };
};
