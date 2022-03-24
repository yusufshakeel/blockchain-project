'use strict';

const WalletController = require('../../../src/controllers/wallet-controller');

describe('Testing WalletController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wallet = {
    createKeyPair: jest.fn(() => ({ publicKey: 'some key', privateKey: 'some key' })),
    createAddress: jest.fn()
  };

  const walletController = WalletController({ wallet });

  describe('Testing create key pair', () => {
    test('Should be able to call', () => {
      walletController.createKeyPair();
      expect(wallet.createKeyPair).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing create address', () => {
    test('Should be able to call', () => {
      walletController.createAddress({ publicKey: 'some key' });
      expect(wallet.createAddress).toHaveBeenCalledTimes(1);
    });
  });
});
