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

	mounted() {
		this.init();
	},

	methods: {
		init() {
			const routes = this.$route.path.split('/')
			const path = routes[routes.length - 1];
			console.log(path);
			switch (path) {
				case 'personalized-recommend':
					this.index = 0;
					break;
				case 'all-ranking-list':
					this.index = 0;
					break;
				case 'my-music':
					this.index = 1;
					break;
				case 'friends':
					this.index = 2;
					break;
				case 'account':
					this.index = 3;
					break;
				case 'history':
					this.index = 3;
					break;
				default:
					break;
			}
		},

		jump(to, index) {
			this.index = index;
			this.$router.push('/home/' + to);
		}
	}
}
</script>

<style lang="scss" scoped>
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	z-index: 99;
	height: 0.5rem;
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
