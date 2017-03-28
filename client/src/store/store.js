import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  player: {
		state: -1,
		url: '',
		singer: ''
	}
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});