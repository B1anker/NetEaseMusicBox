<template lang="html">
  <div class="player">
		<div class="background-mask">
			<div class="head">
				<i class="icon icon-back"></i>
				<div class="music-base-info"></div>
				<i class="icon icon-share"></i>
			</div>
			<div class="disc-wrap"></div>
			<div class="player-bar"></div>
		</div>
		<div class="audio">
			<audio ref="mp3">
  			<source :src="url" type="audio/mpeg">
			</audio>
		</div>
  </div>
</template>

<script>
import { search } from '@/modules/request';

export default {
	name: 'player',
	mounted() {
		this.$nextTick(() => {
			this.init();
		});
	},
	data() {
		return {
			mp3Dom: null,
			artist: '',
			name: '',
			url: '',
			disc: '',
			blurPicUrl: ''
		}
	},
	methods: {
		init() {
			this.mp3Dom = this.$refs.mp3;
			search(418603077).then((res) => {
				const song = res.data.songs[0];
				this.url = song.url;
				try {
					this.mp3Dom.load();
					this.mp3Dom.play();
				} catch (e) {
					console.log(e);
				} finally {
					console.log('finish');
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.player {
		width: 100%;
		height: 100%;

		.head{
			height: 0.45rem;
			border-bottom: 1px solid rgb(120, 119, 113);
		}

		.audio{
			display: none;
		}
	}
</style>
