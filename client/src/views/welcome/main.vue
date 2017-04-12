<template>
<div class="welcome">
	<div class="button-wrap">
		<my-button val="登录" @click="signin"></my-button>
		<my-button val="注册"></my-button>
	</div>
	<p class="try" @click="enterHome">
		<span>游客试用</span>
		<i class="icon icon-angle-right degree-1"></i>
		<i class="icon icon-angle-right degree-2"></i>
		<i class="icon icon-angle-right degree-3"></i>
	</p>
</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'welcome',
	components: {
	},
	mounted() {
		this.search();
	},
	data() {
		return {
			content: '周杰伦'
		}
	},
	methods: {
		signin() {
			this.$router.push('/signin');
		},

		enterHome() {
			this.$router.push('/home');
		},

		search() {
			// axios.get(`/music/netEaseApi/search?content=${ this.content }`).then((res) => {
			// 	console.log(res.data.result.songs);
			// }).catch((err) => {
			// 	console.log(err);
			// });
		}
	}
}
</script>

<style lang="scss">
	.welcome {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
		overflow: hidden;
		background-image: url("/static/welcome.png");
		background-size: 100% 100%;

		.button{
			margin: auto;

			&:first-child{
				margin-top: 2.15rem;
			}

			&:last-child{
				margin-top: 0.15rem;
			}
		}

		.try{
			margin-top: 0.26rem;
			color: rgb(102, 102, 102);
			height: 0.2rem;
			line-height: 0.2rem;

			span{
				font-size: 0.14rem;
				vertical-align: top;
				margin-right: 0.08rem;
			}

			.icon{
				font-size: 0.16rem;

				&.degree-1{
					color: rgb(102, 102, 102);
				}
				&.degree-3{
					color: rgb(157, 157, 157);
				}
				&.degree-3{
					color: rgb(203, 203, 203);
				}
			}

			&:hover{
				cursor: pointer;
			}
		}
	}
</style>
