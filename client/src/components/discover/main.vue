<template lang="html">
  <div class="discover">
  	<search-bar></search-bar>
		<tab :list="tabList"></tab>
		<router-view></router-view>
  </div>
</template>

<script>
import Tab from '@/packages/tab';
import SearchBar from '@/components/search-bar/main';
export default {
	name: 'Discover',

	components: {
		Tab,
		SearchBar
	},

	data() {
		return {
			tabList: ['个性推荐', '歌单', '主播电台', '排行榜']
		}
	}
}
</script>

<style lang="scss">
.discover{
	position: relative;


}
</style>
