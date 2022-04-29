'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/address-routes');

describe('Testing Address routes', () => {
  beforeAll(async () => {
    const controllers = {
      addressController: {
        fetchCoinBalance: jest.fn(() => ({
          data: {
            coinBalance: 507.0001,
            totalCoinsReceived: 512.0001,
            totalCoinsSent: 5
          }
        }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
  });

  describe('Testing get coin balance', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/blockchain/v1/address/655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202/coin-balance',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
