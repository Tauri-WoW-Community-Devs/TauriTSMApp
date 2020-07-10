import {
  dialog,
  BrowserWindow
} from 'electron'
import store from './store.js'

const fs = require('fs')
const {download} = require("electron-dl");
const url = 'https://blooming-everglades-21982.herokuapp.com/downloadFile';

const funcs = {
  setWowPath() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(result => {
      if (!result.canceled) {
        store.set('wowPath', result.filePaths[0])
      }
    }).catch(err => {
      console.log(err)
    })
  },

  updateData() {
    const auctionDBPath = store.get('wowPath') + '/Interface/AddOns/TradeSkillMaster_AuctionDB';

    if (!fs.existsSync(auctionDBPath)) {
      dialog.showMessageBox({
        type: 'error',
        message: 'You do not have the TradeSkillMaster_AuctionDB addon installed or you have selected the wrong directory'
      })
      return;
    }

    const options = {
      filename: 'AppData.lua',
      directory: auctionDBPath
    }

    const win = new BrowserWindow({width: 10, height: 10, show: false});

    download(win, url, options).then((download) => {
        console.log('download complete', download.getSavePath())
      }).catch((err) => {
        console.log(err)
      });
  }
}

export default funcs
