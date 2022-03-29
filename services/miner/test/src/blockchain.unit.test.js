'use strict';

const Blockchain = require('../../src/blockchain');
const Services = require('../../src/services');
const services = new Services();

describe('Testing blockchain', () => {
  describe('Testing createTransaction', () => {
    test('Should be able to create transaction', () => {
      const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
      expect(blockchain.getMemPool()).toHaveLength(0);
      expect(blockchain.getChain()).toHaveLength(0);
      const uuid = blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string'
      });
      expect(uuid).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      expect(blockchain.getMemPool()).toStrictEqual([
        {
          uuid: expect.any(String),
          feeValue: 0,
          message: 'string',
          receiver: 'receiver1',
          sender: 'sender1',
          timestamp: expect.any(String),
          transactionValue: 1
        }
      ]);
      expect(blockchain.getChain()).toHaveLength(0);
    });
  });

  describe('Testing genesis block', () => {
    test('Should be able to create genesis block', () => {
      const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string'
      });
      expect(blockchain.getMemPool()).toHaveLength(1);

      const result = blockchain.createBlock();
      expect(result).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 0,
          nonce: expect.any(Number),
          previousHash: '0',
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: expect.any(String),
              transactionValue: 1,
              uuid: expect.any(String)
            },
            {
              feeValue: 0,
              message: 'Reward coin',
              rewardValue: 128,
              sender: 'ROOT_COIN_SOURCE',
              receiver: 'minerAddress1',
              transactionType: 'REWARD_COIN_TRANSACTION',
              timestamp: expect.any(String),
              transactionValue: 0,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMemPool()).toHaveLength(0);
    });
  });

  describe('Testing multiple blocks', () => {
    test('Should be able to create multiple blocks', () => {
      const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string'
      });

      expect(blockchain.getMemPool()).toHaveLength(1);
      const result1 = blockchain.createBlock();
      expect(result1).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 0,
          nonce: expect.any(Number),
          previousHash: '0',
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: expect.any(String),
              transactionValue: 1,
              uuid: expect.any(String)
            },
            {
              feeValue: 0,
              message: 'Reward coin',
              receiver: 'minerAddress1',
              rewardValue: 128,
              sender: 'ROOT_COIN_SOURCE',
              transactionType: 'REWARD_COIN_TRANSACTION',
              timestamp: expect.any(String),
              transactionValue: 0,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMemPool()).toHaveLength(0);

      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string'
      });

      expect(blockchain.getMemPool()).toHaveLength(1);
      const result2 = blockchain.createBlock();
      expect(result2).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 1,
          nonce: expect.any(Number),
          previousHash: expect.any(String),
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: expect.any(String),
              transactionValue: 1,
              uuid: expect.any(String)
            },
            {
              feeValue: 0,
              message: 'Reward coin',
              receiver: 'minerAddress1',
              rewardValue: 128,
              sender: 'ROOT_COIN_SOURCE',
              transactionType: 'REWARD_COIN_TRANSACTION',
              timestamp: expect.any(String),
              transactionValue: 0,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMemPool()).toHaveLength(0);
    });
  });

  describe('Testing isValidChain', () => {
    test('Should return true', () => {
      const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string'
      });
      blockchain.createBlock();
      expect(blockchain.isValidChain()).toBeTruthy();
    });
  });

  describe('Testing getBlock', () => {
    describe('When block does not exists', () => {
      test('Should return undefined', () => {
        const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
        expect(blockchain.getBlock(1)).toBeUndefined();
      });
    });

    describe('When block exists', () => {
      test('Should return the block', () => {
        const blockchain = new Blockchain({ minerAddress: 'minerAddress1', services });
        blockchain.createTransaction({
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0,
          message: 'string'
        });
        const { block } = blockchain.createBlock();
        expect(blockchain.getBlock(0)).toStrictEqual(block);
      });
    });
  });
});
