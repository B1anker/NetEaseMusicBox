<template lang="html">
	<div class="friends">
		<div class="head">动态</div>
		<div class="content-wrap" ref="content" v-show="ready">
			<ul class="events">
				<li class="event" v-for="(e, index) in events">
					<div class="content">
						<div class="normal" v-if="e.type === 18 || e.type === 39 || e.type === 35">
							<div class="avatar">
								<img :src="e.user.avatarUrl" :alt="e.user.nickname">
							</div>
							<div class="name-wrap">
								<div class="name">{{ e.user.nickname }}</div>
								<div class="type">{{ handleType(e.type) }}</div>
								<div class="follow">+关注</div>
							</div>
							<div class="time">{{ handleTime(e.eventTime) }}</div>
							<div class="text" v-html=" e.json.msg "></div>
							<div v-if="e.type === 39" class="video-wrap" @click="playVideo">
								<video class="video" :poster="e.json.video.coverUrl"></video>
							</div>
							<div v-if="e.type === 18 || e.type === 35" class="music-wrap">
								<img v-for="(pic, index) in e.pics" :src="pic.pcSquareUrl" alt="">
							</div>
							<div class="reason" v-if="e.rcmdInfo">{{ e.rcmdInfo.reason }}</div>
						</div>
						<div class="advertisement" v-if="e.type === 33">
							<div class="img-wrap">
								<img :src="e.json.coverPCUrl + '?param=300y190'" alt="">
							</div>
							<div class="text">
								<div class="long-line"></div>
								<div class="title">
									<span>#{{ e.json.title }}#</span>
								</div>
								<div class="short-line">
									<span class="cnt">
										<em class="hide">xxxxxxxx</em>
										<i>{{ `${ e.json.participateCount }人参与` }}</i>
									</span>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import { getNewEvent } from '@/modules/request';
export default {
	name: 'friends',

	data() {
		return {
			events: [],
			refreshing: false,
			scrollInstance: null,
			handling: null,
			ready: false
		}
	},

	created() {
		this.handling = this.$message({
			type: 'loading',
			message: '请稍等',
			duration: 0
		})
	},

	mounted() {
		this.init();
	},

	methods: {
		init() {
			this.getData().then(() => {
				this.handling.close();
				this.ready = true;
				this.scroll();
			});
		},

		refresh() {
			this.getData().then(() => {
				this.scrollInstance.destroy();
				this.scrollInstance = null;
				this.refreshing = false;
				this.scroll();
			});;
		},

		getData(cb) {
			return getNewEvent().then((res) => {
				if (res.data.code !== 200) {
					this.$message({
						type: 'error',
						message: '获取动态失败',
						duration: 1000
					});
					return ;
				}
				this.events = res.data.event;
				this.events = this.events.map((item, index) => {
					item.json = JSON.parse(item.json);
					if (item.json.msg) {
						item.json.msg = item.json.msg.replace(/\n/, '<br/>');
					}
					return item;
				});
			})
		},

		scroll() {
			this.$nextTick(() => {
				this.scrollInstance = new BScroll(this.$refs.content, {
					startX: 0,
					startY: 0,
					scrollY: true,
					click: true,
					probeType: 2
				});
				this.scrollInstance.on('scroll', (pos) => {
					if (this.refreshing) {
						return ;
					}
					if (pos.y > 50) {
						this.refreshing = true;
						this.refresh();
					}
				});
			})
		},

		handleType(type) {
			switch (type) {
				case 39:
					return '发布短视频：'
					break;
				case 18:
					return '分享单曲：'
					break;
				default:
					break;
			}
		},

		handleTime(time) {
			const date = new Date(time);
			return date.getFullYear();
		},

		playVideo(e){
			console.log(e.target);
		}
	}
}
</script>

