import KoaRouter from 'koa-router';
import {
	fetchData
} from '../util';
import crypto from 'crypto';
import {req} from '../req';
const getNewEvent = KoaRouter();

getNewEvent.get('/netEaseApi/newEvent', async(ctx, next) => {
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : (ctx.request.query.cookie ? ctx.request.query.cookie : '');
	const form = {
		'time': -1,
		'offset': ctx.request.query.offset || '0',
		'pagesize': ctx.request.query.limit || 20,
		'getcounts': true,
		"csrf_token": ""
	};
	const csrf_token = cookie.split(';')[1].split('=')[1];
	const options = {
		url: '/weapi/v1/event/get/?csrf_token=' + csrf_token,
		form,
		cookie,
		response: ctx.response
	}
	ctx.body = await req(options);
	// const phone = ctx.request.query.cellphone;
	// const md5sum = crypto.createHash('md5');
	// md5sum.update(ctx.request.query.password);
	// const form = {
	// 	'phone': phone,
	// 	'password': md5sum.digest('hex'),
	// 	'rememberLogin': 'true'
	// };
	// ctx.body = await createWebAPIRequest('/weapi/login/cellphone', form, cookie, ctx.response)
});

export default getNewEvent;
