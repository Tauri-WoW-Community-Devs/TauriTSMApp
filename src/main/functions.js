import {
  dialog,
  BrowserWindow
} from 'electron'
import store from './store.js'
import Timer from './timer.js';

const {
  download
} = require("electron-dl");
const fs = require('fs')
const timer = new Timer(function () {
  console.log('setInterval executed')
  updateDataNow()
}, store.get('downloadEvery'))
const url = 'https://tauritsm.tk/storage/AppData.lua';
let auctionDBPath = store.get('wowPath') + '/Interface/AddOns/TradeSkillMaster_AuctionDB'


/**
 * Functions
 */
function setAuctionDBPath(basePath) {
  auctionDBPath = basePath + '/Interface/AddOns/TradeSkillMaster_AuctionDB'
}

function wowPathIsCorrect() {
  return fs.existsSync(auctionDBPath)
};

function eventuallyDownload() {
  timer.reset(store.get('downloadEvery'))
}

function stopEventuallyDl() {
  timer.stop()
}

function updateDataNow() {
  const options = {
    filename: 'AppData.lua',
    directory: auctionDBPath
  }

  const win = new BrowserWindow({
    width: 10,
    height: 10,
    show: false
  });

  download(win, url, options).then((download) => {
    console.log('download complete', download.getSavePath())
  }).catch((err) => {
    console.log(err)
  });
}

function showMessageWowPathIsIncorrect() {
  dialog.showMessageBox({
    type: 'error',
    message: 'You do not have the TradeSkillMaster_AuctionDB addon installed or you have selected the wrong directory'
  })
}

/**
 * Functions to export
 */
const functionsToExport = {
  setWowPath() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }).then(openDialog => {
      if (openDialog.canceled) {
        return
      }

      setAuctionDBPath(openDialog.filePaths[0])

      if (!wowPathIsCorrect()) {
        showMessageWowPathIsIncorrect()
        return;
      }

      store.set('wowPath', openDialog.filePaths[0])
      setAuctionDBPath(store.get('wowPath'))
      eventuallyDownload()
      updateDataNow()
    }).catch(err => {
      console.log(err)
    })
  },

  wowPathIsCorrect() {
    return wowPathIsCorrect()
  },

  eventuallyDownload() {
    updateDataNow()
    return eventuallyDownload()
  },

  updateDataNow() {
    if (!wowPathIsCorrect()) {
      showMessageWowPathIsIncorrect()
      return;
    }

    return updateDataNow();
  }
}

export default functionsToExport
