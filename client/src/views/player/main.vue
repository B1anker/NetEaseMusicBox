<template lang="html">
	<transition name="slide-fade">
		<div class="player" v-show="this.$store.getters.getPlayer.show">
			<div class="background-mask" :style="{ 'background-image': 'url(' + picUrl + ')' }">
			</div>
			<div class="main">
				<div class="head">
					<i class="icon icon-back" @touchstart="handleBack"></i>
					<div class="music-and-artist">
						<hgroup>
							<marquee scrollAmount="3" behavior=alternate class="music">{{ this.music }}</marquee>
							<h4 class="artist">{{ this.artist }}</h4>
						</hgroup>
					</div>
					<i class="icon icon-share" @touchstart="handleBack"></i>
				</div>
				<keep-alive>
					<cover :onplaying="onplaying"
						v-if="showCover"
						:picUrl="picUrl"
						@touchstart="switchCoverOrLyric">
					</cover>
				</keep-alive>
				<keep-alive>
					<lyric :onplaying="onplaying"
						@volume="handleVolume"
						@touchstart="switchCoverOrLyric"
						:id="id"
						v-if="!showCover">
					</lyric>
				</keep-alive>
				<div class="process-wrap">
					<span class="current">{{ transformDuation(current) }}</span>
					<div class="process-bar">
						<div class="point" ref="processPoint" :style="{left: process(current)}"></div>
					</div>
					<span class="total">{{ transformDuation(total) }}</span>
				</div>
				<div class="player-bar">
					<i class="icon icon-prev"></i>
					<i class="icon" :class="{'icon-start': !onplaying, 'icon-stop': onplaying}" @click="play"></i>
					<i class="icon icon-next"></i>
				</div>
			</div>
			<div class="audio">
				<audio ref="mp3">
	  			<source :src="url" type="audio/mpeg">
				</audio>
			</div>
	  </div>
	</transition>
</template>

