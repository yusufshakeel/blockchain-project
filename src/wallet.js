'use strict';

const crypto = require('crypto');

module.exports = function Wallet() {
  this.createKeyPair = function () {
    return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
  };

  this.createAddress = function ({ publicKey }) {
    return crypto.createHmac('sha256', publicKey).digest('hex');
  };
};
