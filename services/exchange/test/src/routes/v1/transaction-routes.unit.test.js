'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/transaction-routes');

describe('Testing transaction routes', () => {
  beforeAll(async () => {
    const controllers = {
      transactionController: {
        fetchAllPendingTransactions: jest.fn(() => ({
          data: { transactions: [] }
        })),
        fetchLatestMinedTransactionsFromMempool: jest.fn(() => ({
          data: { transactions: [] }
        }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
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

  describe('Testing get latest mined transactions from mempool', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/blockchain/v1/transactions/mempool/mined-transactions',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
