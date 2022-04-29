'use strict';

const { ipcRenderer } = require('electron');

const homeTab = require('../renderer-process/tabs/home');
const walletTab = require('../renderer-process/tabs/wallet');
const settingsTab = require('../renderer-process/tabs/settings');

window.onload = () => {
  homeTab();
  walletTab({ ipcRenderer });
  settingsTab();
};
