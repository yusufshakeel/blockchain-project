'use strict';

const minerRootWallet = require('../../seed/miner-root-wallet.json');

module.exports = {
  HTTP_HOST: '0.0.0.0',
  HTTP_PORT: 10101,
  PROJECT_TITLE: 'Blockchain - Exchange',
  HTTP_TRANSACTION_SERVICE_DOMAIN_ADDRESS: 'http://localhost:10103/blockchain',
  CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS: 'CACHE_KEY_AVERAGE_FEE_TO_BUY_COINS',
  EXCHANGE_MINER_ROOT_WALLET: minerRootWallet,
  TTL_FOR_CACHE_IN_SECONDS: 300,
  LATEST_NUMBER_OF_BLOCKS_FOR_FINDING_FEE_TO_BUY_COINS: 128,
  NUMBER_OF_DECIMAL_PLACES: 4,
  MONGODB_HOST: process.env.PAYMENT_MONGODB_HOST || '0.0.0.0',
  MONGODB_PORT: process.env.PAYMENT_MONGODB_PORT || 27017,
  MONGODB_USERNAME: process.env.PAYMENT_MONGODB_USERNAME ?? '',
  MONGODB_PASSWORD: process.env.PAYMENT_MONGODB_PASSWORD ?? '',
  MONGODB_DB_NAME: process.env.PAYMENT_MONGODB_DB_NAME || 'blockchain',
  TRANSACTION_TYPE_REWARD_COIN: 'REWARD_COIN_TRANSACTION',
  TRANSACTION_TYPE_FEE_COIN: 'FEE_COIN_TRANSACTION',
  TRANSACTION_TYPE_COIN: 'COIN_TRANSACTION',
  MEMPOOL_TRANSACTION_STATUS_PENDING: 'PENDING',
  MEMPOOL_TRANSACTION_STATUS_MINED: 'MINED'
};
