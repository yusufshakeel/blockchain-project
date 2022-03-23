'use strict';

module.exports = function WalletController({ wallet }) {
  const createKeyPair = function () {
    const { publicKey, privateKey } = wallet.getKeyPair();
    return { data: { publicKey, privateKey } };
  };

  const createAddress = function ({ publicKey }) {
    const address = wallet.getAddress({ publicKey });
    return { data: { address } };
  };

  return { createKeyPair, createAddress };
};
