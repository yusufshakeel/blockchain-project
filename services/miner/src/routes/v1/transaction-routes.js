'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function TransactionRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'POST',
    url: '/blockchain/v1/transactions',
    schema: {
      tags: ['Transactions'],
      description: 'Create a transaction.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      body: schemaRepository.v1.blockchain.createTransaction.request,
      response: {
        201: schemaRepository.v1.blockchain.createTransaction.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.transactionController.createTransaction({
        transaction: request.body.data.transaction
      });
      reply.code(HTTP_STATUS_CODES.CREATED).send(result);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/transactions/mempool',
    schema: {
      tags: ['Transactions'],
      description:
        'This will return the Mempool of the blockchain which consists of all the the transactions that have not been added to a block.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      response: {
        200: schemaRepository.v1.blockchain.mempoolTransactions.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.transactionController.memPool();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
