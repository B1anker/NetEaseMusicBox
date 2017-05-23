<template lang="html">
  <transition name="slide-fade">
		<div class="comments" v-if="show">
			<div class="head">
				<i class="icon icon-back" @click="handleClose"></i>
				<div class="title">
					{{ `评论(${ total })` }}
				</div>
				<i class="icon icon-share"></i>
			</div>
			<div class="scroll-wrap" ref="comments">
				<div class="scroll" ref="scroll">
					<div class="song-info">
						<img :src="picUrl" alt="" class="song-pic">
						<div class="info">
							<div class="name">{{ music }}</div>
							<div class="artist">{{ artist }}</div>
						</div>
					</div>
					<div class="hot-comments">
						<div class="title">精彩评论</div>
						<ul>
							<li class="comment-item" v-for="(comment, index) in hotComments">
								<div class="avatar">
									<img :src="comment.user.avatarUrl" alt="" class="avatar">
								</div>
								<div class="comment-wrap">
									<div class="nickname">{{ comment.user.nickname }}</div>
									<div class="date">{{ getDate(comment.time) }}</div>
									<div class="content">
										<span v-if="comment.beReplied[0]">回复<span class="call">{{ `@${ comment.beReplied[0].user.nickname }:` }}</span></span>
										{{ comment.content }}
										<div class="reply" v-if="comment.beReplied[0]">
											<span class="call">{{ `@${ comment.beReplied[0].user.nickname }:` }}</span>
											{{ comment.beReplied[0].content  }}
										</div>
									</div>
									<div class="count">
										<div class="num">{{ comment.likedCount }}</div>
										<i class="icon icon-praise"></i>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="all-comments">
						<div class="title">{{ `最新评论(${ total })` }}</div>
						<ul>
							<li class="comment-item" v-for="(comment, index) in comments">
								<div class="avatar">
									<img :src="comment.user.avatarUrl" alt="" class="avatar">
								</div>
								<div class="comment-wrap">
									<div class="nickname">{{ comment.user.nickname }}</div>
									<div class="date">{{ getDate(comment.time) }}</div>
									<div class="content">
										<span v-if="comment.beReplied[0]">回复<span class="call">{{ `@${ comment.beReplied[0].user.nickname }:` }}</span></span>
										{{ comment.content }}
										<div class="reply" v-if="comment.beReplied[0]">
											<span class="call">{{ `@${ comment.beReplied[0].user.nickname }:` }}</span>
											{{ comment.beReplied[0].content  }}
										</div>
									</div>
									<div class="count">
										<div class="num">{{ comment.likedCount }}</div>
										<i class="icon icon-praise"></i>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
	  </div>
  </transition>
</template>

<script>
import { getMp3Comments } from '@/modules/request';
import BScroll from 'better-scroll';
export default {
	name: 'comments',

	props: {
		picUrl: String,
		music: String,
		artist: String
	},

	computed: {
		id() {
			return '' + this.$store.getters.getPlayer.songId;
		},

		show() {
			return this.$store.getters.getPlayer.comments.show;
		}
	},

	watch: {
		show(newVal) {
			if (newVal) {
				this.$nextTick(() => {
					this.scroll();
				});
			} else {
				this.scrollInstance.destroy();
				this.scrollInstance = null;
			}
			return newVal;
		}
	},

	data() {
		return {
			total: 0,
			comments: [],
			hotComments: [],
			scrollInstance: null
		};
	},

	mounted() {
		getMp3Comments(this.id).then((res) => {
			if(!res.data){
				return ;
			}
			this.total = res.data.total;
			this.hotComments = res.data.hotComments;
			this.comments = res.data.comments;
		});
	},

	methods: {
		getDate(time) {
			const date = new Date(time);
			return `${ date.getMonth() + 1 }月${ date.getDate() }日`;
		},

		handleClose() {
			this.$store.dispatch('setPlayer', {
				comments: true
			});
		},

		scroll() {
			this.$nextTick(() => {
				this.scrollInstance = new BScroll(this.$refs.comments, {
					startX: 0,
					startY: 0,
					scrollY: true,
					click: true,
					probeType: 2
				});
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$base-color: rgb(212, 60, 51);
.comments {
	position: absolute;
	z-index: 999;
	height: 100%;
	width: 100%;
	overflow: scroll;
	background-color: white;
	padding-bottom: 0.1rem;

	.head{
		height: 0.45rem;
		position: relative;
		background-color: $base-color;
		overflow: hidden;

		.icon-back, .icon-share{
			position: absolute;
			top: 0;
			line-height: 0.45rem;
			font-size: 0.25rem;
			color: white;
		}

		.icon-back{
			left: 0.05rem;
		}

		.icon-share{
			right: 0.1rem;
		}

		.title{
			font-size: 0.18rem;
			line-height: 0.45rem;
			color: white;
		}
	}

	.scroll-wrap{
		overflow: scroll;
		height: calc(100% - 0.45rem);
	}

	.song-info{
		height: 1rem;
		padding: 0.1rem;
		text-align: left;

		.song-pic{
			width: 0.8rem;
			height: 0.8rem;
		}

		.info{
			display: inline-block;
			height: 0.8rem;
			margin-left: 0.1rem;
			vertical-align: top;
			overflow: hidden;

			.name{
				margin-top: 0.18rem;
				margin-bottom: 0.17rem;
				font-size: 0.16rem;
				color: black;
			},

			.artist{
				font-size: 0.09rem;
				color: rgb(150, 150, 150);
			}
		}
	}

	.hot-comments, .all-comments{
		width: 100%;

		.title{
			text-align: left;
			text-indent: 0.1rem;
			height: 0.25rem;
			line-height: 0.25rem;
			font-size: 0.12rem;
			color: rgb(140, 140, 140);
			background-color: rgb(239, 240, 241);
		}

		.comment-item{
			display: flex;
			padding-top: 0.1rem;

			.avatar{
				width: 0.5rem;
				.avatar{
					height: 0.3rem;
					width: 0.3rem;
					border-radius: 50%;
				}
			}

			.comment-wrap{
				position: relative;
				width: 2.7rem;
				text-align: left;
				padding-bottom: 0.1rem;
				border-bottom: 1px solid rgb(240, 241, 242);

				.nickname{
					font-size: 0.15rem;
					color: rgb(109, 109, 109);
				}

				.date{
					margin-top: 0.02rem;
					font-size: 0.07rem;
					color: rgb(172, 172, 172);
				}

				.content{
					margin-top: 0.1rem;
					text-align: justify;
					font-size: 0.14rem;
					line-height: 0.19rem;
					padding-right: 0.15rem;

					.reply{
						border: 1px solid rgb(241, 242, 243);
						padding: 0.1rem;
						font-size: 0.13rem;
					}

					.call{
						color: rgb(75, 117, 163);
					}
				}

				.count{
					position: absolute;
					top: 0;
					right: 0.05rem;

					.num{
						display: inline-block;
						font-size: 0.09rem;
						line-height: 0.15rem;
						color: rgb(153, 153, 153);
						margin-right: 0.02rem;
					}

					.icon{
						display: inline-block;
						font-size: 0.2rem;
						vertical-align: bottom;
						color: rgb(153, 153, 153);
					}
				}
			}

		}
	}
}
.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: transform 0.3s;
}
.slide-fade-enter,
.slide-fade-leave-active {
	transform: translateX(100%);
}
</style>
