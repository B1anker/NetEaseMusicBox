<template lang="html">
	<div class="account">
		<div class="head">账号</div>
		<div class="content-wrap">
			<div class="summary" v-if="summaryShow">
				<div class="up">
					<div class="avatar">
						<img :src="user.profile.avatarUrl" :alt="user.profile.nickname">
					</div>
					<div class="username-wrap">
						<div class="username">{{ user.profile.nickname }}</div>
						<div class="level">{{ 'LV ' + details.level }}</div>
					</div>
					<div class="sign">
						<button @click="handleDailySign">签到</button>
					</div>
				</div>
				<div class="down">
					<ul>
						<li>
							<div class="text">动态</div>
							<div class="num">0</div>
						</li>
						<li>
							<div class="text">关注</div>
							<div class="num">{{ follows.length }}</div>
						</li>
						<li>
							<div class="text">粉丝</div>
							<div class="num">{{ followeds.length }}</div>
						</li>
						<li>
							<i class="icon"></i>
							<div class="my-info">我的资料</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="menu">
				<ul>
					<li><i></i><span></span></li>
					<li><i></i><span></span></li>
					<li><i></i><span></span></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { getFollows, getFolloweds, getUserDetail, dailySign, refresh } from '@/modules/request';
export default {
	name: 'account',

	data() {
		return {
			user: {},
			follows: [],
			followeds: [],
			details: {}
		}
	},

	computed: {
		summaryShow() {
			return !!this.user.profile;
		}
	},

	mounted() {
		const user = JSON.parse(localStorage.getItem('user'));

		if (user.code === 200) {
			this.user = user;
			this.init();
		}
	},

	methods: {
		init() {

			refresh().then((res) => {
				console.log(res);
			})

			getUserDetail(this.user.account.id).then((res) => {
				this.details = res.data;
			});

			getFollows({
				offset: 0,
				limit: 1000,
				id: this.user.profile.userId
			}).then((res) => {
				this.follows = res.data.follow;
			});

			getFolloweds(this.user.profile.userId).then((res) => {
				this.followeds = res.data.followeds;
			});
		},

		handleDailySign() {
			dailySign(1).then((res) => {
				this.$messaga({
					type: 'success',
					messaga: '成功',
					duration: 1000
				});
			}).catch((err) => {
				this.$messaga({
					type: 'error',
					messaga: '失败',
					duration: 1000
				});
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.account{
	background-color: rgb(238, 239, 241);

	.head{
		width: 100%;
		height: 0.48rem;
		background-color: rgb(212, 60, 51);
		font-size: 0.17rem;
		line-height: 0.48rem;
		color: white;
	}

	.content-wrap{
		overflow: scroll;
		height: 4.503rem;
	}

	.summary{
		height: 1.22rem;
		width: 100%;

		.up{
			position: relative;
			height: 0.92rem;
			border-bottom: 1px solid rgb(230, 230, 230);
			text-align: left;
			background-color: white;

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
					border: 1px solid rgb(238, 244, 239);
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

				.level{
					margin-top: 0.05rem;
					text-align: center;
					width: 0.35rem;
					height: 0.15rem;
					border-radius: 0.15rem;
					border: 1px solid rgb(180, 180, 180);
					font-size: 0.1rem;
					font-weight: bold;
					line-height: 0.15rem;
					color: rgb(150, 150, 150);
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
			padding: 0.1rem 0;
			background-color: white;

			ul{
				height: 0.3rem;

				li{
					display: inline-block;
					width: 25%;
					border-right: 1px solid rgb(230, 230, 230);

					&:last-child{
						border-right: none;
					}

					.text{
						font-size: 0.13rem;
						color: rgb(167, 167, 167);
					}

					.num{
						padding-top: 0.02rem;
						font-size: 0.11rem;
						font-weight: bold;
					}

					.my-info{
						font-size: 0.1rem;
						color: rgb(140, 140, 140);
					}
				}
			}
		}
	}
}
</style>
