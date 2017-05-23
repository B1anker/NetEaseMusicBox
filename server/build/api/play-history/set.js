'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index2 = require('../../database/index.js');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setHistoryApi = (0, _koaRouter2.default)();

exports.default = setHistoryApi.post('/history/set', async (ctx, next) => {
	const col = await _index3.default.connect('history');
	const username = ctx.request.body.username.toLowerCase(),
	      song = ctx.request.body.music;
	const history = await col.find({ username: username });
	let result = [];
	if (history.length === 0) {
		result = await col.insert({
			username,
			tracks: [{
				song,
				count: 1
			}]
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