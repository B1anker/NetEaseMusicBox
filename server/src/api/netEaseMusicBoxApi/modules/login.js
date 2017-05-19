import KoaRouter from 'koa-router';
import {
	req
} from '../req';
import crypto from 'crypto';
const loginApi = KoaRouter();

loginApi.post('/netEaseApi/login', async(ctx, next) => {
	const url = '/weapi/login/cellphone';
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
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
		response: ctx.response,
		cookie,
		dataType: 'json'
	});
	ctx.body = await req(options);
});

export default loginApi;
