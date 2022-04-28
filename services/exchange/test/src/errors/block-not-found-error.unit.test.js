'use strict';

const BlockNotFoundError = require('../../../src/errors/block-not-found-error');

describe('Testing BlockNotFoundError', () => {
  test('Should be able to set error', () => {
    const err = new BlockNotFoundError(1);
    expect(err.message).toBe('Block not found');
    expect(err.statusCode).toBe(404);
    expect(err.errorData).toStrictEqual({ blockIndex: 1 });
    expect(err.innerError).toBeUndefined();
  });
});