<script>
import { detail, getMp3Url } from '@/modules/request';
import Cover from './cover';
import Lyric from './lyric';
import Drag from './drag';
export default {
	name: 'player',
	components: {
		Cover,
		Lyric
	},

	data() {
		return {
			mp3Dom: null,
			artist: '',
			music: '',
			url: '',
			picUrl: '',
			played: false,
			onplaying: false,
			current: 0,
			total: 0,
			step: 0,
			timer: null,
			processDrag: null,
			showCover: true
		}
	},

	computed: {
		show() {
			return this.$store.getters.getPlayer.show;
		},

		id() {
			return this.$store.getters.getPlayer.songId;
		}
	},

	watch: {
		id(newVal) {
			this.switchSong(newVal);
			return newVal;
		}
	},

	mounted() {
		this.init(this.id);
	},

	methods: {
		init(id) {
			if(!id){
				return ;
			}
			this.mp3Dom = this.$refs.mp3;
			this.mp3Dom.volume = localStorage.getItem('volume');
			this.getDetail().then(() => {
				this.getMp3();
			});
			this.processDrag = new Drag({
				el: this.$refs.processPoint,
				boundary: {
					min: (320 - 212) / 2 + 8,
					max: (320 - 212) / 2 + 212
				}
			});
		},

		switchSong(id) {
			if(!id){
				return ;
			}
			if(!this.mp3Dom){
				return ;
			}
			this.current = 0;
			this.processDrag = new Drag({
				el: this.$refs.processPoint,
				boundary: {
					min: (320 - 212) / 2 + 8,
					max: (320 - 212) / 2 + 212
				}
			});
			this.getDetail(id).then(() => {
			this.played = false;
				this.getMp3().then(() => {
					this.play();
				});
			});
		},

		handleBack() {
			this.$store.dispatch('showPlayer', false);
		},

		handleShare() {

		},

		getDetail(id) {
			return detail(id || this.id).then((res) => {
				const song = res.data.songs[0];
				const artist = [];
				this.music = song.name;
				song.ar.forEach((item, index, arr) => {
					artist.push(item.name);
				});
				this.artist = artist.join('\/');
				this.picUrl = song.al.picUrl;
			});
		},

		getMp3() {
			return getMp3Url(this.id).then((res) => {
				const song = res.data.songs[0];
				this.url = song.url;
				this.played = false;
			});
		},

		startTimer() {
			this.timer = setInterval(() => {
				this.current++;
				if(this.mp3Dom.ended){
					this.stopTimer();
					this.current = 0;
					this.onplaying = false;
				}
			}, 1000);
		},

		stopTimer() {
			clearInterval(this.timer);
		},

		transformDuation(seconds) {
			const minutes = Math.floor(seconds / 60);
			seconds = Math.floor(seconds - minutes * 60);
			if(seconds < 10){
				seconds = '0' + seconds;
			}
			return `${ minutes }:${ seconds }`
		},

		process() {
			return this.current * this.step + 'px';
		},

		load() {
			this.mp3Dom.load();
			this.current = 0;
			this.mp3Dom.addEventListener('canplay', this.canplay, false);
		},

		canplay(e) {
			this.played = true;
			this.total = this.mp3Dom.duration;
			this.step = (212 / this.total).toFixed(2);
			this.processDrag.start(function(e) {
				e.preventDefault();

				if(e.target.className !== 'point'){
					return;
				}

				this.stopTimer();
			}.bind(this));
			this.processDrag.end(function(e) {
				e.preventDefault();

				if(e.target.className !== 'point'){
					return;
				}

				this.current =  ((parseInt(this.$refs.processPoint.style.left) / 212) * this.total).toFixed(2);
				this.mp3Dom.currentTime = this.current;
				this.startTimer();
			}.bind(this));
			this.mp3Dom.play();
			this.stopTimer();
			this.startTimer();
			this.onplaying = true;
			this.mp3Dom.removeEventListener('canplay', this.canplay, false);
		},

		play() {
			if(!this.played){
				this.load();
				return ;
			}

			if(this.mp3Dom.paused && !this.onplaying){
				this.mp3Dom.play();
				this.stopTimer();
				this.startTimer();
				this.onplaying = true;
				return ;
			}

			this.mp3Dom.pause();
			this.stopTimer();
			this.onplaying = false;
		},

		switchCoverOrLyric() {
			this.showCover = !this.showCover;
		},

		handleVolume(level) {
			if(this.mp3Dom){
				this.mp3Dom.volume = level;
				return ;
			}
		}
	}
}
</script>

<style lang="scss">
	$base-color: rgb(212, 60, 51);
	.player {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9999;
		margin: 0 auto;
		height: 100%;
		background: hsla(0, 0%, 50%, .35) border-box;
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
							height: 0.22rem;
							max-width: 70%;
							margin: auto;
						}

						.artist{
							font-size: 0.1rem;
						}
					}
				}
			}

			.process-wrap{
				width: 100%;
				height: 0.58rem;
				margin-top: 3.54rem;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.current, .total{
					font-size: 0.06rem;
					color: white;
				}

				.process-bar{
					width: 2.12rem;
					height: 0.02rem;
					background-color: rgba(140, 140, 140, 0.7);
					position: relative;

					&:before{
						content: '';
						position: absolute;
					}

					.point{
						content: '';
						position: absolute;
						top: -0.07rem;
						left: -0.07rem;
						box-sizing: border-box;
						width: 0.15rem;
						height: 0.15rem;
						border: 0.05rem solid white;
						border-radius: 50%;
						background-color: $base-color;
					}
				}
			}

			.player-bar{
				height: 0.48rem;

				.icon{
					display: inline-block;
					line-height: 0.48rem;
					vertical-align: top;
				}

				.icon-prev, .icon-next{
					font-size: 0.26rem;
					color: white;
				}

				.icon-start, .icon-stop{
					font-size: 0.48rem;
					color: white;
					margin: 0 0.3rem;
				}
			}
		}


		.audio{
			display: none;
		}

		.fade-enter-active, .fade-leave-active{
			transition: opacity ease 0.5s;
		}

		.fade-enter, .fade-leave-active{
			opacity: 0;
		}

		.slide-fade-enter-active,
		.slide-fade-leave-active {
		  transition: transform 0.3s;
		}
		.slide-fade-enter,
		.slide-fade-leave-active {
		  transform: translateX(100%);
		}
	}
</style>
