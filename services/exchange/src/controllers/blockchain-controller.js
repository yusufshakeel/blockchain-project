'use strict';

const _ = require('lodash');
const BlockNotFoundError = require('../errors/block-not-found-error');
const {
  TRANSACTION_TYPE_FEE_COIN,
  TRANSACTION_TYPE_REWARD_COIN,
  TRANSACTION_TYPE_COIN,
  NUMBER_OF_DECIMAL_PLACES
} = require('../constants');

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

  const fetchLatestMinedBlocksSummary = async function () {
    const blocks = await repositories.blockchainRepository.fetchLatestNBlocks(20);
    const summaryReport = blocks.reduce((result, block) => {
      const { index, timestamp, transactions } = block;

      const coins = transactions
        .filter(v =>
          [TRANSACTION_TYPE_FEE_COIN, TRANSACTION_TYPE_REWARD_COIN, TRANSACTION_TYPE_COIN].includes(
            v.transactionType
          )
        )
        .reduce((sum, transaction) => {
          if (transaction.transactionType === TRANSACTION_TYPE_COIN) {
            return Number((sum + transaction.transactionValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
          } else if (transaction.transactionType === TRANSACTION_TYPE_FEE_COIN) {
            return Number((sum + transaction.feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
          }
          return Number((sum + transaction.rewardValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
        }, 0);

      const summary = {
        index,
        timestamp,
        coins,
        numberOfTransactions: transactions.length
      };

      return [...result, summary];
    }, []);
    return { data: { blocks: summaryReport } };
  };

  return {
    fetchBlockByIndex,
    fetchStatistics,
    fetchLatestMinedBlocksSummary
  };
};
