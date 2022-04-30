'use strict';

const axios = require('axios');

const { EXCHANGE_MINER_ROOT_WALLET } = require('../constants');

const TimeService = require('./time-service');
const UUIDService = require('./uuid-service');
const CacheService = require('./cache-service');
const RestClientService = require('./rest-client-service');
const TransactionSignatureService = require('./transaction-signature-service');

module.exports = function Services() {
  this.timeService = TimeService();
  this.uuidService = UUIDService();
  this.cacheService = CacheService();
  this.transactionSignatureService = TransactionSignatureService({
    privateKey: EXCHANGE_MINER_ROOT_WALLET.privateKey,
    publicKey: EXCHANGE_MINER_ROOT_WALLET.publicKey
  });
  this.restClientService = RestClientService({ client: axios, uuidService: this.uuidService });
};
