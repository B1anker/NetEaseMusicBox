import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  player: {
		state: -1,
		songId: localStorage.getItem('songId') || '418603077',
		show: false,
		lists: {
			id: 0,
			show: false,
			index: 0
		}
	},

	user: {},

	controler: true
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
