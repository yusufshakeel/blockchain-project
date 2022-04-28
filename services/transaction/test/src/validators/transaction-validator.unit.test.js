'use strict';

const transactionValidation = require('../../../src/validators/transaction-validation')();
const fakeCreds = require('../../test-data/fake-creds.json');

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
        // const signature = crypto
        //   .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
        //     key: Buffer.from(fakeCreds.privateKey, 'base64').toString('ascii'),
        //     padding: crypto.constants.RSA_PKCS1_PSS_PADDING
        //   })
        //   .toString('base64');
        // console.log(signature);
        const signature =
          'XrFWIVJCpGVfQCcpnx8Gb4cshuTRJXhZB5tssqWNQ1BTuG1Lu3ll4czKRVDyv5Cgiboj78HBUWPfM44S6ao8v5oTXweO+K7QbuAMIUPevx4YGbQMMja70oBgLmtSVANjpv+O6jI9y+BmJSZQsnIi49U3qk9SnpJG6E3GRbbKDhaBOe/eepdkRPhgHfXJ7RJRZhPmJCW8W8O7NRoC2X7JbzGfwxlHNc5rlPSGL0hhFKO0+yd1zvV2cH2aPcCsv6A21Z0efNQPmztDup/cIcDfVm4CV6oBuJTMCNV3RNKg4GbT2Lm8xOcm1N4MaoNgj1Y4f1sC6/jFiK9Ug4+UBZXUkg==';
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
