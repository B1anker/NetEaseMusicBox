<template>
  <div id="app" ref="app">
		<div class="app-scroll">
			<controler></controler>
			<router-view class="view"></router-view>
			<my-footer></my-footer>
			<player></player>
		</div>
  </div>
</template>

<script>
import Controler from '@/views/player/controler'
import MyFooter from '@/components/footer/index'
import Player from '@/views/player/main'
import store from '@/store/store'
import BScroll from 'better-scroll'
export default {
  name: 'app',

  store,

  data () {
    return {
      scrollInstance: null
    }
  },

  components: {
    Player,
    MyFooter,
    Controler
  },

  mounted () {
    this.$nextTick(() => {
      this.scrollInstance = new BScroll(this.$refs.app, {
        startX: 0,
        startY: 0,
        scrollY: true,
        click: true,
        preventDefault: true,
        probeType: 2
      })
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	margin: 0 auto;
	height: 100%;
	overflow: scroll;
	position: relative;

	.app-scroll{
		height: 100%;
	}
}
</style>
