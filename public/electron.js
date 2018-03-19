const {app, BrowserWindow} = require('electron');
const isDev = require('electron-is-dev');

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  if (isDev)
    mainWindow.loadURL('http://localhost:3000');
  else
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '..', 'build', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow);

// Quit when all windows are closed (except on Mac)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});