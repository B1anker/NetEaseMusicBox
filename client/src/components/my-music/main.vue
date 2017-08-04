<template lang="html">
	<div class="my-music">
		<div class="top">我的音乐</div>
		<div class="content-wrap" ref="content">
			<div class="">
				<div class="create common">
					<div class="head" @click.stop.prev="toggleCreate">
						<i class="icon icon-back" :class="{hide: !createShow}"></i>
						<div class="playlist-type">我创建的歌单({{ create.length }})</div>
					</div>
					<ul class="lists" v-show="createShow">
						<li class="list" v-for="(item, index) in create" @click="toPlayList(index, 'create')">
							<div class="left">
								<img class="cover" :src="item.coverImgUrl" :alt="item.name">
							</div>
							<div class="right">
								<div class="name">{{ item.name }}</div>
								<div class="count">{{ item.trackCount + '首' }}</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="subscribe common">
					<div class="head" @click="toggleSubscribe">
						<i class="icon icon-back" :class="{hide: !subscribeShow}"></i>
						<div class="playlist-type">我收藏的歌单({{ subscribe.length }})</div>
					</div>
					<ul class="lists" v-show="subscribeShow">
						<li class="list" v-for="(item, index) in subscribe" @click="toPlayList(index, 'subscribe')">
							<div class="left">
								<img class="cover" :src="item.coverImgUrl" :alt="item.name">
							</div>
							<div class="right">
								<div class="name">{{ item.name }}</div>
								<div class="count">{{ item.trackCount + '首' }}</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import { userPlayListsApi } from '@/modules/request'
import Ls from '@/modules/utils/localStorage'
const ls = new Ls()
export default {
  name: 'my-music',

  data () {
    return {
      user: {},
      create: [],
      subscribe: [],
      createShow: true,
      subscribeShow: true,
      scrollInstance: null
    }
  },

  mounted () {
    this.init()
  },

  methods: {
    init () {
      this.user = JSON.parse(localStorage.getItem('user'))
      if (this.user.code !== 200) {
        return
      }
      userPlayListsApi(this.user.account.id).then((res) => {
        if (!res.data) {
          this.$message({
            message: '获取用户歌单失败',
            type: 'error',
            duration: 1000
          })
          return
        }
        this.create = res.data.playlist.filter((item, index) => {
          return item.userId === this.user.account.id
        })
        this.subscribe = res.data.playlist.filter((item, index) => {
          return item.userId !== this.user.account.id
        })
        this.$nextTick(() => {
          this.scrollInstance = new BScroll(this.$refs.content, {
            startX: 0,
            startY: 0,
            scrollY: true,
            click: false,
            probeType: 2
          })
        })
      })
    },

    filterPlayList (arr, type) {
      return arr.filter((item, index) => {
        return item.userId === type
      })
    },

    toggleCreate () {
      this.createShow = !this.createShow
    },

    toggleSubscribe () {
      this.subscribeShow = !this.subscribeShow
    },

    toPlayList (index, type) {
      if (type === 'create') {
        ls.set('playLists', {
          cover: this.create[index].coverImgUrl
        })
        this.$router.push({name: 'playlist', params: { id: this.create[index].id }})
      } else {
        ls.set('playLists', {
          cover: this.subscribe[index].coverImgUrl
        })
        this.$router.push({name: 'playlist', params: { id: this.subscribe[index].id }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.my-music{

	.content-wrap{
		overflow: scroll;
		height: calc(100% - 0.46rem - 0.5rem);
	}

	.top{
		height: 0.46rem;
		line-height: 0.5rem;
		background: rgb(212, 60, 51);
		font-size: 0.18rem;
		color: white;
	}

	.common {

		.head {
			position: relative;

			.icon{
				position: absolute;
				display: block;
				line-height: 0.13rem;
				transition: transform ease 0.3s;
				transform: rotateZ(-90deg);
				top: 0.08rem;
				left: 0.08rem;
				font-weight: bold;
				font-size: 0.13rem;

				&.hide{
					transform: rotateZ(-180deg);
				}

			}

			.playlist-type{
				height: 0.3rem;
				line-height: 0.3rem;
				text-align: left;
				text-indent: 0.3rem;
				background-color: rgb(239, 240, 241);
				font-size: 0.13rem;
				color: rgb(86, 86, 86);
			}

		}

		.lists{
			padding-bottom: 0.05rem;

			.list{
				text-align: left;

				.left{
					float: left;

					.cover{
						padding: 0.05rem;
						height: 0.55rem;
						width: 0.55rem;
					}
				}

				.right{
					overflow: hidden;
					padding-right: 0.2rem;
					margin-left: 0.6rem;
					height: 0.55rem;
					border-bottom: 1px solid rgb(228, 229, 230);

					.name{
						margin-top: 0.12rem;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 0.15rem;
						font-weight: bold;
					}

					.count{
						margin-top: 0.03rem;
						font-size: 0.1rem;
						color: rgb(126, 126, 126);
					}

				}

			}

		}

	}
}
</style>
