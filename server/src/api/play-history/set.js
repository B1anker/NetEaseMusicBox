import KoaRouter from 'koa-router';
import db from '../../database/index.js';

const setHistoryApi = KoaRouter();

export default setHistoryApi.post('/history/set', async(ctx, next) => {
	const col = await db.connect('history');
	const username = ctx.request.body.username.toLowerCase(),
		song = ctx.request.body.music;
	const history = await col.find({username: username});
	let result = [];
	if (history.length === 0) {
		result = await col.insert({
			username,
			tracks: [
				{
					song,
					count: 1
				}
			]
		});
	} else {
		let index = 0;
		const exist = history[0].tracks.some((item, _index) => {
			index = _index;
			return item.song.id === song.id;
		});
		if (exist) {
			result = await col.update({
				username
			}, {
				'$inc': {
					[`tracks.${index}.count`]: 1
				}
			});
		} else {
			result = await col.update({
				username
			}, {
				'$push': {
					'tracks': {
						song,
						count: 1
					}
				}
			});
		}
	}

	if (result.length !== 0) {
		ctx.status = 200;
		ctx.body = {
			code: 200,
			message: result
		};
		return;
	}
	ctx.status = 500;
	ctx.body = {
		code: 500,
		message: '数据更新失败'
	};
});