<style lang="scss">
.friends {
	.head {
		width: 100%;
		height: 0.46rem;
		background-color: rgb(212, 60, 51);
		font-size: 0.17rem;
		line-height: 0.48rem;
		color: white;
	}

	.content-wrap {
		position: relative;
		overflow: scroll;
		height: calc(100% - 0.46rem - 0.5rem);
		background-color: rgb(239, 240, 241);

		&:before{
			content: '下拉刷新';
			position: absolute;
			font-size: 0.15rem;
			top: 0.15rem;
			left: 0;
			right: 0;
			margin: auto;
		}
	}

	.events {
		background-color: white;

		.event {
			overflow: hidden;
			padding: 0.2rem 0;
			border-bottom: 1px solid rgb(225, 226, 227);

			.content {
				.normal {
					padding-left: 0.6rem;
					position: relative;

					.avatar {
						position: absolute;
						left: 0;
						top: 0;
						width: 0.6rem;

						img {
							width: 0.4rem;
							height: 0.4rem;
							background-size: 100%;
							border-radius: 50%;
						}
					}

					.name-wrap {
						overflow: hidden;
						font-size: 0.15rem;

						.name,
						.type {
							float: left;
						}

						.follow {
							float: right;
							margin-right: 0.1rem;
							color: rgb(210, 50, 39);
						}

						.name {
							text-align: left;
							width: 0.6rem;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							color: rgb(67, 119, 172);
						}

						.type {
							margin-left: 0.24rem;
							color: rgb(101, 101, 101);
						}
					}

					.time {
						margin-top: 0.03rem;
						text-align: left;
						font-size: 0.1rem;
						color: rgb(165, 165, 165);
					}

					.text {
						margin-top: 0.15rem;
						font-weight: bold;
						text-align: justify;
						padding-right: 0.1rem;
						font-size: 0.15rem;
						line-height: 0.24rem;
					}

					.video-wrap {
						margin-top: 0.05rem;
						width: 2.5rem;
						height: 1.4rem;

						.video {
							height: 100%;
							width: 100%;
						}
					}

					.music-wrap {
						width: 2.5rem;
						display: flex;
						flex-wrap: wrap;

						img {
							margin-right: 0.05rem;
							margin-top: 0.05rem;
							width: 0.8rem;
							height: 0.8rem;
							background-size: 100%;

							&:nth-child(3n+0){
								margin-right: 0;
							}
						}
					}

					.reason {
						position: relative;
						margin-top: 0.1rem;
						color: rgb(141, 141, 141);
						text-align: left;
						text-indent: 0.25rem;
						font-size: 0.13rem;

						&:after {
							content: '';
							position: absolute;
							top: 0.06rem;
							left: 0;
							display: block;
							height: 0.01rem;
							width: 0.2rem;
							background-color: rgb(222, 223, 224);
						}
					}
				}

				.advertisement {
					position: relative;
					padding: 0.2rem 0.1rem;

					.img-wrap {
						height: 1.9rem;
						width: 3rem;
					}

					.text {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						margin: auto;
						width: 2.45rem;
						height: 0.7rem;

						.long-line {
							position: absolute;
							top: 0;
							left: 0;
							height: 2px;
							width: 100%;
							background-color: #fff;
							opacity: 0.2;
						}

						.title {
							display: table;
							height: calc(100% - 0.12rem);
							font-size: 0.2rem;

							span{
								display: table-cell; vertical-align:middle; text-align:center;
							}
						}

						.short-line {
							position: absolute;
							left: 0;
					    bottom: 0;
					    word-break: normal;

							.cnt{
								position: relative;
								display: table-cell;
								padding: 0 12px;

								.hide{
									visibility: hidden;
									font-size: 0.12rem;
								}

								i{
									position: absolute;
									font-size: 0.12rem;
									left: 0;
									right: 0;
									text-align: center;
									top: 5px;
								}
							}

							&:before {
								content: '';
								display: table-cell;
								border-bottom: 2px solid #fff;
								opacity: 0.2;
								width: 50%;
							}

							&:after {
								content: '';
								display: table-cell;
								border-bottom: 2px solid #fff;
								opacity: 0.2;
								width: 50%;
							}
						}
					}
				}
			}
		}
	}
}
</style>
