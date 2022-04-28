'use strict';

const crypto = require('crypto');

module.exports = function Wallet() {
  this.createKeyPair = function () {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
    });
    const address = crypto.createHmac('sha256', publicKey).digest('hex');
    const base64EncodedPublicKey = Buffer.from(publicKey, 'ascii').toString('base64');
    const base64EncodedPrivateKey = Buffer.from(privateKey, 'ascii').toString('base64');
    return { address, publicKey: base64EncodedPublicKey, privateKey: base64EncodedPrivateKey };
  };

  this.createAddress = function ({ publicKey }) {
    return crypto.createHmac('sha256', publicKey).digest('hex');
  };
};
