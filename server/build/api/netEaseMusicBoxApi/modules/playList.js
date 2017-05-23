'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const playListApi = (0, _koaRouter2.default)();

/* 通过id获取歌单
 * @param {String} playListId
 * @return {Promise}
 */
playListApi.get('/netEaseApi/playList', async (ctx, next) => {
	const url = 'weapi/v3/playlist/detail?csrf_token=';
	/**
  * 歌曲api
  * @param {String/Array} [playListId] [歌曲ids]
  */
	const form = {
		id: ctx.query.playListId,
		n: '1000',
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = playListApi;