'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchData = exports.deepCopy = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deepCopy = function deepCopy(obj) {
	return JSON.parse((0, _stringify2.default)(obj));
};

var fetchData = function fetchData(option) {
	return new _promise2.default(function (resolve, reject) {
		(0, _request2.default)(option, function (err, res, body) {
			if (!err && res.statusCode == 200) {
				var info = JSON.parse(body);
				resolve(info);
			} else {
				reject(err);
			}
		});
	});
};

exports.deepCopy = deepCopy;
exports.fetchData = fetchData;