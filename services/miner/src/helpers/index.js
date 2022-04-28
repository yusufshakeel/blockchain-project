'use strict';

const _ = require('lodash');
const {
  NUMBER_OF_LEADING_ZEROS,
  MAX_TRANSACTIONS_PER_BLOCK,
  MIN_TRANSACTIONS_PER_BLOCK,
  MAX_SIZE_OF_ALL_TRANSACTIONS_PER_BLOCK_IN_BYTES,
  MIN_NONCE,
  MAX_NONCE,
  COIN_HALVING_BLOCK_THRESHOLD,
  STARTING_COINS_FOR_MINING_PER_BLOCK,
  ROOT_COIN_SOURCE,
  TRANSACTION_TYPE_REWARD_COIN,
  TRANSACTION_TYPE_FEE_COIN
} = require('../constants');

function isValidHash(hash) {
  return (
    hash.substring(0, NUMBER_OF_LEADING_ZEROS) === Array(NUMBER_OF_LEADING_ZEROS).fill('0').join('')
  );
}

function sortedNTransactions({ memPool, numberOfTransactions }) {
  const sorted = _.orderBy([...memPool], ['feeValue'], ['desc']);
  return sorted.slice(0, numberOfTransactions);
}

function getTransactions({ memPool }) {
  let transactions = [];
  let stringifiedTransactions = '';
  let isTransactionsFound = false;
  let numberOfTransactions = MAX_TRANSACTIONS_PER_BLOCK;
  while (!isTransactionsFound && numberOfTransactions >= MIN_TRANSACTIONS_PER_BLOCK) {
    transactions = sortedNTransactions({ memPool, numberOfTransactions });
    stringifiedTransactions = JSON.stringify(transactions);
    if (stringifiedTransactions.length <= MAX_SIZE_OF_ALL_TRANSACTIONS_PER_BLOCK_IN_BYTES) {
      isTransactionsFound = true;
      break;
    }
    numberOfTransactions--;
  }
  return { transactions, isTransactionsFound };
}

function getRewardTransaction({ blockIndex, minerAddress, services }) {
  const { timeService, uuidService } = services;
  const divider = Math.pow(2, Math.floor(blockIndex / COIN_HALVING_BLOCK_THRESHOLD));
  let rewardCoins = STARTING_COINS_FOR_MINING_PER_BLOCK / divider;
  if (rewardCoins < 1) {
    rewardCoins = 0;
  }
  return {
    uuid: uuidService.uuidV4(),
    sender: ROOT_COIN_SOURCE,
    receiver: minerAddress,
    transactionValue: 0,
    feeValue: 0,
    rewardValue: rewardCoins,
    message: 'Reward coin',
    transactionType: TRANSACTION_TYPE_REWARD_COIN,
    timestamp: timeService.now()
  };
}

function getFeeTransactions({ transactions, minerAddress, services }) {
  const { timeService, uuidService } = services;
  return transactions
    .filter(t => t.feeValue !== 0)
    .map(t => {
      return {
        uuid: uuidService.uuidV4(),
        sender: t.sender,
        receiver: minerAddress,
        transactionValue: 0,
        feeValue: t.feeValue,
        rewardValue: 0,
        message: 'Fee coin',
        transactionType: TRANSACTION_TYPE_FEE_COIN,
        timestamp: timeService.now()
      };
    });
}

function proofOfWork({ getPreviousBlock, memPool, minerAddress, services }) {
  const { timeService, hashService } = services;
  const previousBlock = getPreviousBlock();
  let hash = '0';
  let isHashFound = false;
  while (!isHashFound) {
    const { transactions } = getTransactions({ memPool });
    const rewardTransaction = getRewardTransaction({
      blockIndex: previousBlock.index + 1,
      minerAddress,
      services
    });
    const feeTransactions = getFeeTransactions({
      transactions,
      minerAddress,
      services
    });
    for (let nonce = MIN_NONCE; nonce <= MAX_NONCE; nonce++) {
      const block = {
        index: previousBlock.index + 1,
        nonce,
        timestamp: timeService.now(),
        previousHash: previousBlock.hash,
        transactions: [...transactions, rewardTransaction, ...feeTransactions]
      };
      hash = hashService.getSHA256Hash(JSON.stringify(block));
      if (isValidHash(hash)) {
        isHashFound = true;
        return { ...block, hash };
      }
    }
  }
}

function isValidBlock({ block, services }) {
  const { hash, ...rest } = block;
  const { hashService } = services;
  return hashService.getSHA256Hash(JSON.stringify(rest)) === hash;
}

function clearMemPool({ memPool, block }) {
  const { transactions } = block;
  const uuidsToClear = transactions.map(t => t.uuid);
  return memPool.filter(t => !uuidsToClear.includes(t.uuid));
}

function isValidBlockchain({ chain, services }) {
  let previousBlock = chain[0];
  let currentBlockIndex = 1;
  while (currentBlockIndex < chain.length) {
    const currentBlock = chain[currentBlockIndex];

    if (previousBlock.hash !== currentBlock.previousHash) {
      return false;
    }

    if (!isValidBlock({ block: currentBlock, services })) {
      return false;
    }

    previousBlock = currentBlock;
    currentBlockIndex++;
  }
  return true;
}

module.exports = {
  isValidHash,
  sortedNTransactions,
  proofOfWork,
  getTransactions,
  isValidBlock,
  clearMemPool,
  isValidBlockchain,
  getRewardTransaction,
  getFeeTransactions
};
