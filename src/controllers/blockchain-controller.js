'use strict';

const BlockNotFoundError = require('../errors/block-not-found-error');

module.exports = function BlockchainController({ blockchain }) {
  const getBlockById = function getBlockById({ blockId }) {
    const block = blockchain.getBlock(blockId);
    if (!block) {
      throw new BlockNotFoundError(blockId);
    }
    return { data: { block } };
  };

  return {
    getBlockById
  };
};
