<template lang="html">
  <div class="ranking-list">
  	<div class="netMusic">

  	</div>
  </div>
</template>

<script>
import { getRankingList } from '@/modules/request';
export default {
	name: 'ranking-list',

	data() {
		return {

		}
	},

	created() {
		getRankingList(3).then((res) => {
			console.log(res)
		});
	}
}
</script>

<style lang="scss" scoped>
</style>
