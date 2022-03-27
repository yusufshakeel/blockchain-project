'use strict';

const WalletRoutes = require('./wallet-routes');

module.exports = async function Routes(fastify, options) {
  WalletRoutes(fastify, options);
  return fastify;
};
