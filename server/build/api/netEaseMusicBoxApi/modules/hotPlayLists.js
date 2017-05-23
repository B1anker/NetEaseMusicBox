'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hotPlayListsApi = (0, _koaRouter2.default)();

/* 获取热门歌单
 * @return {Promise}
 */
hotPlayListsApi.get('/netEaseApi/hotplaylist', async (ctx, next) => {
	const url = 'api/personalized/playlist';
	const form = {};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : ctx.query.cookie ? ctx.query.cookie : '';
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = hotPlayListsApi;