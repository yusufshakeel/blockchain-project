'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function AddressRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/address/:address/coin-balance',
    schema: {
      tags: ['Address'],
      description: 'This will return the coin balance of the given address.',
      params: schemaRepository.v1.blockchain.addressCoinBalance.request.params,
      response: {
        200: schemaRepository.v1.blockchain.addressCoinBalance.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.addressController.fetchCoinBalance({
        address: request.params.address
      });
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
