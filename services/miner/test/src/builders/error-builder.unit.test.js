'use strict';

const ErrorBuilder = require('../../../src/builders/error-builder');
const BlockNotFoundError = require('../../../src/errors/block-not-found-error');

describe('ErrorBuilder', () => {
  const errorBuilder = new ErrorBuilder();

  describe('When error has statusCode and message', () => {
    test('Should return error', () => {
      const error = errorBuilder.build(new BlockNotFoundError(1));
      expect(error).toStrictEqual({
        code: 404,
        errors: {
          errors: [
            {
              code: 'BLOCKCHAIN_DOMAIN_BLOCK_NOT_FOUND_ERROR',
              error: 'BLOCKCHAIN_DOMAIN_BLOCK_NOT_FOUND_ERROR',
              errorData: {
                blockIndex: 1
              },
              message: 'Block not found'
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
