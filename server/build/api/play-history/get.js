'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _index = require('../../database/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getHistoryApi = (0, _koaRouter2.default)();

exports.default = getHistoryApi.post('/history/get', async (ctx, next) => {
	const col = await _index2.default.connect('history');
	const username = ctx.request.body.username.toLowerCase();
	ctx.body = await col.find({ username: username });
});