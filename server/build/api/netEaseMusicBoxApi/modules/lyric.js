'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lyricApi = (0, _koaRouter2.default)();

lyricApi.get('/netEaseApi/lyric', async (ctx, next) => {
	const url = 'weapi/song/lyric?csrf_token=';
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		id: ctx.query.id,
		os: 'pc',
		lv: '-1',
		kv: '-1',
		tv: '-1',
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = lyricApi;