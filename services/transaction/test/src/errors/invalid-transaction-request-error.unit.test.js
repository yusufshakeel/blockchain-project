'use strict';

const InvalidTransactionRequestError = require('../../../src/errors/invalid-transaction-request-error');

describe('Testing InvalidTransactionRequestError', () => {
  test('Should be able to set error', () => {
    const err = new InvalidTransactionRequestError({ errorData: { err: 'some error data' } });
    expect(err.message).toBe('Invalid transaction request');
    expect(err.statusCode).toBe(400);
    expect(err.errorData).toStrictEqual({ err: 'some error data' });
    expect(err.innerError).toBeUndefined();
  });
});
