'use strict';

const TransactionController = require('./transaction-controller');
const BlockchainController = require('./blockchain-controller');

module.exports = function Controller({ blockchain }) {
  this.transactionController = TransactionController({ blockchain });
  this.blockchainController = BlockchainController({ blockchain });
};
