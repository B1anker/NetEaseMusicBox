'use strict';

var _config = require('../config');

var _util = require('../util');

/**
 * 搜索api
 * @param {String} [name] [搜索内容]
 * @param {Number} [type] [搜索的类型: (1:歌曲;10:专辑;歌手:100;歌单:1000;用户:1002;mv:1004;歌词:1006;主播电台:1009)]
 * @param {Number}  [limit] [获取的数量]
 * @param {Number} [offset] [偏移量(分页用)]
 */
const search = function () {
	let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	let type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	let limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
	let offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	const option = (0, _util.deepCopy)(_config.globalOption);
	const url = `${_config.origin}/api/search/get`;
	const form = {
		s: name,
		limit,
		type,
		offset
	};
	const method = 'POST';
	Object.assign(option, { url, form, method });
	return (0, _util.fetchData)(option);
};

module.exports = search;