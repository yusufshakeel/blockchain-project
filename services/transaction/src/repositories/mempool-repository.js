'use strict';

module.exports = function MempoolRepository({ MempoolModel }) {
  this.createTransaction = async function (block) {
    const mempoolModel = MempoolModel(block);
    return await mempoolModel.save();
  };
};
