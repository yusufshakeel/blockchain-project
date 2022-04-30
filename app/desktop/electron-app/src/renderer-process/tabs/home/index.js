'use strict';

const ui = require('./ui');
const getBalance = require('./handlers/get-balance');

module.exports = async function homeTab({ ipcRenderer, apis }) {
  const mainElement = document.getElementById('pills-home');
  mainElement.innerHTML = ui();

  getBalance({ ipcRenderer, apis });

  // BUY COIN
  const buyCoinBtnElement = document.getElementById('buy-coins-btn');
  buyCoinBtnElement.addEventListener('click', () => {});
};
