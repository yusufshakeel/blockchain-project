'use strict';

const ui = require('./ui');
const getBalance = require('./handlers/get-balance');
const buyCoin = require('./handlers/buy-coin');

module.exports = async function homeTab({ ipcRenderer, apis }) {
  const mainElement = document.getElementById('pills-home');
  mainElement.innerHTML = ui();

  getBalance({ ipcRenderer, apis });
  buyCoin({ ipcRenderer, apis });
};
