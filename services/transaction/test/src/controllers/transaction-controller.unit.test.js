'use strict';

const TransactionController = require('../../../src/controllers/transaction-controller');
const InsufficientTransactionCoinError = require('../../../src/errors/insufficient-transaction-coin-error');
const InvalidTransactionSignatureError = require('../../../src/errors/invalid-transaction-signature-error');
const InvalidTransactionSenderAddressError = require('../../../src/errors/invalid-transaction-sender-address-error');
const fakeCreds = require('../../test-data/fake-creds.json');
const { getSignature } = require('../../helpers');

describe('Testing TransactionController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const now = new Date().toISOString();
  const services = {
    uuidService: {
      uuidV4: jest.fn(() => '6a72c7b6-b727-43eb-9672-88ba2557b512')
    },
    timeService: {
      now: jest.fn(() => now)
    }
  };

  const repositories = {
    mempoolRepository: {
      fetchAllPendingTransactions: jest.fn(async () => [{ id: 1, transaction: { a: 1 } }]),
      createTransaction: jest.fn(async () => {})
    },
    blockchainRepository: {
      fetchAllBlocks: jest.fn(() => [
        {
          transactions: [
            {
              uuid: 'ff3b88ac-7f84-42c1-80dd-ff2061dd312e',
              sender: '655335e90eafabe3a7441703cd0ed55d4d471c968e88364bfa85462724981202',
              receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
              transactionValue: 2,
              feeValue: 0,
              rewardValue: 0,
              message: 'string',
              transactionType: 'COIN_TRANSACTION',
              timestamp: {
                $date: '2022-04-28T04:22:29.571Z'
              },
              _id: {
                $oid: '626a16857f28463260110cae'
              }
            }
          ],
          timestamp: {
            $date: '2022-04-27T16:15:30.222Z'
          },
          __v: 0
        }
      ])
    }
  };

  const transactionController = TransactionController({ services, repositories });

  describe('Testing createTransaction', () => {
    describe('When there are enough coins with the sender', () => {
      test('Should be able to create transaction', async () => {
        const transaction = {
          sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
          receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
          transactionValue: 1,
          feeValue: 0.0001,
          message: 'some message'
        };
        const validation = { signature: getSignature(transaction), publicKey: fakeCreds.publicKey };
        const result = await transactionController.createTransaction({
          transaction,
          validation
        });
        expect(result).toStrictEqual({ data: { uuid: '6a72c7b6-b727-43eb-9672-88ba2557b512' } });
      });
    });

    describe('When there are not enough coins with the sender', () => {
      test('Should throw error', async () => {
        try {
          const transaction = {
            sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            transactionValue: 2,
            feeValue: 0.0001,
            message: 'some message'
          };
          const validation = {
            signature: getSignature(transaction),
            publicKey: fakeCreds.publicKey
          };
          await transactionController.createTransaction({
            transaction,
            validation
          });
          throw new Error('Should have failed!');
        } catch (e) {
          expect(e).toBeInstanceOf(InsufficientTransactionCoinError);
          expect(e.errorData).toStrictEqual({
            coinBalance: 2,
            coinShortage: 0.0001,
            coinToTransfer: 2.0001
          });
        }
      });
    });

    describe('When signature is invalid', () => {
      test('Should throw error', async () => {
        try {
          const transaction = {
            sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            transactionValue: 1,
            feeValue: 0.0001,
            message: 'some message'
          };
          const validation = {
            signature:
              'zORMPn42lAe4GoAMJggrhLe7ojsSH2M/BzixbETLiLOaHAczE5VyQuESBCIw17nqPbNuMQJczF1RZsuLhOql0kfTdxgPUWPv7mK+s1Br9dVAI639IPZR/Ehx7FonfZIAUCmeXsUXRMm+t1jUUnCNzw6POdrw4eCEe3lR7h4iRXPkRoNdRlNgxdZta764/l2oGRCTeNHuCbjYG2b7tBovQ17E6QiYfO584Je98l6dLT0Qj+gzqdKgYP38tbjBjTBx73J5pqJgQXQnTL2WqZXSC8hq5c6PQ/elU9039h1VDemUG9oEv0mIkkt4Ms9Rr74BR4h5Aw9AXMgZn9JtmgPsCQ==',
            publicKey: fakeCreds.publicKey
          };
          await transactionController.createTransaction({
            transaction,
            validation
          });
          throw new Error('should have failed!');
        } catch (e) {
          expect(e).toBeInstanceOf(InvalidTransactionSignatureError);
        }
      });
    });

    describe('When sender address is invalid', () => {
      test('Should throw error', async () => {
        try {
          const transaction = {
            sender: '1234c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
            transactionValue: 1,
            feeValue: 0.0001,
            message: 'some message'
          };
          const validation = {
            signature: getSignature(transaction),
            publicKey: fakeCreds.publicKey
          };
          await transactionController.createTransaction({
            transaction,
            validation
          });
          throw new Error('should have failed!');
        } catch (e) {
          expect(e).toBeInstanceOf(InvalidTransactionSenderAddressError);
        }
      });
    });
  });
});
