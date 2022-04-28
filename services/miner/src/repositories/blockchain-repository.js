'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchAllBlocks = async function () {
    return BlockchainModel.find();
  };

  this.createBlock = async function (block) {
    const blockchainModel = BlockchainModel(block);
    return await blockchainModel.save();
  };
};
