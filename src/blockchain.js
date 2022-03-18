'use strict';

const { proofOfWork, isValidBlock, clearMemPool } = require('./helpers');

module.exports = function Blockchain({ services }) {
  // this is the blockchain
  let chain = [];

  // this holds all the transaction that are not yet in a block
  let memPool = [];

  const getPreviousBlock = function () {
    if (chain.length) {
      return chain[chain.length - 1];
    }

    // when no block exists in the blockchain
    return {
      index: 0,
      hash: '0'
    };
  };

  this.getChain = function () {
    return chain;
  };

  this.getMempool = function () {
    return memPool;
  };

  this.createTransaction = function (transaction) {
    const { sender, receiver, transactionValue, feeValue, message, timestamp } = transaction;
    memPool.push({
      uuid: services.uuidService.uuidV4(),
      sender,
      receiver,
      transactionValue,
      feeValue,
      message,
      timestamp
    });
  };

  this.createBlock = function () {
    const block = proofOfWork({ getPreviousBlock, memPool, services });
    chain.push(block);
    memPool = [...clearMemPool({ block, memPool })];
    return { block };
  };

  // this.isValidChain = function () {
  //   let previousBlock = chain[0];
  //   let currentBlockIndex = 1;
  //   while (currentBlockIndex < chain.length) {
  //     const currentBlock = chain[currentBlockIndex];
  //
  //     if (previousBlock.hash !== currentBlock.previousHash) {
  //       return false;
  //     }
  //
  //     if (!isValidBlock(currentBlock)) {
  //       return false;
  //     }
  //
  //     previousBlock = currentBlock;
  //     currentBlockIndex++;
  //   }
  //   return true;
  // };
};
