'use strict';

const ui = require('./ui');

module.exports = function homeTab() {
  const mainElement = document.getElementById('pills-home');
  mainElement.innerHTML = ui();
};
