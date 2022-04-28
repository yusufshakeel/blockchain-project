'use strict';

const InvalidTransactionRequestError = require('../../../src/errors/invalid-transaction-request-error');

describe('Testing InvalidTransactionRequestError', () => {
  test('Should be able to set error', () => {
    const err = new InvalidTransactionRequestError({
      coinBalance: 1,
      coinToTransfer: 2,
      coinShortage: 1
    });
    expect(err.message).toBe('Invalid transaction request');
    expect(err.statusCode).toBe(400);
    expect(err.errorData).toStrictEqual({
      coinBalance: 1,
      coinShortage: 1,
      coinToTransfer: 2
    });
    expect(err.innerError).toBeUndefined();
  });
});
