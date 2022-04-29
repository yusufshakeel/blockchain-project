'use strict';

const crypto = require('crypto');
const fakeCreds = require('../test-data/fake-creds.json');

const getSignature = transaction => {
  return crypto
    .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
      key: Buffer.from(fakeCreds.privateKey, 'base64').toString('ascii'),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    })
    .toString('base64');
};

module.exports = { getSignature };
