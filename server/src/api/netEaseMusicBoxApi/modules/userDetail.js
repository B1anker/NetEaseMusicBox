import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const userDetailApi = KoaRouter();

userDetailApi.get('/netEaseApi/userDetail', async(ctx, next) => {
	/**
	 * 用户详情
	 */
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');

	const form = {
		csrf_token: ''
	};

	const options = Object.assign({}, {
		url: 'api/v1/user/detail/' + ctx.query.id,
		form,
		cookie,
		dataType: 'json'
	});

	ctx.body = await fetchData(options);
});

export default userDetailApi;
