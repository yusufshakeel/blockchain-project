'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/transaction-routes');

describe('Testing transaction routes', () => {
  beforeAll(async () => {
    const controllers = {
      transactionController: {
        createTransaction: jest.fn(() => ({
          data: { uuid: 'fa63a485-69cd-496a-af27-7dd8c17155e3' }
        })),
        memPool: jest.fn(() => ({
          data: { transactions: [] }
        }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
  });

  describe('Testing create transaction route', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/blockchain/v1/transactions',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            transaction: {
              sender: 'string',
              receiver: 'string',
              transactionValue: 0.0001,
              feeValue: 0,
              message: 'string'
            }
          }
        }
      });
      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          uuid: 'fa63a485-69cd-496a-af27-7dd8c17155e3'
        }
      });
    });
  });

  describe('Testing get mempool route', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/blockchain/v1/transactions/mempool',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.payload)).toStrictEqual({
        data: {
          transactions: []
        }
      });
    });
  });
});
