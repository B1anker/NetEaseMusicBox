<template lang="html">
  <div class="button">
  	<button type="button" name="button" @click.stop.prev="emitClick">{{ val }}</button>
  </div>
</template>

<script>
export default {
  name: 'my-button',
  props: {
    val: String
  },
  data () {
    return {

    }
  },
  methods: {
    emitClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
	$base-color: rgb(232, 53, 53);
	.button{
		height: 0.42rem;
		width: 2.65rem;
		button{
			height: 100%;
			width: 100%;
			border-radius: 0.42rem;
			background: none;
			font-size: 0.16rem;
			border: 1px solid $base-color;
			color: $base-color;
			&:hover{
				color: white;
				cursor: pointer;
				background: $base-color;
			}
		}
	}
</style>
