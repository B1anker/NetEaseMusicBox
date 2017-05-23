<template lang="html">
  <transition name="slide-up">
		<div class="lists-wrap" v-show="$store.getters.getPlayer.lists.show">
			<div class="mask" @click="close"></div>
	  	<div class="tool">
	  		<div class="play-way">单曲循环</div>
				<div class="favor">收藏</div>
				<div class="clear">清空</div>
	  	</div>
			<div class="lists" ref="lists">
				<ul>
					<li class="list" :class="{active: index === _index}" v-for="(list, index) in lists" @click="switchMusic(index)">
						<span class="music-name">{{ list.name }}</span>
						<span class="split">-</span>
						<span class="artist">{{(list.ar && list.ar[0].name) || (list.artists && list.artists[0].name) }}</span>
					</li>
				</ul>
			</div>
			<div class="close" @click="close">关闭</div>
	  </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll';
import axios from 'axios';
export default {
	name: 'lists',

	props: {
		lists: Array
	},

	data() {
		return {
			listsShow: false
		}
	},

	computed: {
		_index() {
			return this.$store.getters.getPlayer.lists.index;
		}
	},

	mounted() {
		this.scroll();
	},

	methods: {
		close() {
			this.$store.dispatch('setLists', {
				show: false
			});
		},

		switchMusic(index) {
			this.$store.dispatch('setPlayer', {
				songId: this.lists[index].id
			});
			this.$store.dispatch('setLists', {
				index
			});
			this.close();
		},

		scroll() {
			this.$nextTick(() => {
				this.scrollInstance = new BScroll(this.$refs.lists, {
					startX: 0,
					startY: 0,
					scrollY: true,
					click: true,
					probeType: 2
				});
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$base-color: rgb(212, 60, 51);
.lists-wrap {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 999;
	overflow: hidden;

	.mask{
		width: 100%;
		height: calc(100% - 3.55rem);
		background-color: rgba(0, 0, 0, 0.3);
	}

	.tool {
		height: 0.5rem;
		font-size: 0.15rem;
		border-bottom: 1px solid rgb(212, 205, 207);
		background: rgba(255, 255, 255, 0.9);
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
		overflow: scroll;
		height: 2.5rem;
		padding-left: 0.1rem;
		background: rgba(255, 255, 255, 0.9);

		.list {
			height: 0.45rem;
			line-height: 0.45rem;
			border-bottom: 1px solid rgb(212, 205, 207);
			text-align: left;

			&.active{
				.music-name, .split, .artist {
					color: $base-color;
				}
			}

			&:last-child{
				border-bottom: none;
			}

			.music-name{
				font-size: 0.16rem;
			}

			.split{
				margin: 0 0.05rem;
				font-size: 0.11rem;
				color: rgb(92, 92, 92);
			}

			.artist{
				font-size: 0.11rem;
				color: rgb(118, 118, 118);
			}

		}

	}

	.close {
		background: rgba(255, 255, 255, 0.9);
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
