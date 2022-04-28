'use strict';

const TransactionController = require('./transaction-controller');

module.exports = function Controller({ services, repositories }) {
  this.transactionController = TransactionController({ services, repositories });
};
