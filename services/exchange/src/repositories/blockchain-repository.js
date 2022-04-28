'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchBlockByIndex = async function (index) {
    return BlockchainModel.findOne({ index });
  };

  this.fetchStatistics = async function () {
    const totalNumberOfBlocksMined = await BlockchainModel.countDocuments();
    return {
      totalNumberOfBlocksMined
    };
  };
};
