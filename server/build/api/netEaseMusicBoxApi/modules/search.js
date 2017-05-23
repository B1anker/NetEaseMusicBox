'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const serachApi = (0, _koaRouter2.default)();

serachApi.get('/netEaseApi/search', async (ctx, next) => {
	/**
  * 搜索api
  * @param {String} [s] [搜索内容]
  * @param {Number} [limit] [获取的数量]
  * @param {Number} [type] [搜索的类型(1:歌曲;10:专辑;歌手:100;歌单:1000;用户:1002;mv:1004;歌词:1006;主播电台:1009)]
  * @param {Number} [offset] [偏移量(分页用)]
  */
	const form = {
		s: ctx.query.content,
		limit: ctx.query.limit || 10,
		type: ctx.query.type || 1,
		offset: ctx.query.offset || 0,
		total: true,
		csrf_token: ''
	};

	const options = Object.assign({}, {
		url: 'weapi/cloudsearch/get/web?csrf_token=',
		form,
		dataType: 'json'
	});

	ctx.body = await (0, _util.fetchData)(options);
});

exports.default = serachApi;