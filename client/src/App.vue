<template>
  <div id="app">
		<router-view></router-view>
		<player></player>
  </div>
</template>

<script>
import Player from '@/views/player/main';
import store from '@/store/store';
export default {
  name: 'app',
	store,
	components: {
		Player
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
	width: 3.2rem;
	height: 5.68rem;
	position: relative;
}
</style>
