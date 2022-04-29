'use strict';

const { ipcRenderer, clipboard } = require('electron');

const homeTab = require('../renderer-process/tabs/home');
const walletTab = require('../renderer-process/tabs/wallet');
const settingsTab = require('../renderer-process/tabs/settings');

window.onload = async () => {
  await homeTab({ ipcRenderer });
  walletTab({ ipcRenderer, clipboard });
  settingsTab();
};
