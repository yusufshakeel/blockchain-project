'use strict';

const TransactionRoutes = require('./transaction-routes');
const BlockchainRoutes = require('./blockchain-routes');
const AddressRoutes = require('./address-routes');
const CoinRoutes = require('./coin-routes');

module.exports = async function Routes(fastify, options) {
  TransactionRoutes(fastify, options);
  BlockchainRoutes(fastify, options);
  AddressRoutes(fastify, options);
  CoinRoutes(fastify, options);
  return fastify;
};
