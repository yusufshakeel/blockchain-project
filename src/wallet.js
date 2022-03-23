'use strict';

const crypto = require('crypto');

module.exports = function Wallet() {
  this.getKeyPair = function () {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
  };

  this.getAddress = function ({ publicKey }) {
    return crypto.createHmac('sha256', publicKey).digest('hex');
  };
};
