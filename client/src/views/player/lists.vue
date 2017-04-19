<template lang="html">
  <div class="lists-wrap" v-if="listsShow">
  	<div class="tool">
  		<div class="play-way">单曲循环</div>
			<div class="favor">收藏</div>
			<div class="clear">清空</div>
  	</div>
		<ul class="lists">
			<li class="list"></li>
		</ul>
		<div class="close"></div>
  </div>
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
	}

}
</style>
