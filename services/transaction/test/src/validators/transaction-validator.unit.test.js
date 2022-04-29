'use strict';

const transactionValidation = require('../../../src/validators/transaction-validation')();
const fakeCreds = require('../../test-data/fake-creds.json');
const { getSignature } = require('../../helpers');

describe('Testing transaction validation', () => {
  describe('Testing sufficient balance', () => {
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

  describe('Testing transaction signature', () => {
    const base64EncodePublicKey = fakeCreds.publicKey;
    const transaction = {
      sender: fakeCreds.address,
      receiver: fakeCreds.address,
      transactionValue: 1,
      feeValue: 0,
      message: 'Transaction to self'
    };

    describe('When signature is valid', () => {
      test('Should return true', () => {
        const signature = getSignature(transaction);
        expect(
          transactionValidation.isTransactionSignatureValid(
            signature,
            base64EncodePublicKey,
            transaction
          )
        ).toBeTruthy();
      });
    });

    describe('When signature is invalid', () => {
      test('Should return false', () => {
        const signature = 'invalid signature';
        expect(
          transactionValidation.isTransactionSignatureValid(
            signature,
            base64EncodePublicKey,
            transaction
          )
        ).toBeFalsy();
      });
    });
  });
});
