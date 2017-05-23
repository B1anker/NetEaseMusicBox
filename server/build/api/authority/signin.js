'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('../../database/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const signinRouter = (0, _koaRouter2.default)();

exports.default = signinRouter.post('/authority/signin', async (ctx, next) => {
	const col = await _index2.default.connect('user');
	const result = await col.find({
		username: ctx.request.body.username
	});
	if (result[0].password === ctx.request.body.password) {
		ctx.status = 200;
		ctx.body = {
			code: 200,
			message: '登录成功'
		};
		return;
	}
	ctx.status = 500;
	ctx.body = {
		code: 500,
		message: '账号或密码错误'
	};
});