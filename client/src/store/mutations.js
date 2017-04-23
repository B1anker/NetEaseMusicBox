import * as types from './mutation-types'

export default {
  [types.SETPLAYER] (state, update) {
		update.songId  && localStorage.setItem('songId', update.songId);
		for(let key of Object.keys(update)){
			state.player[key] = update[key];
		}
  },

	[types.SHOWPLAYER] (state, update) {
		state.player.show = update;
  },

	[types.SHOWCONTROLER] (state, update) {
		state.controler = update;
  },

	[types.SETLISTS] (state, update) {
		for(let key of Object.keys(update)){
			state.player.lists[key] = update[key];
		}
  },

	[types.SETUSER] (state, update) {
		state.user = update;
  }
}
