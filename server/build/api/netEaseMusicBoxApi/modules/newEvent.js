'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _req = require('../req');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getNewEvent = (0, _koaRouter2.default)();

getNewEvent.get('/netEaseApi/newEvent', async (ctx, next) => {
	const cookie = ctx.request.get('Cookie') ? ctx.request.get('Cookie') : ctx.request.query.cookie ? ctx.request.query.cookie : '';
	const form = {
		'time': -1,
		'offset': ctx.request.query.offset || '0',
		'pagesize': ctx.request.query.limit || 20,
		'getcounts': true,
		"csrf_token": ""
	};
	const csrf_token = cookie.split(';')[1].split('=')[1];
	const options = {
		url: '/weapi/v1/event/get/?csrf_token=' + csrf_token,
		form,
		cookie,
		response: ctx.response
	};
	ctx.body = await (0, _req.req)(options);
});

exports.default = getNewEvent;