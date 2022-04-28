'use strict';

const MempoolRepository = require('../../../src/repositories/mempool-repository');

describe('Testing MempoolRepository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
