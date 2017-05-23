'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

var _req = require('../req');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const subcountApi = (0, _koaRouter2.default)();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
subcountApi.get('/netEaseApi/subcount', async (ctx, next) => {
	const url = 'weapi/subcount';
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		userId: ctx.query.id,
		csrf_token: ''
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	console.log(cookie);
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await (0, _req.req)(options);
});

exports.default = subcountApi;