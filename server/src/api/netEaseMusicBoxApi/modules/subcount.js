import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

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
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default subcountApi;
