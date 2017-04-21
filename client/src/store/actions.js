import * as types from './mutation-types'

export const setPlayer = ({ commit }, update) => {
  commit(types.SETPLAYER, update);
}

export const showPlayer = ({ commit }, update) => {
  commit(types.SHOWPLAYER, update);
}

export const showControler = ({ commit }, update) => {
  commit(types.SHOWCONTROLER, update);
}

export const setLists = ({ commit }, update) => {
  commit(types.SETLISTS, update);
}

export const setUser = ({ commit }, update) => {
  commit(types.SETUSER, update);
}
