<template lang="html">
  <div class="footer">
		<ul>
			<li :class="{active: 0 === index}" @click="jump('discover', 0)"><i class="icon icon-logo"></i><span>发现音乐</span></li>
			<li :class="{active: 1 === index}" @click="jump('my-music', 1)"><i class="icon icon-note-2"></i><span>我的音乐</span></li>
			<li :class="{active: 2 === index}" @click="jump('friends', 2)"><i class="icon icon-friends"></i><span>朋友</span></li>
			<li :class="{active: 3 === index}" @click="jump('account', 3)"><i class="icon icon-account"></i><span>账号</span></li>
		</ul>
  </div>
</template>

<script>
export default {
	name: 'footer',

	data() {
		return {
			index: 0
		}
	},

	methods: {
		jump(to, index) {
			this.index = index;
			this.$router.push(to);
		}
	}
}
</script>

<style lang="scss" scoped>
.footer{
	position: fixed;
	top: 5.003rem;
	left: 0;
	z-index: 99;
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
				color: rgb(167, 167, 167);
				font-size: 0.25rem;
			}

			span{
				margin-top: 0.03rem;
				display: block;
				font-size: 0.1rem;
				color: rgb(135, 135, 135);
			}

			&.active{

				.icon{
					color: white;
				}

				span{
					color: white;
				}

			}

		}

	}
}
</style>
