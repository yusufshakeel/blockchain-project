'use strict';

const axios = require('axios');
const uuid = require('uuid').v4;

function RestClient() {
  const get = async ({ url }) => {
    try {
      const response = await axios({
        method: 'get',
        url,
        headers: {
          'x-trace-id': uuid(),
          'x-app-id': 'electron-app-macOS'
        }
      });
      return { response: response.data };
    } catch (e) {
      return { error: e };
    }
  };

  const post = async ({ requestBody, url }) => {
    try {
      const response = await axios({
        method: 'post',
        url,
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
          'x-trace-id': uuid(),
          'x-app-id': 'electron-app-macOS'
        }
      });
      return { response: response.data };
    } catch (e) {
      return { hasError: true, message: e.message };
    }
  };

  return { get, post };
}

module.exports = function Apis() {
  const restClient = RestClient();

  const getBalance = async ({ host, port, walletAddress }) => {
    return restClient.get({
      url: `http://${host}:${port}/blockchain/v1/address/${walletAddress}/coin-balance`
    });
  };

  const getFeeToBuyCoin = async ({ host, port }) => {
    return restClient.get({
      url: `http://${host}:${port}/blockchain/v1/coins/buy-coin-fee`
    });
  };

  const buyCoins = async ({ host, port, walletAddress, coinsToBuy }) => {
    return restClient.post({
      url: `http://${host}:${port}/blockchain/v1/coins/buy`,
      requestBody: {
        data: {
          address: walletAddress,
          coinsToBuy
        }
      }
    });
  };

  const sendCoins = async ({ host, port, requestBody }) => {
    return restClient.post({
      url: `http://${host}:${port}/blockchain/v1/transactions`,
      requestBody
    });
  };

  return { getBalance, getFeeToBuyCoin, buyCoins, sendCoins };
};
