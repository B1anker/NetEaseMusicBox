import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const getEventApi = KoaRouter();

getEventApi.get('/netEaseApi/event', async(ctx, next) => {
	const url = 'weapi/v1/event/get?csrf_token=';
	/**
	 * 用户动态api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		'time': -1,
		'offset': ctx.query.offset || '0',
		'pagesize': ctx.query.limit || 20,
		'getcounts': true,
		"csrf_token": ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json',
		cookie,
		method: 'POST'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default getEventApi;
