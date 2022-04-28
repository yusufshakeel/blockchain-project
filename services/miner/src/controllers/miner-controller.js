'use strict';

const { proofOfWork } = require('../helpers');
const { TRANSACTION_TYPE_COIN, MEMPOOL_TRANSACTION_STATUS_PENDING } = require('../constants');

module.exports = function MinerController({ repositories, services, minerAddress }) {
  const { mempoolRepository, blockchainRepository } = repositories;

  const mine = async function () {
    const pendingTransactions = await mempoolRepository.fetchAllPendingTransactions();
    const memPool = pendingTransactions.map(t => t.transaction);
    if (!memPool.length) {
      console.log('Mempool is empty. No new block to mine.');
      return;
    }

    const chain = await blockchainRepository.fetchAllBlocks();
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

    const block = proofOfWork({
      getPreviousBlock,
      memPool,
      minerAddress,
      services
    });

    const createdBlock = await blockchainRepository.createBlock(block);
    console.log(`New block mined! Block Index: ${block.index}`);
    console.log({ createdBlock });

    const minedTransactionUUIDs = block.transactions.map(t => t.uuid);
    const minedTransactions = await mempoolRepository.updateMinedTransactions(
      minedTransactionUUIDs
    );
    console.log({ minedTransactions });
  };

  const genesisTransaction = async function () {
    console.log('ENTERED MinerController - genesisTransaction');
    const chain = await blockchainRepository.fetchAllBlocks();
    if (!chain.length) {
      console.log('MinerController - genesisTransaction - creating new transaction');
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
        status: MEMPOOL_TRANSACTION_STATUS_PENDING
      });
    } else {
      console.log('MinerController - genesisTransaction - genesis block is already created!');
    }
    console.log('EXITING MinerController - genesisTransaction');
  };

  return { mine, genesisTransaction };
};
