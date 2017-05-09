<template lang="html">
  <div class="ranking-list">
  	<div class="netMusic common">
			<div class="title">云音乐官方榜</div>
			<div class="content">
				<div class="avatar">
					<img :src="netMusic.coverImgUrl" alt="云音乐官方榜">
				</div>
				<ul class="lists">
					<li class="list" v-for="(list, index) in netMusicSummary">
						{{ `${ index + 1 }. ${ list.name } - ${ list.artists }` }}
					</li>
				</ul>
			</div>
  	</div>
  </div>
</template>

<script>
import { getRankingList } from '@/modules/request';
export default {
	name: 'ranking-list',

	data() {
		return {
			netMusic: {},
			netMusicSummary: []
		}
	},

	created() {
		getRankingList(3).then((res) => {
			this.netMusic = res.data.result;
			this.netMusicSummary = this.cut(this.netMusic.tracks);
		});
	},

	methods: {
		cut(arr) {
			const result = [...arr].splice(0, 3).map((item, index) => {
				if (item.album.artists.length === 1) {
					item.artists = item.album.artists[0].name;
				} else {
					item.artists = item.album.artists.reduce((prev, next) => {
						return prev.name + '/' + next.name;
					});
				}
				return item;
			});
			return result;
		}
	}
}
</script>

<style lang="scss" scoped>
$base-color: rgb(212, 60, 51);

.common{
	.title{
		position: relative;
		text-align: left;
		padding: 0.2rem 0 0.2rem 0.1rem;
		font-weight: bold;
		font-size: 0.15rem;

		&:before{
			content: '';
			position: absolute;
			left: 0;
			top: calc(0.275rem - 0.075rem);
			width: 0.02rem;
			height: 0.15rem;
			background-color: $base-color;
		}
	}

	.content{
		overflow: hidden;

		.avatar{
			text-align: left;
			float: left;

			img{
				float: left;
				width: 1.05rem;
				height: 1.05rem;
			}
		}

		.lists{
			width: 2.15rem;
			height: 1.05rem;
			float: left;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			border-bottom: 1px solid rgb(220, 220, 220);

			.list{
				text-align: left;
				padding: 0 0.1rem;
				font-size: 0.11rem;
				color: rgb(112, 112, 112);
				width: 2.15rem;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
}
</style>
