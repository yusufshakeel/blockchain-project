'use strict';

const { app, BrowserWindow, shell } = require('electron');
const windowStateKeeper = require('electron-window-state');
const fileManagement = require('./file-management');
const applicationMenu = require('./application-menu');

// global variable to prevent it from getting garbage collected.
let mainWindow;
const isDevEnv = process.env.COINCOIN_ENV === 'dev';

function createWindow() {
  const windowState = windowStateKeeper({
    defaultWidth: 400,
    defaultHeight: 600
  });

  const maxDimensions = !isDevEnv ? { maxWidth: 400, maxHeight: 600 } : {};

  mainWindow = new BrowserWindow({
    maximizable: !!isDevEnv,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 400,
    minHeight: 600,
    ...maxDimensions,
    backgroundColor: '#fff',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true
    }
  });

  // for dev work
  isDevEnv && mainWindow.webContents.openDevTools();

  windowState.manage(mainWindow);

  mainWindow.loadFile(__dirname + '/../static/app.html');

  fileManagement(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('will-navigate', function (event, url) {
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.whenReady().then(() => {
  applicationMenu();
  createWindow();
});

// Quit the app when all windows are closed. Not for macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When app icon is clicked and app is running then recreate BrowserWindow (macOS)
app.on('activate', async () => {
  if (!mainWindow) {
    createWindow();
  }
});
