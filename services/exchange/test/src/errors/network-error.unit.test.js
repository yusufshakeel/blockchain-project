'use strict';

const NetworkError = require('../../../src/errors/network-error');

describe('Testing NetworkError', () => {
  test('Should be able to set error', () => {
    const err = new NetworkError({
      message: 'some msg',
      errorData: { err: 'some err' },
      innerError: { err: 'some inner error' }
    });
    expect(err.message).toBe('some msg');
    expect(err.statusCode).toBe(502);
    expect(err.errorData).toStrictEqual({ err: 'some err' });
    expect(err.innerError).toStrictEqual({ err: 'some inner error' });
  });
});
