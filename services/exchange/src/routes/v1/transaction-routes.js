'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function TransactionRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/transactions/mempool',
    schema: {
      tags: ['Transactions'],
      description:
        'This will return the Mempool which consists of all the transactions that are yet to be mined.',
      response: {
        200: schemaRepository.v1.blockchain.mempoolTransactions.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.transactionController.fetchAllPendingTransactions();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/transactions/mempool/mined-transactions',
    schema: {
      tags: ['Transactions'],
      description: 'This will return the latest transactions that got mined from the mempool.',
      response: {
        200: schemaRepository.v1.blockchain.mempoolTransactions.mined.summary.response
      }
    },
    handler: async function (request, reply) {
      const result =
        await controllers.transactionController.fetchLatestMinedTransactionsFromMempool();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
