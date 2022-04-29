'use strict';
const { Menu, shell } = require('electron');

const macOSSpecificMenu = () => {
  if (process.platform === 'darwin') {
    return [{ role: 'appMenu' }];
  } else {
    return {};
  }
};

function applicationMenu() {
  const template = [
    ...macOSSpecificMenu(),
    { role: 'editMenu' },
    {
      label: 'Window',
      submenu: [{ role: 'minimize' }, { role: 'zoom' }]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Project Code',
          click: async () => {
            await shell.openExternal(require('../../package.json').homepage);
          }
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

module.exports = applicationMenu;
