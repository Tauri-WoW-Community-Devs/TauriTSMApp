import { app } from 'electron'
const Store = require('electron-store');

const waitingMinutes = 30;

const schema = {
	wowPath: {
		type: 'string',
		default: app.getPath('downloads')
	},
  downloadEvery: {
    type: 'number',
    default: 60 * waitingMinutes * 1000,
    minimum: 60 * waitingMinutes * 1000,
  }
};
const store = new Store({schema});
export default store
