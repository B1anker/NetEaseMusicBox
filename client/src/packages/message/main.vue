<template lang="html">
  <transition name="message">
		<div v-show="visible" class="message"
			@mouseenter="clearTimer"
      @mouseleave="startTimer">
			<i class="icon" :class="iconType"></i>
			<div class="text">{{ message }}</div>
	  </div>
  </transition>
</template>

<script>
export default {
	name: 'message',
	data() {
		return {
			visible: false,
      message: '',
      duration: 2000,
      type: 'correct',
      onClose: null,
      showClose: false,
      closed: false,
      timer: null
		};
	},
	computed: {
		iconType() {
			return 'icon-' + this.type;
		}
	},
	mounted() {
		this.startTimer();
	},
	watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },
	methods: {
		destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    }
	}
}
</script>

<style lang="scss" scoped>
	.message{
		$width: 1.78rem;
		$height: 0.98rem;
		$font-color: rgb(193, 196, 200);
		position: fixed;
		top: 1.15rem;
		left: calc(50% - #{$width / 2});
		width: $width;
		height: $height;
		text-align: center;
		border-radius: 0.1rem;
		background-color: rgba(0, 0, 0, 0.7);

		.icon{
			margin: 0.18rem 0 0.15rem 0;
			display: block;
			font-size: 0.35rem;
			color: $font-color;
		}

		.text{
			font-size: 0.16rem;
			color: $font-color;
		}
	}

	.message-enter-active, .message-leave-active{
		transition: all .3s ease;
	}

	.message-enter, .message-leave-active{
		transform: scale(0.3);
		opacity: 1;
	}
</style>
