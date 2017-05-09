<template lang="html">
  <div class="ranking-list">
  	<div class="netMusic common">
			<div class="title">云音乐官方榜</div>
			<div class="content">
				<div class="avatar">
					<img :src="netMusic.coverImgUrl" alt="云音乐官方榜">
				</div>
				<ul class="lists">
					<li class="list" v-for="(list, index) in cut(netMusic.tracks)">
						{{ `${ index + 1 }. ${ list.name } - ${ list.artists[0].name }` }}
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
			netMusic: {}
		}
	},

	created() {
		getRankingList(3).then((res) => {
			this.netMusic = res.data.result;
		});
	},

	methods: {
		cut(arr) {
			const result = [...arr];
			return result.splice(0, 3);
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
			float: left;
			display: flex;
			align-items: center;
			flex-direction: column;

			.list{
				text-align: left;
				padding: 0 0.1rem;
				font-size: 0.11rem;
				color: rgb(112, 112, 112);
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
}
</style>
