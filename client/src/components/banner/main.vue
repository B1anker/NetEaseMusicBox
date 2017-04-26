<template lang="html">
  <div class="banner">
		<swiper :options="swiperOption">
        <swiper-slide v-for="(banner, index) in banners" :key="banner.id">
        	<img class="img" :src="banner" :alt="banner.typeTitle">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getBanner } from '@/modules/request';
export default {
	name: 'banner',

	props: {
		banners: Array
	},

	components: {
		swiper,
		swiperSlide
	},

	data() {
		return {
			swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
				loop: true,
				autoplay: 3000,
				initialSlide: 0,
				autoplayDisableOnInteraction: false
      }
		}
	},

	computed: {
		width() {
			return (this.banners.length + 1) * 100 + '%';
		}
	},

	created() {

	}
}
</script>

<style lang="scss">
.banner{
	overflow: hidden;
	height: 1.25rem;

	.img{
		position: relative;
		top: -0.14rem;
		width: 100%;
		background-size: auto 100%;
	}

	.swiper-container{
		height: 1.25rem;
	}

	.swiper-pagination-bullet{
		background: rgba(200, 200, 200, 0.9);
	}

	.swiper-pagination-bullet-active{
		background: rgb(211, 58, 49);
	}
}
</style>
