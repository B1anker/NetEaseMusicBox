<template>
<div class="welcome">
	<my-button val="手机号登录"></my-button>
	<my-button val="注册"></my-button>
</div>
</template>

<script>
import axios from 'axios';
import myButton from '@/components/button/index';

export default {
	name: 'welcome',
	components: {
		myButton
	},
	mounted() {
		axios.post('/music/signin', {
			id: 100,
			name: 'b1anker'
		}).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		});
	},
	data() {
		return {
			content: '周杰伦'
		}
	},
	methods: {
		search() {
			axios.get(`/music/search?content=${ this.content }`).then((res) => {
				console.log(res.data.result.songs);
			}).catch((err) => {
				console.log(err);
			});
		}
	}
}
</script>

<style lang="scss">
	.welcome{
		width: 100%;
		height: 100%;
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
	}
</style>
