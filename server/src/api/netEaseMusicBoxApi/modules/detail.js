import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const detailApi = KoaRouter();

detailApi.get('/netEaseApi/detail', async(ctx, next) => {
	const url = 'weapi/v1/song/detail';
	const ids = ctx.query.id;
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		ids: Array.isArray(ids) ? ids : [ids],
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default detailApi;
