import * as types from './mutation-types'

export default {
  [types.SETPLAYER] (state, update) {
		localStorage.setItem('songId', update.songId);
		state.player.show = true;
    state.player.songId = update.songId;
  },

	[types.SHOWPLAYER] (state, update) {
		state.player.show = update;
  },

	[types.SETUSER] (state, update) {
		state.user = update;
  }
}
