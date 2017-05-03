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
 		'offset': ctx.request.query.offset || '0',
 		'pagesize': ctx.request.query.limit || 20,
 		'getcounts': true,
 		"csrf_token": ""
 	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const csrf_token = cookie.split('=')[2];
	console.log(csrf_token);
	const options = Object.assign({}, {
		url: url + csrf_token,
		form,
		dataType: 'json',
		cookie,
		method: 'POST'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default getEventApi;
