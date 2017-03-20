import KoaRouter from 'koa-router';
import request from 'request'
import { origin, globalOption } from '../config'
import { deepCopy, fetchData } from '../util'

const songApi = KoaRouter();

songApi.get('/netEaseApi/song', async (ctx, next) => {
	const option = deepCopy(globalOption);
	/**
	 * 歌曲api
	 * @param {String} [id] [歌曲id]
	 */
	const url = `${origin}/api/song/detail?ids=%5B${ctx.query.id}%5d`;
	const method = 'GET';
	Object.assign(option, { url, method });
	ctx.body = await fetchData(option);
});

export default songApi;
