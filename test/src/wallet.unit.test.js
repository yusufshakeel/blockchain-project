'use strict';

const Wallet = require('../../src/wallet');

describe('Testing Wallet', () => {
  const wallet = new Wallet();

  test('Should be able to create public and private keys', () => {
    const keys = wallet.getKeyPair();
    expect(keys).toHaveProperty('publicKey');
    expect(keys).toHaveProperty('privateKey');
  });

  test('Should be able to create address', () => {
    const keys = wallet.getKeyPair();
    const address = wallet.getAddress({ publicKey: keys.publicKey });
    expect(typeof address).toBe('string');
  });
});
