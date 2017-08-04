<template lang="html">
  <div class="switch" :class="{active: active}" @click="_switch">
		<div class="circle"></div>
  </div>
</template>

<script>
export default {
  name: 'my-switch',

  props: {
    init: Boolean
  },

  data () {
    return {
      active: false
    }
  },

  mounted () {
    this.active = this.init || false
  },

  methods: {
    _switch () {
      this.active = !this.active
      this.$emit('switch', this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
$base-color: rgb(212, 60, 51);
.switch{
	width: 0.51rem;
	height: 0.31rem;
	background-color: white;
	border: 1px solid rgb(229, 229, 235);
	border-radius: 0.3rem;

	.circle{
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		box-shadow: 1px 1px 4px rgb(185, 185, 185);
		background-color: white;
		transition: all ease 0.3s;
		transform: translateX(0);
	}

	&.active{
		background-color: $base-color;

		.circle{
			transform: translateX(0.2rem);
		}
	}
}
</style>
