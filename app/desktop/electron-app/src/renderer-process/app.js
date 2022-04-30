'use strict';

const { ipcRenderer, clipboard } = require('electron');

const Apis = require('../apis');

const homeTab = require('../renderer-process/tabs/home');
const walletTab = require('../renderer-process/tabs/wallet');
const settingsTab = require('../renderer-process/tabs/settings');

window.onload = async () => {
  const apis = Apis();
  await homeTab({ ipcRenderer, apis });
  walletTab({ ipcRenderer, clipboard });
  settingsTab();
};
