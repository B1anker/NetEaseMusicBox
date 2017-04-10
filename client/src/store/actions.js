import * as types from './mutation-types'

export const setPlayer = ({ commit }, update) => {
  commit(types.SETPLAYER, update);
}

export const showPlayer = ({ commit }, update) => {
  commit(types.SHOWPLAYER, update);
}
