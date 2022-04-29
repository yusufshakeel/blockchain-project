'use strict';

const fs = require('fs');
const ui = require('./ui');
const Wallet = require('../../../helpers/wallet');
const {
  IPC_EVENT_OPEN_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON,
  IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH,
  IPC_EVENT_OPEN_MESSAGE_BOX
} = require('../../../main-process/constants/ipc-event-constants');

module.exports = function walletTab({ ipcRenderer, clipboard }) {
  const mainElement = document.getElementById('pills-wallet');
  mainElement.innerHTML = ui();

  const wallet = new Wallet();

  let walletCredentials = {};

  const createWalletBtnElement = document.getElementById('btn-create-wallet');
  createWalletBtnElement.addEventListener('click', () => {
    walletCredentials = wallet.createKeyPair();
    saveFileListener();
  });

  const importWalletBtnElement = document.getElementById('btn-import-wallet');
  importWalletBtnElement.addEventListener('click', () => {
    openFileListener();
  });

  const copyWalletAddress = document.getElementById('btn-copy-wallet-address');
  copyWalletAddress.addEventListener('click', () => {
    const address = document.getElementById('wallet-address').value;
    if (address.length) {
      clipboard.writeText(address);
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'Address copied!',
        messageType: 'info'
      });
    }
  });

  // OPEN FILE
  const openFileListener = () => ipcRenderer.send(IPC_EVENT_OPEN_FILE_DIALOG_JSON);
  ipcRenderer.on(IPC_EVENT_OPEN_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
    try {
      const walletCredentialsJsonString = fs.readFileSync(args.filePath).toString();
      const credentialsJson = JSON.parse(walletCredentialsJsonString);

      document.getElementById('wallet-address').value = credentialsJson.address;
      document.getElementById('address-on-home-tab').innerHTML = credentialsJson.address;
      document.getElementById('wallet-public-key').value = '***** REDACTED *****';
      document.getElementById('wallet-public-key-hidden').value = credentialsJson.publicKey;
      document.getElementById('wallet-private-key').value = '***** REDACTED *****';
      document.getElementById('wallet-private-key-hidden').value = credentialsJson.privateKey;
    } catch (e) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, { message: e.message, messageType: 'error' });
    }
  });

  // SAVE FILE
  const writeToFile = filePath => {
    try {
      fs.writeFileSync(filePath, JSON.stringify(walletCredentials), 'utf8');
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, {
        message: 'File saved!\nKeep it at a safe place.',
        messageType: 'info'
      });
    } catch (e) {
      ipcRenderer.send(IPC_EVENT_OPEN_MESSAGE_BOX, { message: e.message, messageType: 'error' });
    }
  };
  const saveFileListener = () => ipcRenderer.send(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON);
  ipcRenderer.on(IPC_EVENT_OPEN_SAVE_FILE_DIALOG_JSON_FILE_PATH, async (e, args) => {
    writeToFile(args.filePath);
  });
};
