import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const refreshApi = KoaRouter();

refreshApi.get('/netEaseApi/refresh', async(ctx, next) => {
	const url = '/weapi/login/token/refresh?csrf_token=';
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const csrf_token = cookie.split('=')[2];
	const form = {
		csrf_token: csrf_token
	};
	const options = Object.assign({}, {
		url: url + csrf_token,
		form,
		dataType: 'json'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default refreshApi;
