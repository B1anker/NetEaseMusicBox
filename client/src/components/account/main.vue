<template lang="html">
	<div class="account">
		<div class="summary" v-if="summaryShow">
			<div class="up">
				<div class="avatar">
					<img :src="user.profile.avatarUrl" :alt="user.profile.nickname">
				</div>
				<div class="username-wrap">
					<div class="username">{{ user.profile.nickname }}</div>
					<div class="level"></div>
				</div>
				<div class="sign">
					<button>签到</button>
				</div>
			</div>
			<div class="down"></div>
		</div>
		<div class="menu">
			<ul>
				<li><i></i><span></span></li>
				<li><i></i><span></span></li>
				<li><i></i><span></span></li>
			</ul>
		</div>
	</div>
</template>

<script>
import { subcount } from '@/modules/request';
export default {
	name: 'account',

	data() {
		return {
			user: {}
		}
	},



	computed: {
		summaryShow() {
			return !!this.user.profile;
		}
	},

	mounted() {
		const user = JSON.parse(localStorage.getItem('user'));
		if(Object.prototype.toString.call(user).slice(8, -1) === 'Object') {
			this.user = user;
		}
	},
}
</script>

<style lang="scss" scoped>
.summary{
	height: 1.22rem;
	width: 100%;

	.up{
		position: relative;
		height: 0.92rem;
		border-bottom: 1px solid rgb(230, 230, 230);
		text-align: left;

		.avatar{
			display: inline-block;
			width: 0.63rem;
			height: 0.63rem;
			margin-top: 0.15rem;
			margin-left: 0.15rem;

			img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.username-wrap{
			display: inline-block;
			padding-top: 0.3rem;
			padding-left: 0.1rem;
			vertical-align: top;

			.username{
				font-size: 0.2rem;
			}
		}

		.sign{
			position: absolute;
			top: 0.3rem;
			right: 0.1rem;

			button{
				width: 0.62rem;
				height: 0.25rem;
				border-radius: 0.25rem;
				background-color: white;
				border: 1px solid rgb(205, 0, 0);
				color: rgb(205, 0, 0);
				font-size: 0.1rem;
			}
		}
	}

	.down{
		height: 0.3rem;
	}
}
</style>
