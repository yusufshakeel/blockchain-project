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
      collection: { stats: jest.fn(() => ({ count: 1, size: 1 })) }
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchStatistics();
    expect(BlockchainModel.collection.stats).toHaveBeenCalledTimes(1);
    expect(BlockchainModel.collection.stats).toHaveBeenCalledWith();
  });

  test('Should be able to fetch all blocks', async () => {
    const BlockchainModel = {
      find: jest.fn()
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchAllBlocks(1);
    expect(BlockchainModel.find).toHaveBeenCalledTimes(1);
  });

  test('Should be able to fetch latest N blocks', async () => {
    const limit = jest.fn(() => []);
    const sort = jest.fn(() => ({ limit }));
    const BlockchainModel = {
      find: jest.fn(() => ({ sort }))
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchLatestNBlocks(10);
    expect(BlockchainModel.find).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledWith({ index: -1 });
    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toHaveBeenCalledWith(10);
  });
});
