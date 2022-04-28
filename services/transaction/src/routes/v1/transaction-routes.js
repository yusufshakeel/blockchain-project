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
        ...request.body.data
      });
      reply.code(HTTP_STATUS_CODES.CREATED).send(result);
    }
  });
};
