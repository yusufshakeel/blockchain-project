'use strict';

const blockchain = require('../../test-data/blockchains.json');
const transactionValidation = require('../../../src/validators/transaction-validation')();

describe('Testing transaction validation', () => {
  describe('When sender has enough coins to send to receiver', () => {
    test('Should return true', () => {
      const senderAddress = 'a0ac878f4c67b38ed22b8d075172799936cc1546b191f380aed6ca544f761d39';
      const transactionValue = 1;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(
          senderAddress,
          transactionValue,
          feeValue,
          blockchain
        )
      ).toBeTruthy();
    });
  });

  describe('When sender does not have enough coins to send to receiver', () => {
    test('Should return false', () => {
      const senderAddress = 'a0ac878f4c67b38ed22b8d075172799936cc1546b191f380aed6ca544f761d39';
      const transactionValue = 3;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(
          senderAddress,
          transactionValue,
          feeValue,
          blockchain
        )
      ).toBeFalsy();
    });
  });

  describe('When it is a new sender without any coins', () => {
    test('Should return false', () => {
      const senderAddress = 'SOME_UNKNOWN_ADDRESS_THAT_HAS_NEVER_TRANSACTED';
      const transactionValue = 1;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(
          senderAddress,
          transactionValue,
          feeValue,
          blockchain
        )
      ).toBeFalsy();
    });
  });
});
