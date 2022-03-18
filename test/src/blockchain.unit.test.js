'use strict';

const Blockchain = require('../../src/blockchain');
const Services = require('../../src/services');
const services = new Services();

describe('Testing blockchain', () => {
  describe('Testing createTransaction', () => {
    test('Should be able to create transaction', () => {
      const blockchain = new Blockchain({ services });
      expect(blockchain.getMempool()).toHaveLength(0);
      expect(blockchain.getChain()).toHaveLength(0);
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string',
        timestamp: '2022-01-01T01:01:01.000Z'
      });

      expect(blockchain.getMempool()).toStrictEqual([
        {
          uuid: expect.any(String),
          feeValue: 0,
          message: 'string',
          receiver: 'receiver1',
          sender: 'sender1',
          timestamp: '2022-01-01T01:01:01.000Z',
          transactionValue: 1
        }
      ]);
      expect(blockchain.getChain()).toHaveLength(0);
    });
  });

  describe('Testing genesis block', () => {
    test('Should be able to create genesis block', () => {
      const blockchain = new Blockchain({ services });
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string',
        timestamp: '2022-01-01T01:01:01.000Z'
      });
      expect(blockchain.getMempool()).toHaveLength(1);

      const result = blockchain.createBlock();
      expect(result).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 1,
          nonce: expect.any(Number),
          previousHash: '0',
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: '2022-01-01T01:01:01.000Z',
              transactionValue: 1,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMempool()).toHaveLength(0);
    });
  });

  describe('Testing multiple blocks', () => {
    test('Should be able to create multiple blocks', () => {
      const blockchain = new Blockchain({ services });
      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string',
        timestamp: '2022-01-01T01:01:01.000Z'
      });

      expect(blockchain.getMempool()).toHaveLength(1);
      const result1 = blockchain.createBlock();
      expect(result1).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 1,
          nonce: expect.any(Number),
          previousHash: '0',
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: '2022-01-01T01:01:01.000Z',
              transactionValue: 1,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMempool()).toHaveLength(0);

      blockchain.createTransaction({
        sender: 'sender1',
        receiver: 'receiver1',
        transactionValue: 1,
        feeValue: 0,
        message: 'string',
        timestamp: '2022-01-01T01:01:01.100Z'
      });

      expect(blockchain.getMempool()).toHaveLength(1);
      const result2 = blockchain.createBlock();
      expect(result2).toStrictEqual({
        block: {
          hash: expect.any(String),
          index: 2,
          nonce: expect.any(Number),
          previousHash: expect.any(String),
          timestamp: expect.any(String),
          transactions: [
            {
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: '2022-01-01T01:01:01.100Z',
              transactionValue: 1,
              uuid: expect.any(String)
            }
          ]
        }
      });
      expect(blockchain.getMempool()).toHaveLength(0);
    });
  });
});
