'use strict';

const _ = require('lodash');
const BlockNotFoundError = require('../errors/block-not-found-error');

module.exports = function BlockchainController({ repositories }) {
  const fetchBlockByIndex = async function ({ blockIndex }) {
    const block = await repositories.blockchainRepository.fetchBlockByIndex(blockIndex);
    if (_.isEmpty(block)) {
      throw new BlockNotFoundError(blockIndex);
    }
    return { data: { block } };
  };

  return {
    fetchBlockByIndex
  };
};
