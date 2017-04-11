<template lang="html">
  <div class="footer">
		<ul>
			<li @click="jump('discover')"><i class="icon icon-logo"></i><span>发现音乐</span></li>
			<li @click="jump('my-music')"><i class="icon icon-note-2"></i><span>我的音乐</span></li>
			<li @click="jump('friends')"><i class="icon icon-friends"></i><span>朋友</span></li>
			<li @click="jump('account')"><i class="icon icon-account"></i><span>账号</span></li>
		</ul>
  </div>
</template>

<script>
export default {
	name: 'footer',
	methods: {
		jump(to) {
			this.$router.push(to);
		}
	}
}
</script>

<style lang="scss" scoped>
.footer{
	height: 0.5rem;
	width: 100%;
	background-color: rgb(57, 57, 57);

	ul{
		display: flex;
		height: 100%;
		justify-content: space-around;
		align-items: center;


		li{

			.icon{
				color: white;
				font-size: 0.3rem;
			}

			span{
				display: block;
				font-size: 0.1rem;
				color: white;
			}
		}
	}
}
</style>
