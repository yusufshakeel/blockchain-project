'use strict';

const MempoolRepository = require('../../../src/repositories/mempool-repository');

describe('Testing MempoolRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should be able to fetch all pending transactions', async () => {
    const sort = jest.fn();
    const MempoolModel = {
      find: jest.fn(() => ({ sort }))
    };
    const mempoolRepository = new MempoolRepository({ MempoolModel });
    await mempoolRepository.fetchAllPendingTransactions();
    expect(MempoolModel.find).toHaveBeenCalledTimes(1);
    expect(MempoolModel.find).toHaveBeenCalledWith({ status: 'PENDING' });
  });

  test('Should be able to fetch latest N mined transactions', async () => {
    const limit = jest.fn();
    const sort = jest.fn(() => ({ limit }));
    const MempoolModel = {
      find: jest.fn(() => ({ sort }))
    };
    const mempoolRepository = new MempoolRepository({ MempoolModel });
    await mempoolRepository.fetchNLatestMinedTransactions(10);
    expect(MempoolModel.find).toHaveBeenCalledTimes(1);
    expect(MempoolModel.find).toHaveBeenCalledWith({ status: 'MINED' });
    expect(sort).toHaveBeenCalledTimes(1);
    expect(sort).toHaveBeenCalledWith({ _id: -1 });
    expect(limit).toHaveBeenCalledTimes(1);
    expect(limit).toHaveBeenCalledWith(10);
  });
});
