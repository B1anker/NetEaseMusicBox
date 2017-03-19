import KoaRouter from 'koa-router';
import db from '../../database/index.js';

const signinRouter = KoaRouter();

export default signinRouter.post('/authority/signin', async(ctx, next) => {
	const col = db.connect('user');
	ctx.body = await new Promise((resolve, reject) => {
		col.then((res) => {
			const validate = res.find({
				username: ctx.request.body.username
			});
			validate(ctx, (res) => {
				if (ctx.request.body.password === res[0].password) {
					resolve('pass');
				}
				reject('用户名或密码错误');
			});
			res.close();
		});
	});
});
