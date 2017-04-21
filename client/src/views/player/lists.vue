<template lang="html">
  <transition name="slide-up">
		<div class="lists-wrap" v-if="$store.getters.getPlayer.lists.show">
	  	<div class="tool">
	  		<div class="play-way">单曲循环</div>
				<div class="favor">收藏</div>
				<div class="clear">清空</div>
	  	</div>
			<ul class="lists">
				<li class="list"></li>
			</ul>
			<div class="close" @click="close">关闭</div>
	  </div>
  </transition>
</template>

<script>
import axios from 'axios';
export default {
	name: 'lists',

	data() {
		return {
			listsShow: false
		}
	},

	mounted() {

	},

	methods: {
		close() {
			this.$store.dispatch('setLists', {
				show: false
			});
		}
	}
}
</script>

<style lang="scss" scoped>
.lists-wrap {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 3.55rem;
	z-index: 999;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.8);

	.tool {
		height: 0.5rem;
		font-size: 0.15rem;
		border-bottom: 1px solid rgb(212, 205, 207);
		overflow: hidden;

		.play-way, .favor, .clear {
			line-height: 0.5rem;
		}

		.play-way {
			margin-left: 0.1rem;
			float: left;
		}

		.favor {
			margin-left: 0.7rem;
			float: left;
		}

		.clear {
			margin-right: 0.1rem;
			float: right;
		}
	}

	.lists {
		overflow: hidden;
		height: 2.5rem;
		padding-left: 0.1rem;

		.list {
			height: 0.45rem;
			border-bottom: 1px solid rgb(212, 205, 207);
		}

	}

	.close {
		height: 0.55rem;
		font-size: 0.18rem;
		line-height: 0.55rem;
		border-top: 1px solid rgb(209, 202, 207);
	}

}

.slide-up-enter-active, .slide-up-leave-active{
	transition: transform 0.3s ease;
}

.slide-up-enter, .slide-up-leave-active{
	transform: translateY(100%);
}
</style>
