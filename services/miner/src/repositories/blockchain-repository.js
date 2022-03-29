'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchBlockByIndex = async function (blockIndex) {
    return BlockchainModel.findOne({ blockIndex });
  };

  this.fetchAllBlocks = async function () {
    return BlockchainModel.find();
  };

  this.createBlock = async function (block) {
    const blockchainModel = BlockchainModel(block);
    return await blockchainModel.save();
  };
};
