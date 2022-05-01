'use strict';

const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidV4 } = require('uuid');
const { CronJob } = require('cron');
const wallets = require('./wallets.json');

const totalNumberOfUserWallets = wallets.users.length;

const MAX_NUMBER_OF_COINS_ALLOWED_TO_BE_PURCHASED = 5;
const MAX_NUMBER_OF_COINS_ALLOWED_TO_BE_TRANSFERRED = 3;
const NUMBER_OF_DECIMAL_PLACES = 4;
const RANDOM_TRANSACTION_FEE_COINS = [0, 0.0001, 0.0002, 0.0003];

function RestClient() {
  const post = async function ({ url, requestBody, headers }) {
    try {
      const response = await axios({
        method: 'post',
        headers,
        url,
        data: requestBody
      });
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  };

  return { post };
}
const restClient = RestClient();

const getSignature = (transaction, privateKey) => {
  return crypto
    .sign('sha256', Buffer.from(JSON.stringify(transaction)), {
      key: Buffer.from(privateKey, 'base64').toString('ascii'),
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING
    })
    .toString('base64');
};

const ACTIONS = [
  {
    type: 'DO_NOTHING',
    url: '',
    method: '',
    headers: '',
    getRequestBody: () => {}
  },
  {
    type: 'DO_NOTHING',
    url: '',
    method: '',
    headers: '',
    getRequestBody: () => {}
  },
  {
    type: 'BUY',
    url: 'http://localhost:10101/blockchain/v1/coins/buy',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-trace-id': uuidV4(),
      'x-app-id': 'mock-simulation-bot'
    },
    getRequestBody: () => {
      const randomUserWallet = wallets.users[Math.floor(Math.random() * totalNumberOfUserWallets)];
      return {
        data: {
          address: randomUserWallet.address,
          coinsToBuy: Number(
            Math.ceil(Math.random() * MAX_NUMBER_OF_COINS_ALLOWED_TO_BE_PURCHASED).toFixed(
              NUMBER_OF_DECIMAL_PLACES
            )
          )
        }
      };
    }
  },
  {
    type: 'SEND',
    url: 'http://localhost:10103/blockchain/v1/transactions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-trace-id': uuidV4(),
      'x-app-id': 'mock-simulation-bot'
    },
    getRequestBody: () => {
      const randomSenderUserWallet =
        wallets.users[Math.floor(Math.random() * totalNumberOfUserWallets)];
      const randomReceiverUserWallet =
        wallets.users[Math.floor(Math.random() * totalNumberOfUserWallets)];

      const transaction = {
        sender: randomSenderUserWallet.address,
        receiver: randomReceiverUserWallet.address,
        transactionValue: Number(
          (Math.random() * MAX_NUMBER_OF_COINS_ALLOWED_TO_BE_TRANSFERRED).toFixed(
            NUMBER_OF_DECIMAL_PLACES
          )
        ),
        feeValue: Number(
          RANDOM_TRANSACTION_FEE_COINS[
            Math.floor(Math.random() * RANDOM_TRANSACTION_FEE_COINS.length)
          ].toFixed(NUMBER_OF_DECIMAL_PLACES)
        ),
        message: 'Sending coins'
      };

      const validation = {
        signature: getSignature(transaction, randomSenderUserWallet.privateKey),
        publicKey: randomSenderUserWallet.publicKey
      };

      return {
        data: {
          transaction,
          validation
        }
      };
    }
  }
];

function getAction() {
  const totalNumberOfActions = ACTIONS.length;
  return ACTIONS[Math.floor(Math.random() * totalNumberOfActions)];
}

async function start() {
  console.log('ENTERED MOCK SIMULATION - start()');

  const action = getAction();
  if (action.type !== 'DO_NOTHING') {
    const { url, headers, getRequestBody } = action;
    const response = await restClient.post({ url, requestBody: getRequestBody(), headers });
    console.log(response);
  } else {
    console.log('NOTHING TO DO...');
  }

  console.log('EXITING MOCK SIMULATION - start()');
}

new CronJob('*/2 * * * * *', () => start(), null, false, null, {}, true).start();
