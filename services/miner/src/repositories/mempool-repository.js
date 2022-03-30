'use strict';

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
          status: 'MINED'
        }
      }
    );
  };
};
