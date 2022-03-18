'use strict';

const { proofOfWork, isValidBlockchain, clearMemPool } = require('./helpers');

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

  this.isValidChain = function () {
    return isValidBlockchain({ chain, services });
  };
};
