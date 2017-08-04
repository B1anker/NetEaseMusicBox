<template lang="html">
	<div class="account">
		<div class="head">账号</div>
		<div class="content-wrap"  ref="content">
			<div class="scroll">
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
							<div class="button" @click.stop="handleDailySign">
								签到
							</div>
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
								<i class="icon icon-pencil"></i>
								<div class="my-info">我的资料</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="menu-wrap">
					<ul class="menu">
						<li class="item" @click="$router.push('/history')">
							<i class="icon icon-history left"></i>
							<span class="text">听歌记录</span>
							<i class="icon icon-back right"></i>
						</li>
						<li class="item">
							<i class="icon icon-envelope left"></i>
							<span class="text">我的消息</span>
							<i class="icon icon-back right"></i>
						</li>
					</ul>
					<ul class="menu">
						<li class="item">
							<i class="icon icon-member left"></i>
							<span class="text">会员中心</span>
							<i class="icon icon-back right"></i>
						</li>
						<li class="item">
							<i class="icon icon-cart left"></i>
							<span class="text">商城</span>
							<i class="icon icon-back right"></i>
						</li>
					</ul>
					<ul class="menu">
						<li class="item">
							<i class="icon icon-setting left"></i>
							<span class="text">设置</span>
							<i class="icon icon-back right"></i>
						</li>
						<li class="item">
							<i class="icon icon-lamp left"></i>
							<span class="text">夜间模式</span>
							<i class="icon icon-back right"></i>
						</li>
						<li class="item">
							<i class="icon icon-scan left"></i>
							<span class="text">扫一扫</span>
							<i class="icon icon-back right"></i>
						</li>
					</ul>
					<ul class="menu">
						<li class="item">
							<i class="icon icon-share left"></i>
							<span class="text">分享网易云音乐</span>
							<i class="icon icon-back right"></i>
						</li>
						<li class="item">
							<i class="icon icon-info left"></i>
							<span class="text">关于</span>
							<i class="icon icon-back right"></i>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getFollows, getFolloweds, getUserDetail, dailySign } from '@/modules/request'
import BScroll from 'better-scroll'
import axios from 'axios'
import MySwitch from '@/packages/switch'
export default {
  name: 'account',

  data () {
    return {
      user: {},
      follows: [],
      followeds: [],
      details: {},
      scrollInstance: null
    }
  },

  components: {
    MySwitch
  },

  computed: {
    summaryShow () {
      return !!this.user.profile
    }
  },

  mounted () {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user.code === 200) {
      this.user = user
      this.init()
    }
  },

  methods: {
    init () {
      axios.all([getUserDetail(this.user.account.id), getFollows({
        offset: 0,
        limit: 1000,
        id: this.user.profile.userId
      }), getFolloweds(this.user.profile.userId)]).then(axios.spread((details, follows, followeds) => {
        this.details = details.data
        this.follows = follows.data.follow
        this.followeds = followeds.data.followeds
        this.scroll()
      }))
    },

    scroll () {
      this.$nextTick(() => {
        this.scrollInstance = new BScroll(this.$refs.content, {
          startX: 0,
          startY: 0,
          scrollY: true,
          click: false,
          probeType: 2
        })
      })
    },

    handleDailySign (e) {
      dailySign(1).then((res) => {
        this.$message({
          type: 'correct',
          message: '签到成功',
          duration: 1000
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '签到失败',
          duration: 1000
        })
      })
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
		height: calc(100% - 0.46rem - 0.5rem);
	}

	.summary{
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

				.button{
					width: 0.62rem;
					height: 0.25rem;
					border-radius: 0.25rem;
					background-color: white;
					border: 1px solid rgb(205, 0, 0);
					color: rgb(205, 0, 0);
					font-size: 0.1rem;
					text-align: center;
					line-height: 0.25rem;
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

					.icon-pencil{
						font-size: 0.15rem;
					}

					.my-info{
						font-size: 0.1rem;
						color: rgb(140, 140, 140);
					}
				}
			}
		}
	}

	.menu-wrap{
		overflow: hidden;

		.menu{
			margin-top: 0.1rem;
			padding-left: 0.45rem;
			background-color: white;

			.item{
				position: relative;
				text-align: left;
				height: 0.45rem;
				border-bottom: 1px solid rgb(226, 227, 228);

				.text{
					font-size: 0.16rem;
					line-height: 0.45rem;
				}

				.icon{
					font-size: 0.2rem;
					color: rgb(138, 139, 145);

					&.left{
						position: absolute;
						left: -0.33rem;
						top: 0.11rem;
					}

					&.right{
						font-size: 0.17rem;
						position: absolute;
						right: 0.05rem;
						top: 0.14rem;
						font-weight: bolder;
						color: rgb(230, 231, 232);
						transform: rotate(180deg);
					}
				}

				&:last-child{
					border-bottom: none;
				}
			}

			&:last-child{
				margin-bottom: 0.2rem;
			}
		}
	}

	.switch{
		position: absolute;
		left: 1rem;
		bottom: 1rem;
	}
}
</style>
