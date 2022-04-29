'use strict';

const { getAddressBalance } = require('../../../src/helpers');
const blockchain = require('../../test-data/fake-blockchains.json');

describe('Testing helper functions', () => {
  describe('Testing getAddressBalance', () => {
    describe('When user address has coins', () => {
      test('Should return coin balance', () => {
        const address = 'a0ac878f4c67b38ed22b8d075172799936cc1546b191f380aed6ca544f761d39';
        expect(getAddressBalance({ address, blockchain })).toStrictEqual({
          totalCoinsReceived: 3,
          totalCoinsSent: 1.0001,
          coinBalance: 1.9999
        });
      });
    });

    describe('When miner address has coins', () => {
      test('Should return coin balance', () => {
        const address = '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202';
        expect(getAddressBalance({ address, blockchain })).toStrictEqual({
          coinBalance: 507.0001,
          totalCoinsReceived: 512.0001,
          totalCoinsSent: 5
        });
      });
    });

    describe('When address does not have any coins', () => {
      test('Should return zero balance', () => {
        const address = 'SOME_UNKNOWN_ADDRESS_THAT_HAS_NEVER_TRANSACTED';
        expect(getAddressBalance({ address, blockchain })).toStrictEqual({
          totalCoinsReceived: 0,
          totalCoinsSent: 0,
          coinBalance: 0
        });
      });
    });
  });
});
