import { app } from 'electron'
const Store = require('electron-store');
const schema = {
	wowPath: {
		type: 'string',
		default: app.getPath('downloads')
	},
  downloadEvery: {
    type: 'number',
    default: 60 * 30 * 1000,
    minimum: 60 * 30 * 1000,
  }
};
const store = new Store({schema});
export default store
