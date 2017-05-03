import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const songCommentApi = KoaRouter();

songCommentApi.get('/netEaseApi/song/comment', async(ctx, next) => {
	const url = `/weapi/v1/resource/comments/R_SO_4_${ ctx.query.id }/?csrf_token=`;
	/**
	 * 获取歌曲评论
	 * @param {Number} [id] [歌曲id]
	 */
	const form = {
		"offset": ctx.query.offset || 0,
    "rid": ctx.query.id,
    "limit": ctx.query.limit || 20,
    "csrf_token": ""
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const options = Object.assign({}, {
		url: url + ctx.query.type,
		form,
		dataType: 'json',
		cookie,
		method: 'POST'
	});
	const data = await fetchData(options);
	ctx.body = data;
});

export default songCommentApi;
