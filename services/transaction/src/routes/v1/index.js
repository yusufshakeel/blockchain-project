'use strict';

const TransactionRoutes = require('./transaction-routes');

module.exports = async function Routes(fastify, options) {
  TransactionRoutes(fastify, options);
  return fastify;
};
