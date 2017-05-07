<template lang="html">
  <div class="discover">
  	<search-bar></search-bar>
		<tab :list="tabList" @on-item-click="switchTab"></tab>
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
			tabList: ['个性推荐', '歌单', '主播电台', '排行榜'],
			tabListEn: ['personalized-recommend', 'personalized-recommend', 'personalized-recommend', 'all-ranking-list']
		}
	},

	methods: {
		switchTab(index) {
			this.$router.push(this.tabListEn[index]);
		}
	}
}
</script>

<style lang="scss">
.discover{
	position: relative;


}
</style>
