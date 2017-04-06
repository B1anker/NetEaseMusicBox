import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/welcome/main'
import Home from '@/views/home/main'
import Signin from '@/views/signin/main'
import Signup from '@/views/signup/main'
import Player from '@/views/player/main'

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
		},
		{
			path: '/player:id',
			name: 'player',
			component: Player
		}
  ]
})
