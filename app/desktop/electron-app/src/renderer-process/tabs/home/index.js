'use strict';

const ui = require('./ui');
const axios = require('axios');
const {
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('../../../main-process/constants/ipc-event-constants');
const { NUMBER_OF_DECIMAL_PLACES } = require('../../../main-process/constants');

module.exports = async function homeTab({ ipcRenderer }) {
  const mainElement = document.getElementById('pills-home');
  mainElement.innerHTML = ui();

  let host, port, address;
  const coinBalanceElement = document.getElementById('coin-balance');
  const refreshGetCoinBalanceBtnElement = document.getElementById('refresh-get-coin-balance-btn');

  const setDetails = () => {
    host = document.getElementById('settings-network-exchange').value;
    port = document.getElementById('settings-network-exchange-port').value;
    address = document.getElementById('wallet-address').value;
  };

  // GET COIN BALANCE
  const getCoinBalance = async () => {
    setDetails();
    if (!address.length) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Wallet is not set!',
        messageType: 'info'
      });
      return;
    }
    const response = await axios({
      method: 'get',
      url: `http://${host}:${port}/blockchain/v1/address/${address}/coin-balance`,
      headers: { 'content-type': 'application/json', 'x-app-id': 'electron-app-macOS' }
    });
    if (response?.data) {
      coinBalanceElement.innerHTML =
        Number(response.data.data.coinBalance).toFixed(NUMBER_OF_DECIMAL_PLACES) + ' CC';
    }
  };

  refreshGetCoinBalanceBtnElement.addEventListener('click', () => {
    getCoinBalance();
  });

  // BUY COIN
  const buyCoinBtnElement = document.getElementById('buy-coins-btn');
  buyCoinBtnElement.addEventListener('click', () => {});
};
