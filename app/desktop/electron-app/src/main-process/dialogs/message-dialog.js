'use strict';

const { dialog } = require('electron');

module.exports = function messageDialog(browserWindow, electronDialog = dialog) {
  const showOpenDialog = async option => {
    const result = await electronDialog.showOpenDialog(browserWindow, option);
    return !result.canceled && result.filePaths.length ? { filePath: result.filePaths[0] } : {};
  };

  const showSaveDialog = async option => {
    const result = await electronDialog.showSaveDialog(browserWindow, option);
    return !result.canceled && result.filePath ? { filePath: result.filePath } : {};
  };

  const showErrorDialog = async error => {
    await electronDialog.showMessageBox(browserWindow, {
      type: 'error',
      message: error.message ? error.message : 'Some error occurred!'
    });
  };

  const showOpenDialogToSelectJsonFile = async () => {
    return showOpenDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openFile', 'openDirectory']
    });
  };

  const showSaveDialogToSaveJsonFile = async () => {
    return showSaveDialog({
      filters: [{ name: 'JSON', extensions: ['json'] }],
      properties: ['openDirectory']
    });
  };

  const showMessageBox = async option => {
    return electronDialog.showMessageBox(browserWindow, option);
  };

  return {
    showOpenDialog,
    showSaveDialog,
    showErrorDialog,
    showOpenDialogToSelectJsonFile,
    showSaveDialogToSaveJsonFile,
    showMessageBox
  };
};
