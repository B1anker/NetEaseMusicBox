import KoaRouter from 'koa-router';
import db from '../../database/index.js';

const signinRouter = KoaRouter();

export default signinRouter.post('/authority/signin', async(ctx, next) => {
	const col = await db.connect('user');
	const result = await col.find({
		username: ctx.request.body.username
	});
	if (result[0].password === ctx.request.body.password) {
		ctx.status = 200;
		ctx.body = {
			code: 0,
			message: '登录成功'
		};
		return;
	}
	ctx.status = 500;
	ctx.body = {
		code: 0,
		message: '账号或密码错误'
	};
});
