<template lang="html">
  <div class="home">
		<keep-alive>
			<router-view class="home-content"></router-view>
		</keep-alive>
  </div>
</template>

<script>
export default {
	name: 'home',
	components: {
	}
}
</script>

<style lang="scss" scoped>
.home-content{
	overflow: scroll;
	height: 5.003rem;
	width: 100%
}
</style>
