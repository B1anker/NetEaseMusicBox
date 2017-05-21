import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

import {req} from '../req'

const subcountApi = KoaRouter();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
subcountApi.get('/netEaseApi/subcount', async(ctx, next) => {
	const url = 'weapi/subcount';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		userId: ctx.query.id,
		csrf_token: ''
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	console.log(cookie);
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await req(options);
});

export default subcountApi;
