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

  const fetchStatistics = async function () {
    const statistics = await repositories.blockchainRepository.fetchStatistics();
    return { data: { statistics } };
  };

  return {
    fetchBlockByIndex,
    fetchStatistics
  };
};
