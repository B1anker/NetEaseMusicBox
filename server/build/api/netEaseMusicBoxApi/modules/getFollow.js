'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFollowApi = (0, _koaRouter2.default)();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
getFollowApi.post('/netEaseApi/getFollows', async (ctx, next) => {
	const url = 'weapi/user/getfollows/' + ctx.request.body.id;
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		offset: ctx.request.body.offset || '0',
		limit: ctx.request.body.limit || 1000,
		order: true
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

exports.default = getFollowApi;