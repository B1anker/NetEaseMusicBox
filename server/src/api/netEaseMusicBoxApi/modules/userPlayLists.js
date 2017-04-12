import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const userPlayListsApi = KoaRouter();

/* 通过id获取y用户歌单
 * @param {String} id
 * @return {Promise}
 */
userPlayListsApi.get('/netEaseApi/userPlayLists', async(ctx, next) => {
	const url = 'weapi/user/playlist';
	const form = {
		"offset": ctx.query.offset || '0',
		"uid": ctx.query.id,
		"limit": ctx.query.limit || 20,
		"csrf_token": ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default userPlayListsApi;
