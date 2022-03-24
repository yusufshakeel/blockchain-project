'use strict';

const fastify = require('fastify')();
const JsonSchemaRefParser = require('json-schema-ref-parser');
const SchemaRepository = require('../../../../src/repositories/schema-repository');
const routes = require('../../../../src/routes/v1/blockchain-routes');

describe('Testing blockchain routes', () => {
  beforeAll(async () => {
    const controllers = {
      blockchainController: {
        getBlockById: jest.fn(() => ({
          data: {
            block: {
              index: 0,
              nonce: 0,
              timestamp: '2022-03-20T15:50:57.516Z',
              previousHash: 0,
              hash: 0,
              transactions: [
                {
                  uuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                  sender: 'string',
                  receiver: 'string',
                  transactionValue: 0,
                  feeValue: 0,
                  rewardValue: 0,
                  message: 'string',
                  timestamp: '2022-03-20T15:50:57.516Z'
                }
              ]
            }
          }
        }))
      }
    };
    const schemaRepository = await new SchemaRepository({
      parser: new JsonSchemaRefParser()
    }).loadAll();
    await routes(fastify, { controllers, schemaRepository });
  });

  describe('Testing get block by blockId route', () => {
    test('Should return result', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/blockchain/v1/blocks/0',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
