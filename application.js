/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const Dialog = electron.Dialog;
// const fs = require('fs-plus');
// const _ = require('underscore-plus');
const EventEmitter = require('events').EventEmitter;

const ApplicationMenu = require('./application-menu');
const AppWindow = require('./application-window');

class Application extends EventEmitter {
  constructor() {
    super();

    this.pkgJson = require('./package.json');
    this.windows = [];

    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') app.quit();
    });

    // this.openWithOptions();
  }

  openWithOptions(options) {
    const newWindow = this.openWindow(options);
    this.windows.push(newWindow);

    newWindow.on('closed', () => {
      this.removeAppWindow(newWindow);
    });

    return newWindow;
  }

  openWindow(options) {
    const appWindow = new AppWindow(options);

    this.menu = new ApplicationMenu({
      pkg: this.pkgJson
    });

    this.menu.attachToWindow(appWindow);

    this.menu.on('application:quit', () => {
      app.quit();
    });

    this.menu.on('window:reload', () => {
      BrowserWindow.getFocusedWindow().reload();
    });

    this.menu.on('window:toggle-full-screen', () => {
      const focusedWindow = BrowserWindow.getFocusedWindow();
      let fullScreen = true;

      if (focusedWindow.isFullScreen()) {
        fullScreen = false;
      }

      focusedWindow.setFullScreen(fullScreen);
    });

    this.menu.on('window:toggle-dev-tools', () => {
      BrowserWindow.getFocusedWindow().toggleDevTools();
    });

    /** Menu events **/
    this.menu.on('application:new-file', () => {
      const newWindow = this.openWithOptions(options);
      newWindow.show(`file://${__dirname}/app/app.html`);
    });

    this.menu.on('application:open-file', () => {
      this.openFile(options);
    });

    this.menu.on('application:save-file', () => {
      this.saveFile(options);
    });

    this.menu.on('application:save-as-file', () => {
      this.saveAsFile(options);
    });

    return appWindow;
  }

  removeAppWindow(appWindow) {
    let i;
    let idx;
    let len;

    const ref = this.windows;
    const results = [];

    for (idx = i = 0, len = ref.length; i < len; idx = ++i) {
      const w = ref[idx];
      if (w === appWindow) {
        results.push(this.windows.splice(idx, 1));
      }
    }

    // console.log("Remove window from windows array " + this.windows.length);
    return results;
  }
}

module.exports = Application;
