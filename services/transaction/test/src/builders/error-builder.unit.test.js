'use strict';

const ErrorBuilder = require('../../../src/builders/error-builder');
const InvalidTransactionRequestError = require('../../../src/errors/invalid-transaction-request-error');

describe('ErrorBuilder', () => {
  const errorBuilder = new ErrorBuilder();

  describe('When error has statusCode and message', () => {
    test('Should return error', () => {
      const error = errorBuilder.build(
        new InvalidTransactionRequestError({ errorData: { err: 'some err' } })
      );
      expect(error).toStrictEqual({
        code: 400,
        errors: {
          errors: [
            {
              code: 'BLOCKCHAIN_DOMAIN_INVALID_TRANSACTION_REQUEST_ERROR',
              error: 'BLOCKCHAIN_DOMAIN_INVALID_TRANSACTION_REQUEST_ERROR',
              errorData: { err: 'some err' },
              message: 'Invalid transaction request'
            }
          ]
        }
      });
    });
  });

  describe('When error handler matches', () => {
    test('Should return INTERNAL_SERVER_ERROR', () => {
      const error = errorBuilder.build(new Error('Some error'));
      expect(error).toStrictEqual({
        code: 500,
        errors: {
          errors: [
            {
              code: 'INTERNAL_SERVER_ERROR',
              error: 'INTERNAL_SERVER_ERROR',
              errorData: new Error('Some error'),
              message: 'INTERNAL_SERVER_ERROR'
            }
          ]
        }
      });
    });
  });
});
