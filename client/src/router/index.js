import Vue from 'vue';
import Router from 'vue-router';
import Welcome from '@/views/welcome/main';
import Home from '@/views/home/main';
import Discover from '@/components/discover/index';
import PersonalizedRecommend from '@/components/discover/personalizedRecommend';
import AllRankingList from '@/components/discover/rankingList';
import MyMusic from '@/components/my-music/index';
import Friends from '@/components/friends/index';
import Account from '@/components/account/index';
import Signin from '@/views/signin/main';
import Signup from '@/views/signup/main';
import Player from '@/views/player/main';
import PlayList from '@/components/playlist';
import RankingList from '@/components/rankingList';
import History from '@/components/history';

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
	    redirect: '/home/discover/personalized-recommend',
			children: [
				{
					path: 'discover',
					component: Discover,
					redirect: '/home/discover/personalized-recommend',
					children: [
						{
							path: 'personalized-recommend',
							component: PersonalizedRecommend
						},{
							path: 'all-ranking-list',
							component: AllRankingList
						}
					]
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
			path: '/player',
			name: 'player',
			component: Player
		},
		{
			path: '/playlist:id',
			name: 'playlist',
			component: PlayList
		},
		{
			path: '/rankingList:id',
			name: 'rankingList',
			component: RankingList
		},
		{
			path: '/history',
			name: 'history',
			component: History
		}
  ]
})
