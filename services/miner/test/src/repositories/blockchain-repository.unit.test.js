'use strict';

const BlockchainRepository = require('../../../src/repositories/blockchain-repository');

describe('Testing BlockchainRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to create block', async () => {
    const save = jest.fn();
    const BlockchainModel = () => {
      return { save };
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.createBlock({ a: 1 });
    expect(save).toHaveBeenCalledTimes(1);
  });

  test('Should be able to fetch block by index', async () => {
    const BlockchainModel = {
      findOne: jest.fn()
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchBlockByIndex(1);
    expect(BlockchainModel.findOne).toHaveBeenCalledTimes(1);
    expect(BlockchainModel.findOne).toHaveBeenCalledWith({ blockIndex: 1 });
  });
});
