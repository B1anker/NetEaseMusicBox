<template lang="html">
  <div class="tab-wrap">
		<ul class="tab">
			<li class="item"
				v-for="(item, index) in list"
				ref="item"
				:class="{'active': index === activeIndex}" @click="switchItem(index)">
				{{ item }}
			</li>
			<div class="line" :style="lineStyle"></div>
	  </ul>
  </div>
</template>

<script>
export default {
  name: 'tab',

  props: {
    list: Array,
    listEn: Array
  },

  data () {
    return {
      activeIndex: 0,
      computedList: [],
      lineStyle: {},
      currentList: ''
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },

  methods: {
    init () {
      this.handleRoute()
    },

    handleRoute () {
      const items = this.$route.path.split('/')
      this.currentList = items[items.length - 1]
      this.listEn.every((item, index) => {
        if (item === this.currentList) {
          this.setPosition(index)
          return false
        }
        return true
      })
    },

    setPosition (index) {
      this.computedList = this.$refs.item.map((item, index) => {
        return {
          width: item.offsetWidth,
          left: item.offsetLeft
        }
      })
      this.lineStyle = {
        width: this.computedList[index].width + 'px',
        transform: `translateX(${this.computedList[index].left}px)`
      }
    },

    switchItem (index) {
      this.activeIndex = index
      this.lineStyle = {
        width: this.computedList[index].width + 'px',
        transform: `translateX(${this.computedList[index].left}px)`
      }
      this.$nextTick(() => {
        this.$emit('on-item-click', index)
      })
    }
  }
}
</script>

<style lang="scss">
$base-color: rgb(212, 60, 51);
.tab-wrap{
	position: relative;
	border-bottom: 1px solid rgb(236, 237, 238);
	background-color: rgb(249, 249, 249);

	.tab{
		display: flex;
		height: 0.4rem;
		justify-content: space-around;

		.item{
			height: 0.4rem;
			line-height: 0.4rem;
			font-size: 0.15rem;

			&.active{
				color: $base-color;
			}
		}
	}

	.line{
		position: absolute;
		bottom: 0;
		left: 0;
		height: 0.02rem;
		transition: transform ease 0.3s, width ease 0.3s;
		transform: translateX(0);
		background-color: $base-color;
	}
}
</style>
