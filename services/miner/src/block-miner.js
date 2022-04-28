'use strict';

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const CronJob = require('cron').CronJob;
const Services = require('./services');
const BlockchainRepository = require('./repositories/blockchain-repository');
const MempoolRepository = require('./repositories/mempool-repository');
const { BlockchainModel } = require('./models/blockchain-model');
const { MempoolModel } = require('./models/mempool-model');
const { proofOfWork } = require('./helpers');
const {
  MONGODB_DB_NAME,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_HOST,
  MONGODB_PORT,
  BLOCK_MINING_CRON_TIME,
  TRANSACTION_TYPE_COIN
} = require('./constants');

const services = new Services();
const blockchainRepository = new BlockchainRepository({ BlockchainModel });
const mempoolRepository = new MempoolRepository({ MempoolModel });

const minerAddress = fs.readFileSync(
  path.resolve(__dirname, './../seed/miner-root.address.txt'),
  'utf8'
);

async function mine() {
  const pendingTransactions = await mempoolRepository.fetchAllPendingTransactions();
  const chain = await blockchainRepository.fetchAllBlocks();
  const memPool = pendingTransactions.map(t => t.transaction);
  const getPreviousBlock = () => {
    if (chain.length) {
      return chain[chain.length - 1];
    }
    // when no block exists in the blockchain
    return {
      index: -1,
      hash: '0'
    };
  };

  if (!memPool.length) {
    console.log('No transactions!');
    return;
  }

  const block = proofOfWork({
    getPreviousBlock,
    memPool,
    minerAddress,
    services
  });
  await blockchainRepository.createBlock(block);
  console.log(`New block mined! Block Index: ${block.index}`);
  const minedTransactionUUIDs = block.transactions.map(t => t.uuid);
  await mempoolRepository.updateMinedTransactions(minedTransactionUUIDs);
}

async function bootstrap() {
  try {
    const mongoOption = { dbName: MONGODB_DB_NAME };
    const mongoAuth =
      MONGODB_USERNAME.length && MONGODB_PASSWORD.length
        ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
        : '';
    const mongoUrl = `mongodb://${mongoAuth}${MONGODB_HOST}:${MONGODB_PORT}`;
    await mongoose.connect(mongoUrl, mongoOption);
    return true;
  } catch (err) {
    console.error('FATAL ERROR');
    console.error(err);
    return false;
  }
}

async function genesisTransaction() {
  console.log('ENTERED BLOCK_MINER - genesisTransaction');
  const chain = await blockchainRepository.fetchAllBlocks();
  if (!chain.length) {
    console.log('BLOCK_MINER - genesisTransaction - creating new transaction');
    const uuid = services.uuidService.uuidV4();
    await mempoolRepository.createTransaction({
      uuid,
      transaction: {
        uuid,
        sender: minerAddress,
        receiver: minerAddress,
        transactionValue: 0,
        feeValue: 0,
        message: 'GENESIS TRANSACTION',
        transactionType: TRANSACTION_TYPE_COIN,
        timestamp: services.timeService.now()
      },
      status: 'PENDING'
    });
  } else {
    console.log('BLOCK_MINER - genesisTransaction - genesis block is already created!');
  }
  console.log('EXITING BLOCK_MINER - genesisTransaction');
}

async function run() {
  const isReady = await bootstrap();
  if (isReady) {
    await genesisTransaction();
    const job = new CronJob(BLOCK_MINING_CRON_TIME, () => mine());
    job.start();
  }
}

run();
