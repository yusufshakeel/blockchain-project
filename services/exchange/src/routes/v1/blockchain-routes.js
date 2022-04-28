'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function BlockchainRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/blocks/:blockIndex',
    schema: {
      tags: ['Blockchain'],
      description: 'This will return block details by its index.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      params: schemaRepository.v1.blockchain.block.request.params,
      response: {
        200: schemaRepository.v1.blockchain.block.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.blockchainController.fetchBlockByIndex({
        blockIndex: request.params.blockIndex
      });
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/blocks/statistics',
    schema: {
      tags: ['Blockchain'],
      description: 'This will return statistics.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      response: {
        200: schemaRepository.v1.blockchain.block.statistics.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.blockchainController.fetchStatistics();
      console.log(result);
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
