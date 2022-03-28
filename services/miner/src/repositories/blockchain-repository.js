'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchBlockByIndex = async function (blockIndex) {
    return BlockchainModel.findOne({ blockIndex });
  };

  this.createBlock = async function (block) {
    const blockchainModel = BlockchainModel(block);
    return await blockchainModel.save();
  };
};
