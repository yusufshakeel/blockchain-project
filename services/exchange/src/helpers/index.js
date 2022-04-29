'use strict';

const {
  TRANSACTION_TYPE_REWARD_COIN,
  TRANSACTION_TYPE_FEE_COIN,
  TRANSACTION_TYPE_COIN,
  NUMBER_OF_DECIMAL_PLACES
} = require('../constants');

function getAddressBalance({ address, blockchain }) {
  const { allReceivedTransactionsBelongingToTheAddress, allSentTransactionsBelongingToTheAddress } =
    blockchain.reduce(
      (result, block) => {
        const { send, received } = block.transactions.reduce(
          (acc, txn) => {
            if (txn.sender === address) {
              return { ...acc, send: [...acc.send, txn] };
            } else if (txn.receiver === address) {
              return { ...acc, received: [...acc.received, txn] };
            }
            return acc;
          },
          {
            send: [],
            received: []
          }
        );
        return {
          ...result,
          allSentTransactionsBelongingToTheAddress: [
            ...result.allSentTransactionsBelongingToTheAddress,
            ...send
          ],
          allReceivedTransactionsBelongingToTheAddress: [
            ...result.allReceivedTransactionsBelongingToTheAddress,
            ...received
          ]
        };
      },
      {
        allReceivedTransactionsBelongingToTheAddress: [],
        allSentTransactionsBelongingToTheAddress: []
      }
    );

  const totalCoinsSent = allSentTransactionsBelongingToTheAddress
    .filter(txn => [TRANSACTION_TYPE_COIN, TRANSACTION_TYPE_FEE_COIN].includes(txn.transactionType))
    .reduce((result, txn) => {
      return txn.transactionType === TRANSACTION_TYPE_COIN
        ? Number((result + txn.transactionValue).toFixed(NUMBER_OF_DECIMAL_PLACES))
        : Number((result + txn.feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
    }, 0);

  const totalCoinsReceived = allReceivedTransactionsBelongingToTheAddress
    .filter(txn =>
      [TRANSACTION_TYPE_COIN, TRANSACTION_TYPE_FEE_COIN, TRANSACTION_TYPE_REWARD_COIN].includes(
        txn.transactionType
      )
    )
    .reduce((result, txn) => {
      if (txn.transactionType === TRANSACTION_TYPE_COIN) {
        return Number((result + txn.transactionValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
      } else if (txn.transactionType === TRANSACTION_TYPE_FEE_COIN) {
        return Number((result + txn.feeValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
      }
      return Number((result + txn.rewardValue).toFixed(NUMBER_OF_DECIMAL_PLACES));
    }, 0);

  const coinBalance = Number(
    (totalCoinsReceived - totalCoinsSent).toFixed(NUMBER_OF_DECIMAL_PLACES)
  );

  return {
    totalCoinsSent,
    totalCoinsReceived,
    coinBalance
  };
}

module.exports = {
  getAddressBalance
};
