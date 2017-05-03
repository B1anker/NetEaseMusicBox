import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const dailySigninApi = KoaRouter();

dailySigninApi.get('/netEaseApi/dailySign', async(ctx, next) => {
	const url = '/weapi/point/dailyTask?type=';
	/**
	 * 签到
	 * @param {Number} [type] [0为安卓端签到 3点经验,1为网页签到,2点经验]
	 */
	const form = {
		"csrf_token": ""
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const options = Object.assign({}, {
		url: url + ctx.query.type,
		form,
		dataType: 'json',
		cookie,
		method: 'POST'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default dailySigninApi;
