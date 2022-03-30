'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchBlockByIndex = async function (index) {
    return BlockchainModel.findOne({ index });
  };

  this.fetchAllBlocks = async function () {
    return BlockchainModel.find();
  };

  this.createBlock = async function (block) {
    const blockchainModel = BlockchainModel(block);
    return await blockchainModel.save();
  };
};
