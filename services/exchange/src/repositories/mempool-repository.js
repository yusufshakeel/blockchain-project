'use strict';

const { MEMPOOL_TRANSACTION_STATUS_PENDING } = require('../constants');

module.exports = function MempoolRepository({ MempoolModel }) {
  this.fetchAllPendingTransactions = async function () {
    return MempoolModel.find({ status: MEMPOOL_TRANSACTION_STATUS_PENDING });
  };
};
