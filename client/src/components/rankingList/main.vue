<template lang="html">
	<transition name="slide-fade">
		<div class="playlist">
			<div class="head">
				<div class="background-mask" :style="{ 'background-image': 'url(' + backgroundUrl + ')' }">
				</div>
				<div class="title">
					<i class="icon icon-back" @click.stop="handleBack"></i>
					排行榜
				</div>
				<div class="info">
					<img class="album" :src="backgroundUrl" :alt="playlist.name">
					<div class="creator-wrap">
						<div class="name">{{ playlist.name }}</div>
						<div class="creator">
							<img :src="avatarUrl" :alt="nickname" class="avatar">
							<span class="nickname">{{ nickname }}</span>
						</div>
					</div>
				</div>
				<div class="operate"></div>
			</div>
			<div class="lists-wrap">
				<div class="play">
					<i class="icon icon-start" @click="playMusic(0)"></i>
					<div class="text">播放全部<span class="count">(共{{ tracks.length }}首)</span></div>
				</div>
				<ul class="lists">
					<li class="list" v-for="(track, index) in tracks" @click="playMusic(index)">
						<span class="num">{{ index + 1 }}</span>
						<div class="song">{{ track.name }}</div>
						<div class="artist-and-album">{{ `${ track.ar[0].name } - ${ track.al.name }` }}</div>
					</li>
				</ul>
			</div>
	  </div>
	</transition>
</template>

<script>
import { getPlayLists } from '@/modules/request';
import playList from '@/modules/mixins/playList';
import Ls from '@/modules/utils/localStorage';
export default {
	name: 'playlist',

	props: {
		playListId: String
	},

	mixins: [playList],

	data() {
		return {
			playlist: {},
			tracks: [],
			avatarUrl: '',
			backgroundUrl: '',
			nickname: ''
		}
	},

	computed: {
		id() {
			return this.$route.params.id;
		}
	},

	watch: {
		id(newVal) {
			newVal && this.init(newVal);
			return newVal;
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init(id) {
			const ls = new Ls();
			this.backgroundUrl = ls.get('playLists').cover;
			getPlayLists(id || this.id).then((res) => {
				if(!res.data){
					this.$message({
						type: 'error',
						message: '获取歌单失败',
						duration: 1000
					})
				}
				this.playlist = res.data.playlist;
				this.tracks = res.data.playlist.tracks;
				this.avatarUrl = this.playlist.creator.avatarUrl;
				this.nickname = this.playlist.creator.nickname;
			});
		},

		handleBack() {
			this.$router.back();
		},

		playMusic(index) {
			this.setList(this.$route.params.id, index);
			this.$store.dispatch('setPlayer', {
				songId: this.tracks[index].id,
				show: true,
				state: 1
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.playlist{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;
	background: white;
	width: 100%;
	height: 3.17rem;

	.head{
		height: 2.4rem;
		overflow: hidden;
		padding-top: 0.17rem;
		background: hsla(0, 0%, 50%, .35) border-box;

		.background-mask{
			position: absolute;
			height: 2.4rem;
			width: 100%;
			z-index: -1;
			background-size: auto 100%;
			background-position: center top;
			padding-top: 30px;
			margin: -30px;
			filter: blur(30px);
		}

		.title{
			font-size: 0.18rem;
			color: white;
			margin-bottom: 0.25rem;

			.icon{
				position: absolute;
				font-size: 0.24rem;
				top: 0.16rem;
				left: 0.2rem;
				font-weight: bold;
			}
		}



		.info{
			text-align: left;
			white-space: nowrap;

			.album{
				margin: 0 0.15rem;
				width: 1.13rem;
				height: 1.13rem;
				background-size: 100%;
			}

			.creator-wrap{
				display: inline-block;
				vertical-align: top;

				.name{
					overflow: hidden;
					text-align: justify;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 2;
			    -webkit-box-orient: vertical;
					white-space: normal;
					font-size: 0.16rem;
					color: white;
					width: 1.5rem;
					height: 0.36rem;
				}

				.creator{
					margin-top: 0.2rem;

					.avatar{
						vertical-align: top;
						width: 0.3rem;
						height: 0.3rem;
						border-radius: 50%;
					}

					.nickname{
						overflow: hidden;
						display: inline-block;
						text-overflow: ellipsis;
						max-width: 1.25rem;
						margin-left: 0.05rem;
						font-size: 0.15rem;
						color: rgb(203, 201, 197);
				    line-height: 0.3rem;
					}

				}
			}

		}

	}

	.lists-wrap{
		width: 100%;
	  background: white;

		.play{
			position: relative;
			padding-left: 0.4rem;
			height: 0.5rem;

			.icon{
				position: absolute;
				font-size: 0.2rem;
				left: 0.1rem;
				color: black;
				top: 0.13rem;
			}

			.text{
				text-align: left;
				line-height: 0.5rem;
				font-size: 0.18rem;

				.count{
					font-size: 0.15rem;
					color: rgb(158, 158, 158);
				}

			}

		}

		.lists{
			height: 2.14rem;
			padding-left: 0.4rem;
			overflow: scroll;

			.list{
				height: 0.54rem;
				text-align: left;
				position: relative;
				border-top: 1px solid rgb(241, 242, 243);

				.num{
					position: absolute;
					left: -0.25rem;
					top: 0.2rem;
					font-size: 0.15rem;
					color: rgb(145, 145, 145);
				}

				.song{
					margin-top: 0.1rem;
					margin-bottom: 0.07rem;
					font-size: 0.15rem;
				}

				.artist-and-album{
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 0.11rem;
					color: rgb(137, 137, 137);
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