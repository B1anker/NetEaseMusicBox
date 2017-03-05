<template>
<div class="hello">
	hello
</div>
</template>

<script>
import {api} from 'NeteaseCloudMusicApi'

export default {
  name: 'hello',
  mounted() {
		api.search('年度之歌',data => {
		    console.log(data)
		})
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
</style>
