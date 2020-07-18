'use strict'

import { app, Menu, Tray } from 'electron'
import functions from './functions.js'
import { rootPath } from 'electron-root-path'
import * as path from 'path'

const isDevelopment = process.env.NODE_ENV !== 'production'

let tray = undefined

/**
 * Creates the tray icon with its menu
 */
function createTray() {
  const icon = path.join(rootPath, 'assets', 'tray.png');
  tray = new Tray(icon)

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Update Data Now', type: 'normal', click: () => {
        functions.updateDataNow()
      }
    },
    { label: 'Set Wow Path', type: 'normal', click: () => {
        functions.setWowPath()
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ])

  tray.setToolTip(app.name)
  tray.setContextMenu(contextMenu)
}

// create main BrowserWindow when electron is ready
app.on('ready', () => {
    //Creates the tray icon with its menu
  createTray();

  if (functions.wowPathIsCorrect()) {
    //Download file to WoW Path
    functions.eventuallyDownload()
  }
})
