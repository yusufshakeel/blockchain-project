'use strict';

module.exports = {
  ROOT_COIN_SOURCE: 'ROOT_COIN_SOURCE',
  MIN_NONCE: 1,
  MAX_NONCE: 4294967296,
  NUMBER_OF_LEADING_ZEROS: 4,
  COIN_HALVING_BLOCK_THRESHOLD: 1024,
  STARTING_COINS_FOR_MINING_PER_BLOCK: 128,
  MAX_TRANSACTIONS_PER_BLOCK: 16,
  MIN_TRANSACTIONS_PER_BLOCK: 1,
  MAX_SIZE_OF_ALL_TRANSACTIONS_PER_BLOCK_IN_BYTES: 16384 // 16KB = 16 * 1024 bytes
};
