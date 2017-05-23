'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const newBannerApi = (0, _koaRouter2.default)();

newBannerApi.get('/netEaseApi/newBanner', async (ctx, next) => {
	const url = 'discover';
	const form = {
		"csrf_token": ""
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		method: 'GET',
		dataType: 'text/html; charset=utf-8'
	});
	const data = await (0, _util.fetchData)(options);
	const $ = _cheerio2.default.load(data + '');
	ctx.body = $.html();
});

exports.default = newBannerApi;