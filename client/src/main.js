// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('normalize.css');
require('@/scss/base/index.scss');
require('@/scss/common/index.scss');
Vue.config.productionTip = false;
import MyUI from '@/components/index';

Vue.use(MyUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
