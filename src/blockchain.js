'use strict';

const { proofOfWork, isValidBlockchain, clearMemPool } = require('./helpers');

module.exports = function Blockchain({ minerAddress, services }) {
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
      index: -1,
      hash: '0'
    };
  };

  this.getBlock = function (id) {
    return chain[id];
  };

  this.getChain = function () {
    return chain;
  };

  this.getMemPool = function () {
    return memPool;
  };

  /**
   * @param {object} transaction This is the transaction object.
   * @return {string} Returns UUID of the created transaction.
   */
  this.createTransaction = function (transaction) {
    const { sender, receiver, transactionValue, feeValue, message } = transaction;
    const uuid = services.uuidService.uuidV4();
    memPool.push({
      uuid,
      sender,
      receiver,
      transactionValue,
      feeValue,
      message,
      timestamp: services.timeService.now()
    });
    return uuid;
  };

  /**
   * @return {{block: {previousHash: string, index: number, transactions: [], nonce: number, hash: string, timestamp: string}}}
   */
  this.createBlock = function () {
    const block = proofOfWork({ getPreviousBlock, memPool: [...memPool], minerAddress, services });
    chain.push(block);
    memPool = [...clearMemPool({ memPool, block })];
    return { block };
  };

  /**
   * @return {boolean}
   */
  this.isValidChain = function () {
    return isValidBlockchain({ chain, services });
  };
};
