import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/welcome/welcome'
import Home from '@/views/home/home'
import Signin from '@/views/signin/signin'
import Signup from '@/views/signup/signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome
    },
		{
			path: '/home',
			component: Home
		},
		{
			path: '/signin',
			component: Signin
		},
		{
			path: '/signup',
			component: Signup
		}
  ]
})
