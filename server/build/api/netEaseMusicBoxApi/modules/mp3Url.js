'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mp3UrlApi = (0, _koaRouter2.default)();

mp3UrlApi.get('/netEaseApi/song', async (ctx, next) => {
	const url = 'weapi/song/enhance/player/url?csrf_token=';
	const ids = ctx.query.id;
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		ids: Array.isArray(ids) ? ids : [ids],
		br: 320000,
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	const songs = await (0, _util.fetchData)(options);
	ctx.body = {
		code: songs.code,
		songs: songs.data
	};
});

exports.default = mp3UrlApi;