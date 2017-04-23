<template lang="html">
	<transition name="fade">
		<div class="lyric-wrap">
			<div class="volume-wrap">
				<i class="icon"></i>
				<div class="volume-bar">
					<div class="point" ref="volumePoint"></div>
				</div>
				<i class="icon"></i>
			</div>
			<div class="lyric" @touchstart="handleTouchstart" ref="lyric">
				<div class="lyric-container" v-html="temp" ref="roll"></div>
			</div>
		</div>
	</transition>
</template>

<script>

import Drag from './drag';
import { lyric } from '@/modules/request';

export default {
	props: {
		id: String
	},

	created() {
		this.handleLyrics(this.id);
	},

	computed: {
		playing() {
			return this.$store.getters.getPlayer.state;
		}
	},

	watch: {
		id(newId) {
			this.handleLyrics(newId);
			return newId;
		},

		playing(newState) {
			newState && this.roll();
			return newState;
		}
	},

	data() {
		return {
			level: 1,
			timer: null,
			times: [],
			lyrics: [],
			temp: '',
			count: 0
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.init();
			this.playing && this.roll();
		});
	},

	methods: {
		init() {
			this.volumeDrag = new Drag({
				el: this.$refs.volumePoint,
				parentNodeWidth: 212,
				boundary: {
					min: (320 - 212) / 2 + 4.5,
					max: (320 - 212) / 2 + 212
				}
			});

			if(localStorage.getItem('volume')){
				this.level = localStorage.getItem('volume');
				this.$refs.volumePoint.style.left = localStorage.getItem('volume') * 212 + 'px';
			}

			this.setVolume();
			this.$refs.volumePoint.style.left = this.level * 212 + 'px';
		},

		setVolume() {
			this.volumeDrag.end(function(e) {
				e.preventDefault();
				this.level = (this.$refs.volumePoint.offsetLeft / 212).toFixed(1);
				localStorage.setItem('volume', this.level);
				this.$emit('volume', this.level);
			}.bind(this));
		},

		emitTouchStart() {
			clearTimeout(this.timer);
			this.$emit('touchstart', this.level);
		},

		handleTouchstart() {
			this.$refs.lyric.addEventListener('touchend', this.emitTouchStart, false);
			this.timer = setTimeout(() => {
				this.$refs.lyric.removeEventListener('touchend', this.emitTouchStart, false);
			}, 300);
		},

		handleLyrics(id) {
			lyric(id).then((res) => {
				if (!res.data.lrc) {
					this.$message({
						message: '获取歌词失败',
						type: 'error',
						duration: 1000
					});
					return ;
				}
				this.times = res.data.lrc.lyric.match(/\[\d{2}\:\d{2}\.\d{2,3}\]/g).map((value) => {
					const time = value.slice(1, -1),
						min = Number(time.split(':')[0]),
						sec = Number(time.split(':')[1]);
					return (min * 60 + sec).toFixed(2);
				});

				this.lyrics = res.data.lrc.lyric.match(/\].*\n/g).map((value) => {
					if(value.length === 2){
						return '<p>&nbsp;</p>';
					}
					return `<p>${ value.slice(1, value.length + 1).trim() }</p>`;
				});
				this.renderLyrics();
			});
		},

		renderLyrics() {
			this.temp = '';
			this.lyrics.forEach((value, index) => {
				this.temp += value;
			});
		},

		roll() {
			const ps = this.$refs.roll.querySelectorAll('p');
			this.times.forEach((value, index) => {
				setTimeout(() => {
					this.$refs.roll.style.top = this.$refs.roll.offsetTop - '43' + 'px';
					if (index === 0) {
						ps[index].className = 'on';
					} else {
						ps[index - 1].className = '';
						ps[index].className = 'on';
					}
				}, value * 1000);
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.lyric-wrap{
		position: absolute;
		top: 0.45rem;
		width: 100%;
		height: 3.54rem;
		overflow: hidden;

		.volume-wrap{
			width: 2.12rem;
			height: 0.5rem;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.volume-bar{
				position: relative;

				&:before{
					content: '';
					display: block;
					height: 0.02rem;
					width: 2.12rem;
					background-color: rgba(140, 140, 140, 0.7);
				}

				.point{
					position: absolute;
					top: -0.045rem;
					left: -0.045rem;
					width: 0.09rem;
					height: 0.09rem;
					border-radius: 50%;
					background-color: white;
				}
			}
		}

		.lyric{
			height: 3.04rem;
			position: relative;
			overflow: hidden;

			.lyric-container{
				position: absolute;
				top: 0;
				left: 0;
				padding-top: 1.5rem;
				width: 100%;
			}
		}
	}
</style>
<style lang="scss">
	.lyric-container{
		p {
			font-size: 0.16rem;
			color: rgb(170, 170, 170);
			margin-top: 0.25rem;

			&.on{
				color: white;
			}
		}
	}
</style>
