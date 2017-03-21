import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const lyricApi = KoaRouter();

lyricApi.get('/netEaseApi/lyric', async(ctx, next) => {
	const url = 'weapi/song/lyric?csrf_token=';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		id: ctx.query.id,
		os: 'pc',
		lv: '-1',
		kv: '-1',
		tv: '-1',
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default lyricApi;
