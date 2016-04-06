/* eslint strict: 0 */
'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const electron = require('electron');
const app = electron.app;
const crashReporter = electron.crashReporter;
const Application = require('./application');

crashReporter.start();

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
}

app.on('ready', () => {
  global.application = new Application();
  const mainWindow = global.application.openWithOptions({});
  mainWindow.show(`file://${__dirname}/app/app.html`);
});
