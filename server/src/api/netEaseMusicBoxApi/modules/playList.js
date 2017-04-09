import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const playListApi = KoaRouter();

/* 通过id获取歌单
 * @param {String} playListId
 * @return {Promise}
 */
playListApi.get('/netEaseApi/playList', async(ctx, next) => {
	const url = 'weapi/v3/playlist/detail?csrf_token=';
	/**
	 * 歌曲api
	 * @param {String/Array} [playListId] [歌曲ids]
	 */
	const form = {
		id: ctx.query.playListId,
		n: '1000',
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default playListApi;
