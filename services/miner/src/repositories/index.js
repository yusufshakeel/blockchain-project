'use strict';

const SchemaRepository = require('./schema-repository');
const BlockchainRepository = require('./blockchain-repository');
const MempoolRepository = require('./mempool-repository');
const { BlockchainModel } = require('../models/blockchain-model');
const { MempoolModel } = require('../models/mempool-model');

module.exports = function Repositories({ parser }) {
  this.schemaRepository = new SchemaRepository({ parser });
  this.blockchainRepository = new BlockchainRepository({ BlockchainModel });
  this.mempoolRepository = new MempoolRepository({ MempoolModel });
};
