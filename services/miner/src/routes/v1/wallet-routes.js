'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function WalletRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'POST',
    url: '/blockchain/v1/wallets',
    schema: {
      tags: ['Wallets'],
      description: 'Create a wallet with public, private keys.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      body: schemaRepository.v1.blockchain.emptyObject,
      response: {
        201: schemaRepository.v1.blockchain.wallet.createKeyPair.response
      }
    },
    handler: async function (request, reply) {
      const result = controllers.walletController.createKeyPair();
      reply.code(HTTP_STATUS_CODES.CREATED).send(result);
    }
  });

  fastify.route({
    method: 'POST',
    url: '/blockchain/v1/wallets/address',
    schema: {
      tags: ['Wallets'],
      description: 'Create a wallet address.',
      headers: schemaRepository.v1.blockchain.requestHeader,
      body: schemaRepository.v1.blockchain.wallet.createAddress.request,
      response: {
        201: schemaRepository.v1.blockchain.wallet.createAddress.response
      }
    },
    handler: async function (request, reply) {
      const result = controllers.walletController.createAddress({
        publicKey: request.body.data.publicKey
      });
      reply.code(HTTP_STATUS_CODES.CREATED).send(result);
    }
  });
};
