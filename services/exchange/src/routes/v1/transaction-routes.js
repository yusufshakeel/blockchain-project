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
      const result = await controllers.transactionController.memPool();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
