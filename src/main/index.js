'use strict'

import { app, Menu, Tray } from 'electron'
import functions from './functions.js'

const isDevelopment = process.env.NODE_ENV !== 'production'

let tray = null

/**
 * Creates the tray icon with its menu
 */
function createTray() {
  tray = new Tray('icon.png')

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

app.whenReady().then(() => {
  //Creates the tray icon with its menu
  createTray();

  if (functions.wowPathIsCorrect()) {
    //Download file to WoW Path
    functions.eventuallyDownload()
  }
})
