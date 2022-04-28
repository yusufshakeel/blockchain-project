'use strict';

module.exports = function BlockchainRepository({ BlockchainModel }) {
  this.fetchAllBlocks = async function () {
    return BlockchainModel.find();
  };
};
