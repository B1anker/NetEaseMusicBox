'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFollowedsApi = (0, _koaRouter2.default)();

/* 通过id获取用户信息
 * @param {String} id
 * @return {Promise}
 */
getFollowedsApi.get('/netEaseApi/getFolloweds', async (ctx, next) => {
	const url = 'weapi/user/getfolloweds';
	/**
  * 歌曲api
  * @param {String/Array} [ids] [歌曲ids]
  */
	const form = {
		userId: ctx.query.id,
		csrf_token: ""
	};
	const cookie = ctx.get('Cookie') ? ctx.get('Cookie') : ctx.query.cookie ? ctx.query.cookie : '';
	const options = Object.assign({}, {
		url,
		form,
		cookie,
		dataType: 'json'
	});
	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = getFollowedsApi;