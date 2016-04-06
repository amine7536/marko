/* eslint strict: 0 */
'use strict';

const electron = require('electron');
const Menu = electron.Menu;
const path = require('path');
const season = require('season');
const _ = require('underscore-plus');
const EventEmitter = require('events').EventEmitter;

class ApplicationMenu extends EventEmitter {

  constructor(options) {
    super();
    const menuJson = season.resolve(path.join(__dirname, 'menus', `${process.platform}.cson`));
    const template = season.readFileSync(menuJson);
    this.template = this.translateTemplate(template.menu, options.pkg);
  }

  attachToWindow() {
    this.menu = Menu.buildFromTemplate(_.deepClone(this.template));
    Menu.setApplicationMenu(this.menu);
  }

  wireUpMenu(item, command) {
    const menu = item;
    menu.click = () => {
      this.emit(command);
    };
  }

  translateTemplate(template, pkgJson) {
    let i;
    let len;

    for (i = 0, len = template.length; i < len; i++) {
      const item = template[i];

      if (item.metadata === null) {
        item.metadata = {};
      }

      if (item.label) {
        item.label = _.template(item.label)(pkgJson);
      }

      if (item.command) {
        this.wireUpMenu(item, item.command);
      }

      if (item.submenu) {
        this.translateTemplate(item.submenu, pkgJson);
      }
    }
    return template;
  }
}

module.exports = ApplicationMenu;
