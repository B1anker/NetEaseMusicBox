<template lang="html">
  <div class="player">
		<div class="background-mask" :style="{ 'background-image': 'url(' + picUrl + ')' }">
		</div>
		<div class="main">
			<div class="head">
				<i class="icon icon-back"></i>
				<div class="music-and-artist">
					<hgroup>
						<h3 class="music">{{ this.music }}</h3>
						<h4 class="artist">{{ this.artist }}</h4>
					</hgroup>
				</div>
				<i class="icon icon-share"></i>
			</div>
			<div class="disc-wrap"></div>
			<div class="player-bar">

			</div>
		</div>
		<div class="audio">
			<audio ref="mp3">
  			<source :src="url" type="audio/mpeg">
			</audio>
		</div>
  </div>
</template>

<script>
import { detail, getMp3Url } from '@/modules/request';

export default {
	name: 'player',
	mounted() {
		this.$nextTick(() => {
			this.init();
		});
	},
	data() {
		return {
			mp3Dom: null,
			artist: '',
			music: '',
			url: '',
			picUrl: '',
			id: 418603077
		}
	},
	methods: {
		init() {
			this.mp3Dom = this.$refs.mp3;
			this.getDetail().then(() => {
				this.getMp3();
			});
		},
		getDetail() {
			return detail(this.id).then((res) => {
				const song = res.data.songs[0];
				this.music = song.name;
				this.artist = song.ar[0].name;
				this.picUrl = song.al.picUrl;
			});
		},
		getMp3() {
			return getMp3Url(this.id).then((res) => {
				const song = res.data.songs[0];
				this.url = song.url;
			});
		}
	}
}
</script>

<style lang="scss">
	.player {
		width: 100%;
		height: 100%;
		position: relative;
		margin: 0 auto;
		height: 100%;
		background: hsla(0, 0%, 100%, .25) border-box;
		overflow: hidden;

		.background-mask{
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: -1;
			background-size: auto 100%;
			background-position: center top;
			padding-top: 30px;
			margin: -30px;
			filter: blur(30px);
		}

		.main{
			.head{
				height: 0.45rem;
				border-bottom: 1px solid rgb(120, 119, 113);
				position: relative;
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

				.music-and-artist{
					height: 100%;
					width: 100%;
					display: table;

					hgroup{
						height: 100%;
						width: 100%;
						color: white;
						display: table-cell;
						vertical-align: middle;
						text-align: center;

						.music{
							font-size: 0.18rem;
						}

						.artist{
							font-size: 0.1rem;
						}
					}
				}
			}
		}


		.audio{
			display: none;
		}
	}
</style>
