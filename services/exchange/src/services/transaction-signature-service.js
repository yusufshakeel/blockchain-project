'use strict';

const crypto = require('crypto');

module.exports = function TransactionSignatureService({ privateKey, publicKey }) {
  const getSignature = transaction => {
    return crypto
      .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
        key: Buffer.from(privateKey, 'base64').toString('ascii'),
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      })
      .toString('base64');
  };

  const isValidSignature = (signature, transaction) => {
    const stringifiedTransaction = JSON.stringify(transaction);
    const plainTextPublicKey = Buffer.from(publicKey, 'base64').toString('ascii');
    return crypto.verify(
      'sha256',
      Buffer.from(stringifiedTransaction),
      {
        key: plainTextPublicKey,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING
      },
      Buffer.from(signature, 'base64')
    );
  };

  return { getSignature, isValidSignature };
};
