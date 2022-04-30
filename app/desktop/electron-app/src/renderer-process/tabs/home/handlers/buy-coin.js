'use strict';

const { NUMBER_OF_DECIMAL_PLACES } = require('../../../../main-process/constants');
const {
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('../../../../main-process/constants/ipc-event-constants');

module.exports = function buyCoin({ ipcRenderer, apis }) {
  let host, port, address;

  const buyCoinBtnElement = document.getElementById('buy-coins-btn');
  const inputNumberOfCoinsToBuyElement = document.getElementById('buy-number-of-coins');
  const inputBuyTotalAmountElement = document.getElementById('buy-total-amount');
  const inputBuyCoinFeeElement = document.getElementById('buy-coin-fee');
  const exchangeRatePerCCElement = document.getElementById('buy-1cc-rate');
  const refreshBuyCoinFeeBtn = document.getElementById('refresh-buy-coin-fee-btn');

  const setDetails = () => {
    host = document.getElementById('settings-network-exchange').value;
    port = document.getElementById('settings-network-exchange-port').value;
    address = document.getElementById('wallet-address').value;
  };

  // Buy Coin
  buyCoinBtnElement.addEventListener('click', async () => {
    setDetails();
    if (!address.length) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Wallet is not set!',
        messageType: 'error'
      });
      return;
    }

    const { response, error } = await apis.buyCoins({
      host,
      port,
      walletAddress: address,
      coinsToBuy: Number(inputNumberOfCoinsToBuyElement.value).toFixed(NUMBER_OF_DECIMAL_PLACES)
    });
    if (error) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: error.message,
        messageType: 'error'
      });
      return;
    }

    if (response?.data) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Transaction successful.\nYour balance will refresh soon.',
        messageType: 'info'
      });
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'No response received from Exchange. Try again later.',
        messageType: 'error'
      });
    }
  });

  // Compute total Amount
  inputNumberOfCoinsToBuyElement.addEventListener('keyup', () => {
    const coins = Number(
      Number(inputNumberOfCoinsToBuyElement.value).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    const exchangeRate = Number(exchangeRatePerCCElement.value);
    inputBuyTotalAmountElement.value = Number((coins * exchangeRate).toFixed(2));
  });

  // GET BUY COIN FEE
  const getBuyCoinFee = async () => {
    setDetails();

    const { response, error } = await apis.getFeeToBuyCoin({ host, port });
    if (error) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: error.message,
        messageType: 'error'
      });
      return;
    }

    if (response?.data) {
      inputBuyCoinFeeElement.value = Number(response.data.feeCoin).toFixed(
        NUMBER_OF_DECIMAL_PLACES
      );
    } else {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'No response received from Exchange. Try again later.',
        messageType: 'error'
      });
    }
  };

  refreshBuyCoinFeeBtn.addEventListener('click', () => {
    getBuyCoinFee();
  });
};
