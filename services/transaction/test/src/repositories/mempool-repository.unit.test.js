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
});
