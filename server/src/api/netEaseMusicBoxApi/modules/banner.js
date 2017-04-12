import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const bannerApi = KoaRouter();

bannerApi.get('/netEaseApi/banner', async(ctx, next) => {
	const url = 'api/v2/banner/get';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		"csrf_token": ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : (ctx.query.cookie ? ctx.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		method: 'GET',
		dataType: 'json'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default bannerApi;
