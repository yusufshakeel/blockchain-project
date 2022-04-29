'use strict';

const InsufficientTransactionCoinError = require('../../../src/errors/insufficient-transaction-coin-error');

describe('Testing InsufficientTransactionCoinError', () => {
  test('Should be able to set error', () => {
    const err = new InsufficientTransactionCoinError({
      coinBalance: 1,
      coinToTransfer: 2,
      coinShortage: 1
    });
    expect(err.message).toBe('Insufficient transaction coins');
    expect(err.statusCode).toBe(400);
    expect(err.errorData).toStrictEqual({
      coinBalance: 1,
      coinShortage: 1,
      coinToTransfer: 2
    });
    expect(err.innerError).toBeUndefined();
  });
});
