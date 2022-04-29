'use strict';

const AddressController = require('../../../src/controllers/address-controller');
const fakeBlockchain = require('../../test-data/fake-blockchains.json');

describe('Testing AddressController', () => {
  describe('Testing fetchCoinBalance', () => {
    test('Should return coin balance', async () => {
      const repositories = {
        blockchainRepository: {
          fetchAllBlocks: jest.fn(() => fakeBlockchain)
        }
      };
      const addressController = AddressController({ repositories });
      const result = await addressController.fetchCoinBalance({
        address: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202'
      });
      expect(result).toStrictEqual({
        data: {
          coinBalance: 507.0001,
          totalCoinsReceived: 512.0001,
          totalCoinsSent: 5
        }
      });
    });
  });
});
