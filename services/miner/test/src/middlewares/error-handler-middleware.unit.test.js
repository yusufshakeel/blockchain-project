'use strict';

const ErrorHandlerMiddleware = require('../../../src/middlewares/error-handler-middleware');
const BlockNotFoundError = require('../../../src/errors/block-not-found-error');

describe('ErrorHandlerMiddleware', () => {
  test('Should return error', () => {
    const errorHandlerMiddleware = new ErrorHandlerMiddleware();
    const error = new BlockNotFoundError(1);
    const request = {
      protocol: 'https',
      hostname: 'example.com',
      raw: {
        method: 'POST',
        url: '/payment'
      },
      query: { hello: 'world' },
      body: { userId: '87b96c89-5365-4cf0-a104-b28da006c2d7' }
    };

    function Reply() {
      const self = this;
      this.code = jest.fn(() => self);
      this.send = jest.fn(() => self);
    }

    const reply = new Reply();
    errorHandlerMiddleware(error, request, reply);

    expect(reply.code.mock.calls.length).toBe(1);
    expect(reply.code.mock.calls[0][0]).toBe(404);
    expect(reply.send.mock.calls.length).toBe(1);
    expect(reply.send.mock.calls[0][0]).toStrictEqual({
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
    });
  });
});
