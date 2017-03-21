import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const mvApi = KoaRouter();

/* 通过id获取mv
 * @param {String} mvId
 * @return {Promise}
 */
mvApi.get('/netEaseApi/mv', async(ctx, next) => {
	const url = 'weapi/mv/detail/';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		id: ctx.query.mvId,
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default mvApi;
