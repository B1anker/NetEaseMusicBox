<template lang="html">
  <transition name="pop">
		<div v-if="visible" class="message" @click="hide">
			<i class="icon icon-error"></i>
			<div class="text">{{ this.text }}</div>
	  </div>
  </transition>
</template>

<script>
import { catIn } from '@/modules/util';
export default {
	name: 'message',
	props: {
		text: String,
		messageVisible: Boolean
	},
	data() {
		return {
			visible: false
		};
	},
	mounted() {
		this.visible = this.messageVisible;
	},
	methods: {
		hide() {
			this.visible = false;
				console.log(this.visible);
		}
	},
	watch: {
		messageVisible(newVal) {
			this.visible = newVal;
			return newVal;
		}
	}
}
</script>

<style lang="scss" scoped>
	.message{
		$width: 1.78rem;
		$height: 0.98rem;
		position: fixed;
		top: 1.15rem;
		left: calc(50% - #{$width / 2});
		width: $width;
		height: $height;
		border-radius: 0.1rem;
		background-color: rgba(0, 0, 0, 0.7);

		.icon{
			margin: 0.18rem 0 0.15rem 0;
			display: block;
			font-size: 0.35rem;
			color: white;
		}

		.text{
			font-size: 0.16rem;
			color: white;
		}
	}

	.pop-enter-active, .pop-leave-active{
		transition: all .3s ease;
	}

	.pop-enter, .pop-leave-active{
		transform: scale(0.3);
		opacity: 1;
	}
</style>
