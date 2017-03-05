import api from './NetEaseMusicBoxApi/api';
import Koa form 'koa';

api.search('年度之歌').then((res) => {
	let song = res.result.songs[0].id;
	console.log(song)
	api.song(song).then((res) => {
		console.log(res);
	}).catch((err) => {
		console.log(err);
	});
}).catch((err) => {
	console.log(err);
});
