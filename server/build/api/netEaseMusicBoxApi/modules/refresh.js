'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const refreshApi = (0, _koaRouter2.default)();

refreshApi.get('/netEaseApi/refresh', async (ctx, next) => {
	const url = '/weapi/login/token/refresh?csrf_token=';
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	const csrf_token = cookie.split('=')[2];
	const form = {
		csrf_token: csrf_token
	};
	const options = Object.assign({}, {
		url: url + csrf_token,
		form,
		dataType: 'json'
	});
	const data = await (0, _util.fetchData)(options);
	ctx.body = data;
});

exports.default = refreshApi;