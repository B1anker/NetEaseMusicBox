import KoaRouter from 'koa-router';
import db from '../../database/index.js';

const getHistoryApi = KoaRouter();

export default getHistoryApi.get('/history/get', async(ctx, next) => {
	const col = await db.connect('history');
	const username = ctx.query.username.toLowerCase();
	ctx.body = await col.find({username: username});
});
