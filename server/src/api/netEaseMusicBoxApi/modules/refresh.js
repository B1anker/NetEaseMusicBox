import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const refreshApi = KoaRouter();

refreshApi.get('/netEaseApi/refresh', async(ctx, next) => {
	let url = '/weapi/login/token/refresh?csrf_token=';
	let csrf = '';
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	for(i in cookie) {
		if(cookie[i].name === '__csrf') {
			csrf = cookie.value
		}
	}
	csrf = ctx.query.t;
	console.log(ctx.get('Cookie'));
	const form = {
		csrf_token: csrf
	};
	url += csrf;
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default refreshApi;
