'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const detailApi = (0, _koaRouter2.default)();

detailApi.get('/netEaseApi/detail', async (ctx, next) => {
	const url = 'weapi/v1/song/detail';
	const ids = ctx.query.id;
	/**
  * 歌曲详情
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		ids: Array.isArray(ids) ? ids : [ids],
		csrf_token: ''
	};
	const options = Object.assign({}, {
		url,
		form,
		dataType: 'json'
	});
	const data = await (0, _util.fetchData)(options);
	ctx.body = data;
});

exports.default = detailApi;