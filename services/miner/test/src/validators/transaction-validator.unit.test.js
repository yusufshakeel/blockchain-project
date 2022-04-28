'use strict';

const transactionValidation = require('../../../src/validators/transaction-validation')();

describe('Testing transaction validation', () => {
  const coinBalance = 3;

  describe('When sender has enough coins to send to receiver', () => {
    test('Should return true', () => {
      const transactionValue = 1;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(
          transactionValue,
          feeValue,
          coinBalance
        )
      ).toBeTruthy();
    });
  });

  describe('When sender does not have enough coins to send to receiver', () => {
    test('Should return false', () => {
      const transactionValue = 3;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(
          transactionValue,
          feeValue,
          coinBalance
        )
      ).toBeFalsy();
    });
  });

  describe('When it is a new sender without any coins', () => {
    test('Should return false', () => {
      const transactionValue = 1;
      const feeValue = 0.0001;
      expect(
        transactionValidation.isValidSendingTransactionValue(transactionValue, feeValue, 0)
      ).toBeFalsy();
    });
  });
});
