'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userDetailApi = (0, _koaRouter2.default)();

userDetailApi.get('/netEaseApi/userDetail', async (ctx, next) => {
	/**
  * 用户详情
  */
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : ctx.query.cookie ? ctx.query.cookie : '';

	const form = {
		csrf_token: ''
	};

	const options = Object.assign({}, {
		url: 'api/v1/user/detail/' + ctx.query.id,
		form,
		cookie,
		dataType: 'json'
	});

	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = userDetailApi;