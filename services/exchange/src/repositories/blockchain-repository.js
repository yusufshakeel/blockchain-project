'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchBlockByIndex = async function (index) {
    return BlockchainModel.findOne({ index });
  };

  this.fetchStatistics = async function () {
    const stats = await BlockchainModel.collection.stats();
    return {
      totalNumberOfBlocksMined: stats.count,
      sizeOfBlockchainInBytes: stats.size
    };
  };

  this.fetchAllBlocks = async function () {
    return BlockchainModel.find();
  };

  this.fetchLatestNBlocks = async function (numberOfBlocks) {
    return BlockchainModel.find().sort({ index: -1 }).limit(numberOfBlocks);
  };
};
