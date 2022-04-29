'use strict';

const ui = require('./ui');

module.exports = function settingsTab() {
  const mainElement = document.getElementById('pills-settings');
  mainElement.innerHTML = ui();
};
