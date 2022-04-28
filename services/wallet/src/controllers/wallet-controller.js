'use strict';

module.exports = function WalletController({ wallet }) {
  const createKeyPair = function () {
    const { address, publicKey, privateKey } = wallet.createKeyPair();
    return { data: { address, publicKey, privateKey } };
  };

  const createAddress = function ({ publicKey }) {
    const address = wallet.createAddress({ publicKey });
    return { data: { address } };
  };

  return { createKeyPair, createAddress };
};
