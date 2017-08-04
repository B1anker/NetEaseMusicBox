import Ls from '@/modules/utils/localStorage'

const ls = new Ls()

const playList = {
  methods: {
    setList (tracks, index) {
      ls.set('playLists', {
        tracks,
        index
      })
      this.$store.dispatch('setLists', {
        tracks,
        index
      })
    }
  }
}

export default playList
