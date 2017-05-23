<template lang="html">
	<transition name="slide-fade">
  	<div class="history">
		<div class="head">
			<div class="title">
				<i class="icon icon-back" @click.stop="handleBack"></i>
				听歌记录
			</div>
			<div class="operate"></div>
		</div>
		<div class="lists-wrap">
			<div class="lists" ref="lists">
				<ul>
					<li class="list" v-for="(track, index) in tracks" @click="playMusic(index)">
						<span class="num">{{ index + 1 }}</span>
						<div class="song">{{ track.song.name }}</div>
						<div class="artist-and-album">{{ `${ track.song.ar[0].name } - ${ track.song.al.name }` }}</div>
						<span class="count">{{ track.count }}次</span>
					</li>
				</ul>
			</div>
		</div>
  </div>
	</transition>
</template>

<script>
import playList from '@/modules/mixins/playList';
import Ls from '@/modules/utils/localStorage';
import { history } from '@/modules/request';
import BScroll from 'better-scroll';
export default {
	name: 'history',

	mixins: [playList],

	data() {
		return {
			playlist: {},
			scrollInstance: null,
			tracks: []
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init(id) {
			const ls = new Ls();
			history('get', {
				username: ls.get('user').profile.nickname
			}).then((res) => {
				const tracks = res.data[0].tracks
				this.tracks = this.insertionSort(tracks);
				this.scroll();
			});
		},

		insertionSort(arr) {
	    let len = arr.length;
	    let preIndex, current;
	    for (let i = 1; i < len; i++) {
	        preIndex = i - 1;
	        current = arr[i].count;
	        while(preIndex >= 0 && arr[preIndex].count < current) {
	            arr[preIndex+1].count = arr[preIndex].count;
	            preIndex--;
	        }
	        arr[preIndex+1].count = current;
	    }
	    return arr;
		},

		handleBack() {
			this.$router.back();
		},

		playMusic(index) {
			const tracks = this.tracks.map((item, index) => {
				return item.song;
			});
			this.setList(tracks, index);
			this.$store.dispatch('setPlayer', {
				songId: tracks[index].id,
				show: true,
				state: 1
			});
		},

		scroll() {
			this.$nextTick(() => {
				this.scrollInstance = new BScroll(this.$refs.lists, {
					startX: 0,
					startY: 0,
					scrollY: true,
					click: false,
					probeType: 2
				});
			})
		}
	}
}
</script>

<style lang="scss" scoped>
$base-color: rgb(232, 53, 53);
.history{
	.head{
		height: 0.45rem;
		background-color: $base-color;

		.title{
			font-size: 0.18rem;
			line-height: 0.45rem;
			color: white;
			margin-bottom: 0.25rem;

			.icon{
				position: absolute;
				font-size: 0.24rem;
				top: 0.11rem;
				left: 0.2rem;
				font-weight: bold;
			}
		}
	}

	.lists-wrap{
		width: 100%;
	  background: white;

		.lists{
			padding-left: 0.4rem;
			height: 4.73rem;
			overflow: scroll;

			.list{
				height: 0.54rem;
				text-align: left;
				position: relative;
				border-top: 1px solid rgb(241, 242, 243);

				.num{
					position: absolute;
					left: -0.25rem;
					top: 0.2rem;
					font-size: 0.15rem;
					color: rgb(145, 145, 145);
				}

				.song{
					margin-top: 0.1rem;
					margin-bottom: 0.07rem;
					padding-right: 0.1rem;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 0.15rem;
				}

				.artist-and-album{
					overflow: hidden;
					padding-right: 0.13rem;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 0.11rem;
					color: rgb(137, 137, 137);
				}

				.count{
					position: absolute;
					top: 0.22rem;
					right: 0.1rem;
					font-size: 0.1rem;
					color: rgb(127, 128, 129);
				}
			}
		}
	}
}


.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: transform 0.3s;
}
.slide-fade-enter,
.slide-fade-leave-active {
	transform: translateX(100%);
}
</style>
