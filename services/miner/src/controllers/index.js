'use strict';

const TransactionController = require('./transaction-controller');
const BlockchainController = require('./blockchain-controller');
const WalletController = require('./wallet-controller');

module.exports = function Controller({ blockchain, wallet }) {
  this.transactionController = TransactionController({ blockchain });
  this.blockchainController = BlockchainController({ blockchain });
  this.walletController = WalletController({ wallet });
};
