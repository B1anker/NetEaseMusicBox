<template lang="html">
	<div class="friends">
		<div class="head">账号</div>
		<div class="content-wrap">
			<ul class="events">
				<li class="event" v-for="(e, index) in events">
					<div class="avatar">
						<img :src="e.user.avatarUrl" :alt="e.user.nickname">
					</div>
					<div class="content">
						<div class="name-wrap">
							<div class="name">{{ e.user.nickname }}</div>
							<div class="type">{{ handleType(e.type) }}</div>
							<div class="follow">+关注</div>
						</div>
						<div class="time">{{ handleTime(e.eventTime) }}</div>
						<div class="text" v-html=" e.json.msg "></div>
						<div v-if="e.type === 39" class="video-wrap" @click="playVideo">
							<video class="video" :poster="e.json.video.coverUrl" :src="e.json.video.nosKey"></video>
						</div>
						<div v-if="e.type === 18" class="music-wrap">
							<img v-for="(pic, index) in e.pics" :src="pic.pcSquareUrl" alt="">
						</div>
						<div class="reason" v-if="e.rcmdInfo">{{ e.rcmdInfo.reason }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { getEvent } from '@/modules/request';
export default {
	name: 'friends',

	data() {
		return {
			events: []
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init() {
			getEvent().then((res) => {
				this.events = res.data.event;
				this.events = this.events.filter((item, index) => {
					return !!item.uuid;
				}).map((item, index) => {
					item.json = JSON.parse(item.json);
					item.json.msg = item.json.msg.replace(/\n/, '<br/>');
					return item;
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

	.events {

		.event {
			overflow: hidden;
			padding: 0.2rem 0;
			border-bottom: 1px solid rgb(225, 226, 227);

			.avatar{
				float: left;
				padding: 0 0.1rem;
				width: 0.6rem;

				img{
					width: 0.4rem;
					height: 0.4rem;
					background-size: 100%;
					border-radius: 50%;
				}

			}

			.content{
				padding-left: 0.6rem;

				.name-wrap{
					overflow: hidden;
					font-size: 0.15rem;

					.name, .type{
						float: left;
					}

					.follow{
						float: right;
						margin-right: 0.1rem;
						color: rgb(210, 50, 39);
					}

					.name{
						text-align: left;
						width: 0.6rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						color: rgb(67, 119, 172);
					}

					.type{
						margin-left: 0.24rem;
						color: rgb(101, 101, 101);
					}

				}

				.time{
					margin-top: 0.03rem;
					text-align: left;
					font-size: 0.1rem;
					color: rgb(165, 165, 165);
				}

				.text{
					margin-top: 0.15rem;
					font-weight: bold;
					text-align: justify;
					padding-right: 0.1rem;
					font-size: 0.15rem;
					line-height: 0.24rem;
				}

				.video-wrap{
					margin-top: 0.05rem;
					width: 2.5rem;
					height: 1.4rem;

					.video{
						height: 100%;
						width: 100%;
					}
				}

				.music-wrap{
					width: 2.5rem;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					img{
						margin-top: 0.05rem;
						width: 0.8rem;
						height: 0.8rem;
						background-size: 100%;
					}

				}

				.reason{
					position: relative;
					margin-top: 0.05rem;
					color: rgb(141, 141, 141);
					text-align: left;
					text-indent: 0.25rem;
					font-size: 0.13rem;

					&:after{
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

		}

	}

}
</style>
