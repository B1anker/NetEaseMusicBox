import KoaRouter from 'koa-router';
import {
	globalOption,
	origin
} from "../config";
import {
	deepCopy,
	fetchData
} from '../util';

const serachApi = KoaRouter();

serachApi.get('/netEaseApi/search', async(ctx, next) => {
	const option = deepCopy(globalOption),
		url = `${origin}/api/search/get`,
		method = 'POST';

	/**
	 * 搜索api
	 * @param {String} [s] [搜索内容]
	 * @param {Number} [limit] [获取的数量]
	 * @param {Number} [type] [搜索的类型(1:歌曲;10:专辑;歌手:100;歌单:1000;用户:1002;mv:1004;歌词:1006;主播电台:1009)]
	 * @param {Number} [offset] [偏移量(分页用)]
	 */
	const form = {
		s: ctx.query.content,
		limit: ctx.query.limit || 3,
		type: ctx.query.type || 1,
		offset: ctx.query.offset || 0
	};

	Object.assign(option, {
		url,
		form,
		method
	});

	ctx.body = await fetchData(option);
});

export default serachApi;
