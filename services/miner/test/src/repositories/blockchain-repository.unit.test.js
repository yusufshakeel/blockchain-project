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

  test('Should be able to fetch all blocks', async () => {
    const BlockchainModel = {
      find: jest.fn()
    };
    const blockchainRepository = new BlockchainRepository({ BlockchainModel });
    await blockchainRepository.fetchAllBlocks(1);
    expect(BlockchainModel.find).toHaveBeenCalledTimes(1);
  });
});
