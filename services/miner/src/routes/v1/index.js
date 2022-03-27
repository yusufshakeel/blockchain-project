'use strict';

const TransactionRoutes = require('./transaction-routes');
const BlockchainRoutes = require('./blockchain-routes');

module.exports = async function Routes(fastify, options) {
  TransactionRoutes(fastify, options);
  BlockchainRoutes(fastify, options);
  return fastify;
};
