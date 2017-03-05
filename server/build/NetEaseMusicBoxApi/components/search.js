'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _config = require('../config');

var _util = require('../util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var search = function search() {
	var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
	var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	var option = (0, _util.deepCopy)(_config.globalOption);
	var url = _config.origin + '/api/search/get';
	var form = {
		s: content,
		limit: limit,
		type: type,
		offset: offset
	};
	var method = 'POST';
	(0, _assign2.default)(option, { url: url, form: form, method: method });
	return (0, _util.fetchData)(option);
};

module.exports = search;