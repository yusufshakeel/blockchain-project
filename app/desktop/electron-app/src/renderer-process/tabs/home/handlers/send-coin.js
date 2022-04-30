'use strict';

const { NUMBER_OF_DECIMAL_PLACES } = require('../../../../main-process/constants');
const {
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('../../../../main-process/constants/ipc-event-constants');
const { getSignature } = require('../../../../helpers/signature');

module.exports = function sendCoin({ ipcRenderer, apis }) {
  let host, port, address, publicKey, privateKey;

  const inputReceiverWalletAddressElement = document.getElementById('send-coin-receiver-address');
  const inputTotalNumberOfCoinsToSendElement = document.getElementById('send-number-of-coins');
  const inputTotalFeeCoinElement = document.getElementById('send-number-of-fee-coins');
  const sendBtnElement = document.getElementById('send-coins-btn');

  const setDetails = () => {
    host = document.getElementById('settings-network-transaction').value;
    port = document.getElementById('settings-network-transaction-port').value;
    address = document.getElementById('wallet-address').value;
    publicKey = document.getElementById('wallet-public-key-hidden').value;
    privateKey = document.getElementById('wallet-private-key-hidden').value;
  };

  sendBtnElement.addEventListener('click', async () => {
    setDetails();
    if (!address.length) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Wallet is not set!',
        messageType: 'error'
      });
      return;
    }

    const receiver = inputReceiverWalletAddressElement.value;
    if (receiver.length !== 64) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Wrong receiver address.',
        messageType: 'error'
      });
      return;
    }

    const transactionValue = Number(
      Number(inputTotalNumberOfCoinsToSendElement.value).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    if (transactionValue < Math.pow(10, -NUMBER_OF_DECIMAL_PLACES)) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: `Coin to send should be at least ${Math.pow(10, -NUMBER_OF_DECIMAL_PLACES)} CC`,
        messageType: 'error'
      });
      return;
    }

    const feeValue = Number(
      Number(inputTotalFeeCoinElement.value).toFixed(NUMBER_OF_DECIMAL_PLACES)
    );
    if (feeValue < 0) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: `Fee coin should be greater than 0.`,
        messageType: 'error'
      });
      return;
    }

    const transaction = {
      sender: address,
      receiver,
      transactionValue,
      feeValue
    };
    const validation = {
      signature: getSignature(transaction, privateKey),
      publicKey
    };
    const requestBody = { data: { transaction, validation } };

    const { response, error } = await apis.sendCoins({
      host,
      port,
      requestBody
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
};
