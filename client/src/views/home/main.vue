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

	mounted() {
		try {
			const user = JSON.parse(localStorage.getItem('user'));
			if (user.code !== 200) {
				this.$router.push('/');
				return ;
			}
		} catch (e) {
			this.$router.push('/');
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
