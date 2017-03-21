import * as types from './mutation-types'

export default {
  [types.SETSIDERBAR] (state, update) {
    state.siderBar = update;
  }
}
