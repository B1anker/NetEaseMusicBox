import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';

const playListApi = KoaRouter();

/* 通过id获取mv
 * @param {String} mvId
 * @return {Promise}
 */
playListApi.post('/netEaseApi/login', async(ctx, next) => {
	const url = '/weapi/login/cellphone';
	/**
	 * 歌曲api
	 * @param {String/Array} [ids] [歌曲ids]
	 */
	const form = {
		'phone': ctx.query.cellphone,
		'password': ctx.query.password,
		'rememberLogin': 'true'
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default playListApi;
