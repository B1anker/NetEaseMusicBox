import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const hotPlayListsApi = KoaRouter();

/* 获取热门歌单
 * @return {Promise}
 */
hotPlayListsApi.get('/netEaseApi/hotplaylist', async(ctx, next) => {
	const url = 'api/personalized/playlist';
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
