'use strict';

const RestClientService = require('../../../src/services/rest-client-service');
const NetworkError = require('../../../src/errors/network-error');

describe('Testing RestClientService', () => {
  const uuidService = {
    uuidV4: () => 'cd21fec8-1379-48a8-8158-0422656218ea'
  };

  describe('When request is ok', () => {
    test('Should get success response', async () => {
      const fakeClient = jest.fn(async () => {
        return {
          status: 200,
          data: { message: 'Hello World!' }
        };
      });
      const restClientService = RestClientService({ client: fakeClient, uuidService });
      const data = { a: 1 };
      const url = 'http://localhost';

      const response = await restClientService.post({ data, url });

      expect(response).toStrictEqual({ message: 'Hello World!' });
      expect(fakeClient).toHaveBeenCalledWith({
        data: { a: 1 },
        headers: {
          'Content-Type': 'application/json',
          'x-service-id': 'BLOCKCHAIN_EXCHANGE_SERVICE',
          'x-trace-id': 'cd21fec8-1379-48a8-8158-0422656218ea'
        },
        method: 'post',
        url: 'http://localhost'
      });
    });
  });

  describe('When there is network error', () => {
    test('Should throw error', async () => {
      const fakeClient = jest.fn(async () => {
        throw new Error('HAHAHA');
      });
      const restClientService = RestClientService({ client: fakeClient, uuidService });
      const data = { a: 1 };
      const url = 'http://localhost';

      try {
        await restClientService.post({ data, url });
        throw new Error('should have failed!');
      } catch (e) {
        expect(e).toBeInstanceOf(NetworkError);

        expect(fakeClient).toHaveBeenCalledWith({
          data: { a: 1 },
          headers: {
            'Content-Type': 'application/json',
            'x-service-id': 'BLOCKCHAIN_EXCHANGE_SERVICE',
            'x-trace-id': 'cd21fec8-1379-48a8-8158-0422656218ea'
          },
          method: 'post',
          url: 'http://localhost'
        });
      }
    });
  });
});
