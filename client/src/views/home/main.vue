<template lang="html">
  <div class="home">
		<router-view class="home-content"></router-view>
		<my-footer></my-footer>
  </div>
</template>

<script>
import MyFooter from '@/components/footer/index';
export default {
	name: 'home',
	components: {
		MyFooter
	}
}
</script>

<style lang="scss" scoped>
.home-content{
	height: 4.55rem;
	width: 100%
}
</style>
