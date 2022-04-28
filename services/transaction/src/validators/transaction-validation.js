'use strict';

const { NUMBER_OF_DECIMAL_PLACES } = require('../constants');

module.exports = function TransactionValidator() {
  const isValidSendingTransactionValue = (transactionValue, feeValue, coinBalance) => {
    const totalCoinsToSend = Number(
      (transactionValue + feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    return Number((coinBalance - totalCoinsToSend).toFixed(NUMBER_OF_DECIMAL_PLACES)) >= 0;
  };

  return { isValidSendingTransactionValue };
};
