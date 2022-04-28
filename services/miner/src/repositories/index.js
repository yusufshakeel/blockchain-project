'use strict';

const BlockchainRepository = require('./blockchain-repository');
const MempoolRepository = require('./mempool-repository');
const { BlockchainModel } = require('../models/blockchain-model');
const { MempoolModel } = require('../models/mempool-model');

module.exports = function Repositories() {
  this.blockchainRepository = new BlockchainRepository({ BlockchainModel });
  this.mempoolRepository = new MempoolRepository({ MempoolModel });
};
