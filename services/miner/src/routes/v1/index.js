'use strict';

const TransactionRoutes = require('./transaction-routes');
const BlockchainRoutes = require('./blockchain-routes');
const WalletRoutes = require('./wallet-routes');

module.exports = async function Routes(fastify, options) {
  TransactionRoutes(fastify, options);
  BlockchainRoutes(fastify, options);
  WalletRoutes(fastify, options);
  return fastify;
};
