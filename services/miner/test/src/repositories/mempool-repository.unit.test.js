'use strict';

const MempoolRepository = require('../../../src/repositories/mempool-repository');

describe('Testing MempoolRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to create transaction', async () => {
    const save = jest.fn();
    const MempoolModel = () => {
      return { save };
    };
    const mempoolRepository = new MempoolRepository({ MempoolModel });
    await mempoolRepository.createTransaction({ a: 1 });
    expect(save).toHaveBeenCalledTimes(1);
  });

  test('Should be able to fetch all pending transactions', async () => {
    const MempoolModel = {
      find: jest.fn()
    };
    const mempoolRepository = new MempoolRepository({ MempoolModel });
    await mempoolRepository.fetchAllPendingTransactions();
    expect(MempoolModel.find).toHaveBeenCalledTimes(1);
    expect(MempoolModel.find).toHaveBeenCalledWith({ status: 'PENDING' });
  });

  test('Should be able to update mined transaction', async () => {
    const updateMany = jest.fn();
    const MempoolModel = { updateMany };
    const mempoolRepository = new MempoolRepository({ MempoolModel });
    await mempoolRepository.updateMinedTransactions(['a', 'b']);
    expect(updateMany).toHaveBeenCalledTimes(1);
  });
});
