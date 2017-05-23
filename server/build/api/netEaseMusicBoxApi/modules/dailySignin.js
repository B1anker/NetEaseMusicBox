'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dailySigninApi = (0, _koaRouter2.default)();

dailySigninApi.get('/netEaseApi/dailySign', async (ctx, next) => {
	const url = '/weapi/point/dailyTask?csrf_token=';
	/**
  * 签到
  * @param {Number} [type] [0为安卓端签到 3点经验,1为网页签到,2点经验]
  */
	const form = {
		"type": ctx.query.type
	};
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	const csrf_token = cookie.split('=')[2];
	const options = Object.assign({}, {
		url: url + csrf_token,
		form,
		dataType: 'json',
		cookie,
		method: 'POST'
	});
	const data = await (0, _util.fetchData)(options);
	ctx.body = data;
});

exports.default = dailySigninApi;