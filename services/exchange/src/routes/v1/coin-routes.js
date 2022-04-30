'use strict';

const HTTP_STATUS_CODES = require('http-status-codes');

module.exports = function CoinRoutes(fastify, options) {
  const { schemaRepository, controllers } = options;

  fastify.route({
    method: 'POST',
    url: '/blockchain/v1/coins/buy',
    schema: {
      tags: ['Coin'],
      description: 'This will help you buy coins from the exchange.',
      headers: schemaRepository.v1.blockchain.coin.buy.request.headers,
      body: schemaRepository.v1.blockchain.coin.buy.request.body,
      response: {
        201: schemaRepository.v1.blockchain.coin.buy.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.coinController.buyCoins({
        ...request.body.data
      });
      reply.code(HTTP_STATUS_CODES.CREATED).send(result);
    }
  });

  fastify.route({
    method: 'GET',
    url: '/blockchain/v1/coins/buy-coin-fee',
    schema: {
      tags: ['Coin'],
      description: 'This will return the fee to pay to buy coins.',
      response: {
        200: schemaRepository.v1.blockchain.coin.buyFee.response
      }
    },
    handler: async function (request, reply) {
      const result = await controllers.coinController.fetchFeeToBuyCoins();
      reply.code(HTTP_STATUS_CODES.OK).send(result);
    }
  });
};
