'use strict';

const { MEMPOOL_TRANSACTION_STATUS_MINED } = require('../constants/index');

module.exports = function MempoolRepository({ MempoolModel }) {
  this.createTransaction = async function (block) {
    const mempoolModel = MempoolModel(block);
    return await mempoolModel.save();
  };

  this.fetchAllPendingTransactions = async function () {
    return MempoolModel.find({ status: 'PENDING' });
  };

  this.updateMinedTransactions = async function (transactionUUIDs) {
    return MempoolModel.updateMany(
      { uuid: { $in: transactionUUIDs } },
      {
        $set: {
          updatedAt: Date.now(),
          minedAt: Date.now(),
          status: MEMPOOL_TRANSACTION_STATUS_MINED
        }
      }
    );
  };
};
