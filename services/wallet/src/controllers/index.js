'use strict';

const WalletController = require('./wallet-controller');

module.exports = function Controller({ wallet }) {
  this.walletController = WalletController({ wallet });
};
