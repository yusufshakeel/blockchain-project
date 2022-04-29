'use strict';

const crypto = require('crypto');

const { NUMBER_OF_DECIMAL_PLACES } = require('../constants');

module.exports = function TransactionValidator() {
  const isValidSendingTransactionValue = (transactionValue, feeValue, coinBalance) => {
    const totalCoinsToSend = Number(
      (transactionValue + feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    return Number((coinBalance - totalCoinsToSend).toFixed(NUMBER_OF_DECIMAL_PLACES)) >= 0;
  };

  const isTransactionSignatureValid = (signature, base64EncodedPublicKey, transaction) => {
    const stringifiedTransaction = JSON.stringify(transaction);
    const publicKey = Buffer.from(base64EncodedPublicKey, 'base64').toString('ascii');
    return crypto.verify(
      'sha256',
      Buffer.from(stringifiedTransaction),
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      },
      Buffer.from(signature, 'base64')
    );
  };

  const isValidSenderAddress = (base64EncodedPublicKey, senderAddress) => {
    const publicKey = Buffer.from(base64EncodedPublicKey, 'base64').toString('ascii');
    const sha256OfPublicKey = crypto.createHmac('sha256', publicKey).digest('hex');
    return senderAddress === sha256OfPublicKey;
  };

  return { isValidSendingTransactionValue, isTransactionSignatureValid, isValidSenderAddress };
};
