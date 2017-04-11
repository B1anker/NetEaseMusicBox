import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';
import crypto from 'crypto';
const loginApi = KoaRouter();

loginApi.post('/netEaseApi/login', async(ctx, next) => {
	const url = '/weapi/login/cellphone';
	/**
	 * 登录api
	 * @param {String} [cellphone] [手机号]
	 * @param {String} [password] [密码]
	 */
	const md5sum = crypto.createHash('md5');
 	md5sum.update(ctx.request.body.password);
	const form = {
		'phone': ctx.request.body.cellphone,
		'password': md5sum.digest('hex'),
		'rememberLogin': 'true'
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await fetchData(options);
});

export default loginApi;
