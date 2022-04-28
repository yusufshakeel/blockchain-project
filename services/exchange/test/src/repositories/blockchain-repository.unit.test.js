'use strict';

const BlockchainRepository = require('../../../src/repositories/blockchain-repository');

describe('Testing BlockchainRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to fetch block by index', async () => {
    const BlockchainModel = {
      findOne: jest.fn()
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchBlockByIndex(1);
    expect(BlockchainModel.findOne).toHaveBeenCalledTimes(1);
    expect(BlockchainModel.findOne).toHaveBeenCalledWith({ index: 1 });
  });

  test('Should be able to fetch statistics', async () => {
    const BlockchainModel = {
      countDocuments: jest.fn()
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchStatistics();
    expect(BlockchainModel.countDocuments).toHaveBeenCalledTimes(1);
    expect(BlockchainModel.countDocuments).toHaveBeenCalledWith();
  });
});
