'use strict';

const {
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('../../../../main-process/constants/ipc-event-constants');
const { NUMBER_OF_DECIMAL_PLACES } = require('../../../../main-process/constants');

module.exports = function getBalance({ ipcRenderer, apis }) {
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
      return;
    }

    const { response, error } = await apis.getBalance({ host, port, walletAddress: address });
    if (error) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: error.message,
        messageType: 'error'
      });
      return;
    }

    if (response?.data) {
      coinBalanceElement.innerHTML =
        Number(response.data.coinBalance).toFixed(NUMBER_OF_DECIMAL_PLACES) + ' CC';
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'No response received from Exchange. Try again later.',
        messageType: 'error'
      });
    }
  };

  setInterval(() => getCoinBalance(), 60000);

  refreshGetCoinBalanceBtnElement.addEventListener('click', () => {
    getCoinBalance();
  });
};
