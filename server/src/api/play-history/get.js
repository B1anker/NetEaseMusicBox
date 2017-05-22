import KoaRouter from 'koa-router';
import db from '../../database/index.js';

const getHistoryApi = KoaRouter();

export default getHistoryApi.post('/history/get', async(ctx, next) => {
	const col = await db.connect('history');
	const username = ctx.request.body.username.toLowerCase();
	ctx.body = await col.find({username: username});
});
