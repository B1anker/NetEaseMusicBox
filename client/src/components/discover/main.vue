<template lang="html">
  <div class="discover">
  	<search-bar></search-bar>
		<div class="recommend-playlist">
			<div class="title">
				<div class="text">推荐歌单<i class="icon icon-back"></i></div>
			</div>
			<ul class="playlists">
				<li class="playlist" v-for="(playlist, index) in playlists">
					<img :src="playlist.picUrl" :alt="playlist.name">
					<div class="name">{{ playlist.name }}</div>
					<span class="playcount">{{ transformNumber(playlist.playCount) }}</span>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
import SearchBar from '@/components/search-bar/main';
import { getHotPlayList } from '@/modules/request';
export default {
	name: 'Discover',

	components: {
		SearchBar
	},

	data() {
		return {
			playlists: []
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init() {
			getHotPlayList().then((res) => {
				this.playlists = res.data.result;
			});
		},

		transformNumber(num) {
			return Math.floor(num).toString().slice(0, -4) + '万';
		}
	}
}
</script>

<style lang="scss">
.discover{

	.title{
		height: 0.5rem;

		.text{
			margin-top: 0.2rem;
			text-align: left;
			text-indent: 0.08rem;
			border-left: 0.02rem solid rgb(207, 0, 0);
			font-size: 0.17rem;

			.icon{
				display: inline-block;
				vertical-align: top;
				transform: rotate(180deg);
				font-size: 0.14rem;
				font-weight: bold;
				margin-left: 0.1rem;
				line-height: 0.17rem;
			}
		}
	}

	.recommend-playlist{
		border-top: 1px solid rgb(226, 227, 228);

		.playlists{
			margin-top: -0.3rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.playlist{
				margin-top: 0.15rem;
				overflow: hidden;

				img{
					width: 1.05rem;
					height: 1.05rem;
					background-size: 1005；
				}

				.name{
					overflow: hidden;
					padding: 0.07rem;
					display: -webkit-box;
 					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					width: 1.05rem;
					height: 0.32rem;
					text-align: left;
					font-size: 0.12rem;
					text-overflow: ellipsis;
				}
			}
		}
	}
}
</style>
