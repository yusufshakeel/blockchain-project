'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/wallet-routes');

describe('Testing wallet routes', () => {
  beforeAll(async () => {
    const controllers = {
      walletController: {
        createKeyPair: jest.fn(() => ({
          data: { address: 'some address', publicKey: 'some key', privateKey: 'some key' }
        })),
        createAddress: jest.fn(() => ({ data: { address: 'some address' } }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
  });

  describe('Testing create wallet', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/blockchain/v1/wallets',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {}
      });
      expect(response.statusCode).toBe(201);
    });
  });

  describe('Testing create address', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/blockchain/v1/wallets/address',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: { data: { publicKey: 'some key' } }
      });
      expect(response.statusCode).toBe(201);
    });
  });
});
