'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mvApi = (0, _koaRouter2.default)();

/* 通过id获取mv
 * @param {String} mvId
 * @return {Promise}
 */
mvApi.get('/netEaseApi/mv', async (ctx, next) => {
	const url = 'weapi/v1/mv/detail/';
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		id: ctx.query.mvId,
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = mvApi;