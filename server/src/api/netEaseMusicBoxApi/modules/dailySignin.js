import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const dailySigninApi = KoaRouter();

dailySigninApi.get('/netEaseApi/dailySign', async(ctx, next) => {
	const url = '/weapi/point/dailyTask?csrf_token=';
	/**
	 * 签到
	 * @param {Number} [type] [0为安卓端签到 3点经验,1为网页签到,2点经验]
	 */
	const form = {
		"type": ctx.query.type
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const csrf_token = cookie.split('=')[2];
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

export default dailySigninApi;
