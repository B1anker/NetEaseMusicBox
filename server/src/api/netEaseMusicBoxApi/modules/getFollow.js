import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const getFollowApi = KoaRouter();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
getFollowApi.post('/netEaseApi/getFollows', async(ctx, next) => {
	const url = 'weapi/user/getfollows/' + ctx.request.body.id;
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		offset: ctx.request.body.offset || '0',
		limit: ctx.request.body.limit || 1000,
		order: true
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

export default getFollowApi;
