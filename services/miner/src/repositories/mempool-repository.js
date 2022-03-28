'use strict';

module.exports = function MempoolRepository({ MempoolModel }) {
  this.createTransaction = async function (block) {
    console.log({ block });
    const mempoolModel = MempoolModel(block);
    return await mempoolModel.save();
  };

  this.fetchAllPendingTransactions = async function () {
    return MempoolModel.find({ status: 'PENDING' });
  };
};
