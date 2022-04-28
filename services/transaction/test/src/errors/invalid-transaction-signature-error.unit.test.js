'use strict';

const InvalidTransactionSignatureError = require('../../../src/errors/invalid-transaction-signature-error');

describe('Testing InvalidTransactionSignatureError', () => {
  test('Should be able to set error', () => {
    const err = new InvalidTransactionSignatureError();
    expect(err.message).toBe('Invalid transaction signature');
    expect(err.statusCode).toBe(400);
    expect(err.errorData).toBeUndefined();
    expect(err.innerError).toBeUndefined();
  });
});
