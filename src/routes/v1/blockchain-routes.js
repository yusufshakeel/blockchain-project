'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function BlockchainRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/blocks/:blockId',
    schema: {
      tags: ['Blockchain'],
      description: 'This will return all the blocks.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      params: schemaRepository.v1.blockchain.block.request.params,
      response: {
        200: schemaRepository.v1.blockchain.block.response
      }
    },
    handler: async function (request, reply) {
      const result = controllers.blockchainController.getBlockById({
        blockId: request.params.blockId
      });
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
