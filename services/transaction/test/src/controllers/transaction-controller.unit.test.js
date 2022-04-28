'use strict';

const TransactionController = require('../../../src/controllers/transaction-controller');
const InvalidTransactionRequestError = require('../../../src/errors/invalid-transaction-request-error');
const InvalidTransactionSignatureError = require('../../../src/errors/invalid-transaction-signature-error');
const fakeCreds = require('../../test-data/fake-creds.json');

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
              receiver: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
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
        const result = await transactionController.createTransaction({
          transaction: {
            sender: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
            receiver: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
            transactionValue: 1,
            feeValue: 0.0001,
            message: 'some message'
          },
          validation: {
            signature:
              'zORMPn42lAe4GoAMJggrhLe7ojsSH2M/BzixbETLiLOaHAczE5VyQuESBCIw17nqPbNuMQJczF1RZsuLhOql0kfTdxgPUWPv7mK+s1Br9dVAI639IPZR/Ehx7FonfZIAUCmeXsUXRMm+t1jUUnCNzw6POdrw4eCEe3lR7h4iRXPkRoNdRlNgxdZta764/l2oGRCTeNHuCbjYG2b7tBovQ17E6QiYfO584Je98l6dLT0Qj+gzqdKgYP38tbjBjTBx73J5pqJgQXQnTL2WqZXSC8hq5c6PQ/elU9039h1VDemUG9oEv0mIkkt4Ms9Rr74BR4h5Aw9AXMgZn9JtmgPsCQ==',
            publicKey: fakeCreds.publicKey
          }
        });
        expect(result).toStrictEqual({ data: { uuid: '6a72c7b6-b727-43eb-9672-88ba2557b512' } });
      });
    });

    describe('When there are not enough coins with the sender', () => {
      test('Should throw error', async () => {
        try {
          await transactionController.createTransaction({
            transaction: {
              sender: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
              receiver: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
              transactionValue: 10000,
              feeValue: 0.0001,
              message: 'some message'
            },
            validation: {
              signature:
                'mkRWJoqZknUeERPPCOuDa/PoBO5mUo5FbAaw1xUTB80J3M2mHqhGzNkfL3M7TArkwbbjmjzDDRAr751+hb+1w0BDh0CBE9Ae00+gN0zzmXCt2EkeRkCO4CmE8ipeTlGIu/kdMp2v07gHqUlHGcknvu4wgM+8AMledk8qDfRW48mMVyS7ukykEasUMAMUdCavB/S4rRQBU9dR0mPfIGSKrXgIJR4e57nBK5BalsDpS/9P5EpeJlJDMp8VWzL9yEEWJD8hl3ZZDJW1w0Dob+5Yl9F+ir8N/KaP/NJpKnntM8L1A6zY6kJPN/XFCRcCq2EGvG/GVmY+MmrP86+Tw0YkPg==',
              publicKey: fakeCreds.publicKey
            }
          });
          throw new Error('Should have failed!');
        } catch (e) {
          expect(e).toBeInstanceOf(InvalidTransactionRequestError);
          expect(e.errorData).toStrictEqual({
            coinBalance: 2,
            coinShortage: 9998.0001,
            coinToTransfer: 10000.0001
          });
        }
      });
    });

    describe('When signature is invalid', () => {
      test('Should throw error', async () => {
        try {
          await transactionController.createTransaction({
            transaction: {
              sender: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
              receiver: '30e75db0da4577b711bf0191c0e264ac9a3237d75f45042ad12421122e036d18',
              transactionValue: 1,
              feeValue: 0,
              message: 'some message'
            },
            validation: {
              signature:
                'zORMPn42lAe4GoAMJggrhLe7ojsSH2M/BzixbETLiLOaHAczE5VyQuESBCIw17nqPbNuMQJczF1RZsuLhOql0kfTdxgPUWPv7mK+s1Br9dVAI639IPZR/Ehx7FonfZIAUCmeXsUXRMm+t1jUUnCNzw6POdrw4eCEe3lR7h4iRXPkRoNdRlNgxdZta764/l2oGRCTeNHuCbjYG2b7tBovQ17E6QiYfO584Je98l6dLT0Qj+gzqdKgYP38tbjBjTBx73J5pqJgQXQnTL2WqZXSC8hq5c6PQ/elU9039h1VDemUG9oEv0mIkkt4Ms9Rr74BR4h5Aw9AXMgZn9JtmgPsCQ==',
              publicKey: fakeCreds.publicKey
            }
          });
          throw new Error('should have failed!');
        } catch (e) {
          expect(e).toBeInstanceOf(InvalidTransactionSignatureError);
        }
      });
    });
  });
});
