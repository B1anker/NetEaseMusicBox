'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bannerApi = (0, _koaRouter2.default)();

bannerApi.get('/netEaseApi/banner', async (ctx, next) => {
	const url = 'api/v2/banner/get';
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		"csrf_token": ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : ctx.query.cookie ? ctx.query.cookie : '';
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		method: 'GET',
		dataType: 'json'
	});
	const data = await (0, _util.fetchData)(options);
	ctx.body = data;
});

exports.default = bannerApi;