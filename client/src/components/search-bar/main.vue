<template lang="html">
  <div class="search-bar">
		<div class="search">
			<div class="input-wrap">
				<i class="icon icon-search"></i>
				<input type="text" placeholder="搜索音乐、歌词" v-model="content">
			</div>
		</div>
		<div class="slide-down"></div>
  </div>
</template>

<script>
export default {
	name: 'search-bar',
	data() {
		return {
			content: ''
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

	}
</style>
