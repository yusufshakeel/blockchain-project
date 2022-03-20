'use strict';

const TransactionController = require('./transaction-controller');

module.exports = function Controller({ blockchain }) {
  this.transactionController = TransactionController({ blockchain });
};
