<template lang="html">
  <div class="controler-wrap" v-show="this.$store.getters.getControler">
		<i class="player-controler icon icon-player" @click="handleShow"></i>
  </div>
</template>

<script>
export default {
  name: 'controler',

  methods: {
    handleShow () {
      this.$store.dispatch('showPlayer', true)
    }
  }
}
</script>

<style lang="scss">
.controler-wrap{
	position: absolute;
	color: white;
	z-index: 1001;
	top: 0.1rem;
	right: 0.1rem;
	font-size: 0.25rem;
}
</style>
