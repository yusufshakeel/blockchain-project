'use strict';

const {
  MEMPOOL_TRANSACTION_STATUS_PENDING,
  MEMPOOL_TRANSACTION_STATUS_MINED
} = require('../constants');

module.exports = function MempoolRepository({ MempoolModel }) {
  this.fetchAllPendingTransactions = async function () {
    return MempoolModel.find({ status: MEMPOOL_TRANSACTION_STATUS_PENDING }).sort({ _id: -1 });
  };

  this.fetchNLatestMinedTransactions = async function (numberOfTransactions) {
    return MempoolModel.find({ status: MEMPOOL_TRANSACTION_STATUS_MINED })
      .sort({ _id: -1 })
      .limit(numberOfTransactions);
  };
};
