'use strict';

const { EXCHANGE_MINER_ROOT_WALLET } = require('../../../src/constants');
const TransactionSignatureService = require('../../../src/services/transaction-signature-service');

describe('Testing TransactionSignatureService', () => {
  const transactionSignatureService = TransactionSignatureService({
    privateKey: EXCHANGE_MINER_ROOT_WALLET.privateKey,
    publicKey: EXCHANGE_MINER_ROOT_WALLET.publicKey
  });

  test('Should be able to return signature', () => {
    const transaction = {
      sender: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
      receiver: '1ed3c3663cd6fb1bd8d12ae7cd1df7436ed250ae5241ed92a4b546fc868a2dca',
      transactionValue: 2,
      feeValue: 0.0001,
      message: 'some message'
    };
    const sign = transactionSignatureService.getSignature(transaction);
    expect(transactionSignatureService.isValidSignature(sign, transaction)).toBeTruthy();
  });
});
