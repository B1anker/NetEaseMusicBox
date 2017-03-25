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

			</div>
		</div>
	</transition>
</template>

<script>
import Drag from './drag';
export default {
	props: {
		onplaying: Boolean
	},

	data() {
		return {
			level: 1,
			timer: null
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
				boundary: {
					min: (320 - 212) / 2 + 4.5,
					max: (320 - 212) / 2 + 212
				}
			});
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
			this.$emit('touchstart');
		},

		handleTouchstart() {
			this.$refs.lyric.addEventListener('touchend', this.emitTouchStart, false);
			this.timer = setTimeout(() => {
				this.$refs.lyric.removeEventListener('touchend', this.emitTouchStart, false);
			}, 300);
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
		}
	}
</style>
