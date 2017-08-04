<template lang="html">
	<transition name="fade">
		<div class="cover-wrap">
			<div class="stick" :class="{active: onplaying}" ref="stick" @touchstart="handleTouchstart"></div>
			<div class="disc-wrap" ref="rotateDom" @touchstart="handleTouchstart">
				<img :src="picUrl" alt="music">
			</div>
			<div class="favor-bar">
				<i class="icon icon-favor"></i>
				<i class="icon icon-comment" @click="showComments"></i>
				<i class="icon icon-option"></i>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
  name: 'cover',

  props: {
    onplaying: Boolean,
    picUrl: String
  },

  mounted () {
    if (this.onplaying) {
      this.$refs.rotateDom.style.animationPlayState = 'running'
    } else {
      this.$refs.rotateDom.style.animationPlayState = 'paused'
    }
  },

  data () {
    return {
      showCover: true,
      timer: null
    }
  },

  watch: {
    onplaying (newVal) {
      if (newVal) {
        this.$refs.rotateDom.style.animationPlayState = 'running'
      } else {
        this.$refs.rotateDom.style.animationPlayState = 'paused'
      }
    }
  },

  methods: {
    emitTouchStart () {
      clearTimeout(this.timer)
      this.$emit('touchstart')
    },

    handleTouchstart () {
      this.$refs.stick.addEventListener('touchend', this.emitTouchStart, false)
      this.$refs.rotateDom.addEventListener('touchend', this.emitTouchStart, false)
      this.timer = setTimeout(() => {
        this.$refs.stick.removeEventListener('touchend', this.emitTouchStart, false)
        this.$refs.rotateDom.removeEventListener('touchend', this.emitTouchStart, false)
      }, 300)
    },

    showComments () {
      this.$store.dispatch('setPlayer', {
        comments: {
          show: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$base-color: rgb(212, 60, 51);
.cover-wrap{
	position: absolute;
	width: 100%;
	top: 0.45rem;
	left: 0;
	overflow: hidden;

	.stick{
		position: absolute;
		z-index: 10;
		width: 100%;
		height: 1.33rem;
		overflow: hidden;

		&:after{
			content: '';
			position: absolute;
			width: 0.85rem;
			height: 1.33rem;
			top: -0.09rem;
			left: 1.48rem;
			background: url('../../assets/stick.png');
			background-size: 100% 100%;
			background-position: -11px -11px;
			background-repeat: no-repeat;
			transition: transform ease 0.3s;
			transform: rotate(-45deg);
			transform-origin: 10px 10px;
		}

		&.active:after{
			transform: rotate(-4deg);
		}
	}

	.disc-wrap {
		@keyframes rotateAnimation {
			from {
				transform: rotate(0);
			}
			to {
				transform: rotate(360deg);
			}
		}

		$size: 2.25rem;
		margin: 0.56rem auto 0.45rem auto;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.7);
		width: $size;
		height: $size;
		background: url('../../assets/disc.png');
		background-clip: padding-box;
		background-size: 100% 100%;
		border-radius: 50%;
		animation: rotateAnimation 18s linear infinite;

		img{
			height: 74%;
  		width: 74%;
			border: 0.05rem solid black;
			border-radius: 50%;
		}

		&:before{
			$size: 2.5rem;
			content: '';
			position: absolute;
			top: -0.125rem;
			left: -0.125rem;
			width: $size;
			height: $size;
			border-radius: 50%;
			background-color: rgba(255, 255, 255, 0.1);
			box-shadow: 0 0 0.1rem rgba(130, 130, 130, 0.7);
		}
	}

	.favor-bar{
		width: 100%;
		height: 0.28rem;
		display: flex;
		justify-content: space-around;

		.icon{
			font-size: 0.2rem;
			font-weight: bold;
			color: rgb(210, 211, 207);
		}

		.icon-favor{
			color: $base-color;
		}
	}
}
</style>
