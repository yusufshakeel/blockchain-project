'use strict';

const {
  isValidHash,
  sortedNTransactions,
  getTransactions,
  proofOfWork,
  isValidBlock,
  clearMemPool,
  isValidBlockchain,
  getRewardTransaction,
  getFeeTransactions
} = require('../../../src/helpers');
const { MAX_TRANSACTIONS_PER_BLOCK } = require('../../../src/constants');
const Services = require('../../../src/services');
const services = new Services();

describe('Testing helper functions', () => {
  describe('Testing isValidHash', () => {
    describe('When hash has the required number of leading zeros', () => {
      test('Should return true', () => {
        expect(
          isValidHash('0000a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3')
        ).toBeTruthy();
      });
    });

    describe('When hash does not has the required number of leading zeros', () => {
      test('Should return false', () => {
        expect(
          isValidHash('1000a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3')
        ).toBeFalsy();
      });
    });
  });

  describe('Testing sortedNTransactions', () => {
    test('Should return the sorted transactions', () => {
      const memPool = [
        {
          uuid: '0163a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.000Z'
        },
        {
          uuid: '0263a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender2',
          receiver: 'receiver2',
          transactionValue: 1,
          feeValue: 0.000001,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.100Z'
        },
        {
          uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender3',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0.000001,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.200Z'
        },
        {
          uuid: '0463a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender3',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0.000002,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.300Z'
        }
      ];
      const numberOfTransactions = 3;
      const sortedTransactions = sortedNTransactions({ memPool, numberOfTransactions });
      expect(sortedTransactions).toStrictEqual([
        {
          feeValue: 0.000002,
          message: 'string',
          receiver: 'receiver1',
          sender: 'sender3',
          timestamp: '2022-01-01T01:01:01.300Z',
          transactionValue: 1,
          uuid: '0463a485-69cd-496a-af27-7dd8c17155e3'
        },
        {
          feeValue: 0.000001,
          message: 'string',
          receiver: 'receiver2',
          sender: 'sender2',
          timestamp: '2022-01-01T01:01:01.100Z',
          transactionValue: 1,
          uuid: '0263a485-69cd-496a-af27-7dd8c17155e3'
        },
        {
          feeValue: 0.000001,
          message: 'string',
          receiver: 'receiver1',
          sender: 'sender3',
          timestamp: '2022-01-01T01:01:01.200Z',
          transactionValue: 1,
          uuid: '0363a485-69cd-496a-af27-7dd8c17155e3'
        }
      ]);
    });
  });

  describe('Testing getTransactions', () => {
    describe('When there is one transaction in memPool', () => {
      test('Should be able to return transaction', () => {
        const memPool = [
          {
            uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
            sender: 'sender1',
            receiver: 'receiver1',
            transactionValue: 1,
            feeValue: 0,
            message: 'string',
            timestamp: '2022-01-01T01:01:01.000Z'
          }
        ];
        const result = getTransactions({ memPool });
        expect(result).toStrictEqual({
          isTransactionsFound: true,
          transactions: [
            {
              uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
              feeValue: 0,
              message: 'string',
              receiver: 'receiver1',
              sender: 'sender1',
              timestamp: '2022-01-01T01:01:01.000Z',
              transactionValue: 1
            }
          ]
        });
      });
    });

    describe('When there is multiple transactions in memPool', () => {
      describe('When max number of transactions exceeds the size limit', () => {
        test('Should be able to return lower number of transactions', () => {
          const memPool = Array(MAX_TRANSACTIONS_PER_BLOCK + 1).fill({
            uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
            sender: 'fa63a485-69cd-496a-af27-7dd8c17155e3',
            receiver: 'fa63a485-69cd-496a-af27-7dd8c17155e3',
            transactionValue: 1,
            feeValue: 0,
            message:
              'The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived. The sky is clear; the stars are twinkling. Check back tomorrow; I will see if the book has arrived.',
            timestamp: '2022-01-01T01:01:01.000Z'
          });
          const result = getTransactions({ memPool });
          expect(result.transactions.length).toBeLessThan(MAX_TRANSACTIONS_PER_BLOCK);
        });
      });
    });
  });

  describe('Testing getRewardTransaction', () => {
    describe('Testing halving', () => {
      test('Should be able to halve', () => {
        const block1 = getRewardTransaction({ blockIndex: 1, minerAddress: 'address1', services });
        const block1024 = getRewardTransaction({
          blockIndex: 1024,
          minerAddress: 'address1',
          services
        });
        const block65536 = getRewardTransaction({
          blockIndex: 65536,
          minerAddress: 'address1',
          services
        });
        expect(block1.rewardValue).toBe(128);
        expect(block1024.rewardValue).toBe(64);
        expect(block65536.rewardValue).toBe(0);
      });
    });
  });

  describe('Testing getFeeTransactions', () => {
    test('Should get the fee transactions', () => {
      const transactions = [
        {
          uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0.01,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.000Z'
        }
      ];
      const result = getFeeTransactions({ transactions, minerAddress: 'address1', services });
      expect(result).toStrictEqual([
        {
          uuid: expect.any(String),
          sender: 'sender1',
          receiver: 'address1',
          transactionValue: 0,
          feeValue: 0.01,
          rewardValue: 0,
          message: 'Fee coin',
          transactionType: 'FEE_COIN_TRANSACTION',
          timestamp: expect.any(String)
        }
      ]);
    });
  });

  describe('Testing proofOfWork', () => {
    test('Should return proof of work', () => {
      const getPreviousBlock = () => ({ index: -1, hash: '0' });
      const memPool = [
        {
          uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.000Z'
        }
      ];
      const result = proofOfWork({ getPreviousBlock, memPool, minerAddress: 'address1', services });
      expect(result).toStrictEqual({
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
            timestamp: '2022-01-01T01:01:01.000Z',
            transactionValue: 1,
            uuid: '0363a485-69cd-496a-af27-7dd8c17155e3'
          },
          {
            feeValue: 0,
            message: 'Reward coin',
            rewardValue: 128,
            sender: 'ROOT_COIN_SOURCE',
            receiver: 'address1',
            timestamp: expect.any(String),
            transactionValue: 0,
            transactionType: 'REWARD_COIN_TRANSACTION',
            uuid: expect.any(String)
          }
        ]
      });
      expect(result.hash).toMatch(/^0000[0-9a-f]+$/i);
    });
  });

  describe('Testing isValidBlock', () => {
    describe('When block is correct', () => {
      test('Should return true', () => {
        const block = {
          index: 1,
          nonce: 114449,
          timestamp: '2022-03-18T17:59:51.573Z',
          previousHash: '0',
          transactions: [
            {
              uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
              sender: 'sender1',
              receiver: 'receiver1',
              transactionValue: 1,
              feeValue: 0,
              message: 'string',
              timestamp: '2022-01-01T01:01:01.000Z'
            }
          ],
          hash: '0000cbd746d74aacf099d50c2e1f1116c7c26980aca25e40d3369bb5f3159abe'
        };
        expect(isValidBlock({ block, services })).toBeTruthy();
      });
    });

    describe('When block is incorrect', () => {
      test('Should return false', () => {
        const block = {
          index: 1,
          nonce: 1234142,
          timestamp: '2022-03-18T17:59:51.573Z',
          previousHash: '0',
          transactions: [
            {
              uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
              sender: 'sender1',
              receiver: 'receiver1',
              transactionValue: 1,
              feeValue: 0,
              message: 'string',
              timestamp: '2022-01-01T01:01:01.000Z'
            }
          ],
          hash: '0000cbd746d74aacf099d50c2e1f1116c7c26980aca25e40d3369bb5f3159abe'
        };
        expect(isValidBlock({ block, services })).toBeFalsy();
      });
    });
  });

  describe('Testing clearMemPool', () => {
    test('Should be able to clear memPool', () => {
      const block = {
        index: 1,
        nonce: 114449,
        timestamp: '2022-03-18T17:59:51.573Z',
        previousHash: '0',
        transactions: [
          {
            uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
            sender: 'sender1',
            receiver: 'receiver1',
            transactionValue: 1,
            feeValue: 0,
            message: 'string',
            timestamp: '2022-01-01T01:01:01.000Z'
          }
        ],
        hash: '0000cbd746d74aacf099d50c2e1f1116c7c26980aca25e40d3369bb5f3159abe'
      };
      let memPool = [
        {
          uuid: '0363a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.000Z'
        },
        {
          uuid: '0163a485-69cd-496a-af27-7dd8c17155e3',
          sender: 'sender1',
          receiver: 'receiver1',
          transactionValue: 1,
          feeValue: 0,
          message: 'string',
          timestamp: '2022-01-01T01:01:01.000Z'
        }
      ];
      expect(clearMemPool({ memPool, block })).toStrictEqual([
        {
          feeValue: 0,
          message: 'string',
          receiver: 'receiver1',
          sender: 'sender1',
          timestamp: '2022-01-01T01:01:01.000Z',
          transactionValue: 1,
          uuid: '0163a485-69cd-496a-af27-7dd8c17155e3'
        }
      ]);
    });
  });

  describe('Testing isValidBlockchain', () => {
    describe('When chain is valid', () => {
      test('Should return true', () => {
        const chain = [
          {
            index: 1,
            nonce: 131063,
            timestamp: '2022-03-18T18:39:21.777Z',
            previousHash: '0',
            transactions: [
              {
                uuid: '0849b5a0-8a87-44ae-8a68-651b5eb72365',
                sender: 'sender1',
                receiver: 'receiver1',
                transactionValue: 1,
                feeValue: 0,
                message: 'string',
                timestamp: '2022-01-01T01:01:01.000Z'
              }
            ],
            hash: '0000d7ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc'
          },
          {
            index: 2,
            nonce: 8231,
            timestamp: '2022-03-18T18:39:21.959Z',
            previousHash: '0000d7ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc',
            transactions: [
              {
                uuid: 'f8285d5a-59c8-4569-8b1c-07e6f055adcd',
                sender: 'sender1',
                receiver: 'receiver1',
                transactionValue: 1,
                feeValue: 0,
                message: 'string',
                timestamp: '2022-01-01T01:01:01.100Z'
              }
            ],
            hash: '00007cf407d8534e3baa4733e0c0c22ec29f9109796d8cabbd6bf288af8869fc'
          }
        ];
        expect(isValidBlockchain({ chain, services })).toBeTruthy();
      });
    });

    describe('When chain is invalid', () => {
      describe('Mismatch hash between current and previous block', () => {
        test('Should return false', () => {
          const chain = [
            {
              index: 1,
              nonce: 131063,
              timestamp: '2022-03-18T18:39:21.777Z',
              previousHash: '0',
              transactions: [
                {
                  uuid: '0849b5a0-8a87-44ae-8a68-651b5eb72365',
                  sender: 'sender1',
                  receiver: 'receiver1',
                  transactionValue: 1,
                  feeValue: 0,
                  message: 'string',
                  timestamp: '2022-01-01T01:01:01.000Z'
                }
              ],
              hash: '0000d7ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc'
            },
            {
              index: 2,
              nonce: 8231,
              timestamp: '2022-03-18T18:39:21.959Z',
              previousHash: '000017ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc',
              transactions: [
                {
                  uuid: 'f8285d5a-59c8-4569-8b1c-07e6f055adcd',
                  sender: 'sender1',
                  receiver: 'receiver1',
                  transactionValue: 1,
                  feeValue: 0,
                  message: 'string',
                  timestamp: '2022-01-01T01:01:01.100Z'
                }
              ],
              hash: '00007cf407d8534e3baa4733e0c0c22ec29f9109796d8cabbd6bf288af8869fc'
            }
          ];
          expect(isValidBlockchain({ chain, services })).toBeFalsy();
        });
      });

      describe('When hash is invalid for current block', () => {
        test('Should return false', () => {
          const chain = [
            {
              index: 1,
              nonce: 131063,
              timestamp: '2022-03-18T18:39:21.777Z',
              previousHash: '0',
              transactions: [
                {
                  uuid: '0849b5a0-8a87-44ae-8a68-651b5eb72365',
                  sender: 'sender1',
                  receiver: 'receiver1',
                  transactionValue: 1,
                  feeValue: 0,
                  message: 'string',
                  timestamp: '2022-01-01T01:01:01.000Z'
                }
              ],
              hash: '0000d7ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc'
            },
            {
              index: 2,
              nonce: 8231,
              timestamp: '2022-03-18T18:39:21.959Z',
              previousHash: '0000d7ee2e269fe3d137e302f7b0307f4da2f6735d96c7ce8378054e5c421acc',
              transactions: [
                {
                  uuid: 'f8285d5a-59c8-4569-8b1c-07e6f055adcd',
                  sender: 'sender1',
                  receiver: 'receiver1',
                  transactionValue: 1,
                  feeValue: 0,
                  message: 'string',
                  timestamp: '2022-01-01T01:01:01.100Z'
                }
              ],
              hash: '00017cf407d8534e3baa4733e0c0c22ec29f9109796d8cabbd6bf288af8869fc'
            }
          ];
          expect(isValidBlockchain({ chain, services })).toBeFalsy();
        });
      });
    });
  });
});
