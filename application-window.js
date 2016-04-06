/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const EventEmitter = require('events').EventEmitter;

class AppWindow extends EventEmitter {
  constructor(options) {
    super();

    const windowOpts = {
      show: false,
      width: 1024,
      height: 728,
      title: 'Marko',
      'web-preferences': {
        'subpixel-font-scaling': true,
        'direct-write': true,
      },
    };

    /** Init BrowserWindow with provided options **/
    this.window = new BrowserWindow(windowOpts);

    /**
     *  Attached Markdown Buffer Document to BrowserWindow
     *  If options.bufferdoc exists from openfile add it to currentWindow
     *  or initialize empty buffer vars
     * **/
    if (options.bufferdoc !== null) {
      this.window.bufferdoc = options.bufferdoc;
    } else {
      this.window.bufferdoc = {
        path: '',
        content: '',
      };
    }

    this.window.on('closed', (e) => {
      this.emit('closed', e);
    });

    this.window.on('devtools-opened', () => {
      this.window.webContents.send('window:toggle-dev-tools', true);
    });

    this.window.on('devtools-closed', () => {
      this.window.webContents.send('window:toggle-dev-tools', false);
    });
  }

  show(targetUrl) {
    this.window.loadUrl(targetUrl);
    this.window.webContents.on('did-finish-load', () => {
      this.window.show();
      this.window.focus();
    });
  }

  reload() {
    this.window.webContents.reload();
  }

  toggleFullScreen() {
    this.window.setFullScreen(!this.window.isFullScreen());
  }

  toggleDevTools() {
    this.window.toggleDevTools();
  }

  close() {
    this.window.close();
    this.window = null;
  }
}

module.exports = AppWindow;
