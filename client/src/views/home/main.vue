<template lang="html">
  <div class="home">
		<keep-alive>
			<router-view class="home-content"></router-view>
		</keep-alive>
		<controler></controler>
  </div>
</template>

<script>
import Controler from '@/views/player/controler';
export default {
	name: 'home',

	components: {
		Controler
	},

	mounted() {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user.code !== 200) {
			this.$router.push('/');
			return ;
		}
	}
}
</script>

<style lang="scss" scoped>
.home{
	height: 100%;
	
	.home-content {
	  height: 100%;
	  width: 100%;
	}
}

</style>
