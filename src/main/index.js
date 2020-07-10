'use strict'

import { app, Menu, Tray } from 'electron'
import * as path from 'path'
import util from './functions.js'

const isDevelopment = process.env.NODE_ENV !== 'production'

let tray = null

app.whenReady().then(() => {
  tray = new Tray('icon.png')
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Update Data Now', type: 'normal', click: () => {
        util.updateData()
      }
    },
    { label: 'Set Wow Path', type: 'normal', click: () => {
        util.setWowPath()
      }
    },
    { type: 'separator' },
    { role: 'quit' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {

})
