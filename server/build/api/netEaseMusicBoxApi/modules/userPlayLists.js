'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userPlayListsApi = (0, _koaRouter2.default)();

/* 通过id获取y用户歌单
 * @param {String} id
 * @return {Promise}
 */
userPlayListsApi.get('/netEaseApi/userPlayLists', async (ctx, next) => {
	const url = 'weapi/user/playlist';
	const form = {
		"offset": ctx.query.offset || '0',
		"uid": ctx.query.id,
		"limit": ctx.query.limit || 20,
		"csrf_token": ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : ctx.query.cookie ? ctx.query.cookie : '';
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = userPlayListsApi;