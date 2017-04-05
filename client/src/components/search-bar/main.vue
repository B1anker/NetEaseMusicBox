<template lang="html">
  <div class="search-bar">
		<div class="search">
			<div class="input-wrap">
				<i class="icon icon-search"></i>
				<input type="text"
					placeholder="搜索音乐、歌词"
					v-model="content"
					@click.stop="handleClick"
					@keyup.enter="handleSearch">
			</div>
		</div>
		<transition name="slide-down" v-if="historyShow">
			<div class="history">

			</div>
		</transition>
		<div class="slide-down" v-if="resultShow">
			<ul class="lists">
				<li class="list" v-for="(list, index) in lists" @click="playMusic(index)">
					<div class="info">
						<div class="name">{{ list.name }}</div>
						<div class="artist">{{ list.ar[0].name }}</div>
					</div>
					<div class="control"></div>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
import { search } from '@/modules/request';
export default {
	name: 'search-bar',

	data() {
		return {
			content: '',
			history: [],
			historyShow: false,
			resultShow: false,
			lists: []
		}
	},

	mounted() {
		this.history = JSON.parse(localStorage.getItem('history'));
		this.history = this.history ? this.history : [];
	},

	methods: {
		handleClick(e) {
			this.historyShow = true;
		},

		handleSearch() {
			this.historyShow = false;
			this.resultShow = true;
			search(this.content).then((res) => {
				console.log(this.history);
				this.history.push(this.content);
				localStorage.setItem('history', JSON.stringify(history));
				this.lists = res.data.result.songs;
			});
		},

		playMusic(index) {
			this.$router.push({ name: '/player', params: { id: this.lists[index].id }});
		}
	}
}
</script>

<style lang="scss" scoped>
	$base-color: rgb(232, 53, 53);
	.search-bar{

		.search{
			background-color: $base-color;
			padding: 0.08rem;

			.input-wrap{
				position: relative;
				display: inline-block;
				height: 0.3rem;
				width: 2.13rem;

				.icon{
					position: absolute;
					top: 0.08rem;
					left: 0.17rem;
					font-size: 0.14rem;
					color: rgb(211, 211, 211);
				}

				input{
					height: 100%;
					width: 100%;
					border-radius: 0.15rem;
					border: none;
					font-size: 0.14rem;
					text-indent: 0.38rem;
				}

			}

		}

		.history{
			width: 100%;
			height: 4.5rem;
		}


		.slide-down{
			width: 100%;
			height: 4.5rem;
			overflow: scroll;
			.lists{
				padding-left: 0.1rem;

				.list{
					height: 0.55rem;
					padding-top: 0.1rem;
					padding-bottom: 0.1rem;
					border-bottom: 1px solid rgb(225, 226, 227);

					.info{
						float: left;

						.name{
							text-align: left;
							font-size: 0.14rem;
							padding-bottom: 0.08rem;
						}

						.artist{
							text-align: left;
							font-size: 0.1rem;
							color: rgb(172, 172, 172);
						}
					}
				}
			}
		}

		.slide-down-enter-active, .slide-down-leave-active{
			transition: all ease 0.3s;
		}

		.slide-down-enter, .slide-down-leave{
			transform: translateX(-100%);
		}
	}
</style>
