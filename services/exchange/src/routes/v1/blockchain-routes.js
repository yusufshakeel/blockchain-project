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

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/blocks/mined-summary',
    schema: {
      tags: ['Blockchain'],
      description: 'This will return latest mined blocks.',
      response: {
        200: schemaRepository.v1.blockchain.block.mined.summary.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.blockchainController.fetchLatestMinedBlocksSummary();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
