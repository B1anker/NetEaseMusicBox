<template lang="html">
	<div class="personalized-recommend">
		<banner :banners="banners"></banner>
		<div class="recommend-playlist">
			<div class="title">
				<div class="text">推荐歌单<i class="icon icon-back"></i></div>
			</div>
			<ul class="playlists">
				<li class="playlist" v-for="(playlist, index) in playlists" @click="toPlayList(index)">
					<img :src="playlist.picUrl" :alt="playlist.name">
					<div class="name">{{ playlist.name }}</div>
					<span class="playcount">{{ transformNumber(playlist.playCount) }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Banner from '@/components/banner/main';
import { getHotPlayList, getBanner, getNewBanner } from '@/modules/request';
import Ls from '@/modules/utils/localStorage';
import axios from 'axios';
const ls = new Ls();
export default {
	components: {
		Banner
	},

	data() {
		return {
			banners: [],
			playlists: [],
			playListId: '0'
		}
	},

	mounted() {
		this.init();
	},

	methods: {
		init() {
			axios.all([getNewBanner(), getHotPlayList()]).then(axios.spread((banners, hotList) => {
				this.banners = banners;
				this.playlists = hotList.data.result;
			}));
		},

		transformNumber(num) {
			return Math.floor(num).toString().slice(0, -4) + '万';
		},

		toPlayList(index) {
			ls.set('playLists', {
				cover: this.playlists[index].picUrl
			});
			this.$router.push({ name: 'playlist', params: { id: this.playlists[index].id }});
		}
	}
}
</script>

<style lang="scss" scoped>
.personalized-recommend{
	overflow: scroll;
	height: 4.503rem;

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
		position: relative;
		z-index: 1;
		border-top: 1px solid rgb(226, 227, 228);

		.playlists{
			margin-top: -0.3rem;
			padding-bottom: 0.15rem;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.playlist{
				margin-top: 0.15rem;
				overflow: hidden;

				img{
					width: 1.03rem;
					height: 1.03rem;
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
