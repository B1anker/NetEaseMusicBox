<template>
<div class="hello">
	<input type="text" v-model="content" @keyup.enter="search">
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'hello',
  mounted() {
		axios.post('/music/signin', {
			id: 100,
			name: 'b1anker'
		}).then((res) => {
			console.log(res.data);
		}).catch((err) => {
			console.log(err);
		});
  },
  data() {
    return {
      content: '周杰伦'
    }
  },
	methods: {
		search() {
			axios.get(`/music/search?content=${ this.content }`).then((res) => {
				console.log(res.data.result.songs);
			}).catch((err) => {
				console.log(err);
			});
		}
	}
}
</script>

<style lang="scss">
</style>
