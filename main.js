'use strict';

const electron = require('electron');
const {app, BrowserWindow, dialog, Menu, Tray} = electron;
const path = require('path');
const url  = require('url');

let mainWindow = null;
let settingWindow = null;
let tray = null;

function createMainWindow() {
  const screen = electron.screen;
  let screenSize = screen.getPrimaryDisplay().size;
  let imageHeight = 283;

  // console.log(screenSize);

  mainWindow = new BrowserWindow({
    x: 0,
    y: screenSize.height - imageHeight - 50,
    width: 400,
    height: imageHeight + 15,
    // useContentSize: true,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  });
  // mainWindow.setIgnoreMouseEvents(true);

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // mainWindow.webContents.openDevTools();

  tray = new Tray('./img/icon32.jpg');
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '設定',
      click() {
        // createSettingWindow();
        dialog.showMessageBox(mainWindow, {
          type: 'info',
          buttons: ['OK'],
          title: '準備中',
          message: '準備中',
          detail: '後日対応予定'
        });
      }
    },
    {
      label: '終了',
      click() {
        app.quit();
      }
    }
  ]);
  tray.setToolTip('This is my desktop widget.');
  tray.setContextMenu(contextMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createSettingWindow() {
  settingWindow = new BrowserWindow({
    useContentSize: true,
    frame: false
  });

  settingWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src/settings.html'),
    protocol: 'file:',
    slashes: true
  }));

  settingWindow.on('closed', () => {
    settingWindow = null;
  });
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
