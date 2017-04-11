import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const hotPlayListsApi = KoaRouter();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
hotPlayListsApi.get('/netEaseApi/hotplaylist', async(ctx, next) => {
	const url = 'api/personalized/playlist';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default hotPlayListsApi;
