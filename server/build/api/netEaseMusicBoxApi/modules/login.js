'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _req = require('../req');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginApi = (0, _koaRouter2.default)();

loginApi.post('/netEaseApi/login', async (ctx, next) => {
	const url = '/weapi/login/cellphone';
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	/**
  * 登录api
  * @param {String} [cellphone] [手机号]
  * @param {String} [password] [密码]
  */
	const md5sum = _crypto2.default.createHash('md5');
	md5sum.update(ctx.request.body.password);
	const form = {
		'phone': ctx.request.body.cellphone,
		'password': md5sum.digest('hex'),
		'rememberLogin': 'true'
	};
	const options = Object.assign({}, {
		url,
		form,
		response: ctx.response,
		cookie,
		dataType: 'json'
	});
	ctx.body = await (0, _req.req)(options);
});

exports.default = loginApi;