'use strict';

const TransactionController = require('./transaction-controller');
const BlockchainController = require('./blockchain-controller');
const AddressController = require('./address-controller');
const CoinController = require('./coin-controller');

module.exports = function Controller({ services, repositories }) {
  this.transactionController = TransactionController({ services, repositories });
  this.blockchainController = BlockchainController({ repositories });
  this.addressController = AddressController({ repositories });
  this.coinController = CoinController({ services, repositories });
};
