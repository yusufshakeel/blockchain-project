'use strict';

const Wallet = require('../../src/wallet');

describe('Testing Wallet', () => {
  const wallet = new Wallet();

  test('Should be able to create public and private keys', () => {
    const keys = wallet.createKeyPair();
    expect(keys).toHaveProperty('address');
    expect(keys).toHaveProperty('publicKey');
    expect(keys).toHaveProperty('privateKey');
  });

  test('Should be able to create address', () => {
    const keys = wallet.createKeyPair();
    const address = wallet.createAddress({ publicKey: keys.publicKey });
    expect(typeof address).toBe('string');
  });
});
