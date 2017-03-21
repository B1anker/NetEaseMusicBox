import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const mp3UrlApi = KoaRouter();

mp3UrlApi.get('/netEaseApi/song', async(ctx, next) => {
	const url = 'weapi/song/enhance/player/url?csrf_token=';
	const ids = ctx.query.id;
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		ids: Array.isArray(ids) ? ids : [ids],
		br: 320000,
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	const songs = await fetchData(options);
	ctx.body = {
		code: songs.code,
		songs: songs.data
	}
});

export default mp3UrlApi;
