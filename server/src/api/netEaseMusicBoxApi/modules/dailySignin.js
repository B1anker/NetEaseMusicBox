import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const dailySigninApi = KoaRouter();

dailySigninApi.get('/netEaseApi/dailySign', async(ctx, next) => {
	const url = 'weapi/v1/event/get?csrf_token=';
	/**
	 * 签到
	 * @param {Number} [type] [0为安卓端签到 3点经验,1为网页签到,2点经验]
	 */
	const form = {
		type: ctx.query.type,
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

export default dailySigninApi;
