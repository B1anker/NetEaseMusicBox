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
			<span class="cancel" v-show="cancelShow" @click="cancel">取消</span>
		</div>
		<transition name="slide-down" v-if="historyShow">
			<div class="history">
				<ul class="histories">
					<li class="history" v-for="(history, index) in histories">
						<i class="icon icon-time"></i>
						<div class="text" @click="handleSearch(history)">{{ history }}</div>
						<i class="icon icon-cross" @click="deleteHistory(index)"></i>
					</li>
				</ul>
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
import { search } from '@/modules/request'
import { uniq } from '@/modules/utils/util'
export default {
  name: 'search-bar',

  data () {
    return {
      content: '',
      histories: [],
      historyShow: false,
      resultShow: false,
      lists: [],
      cancelShow: false
    }
  },

  mounted () {
    this.histories = JSON.parse(localStorage.getItem('histories'))
    this.histories = this.histories ? this.histories : []
  },

  methods: {
    handleClick (e) {
      this.$store.dispatch('showControler', false)
      this.historyShow = true
      this.resultShow = false
      this.cancelShow = true
    },

    handleSearch (history) {
      if ((Object.prototype.toString.call(history).slice(8, -1) === 'KeyboardEvent') && !this.content.trim()) {
        return
      }
      this.historyShow = false
      this.resultShow = true

      if (Object.prototype.toString.call(history).slice(8, -1) === 'String') {
        search(history).then((res) => {
          this.content = history
          this.lists = res.data.result.songs
        })
        return
      }

      search(this.content).then((res) => {
        this.histories.push(this.content)
        this.histories = uniq(this.histories)
        localStorage.setItem('histories', JSON.stringify(this.histories))
        this.lists = res.data.result.songs
      })
    },

    playMusic (index) {
      this.$store.dispatch('setPlayer', {
        songId: this.lists[index].id,
        show: true,
        state: 1
      })
    },

    deleteHistory (index) {
      this.histories.splice(index, 1)
      localStorage.setItem('histories', JSON.stringify(this.histories))
    },

    cancel () {
      this.content = ''
      this.cancelShow = false
      this.historyShow = false
      this.resultShow = false
      this.$store.dispatch('showControler', true)
    }
  }
}
</script>

<style lang="scss" scoped>
	$base-color: rgb(232, 53, 53);
	.search-bar{
		position: relative;

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

			.cancel{
				position: absolute;
				right: 0.1rem;
				top: 0;
				height: 0.46rem;
				line-height: 0.46rem;
				font-size: 0.18rem;
				color: white;
			}

		}

		.history{
			position: absolute;
			z-index: 999;
			width: 100%;
			background-color: white;
			height: 4.5rem;

			.histories{
				width: 100%;
				padding-left: 0.1rem;

				.history{
					position: relative;
					width: 100%;
					height: 0.45rem;
					text-align: left;
					line-height: 0.45rem;
					font-size: 0.14rem;
					border-bottom: 1px solid rgb(231, 232, 233);

					.text{
						display: inline-block;
						width: 2.57rem;
					}

					.icon{
						display: inline-block;
						vertical-align: top;
						font-size: 0.16rem;
						line-height: 0.45rem;
						color: rgb(213, 214, 214);
					}

					.icon-time{
						margin-right: 0.05rem;
					}
				}
			}
		}


		.slide-down{
			position: absolute;
			background-color: white;
			z-index: 999;
			width: 100%;
			height: 4.75rem;
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
