'use strict';

const InvalidTransactionSenderAddressError = require('../../../src/errors/invalid-transaction-sender-address-error');

describe('Testing InvalidTransactionSenderAddressError', () => {
  test('Should be able to set error', () => {
    const err = new InvalidTransactionSenderAddressError();
    expect(err.message).toBe('Invalid transaction sender address');
    expect(err.statusCode).toBe(400);
    expect(err.errorData).toBeUndefined();
    expect(err.innerError).toBeUndefined();
  });
});
