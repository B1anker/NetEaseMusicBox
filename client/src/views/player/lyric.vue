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
				<div class="lyric-container" v-html="temp" ref="roll" :style="rollStyle"></div>
			</div>
		</div>
	</transition>
</template>

<script>

import Drag from './drag';
import { lyric } from '@/modules/request';

export default {
	props: {
		id: String,
		current: Number
	},

	data() {
		return {
			level: 1,
			timer: null,
			times: [],
			lyrics: [],
			temp: '',
			count: 0,
			index: 0,
			rollStyle: 'transform: translateY(0)',
			lyricTimer: null,
			ps: []
		}
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

		current(newVal, oldVal) {
			if (Math.abs(newVal - oldVal) > 1) {
				this.setIndex(newVal);
				this.rollStyle = `transform: translateY(-${ ++this.index * 43 + 'px' })`;
			}
			if (newVal <= Number(this.times[this.times.length - 1]) && newVal >= Number(this.times[this.index])) {
				if (this.index === 0) {
					this.ps[this.index].className = 'on';
				} else {
					this.ps[this.index - 1].className = '';
					this.ps[this.index].className = 'on';
				}
				this.rollStyle = `transform: translateY(-${ ++this.index * 43 + 'px' })`;
				if (this.index === this.times.length - 1) {
					this.index = 0;
				}
			}
			return newVal;
		}
	},


	mounted() {
		this.$nextTick(() => {
			this.init();
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

			this.setVolume();
		},

		setVolume() {
			if (localStorage.getItem('volume')) {
				this.level = localStorage.getItem('volume');
				this.$refs.volumePoint.style.left = localStorage.getItem('volume') * 212 + 'px';
			}
			this.volumeDrag.end(function(e) {
				e.preventDefault();
				this.level = (this.$refs.volumePoint.offsetLeft / 212).toFixed(1);
				localStorage.setItem('volume', this.level);
				this.$emit('volume', this.level);
			}.bind(this));
			this.$refs.volumePoint.style.left = this.level * 212 + 'px';
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
			this.$nextTick(() => {
				this.ps = this.$refs.roll.querySelectorAll('p');
			});
		},

		setIndex(current) {
			this.times.some((item, index) => {
				if (current >= item) {
					this.index = index;
					return true;
				}
				return false;
			})
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
					top: -0.038rem;
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
				transition: transform 0.1s ease;
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
