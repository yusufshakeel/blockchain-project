'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/coin-routes');

describe('Testing Coin routes', () => {
  beforeAll(async () => {
    const controllers = {
      coinController: {
        buyCoins: jest.fn(() => ({
          data: {
            transactionUUID: '81fb1448-e40a-4eed-96cc-3c496c418f40',
            message: 'Purchased coins will show in your balance in few minutes.',
            purchaseSummary: {
              coinsPurchased: 1,
              feeCoins: 0
            }
          }
        })),
        fetchFeeToBuyCoins: jest.fn(() => ({
          data: {
            feeCoin: 0
          }
        }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
  });

  describe('Testing get fee to buy coins', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/blockchain/v1/coins/buy-coin-fee'
      });
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Testing buy coin', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'POST',
        url: '/blockchain/v1/coins/buy',
        headers: {
          'Content-Type': 'application/json'
        },
        payload: {
          data: {
            address: '20d772b858f4512ea9902b52ffe13fa90f48a9dc26611faebcb31c1640b8ec05',
            coinsToBuy: 1
          }
        }
      });
      expect(response.statusCode).toBe(201);
    });
  });
});
