'use strict';

const crypto = require('crypto');

const getSignature = (transaction, privateKey) => {
  return crypto
    .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
      key: Buffer.from(privateKey, 'base64').toString('ascii'),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    })
    .toString('base64');
};

module.exports = { getSignature };
