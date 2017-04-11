import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/welcome/main';
import Home from '@/views/home/main';
import Discover from '@/components/discover/index';
import MyMusic from '@/components/my-music/index';
import Friends from '@/components/friends/index';
import Account from '@/components/account/index';
import Signin from '@/views/signin/main';
import Signup from '@/views/signup/main';
import Player from '@/views/player/main';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Welcome
    },
		{
			path: '/home',
			component: Home,
	    redirect: '/home/discover',
			children: [
				{
					path: 'discover',
					component: Discover
				},
				{
					path: 'my-music',
					component: MyMusic
				},
				{
					path: 'friends',
					component: Friends
				},
				{
					path: 'account',
					component: Account
				}
			]
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
