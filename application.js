/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Dialog = electron.dialog;
const fs = require('fs-plus');
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
      newWindow.title = '';
    });

    this.menu.on('application:open-file', () => {
      this.openFile(options);
    });

    this.menu.on('application:save-file', () => {
      this.saveFile();
    });

    this.menu.on('application:save-as-file', () => {
      this.saveAsFile();
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

  openFile(options) {
    const dialogOptions = {
      title: 'OpenFileDialog',
      properties: ['openFile', 'openDirectory', 'multiSelections']
    };

    const openOptions = options;

    Dialog.showOpenDialog(dialogOptions, (files) => {
      fs.readFile(files[0], 'utf8', (err, data) => {
        if (err) {
          throw err;
        } else {
          openOptions.MarkdownBuffer = {
            path: files[0],
            markdown: data
          };

          // Open new window with options.mddoc
          const newWindow = this.openWithOptions(openOptions);
          newWindow.show(`file://${__dirname}/app/app.html`);

          // Clear buffer doc so new windows don't load with previously opened doc
          openOptions.bufferdoc = null;
        }
      });
    });
  }

  saveFile() {
    const focusedWindow = BrowserWindow.getFocusedWindow();

    if (!focusedWindow.MarkdownBuffer.path) {
      this.saveAsFile();
    } else {
      this.save(focusedWindow.MarkdownBuffer.path, focusedWindow.MarkdownBuffer.markdown);
    }
  }

  saveAsFile() {
    const focusedWindow = BrowserWindow.getFocusedWindow();
    const dialogOptions = {
      title: 'SaveFileDialog'
    };

    Dialog.showSaveDialog(dialogOptions, (file) => {
      if (file) {
        this.save(file, focusedWindow.MarkdownBuffer.markdown);
        focusedWindow.MarkdownBuffer.path = file;
      }
    });
  }

  save(file, content) {
    fs.writeFile(file, content, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = Application;
