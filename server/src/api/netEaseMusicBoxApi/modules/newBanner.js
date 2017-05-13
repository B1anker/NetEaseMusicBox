import KoaRouter from 'koa-router';
import cheerio from 'cheerio';
import {
	fetchData
} from '../util';

const newBannerApi = KoaRouter();

newBannerApi.get('/netEaseApi/newBanner', async(ctx, next) => {
	const url = 'discover';
	const form = {
		"csrf_token": ""
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		method: 'GET',
		dataType: 'text/html; charset=utf-8'
	});
	const data = await fetchData(options);
	const $ = cheerio.load(data + '');
	ctx.body = $.html();
});

export default newBannerApi;
