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
		list: Array
	},

	data() {
		return {
			activeIndex: 0,
			computedList: [],
			lineStyle: {}
		}
	},

	mounted() {
		this.$nextTick(() => {
			this.init();
		});
	},

	methods: {
		init() {
			this.computedList = this.$refs.item.map((item, index) => {
				return {
					width: item.offsetWidth,
					left: item.offsetLeft
				};
			});
			this.lineStyle = {
				width: this.computedList[0].width + 'px',
				transform: `translateX(${ this.computedList[0].left }px)`
			};
		},

		switchItem(index) {
			this.activeIndex = index;
			this.lineStyle = {
				width: this.computedList[index].width + 'px',
				transform: `translateX(${ this.computedList[index].left }px)`
			};
			this.$emit('on-item-click', index);
			this.$nextTick(() => {
		}
	}
}
</script>

<style lang="scss">
$base-color: rgb(212, 60, 51);
.tab-wrap{
	position: relative;

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
